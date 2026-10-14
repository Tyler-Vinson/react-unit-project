import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, Sky, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

const MODEL_URL = `${import.meta.env.BASE_URL}mall-full.glb`
const LOWER_FLOOR_STORES_URL = `${import.meta.env.BASE_URL}lower-floor-stores.glb`
const EYE_HEIGHT = 1.7
const RADIUS = 0.4
const STEP_HEIGHT = 0.4
const WALK_SPEED = 5
const RUN_SPEED = 9
const GRAVITY = 25
const JUMP_SPEED = 8
const ACCEL = 12

const raycaster = new THREE.Raycaster()
raycaster.firstHitOnly = true

function castFirstHit(objects, origin, direction, far) {
  raycaster.set(origin, direction)
  raycaster.far = far
  return raycaster.intersectObjects(objects, false)[0]
}

const allHitsCaster = new THREE.Raycaster()
const DIRS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2
  return new THREE.Vector3(Math.cos(a), 0, Math.sin(a))
})

function findIndoorSpawn(meshes, bounds) {
  const STEP = 3
  const candidates = []
  const down = new THREE.Vector3(0, -1, 0)
  const top = bounds.max.y + 1

  for (let x = bounds.min.x; x <= bounds.max.x; x += STEP) {
    for (let z = bounds.min.z; z <= bounds.max.z; z += STEP) {
      allHitsCaster.set(new THREE.Vector3(x, top, z), down)
      allHitsCaster.far = Infinity
      const hits = allHitsCaster.intersectObjects(meshes, false)
      // Walk surfaces top-down; an upward-facing surface with a ceiling 2.5-10m above is a floor
      for (let i = 0; i < hits.length - 1; i++) {
        const ceiling = hits[i]
        const floor = hits[i + 1]
        const gap = ceiling.point.y - floor.point.y
        if (gap < 2.5 || gap > 10 || !floor.face) continue
        const n = floor.face.normal.clone().transformDirection(floor.object.matrixWorld)
        if (n.y < 0.7) continue
        candidates.push(new THREE.Vector3(x, floor.point.y, z))
      }
    }
  }

  const open = candidates.filter((c) => {
    const origin = new THREE.Vector3(c.x, c.y + 1, c.z)
    return DIRS.every((d) => {
      allHitsCaster.set(origin, d)
      allHitsCaster.far = 2
      allHitsCaster.firstHitOnly = true
      return allHitsCaster.intersectObjects(meshes, false).length === 0
    })
  })
  const pool = open.length ? open : candidates
  if (!pool.length) return bounds.getCenter(new THREE.Vector3())

  // Prefer the most common floor level (the main concourse), nearest to the middle of that level
  const levels = new Map()
  pool.forEach((c) => {
    const key = Math.round(c.y)
    levels.set(key, [...(levels.get(key) ?? []), c])
  })
  const main = [...levels.values()].sort((a, b) => b.length - a.length)[0]
  const mid = main.reduce((sum, c) => sum.add(c), new THREE.Vector3()).divideScalar(main.length)
  return main.reduce((best, c) => (c.distanceToSquared(mid) < best.distanceToSquared(mid) ? c : best))
}

function Model({ onReady }) {
  const { scene } = useGLTF(MODEL_URL)
  const { scene: lowerFloorStores } = useGLTF(LOWER_FLOOR_STORES_URL)
  const gl = useThree((s) => s.gl)

  const { collidables, bounds } = useMemo(() => {
    const meshes = []
    const maxAniso = gl.capabilities.getMaxAnisotropy()
    const models = [scene, lowerFloorStores]

    models.forEach((model) => {
      model.updateMatrixWorld(true)
      model.traverse((obj) => {
        if (!obj.isMesh) return
        obj.geometry.computeBoundsTree()
        obj.castShadow = true
        obj.receiveShadow = true
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap']) {
            if (m[key]) {
              m[key].anisotropy = maxAniso
              m[key].needsUpdate = true
            }
          }
        })
        meshes.push(obj)
      })
    })
    const bounds = new THREE.Box3()
      .setFromObject(scene)
      .union(new THREE.Box3().setFromObject(lowerFloorStores))
    return { collidables: meshes, bounds }
  }, [scene, lowerFloorStores, gl])

  useEffect(() => {
    onReady(collidables, bounds)
  }, [collidables, bounds, onReady])

  return (
    <>
      <primitive object={scene} />
      <primitive object={lowerFloorStores} />
    </>
  )
}

function Player({ collidables, bounds }) {
  const { camera } = useThree()
  const keys = useRef({})
  const velocity = useRef(new THREE.Vector3())
  const feet = useRef(new THREE.Vector3())
  const onGround = useRef(false)
  const bobTime = useRef(0)

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true
      if (e.code === 'Space') e.preventDefault()
    }
    const up = (e) => (keys.current[e.code] = false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  const castRay = (origin, direction, far) => castFirstHit(collidables, origin, direction, far)

  // Spawn on an indoor floor: a spot with a ceiling overhead and open space around it
  useEffect(() => {
    const spawn = findIndoorSpawn(collidables, bounds)
    feet.current.copy(spawn)
    velocity.current.set(0, 0, 0)
  }, [collidables, bounds])

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const k = keys.current
    const pos = feet.current
    const vel = velocity.current

    const forward = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0)
    const strafe = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0)
    const speed = k.ShiftLeft || k.ShiftRight ? RUN_SPEED : WALK_SPEED

    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    dir.y = 0
    dir.normalize()
    const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize()

    const wish = dir.multiplyScalar(forward).addScaledVector(right, strafe)
    if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(speed)

    const t = 1 - Math.exp(-ACCEL * delta)
    vel.x += (wish.x - vel.x) * t
    vel.z += (wish.z - vel.z) * t

    if (onGround.current && k.Space) {
      vel.y = JUMP_SPEED
      onGround.current = false
    }
    vel.y -= GRAVITY * delta

    // Horizontal move, sliding along walls
    const move = new THREE.Vector3(vel.x * delta, 0, vel.z * delta)
    const dist = move.length()
    if (dist > 0) {
      const origin = new THREE.Vector3(pos.x, pos.y + STEP_HEIGHT + 0.05, pos.z)
      const hit = castRay(origin, move.clone().normalize(), dist + RADIUS)
      if (hit && hit.face) {
        const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
        normal.y = 0
        if (normal.lengthSq() > 0) {
          normal.normalize()
          const into = move.dot(normal)
          if (into < 0) move.addScaledVector(normal, -into)
          const slideLen = move.length()
          if (slideLen > 0 && castRay(origin, move.clone().normalize(), slideLen + RADIUS)) move.set(0, 0, 0)
        }
      }
      pos.add(move)
    }

    // Vertical move with ground snapping (also steps up small ledges)
    pos.y += vel.y * delta
    const groundHit = castRay(
      new THREE.Vector3(pos.x, pos.y + STEP_HEIGHT + 0.1, pos.z),
      new THREE.Vector3(0, -1, 0),
      STEP_HEIGHT + 0.15,
    )
    if (groundHit && vel.y <= 0) {
      pos.y = groundHit.point.y
      vel.y = 0
      onGround.current = true
    } else {
      onGround.current = false
    }

    // Fell out of the world: respawn above the center
    if (pos.y < bounds.min.y - 50) {
      const c = bounds.getCenter(new THREE.Vector3())
      pos.set(c.x, bounds.max.y, c.z)
      vel.set(0, 0, 0)
    }

    const horizontalSpeed = Math.hypot(vel.x, vel.z)
    if (onGround.current && horizontalSpeed > 0.5) bobTime.current += delta * horizontalSpeed * 1.6
    const bob = onGround.current ? Math.sin(bobTime.current) * 0.04 * Math.min(horizontalSpeed / WALK_SPEED, 1.5) : 0
    camera.position.set(pos.x, pos.y + EYE_HEIGHT + bob, pos.z)
  })

  return <PointerLockControls selector="#start-overlay" />
}

export default function Explore() {
  const [scan, setScan] = useState(null)
  const [playing, setPlaying] = useState(false)
  const { active, progress } = useProgress()

  const handleReady = useMemo(() => (meshes, box) => setScan({ meshes, box }), [])

  useEffect(() => {
    const update = () => setPlaying(!!document.pointerLockElement)
    document.addEventListener('pointerlockchange', update)
    return () => document.removeEventListener('pointerlockchange', update)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 75, near: 0.1, far: 2000 }}
      >
        <color attach="background" args={['#cfe3f5']} />
        <fog attach="fog" args={['#cfe3f5', 80, 600]} />
        <Sky sunPosition={[100, 60, 100]} turbidity={4} rayleigh={1.5} />
        <hemisphereLight args={['#ffffff', '#6b6b78', 1.1]} />
        <directionalLight
          position={[60, 100, 40]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-80}
          shadow-camera-right={80}
          shadow-camera-top={80}
          shadow-camera-bottom={-80}
          shadow-camera-far={300}
          shadow-bias={-0.0005}
        />
        <Suspense fallback={null}>
          <Model onReady={handleReady} />
        </Suspense>
        {scan && <Player collidables={scan.meshes} bounds={scan.box} />}
      </Canvas>

      {!playing && (
        <div
          id="start-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.55)',
            color: 'white',
            font: '18px sans-serif',
            cursor: 'pointer',
            textAlign: 'center',
            gap: 8,
          }}
        >
          <h2 style={{ margin: 0 }}>
            {active ? `Loading museum… ${progress.toFixed(0)}%` : 'Click to explore'}
          </h2>
          <p style={{ margin: 0 }}>
            WASD / arrows to move · Mouse to look · Space to jump · Shift to run · Esc to pause
          </p>
        </div>
      )}

      {playing && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 6,
            height: 6,
            marginLeft: -3,
            marginTop: -3,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.8)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
