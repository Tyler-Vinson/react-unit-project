import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { acceleratedRaycast, computeBoundsTree } from 'three-mesh-bvh'
import '../mall.css'

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

const MODEL_URL = `${import.meta.env.BASE_URL}oldest_view_mall_fully_textured.glb`
const EYE_HEIGHT = 3.4
const PLAYER_RADIUS = 0.7
const WALK_SPEED = 4
const RUN_SPEED = 7
const GRAVITY = 22
const JUMP_SPEED = 7
const MAX_STEP = 0.2
const STEP_UP = 1.0

const raycaster = new THREE.Raycaster()
raycaster.firstHitOnly = true
const down = new THREE.Vector3(0, -1, 0)
const up = new THREE.Vector3(0, 1, 0)

const nextFrame = () => new Promise((resolve) => setTimeout(resolve, 0))
const SPAWN_RAYS = 16
const SPAWN_VIEW = 25

function scoreSpawn(meshes, x, floorY, z) {
  const origin = new THREE.Vector3(x, floorY + 2.4, z)
  let total = 0
  let best = { distance: -1, angle: 0 }
  for (let index = 0; index < SPAWN_RAYS; index += 1) {
    const angle = (index / SPAWN_RAYS) * Math.PI * 2
    const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle))
    raycaster.set(origin, direction)
    raycaster.far = SPAWN_VIEW
    const hit = raycaster.intersectObjects(meshes, false)[0]
    if (!hit) return null
    const distance = hit.distance
    if (distance < 1.5) return null
    total += distance
    if (distance > best.distance) best = { distance, angle }
  }
  return { score: total, angle: best.angle }
}

async function findSpawn(meshes, bounds, onProgress) {
  const size = bounds.getSize(new THREE.Vector3())
  const step = Math.max(3, Math.max(size.x, size.z) / 80)
  const columns = Math.floor(size.x / step) + 1
  const rows = Math.floor(size.z / step) + 1
  const ray = new THREE.Raycaster()
  const cells = new Map()

  for (let row = 0; row < rows; row += 1) {
    const z = bounds.min.z + row * step
    for (let column = 0; column < columns; column += 1) {
      const x = bounds.min.x + column * step
      ray.set(new THREE.Vector3(x, bounds.max.y + 1, z), down)
      ray.far = size.y + 2
      const hits = ray.intersectObjects(meshes, false)
      if (hits.length < 2) continue
      const [ceiling, floor] = hits
      const clearance = ceiling.point.y - floor.point.y
      if (clearance < EYE_HEIGHT * 1.5 || clearance > 16 || !floor.face) continue
      const normal = floor.face.normal.clone().transformDirection(floor.object.matrixWorld)
      if (normal.y < 0.9) continue
      cells.set(row * columns + column, { x, z, y: floor.point.y, row, column })
    }
    onProgress((row / rows) * 0.5)
    await nextFrame()
  }

  const isConnected = (from, to) => {
    if (Math.abs(from.y - to.y) > STEP_UP) return false
    const origin = new THREE.Vector3(from.x, from.y + EYE_HEIGHT / 2, from.z)
    const direction = new THREE.Vector3(to.x - from.x, 0, to.z - from.z)
    const distance = direction.length()
    ray.set(origin, direction.normalize())
    ray.far = distance
    return ray.intersectObjects(meshes, false).length === 0
  }

  const visited = new Set()
  let largest = []
  let processed = 0
  for (const [key, start] of cells) {
    if (visited.has(key)) continue
    const region = []
    const queue = [[key, start]]
    visited.add(key)
    while (queue.length) {
      const [, cell] = queue.pop()
      region.push(cell)
      for (const [dRow, dColumn] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const row = cell.row + dRow
        const column = cell.column + dColumn
        if (row < 0 || column < 0 || column >= columns) continue
        const neighborKey = row * columns + column
        const neighbor = cells.get(neighborKey)
        if (!neighbor || visited.has(neighborKey)) continue
        if (!isConnected(cell, neighbor)) continue
        visited.add(neighborKey)
        queue.push([neighborKey, neighbor])
      }
      processed += 1
      if (processed % 300 === 0) {
        onProgress(0.5 + 0.5 * Math.min(processed / cells.size, 1))
        await nextFrame()
      }
    }
    if (region.length > largest.length) largest = region
  }

  const best = { score: -1, position: null, yaw: 0 }
  const centroid = largest.reduce(
    (sum, cell) => sum.add(new THREE.Vector3(cell.x, cell.y, cell.z)),
    new THREE.Vector3(),
  ).divideScalar(Math.max(largest.length, 1))
  for (const cell of largest) {
    const result = scoreSpawn(meshes, cell.x, cell.y, cell.z)
    if (result && result.score > best.score) {
      best.score = result.score
      best.position = new THREE.Vector3(cell.x, cell.y, cell.z)
      best.yaw = Math.atan2(-Math.cos(result.angle), -Math.sin(result.angle))
    }
  }

  if (!best.position) {
    const fallback = largest.reduce(
      (closest, cell) =>
        Math.hypot(cell.x - centroid.x, cell.z - centroid.z) <
        Math.hypot(closest.x - centroid.x, closest.z - centroid.z)
          ? cell
          : closest,
      largest[0] ?? { x: centroid.x, y: bounds.max.y + 1, z: centroid.z },
    )
    best.position = new THREE.Vector3(fallback.x, fallback.y, fallback.z)
  }
  return best
}

function Model({ onReady, onStatus }) {
  const { scene } = useGLTF(MODEL_URL)
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const collidables = []
      const maxAnisotropy = gl.capabilities.getMaxAnisotropy()
      scene.updateMatrixWorld(true)
      scene.traverse((object) => {
        if (!object.isMesh) return
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material]
        materials.forEach((material) => {
          if ('metalness' in material) {
            material.metalness = 0
            material.roughness = Math.max(material.roughness ?? 1, 0.8)
          }
          Object.values(material).forEach((value) => {
            if (value?.isTexture) value.anisotropy = maxAnisotropy
          })
        })
        collidables.push(object)
      })

      for (let index = 0; index < collidables.length; index += 1) {
        if (cancelled) return
        onStatus(`Building collisions… ${Math.round((index / collidables.length) * 100)}%`)
        const geometry = collidables[index].geometry
        if (!geometry.boundsTree) geometry.computeBoundsTree()
        await nextFrame()
      }

      const bounds = new THREE.Box3().setFromObject(scene)
      const spawn = await findSpawn(collidables, bounds, (fraction) =>
        onStatus(`Finding a place to stand… ${Math.round(fraction * 100)}%`),
      )
      if (cancelled) return
      onReady(collidables, bounds, spawn)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [scene, gl, onReady, onStatus])

  return <primitive object={scene} />
}

function isBlocked(meshes, position, direction, far) {
  if (direction.y !== 0) {
    raycaster.set(
      new THREE.Vector3(position.x, position.y + EYE_HEIGHT - 0.1, position.z),
      direction,
    )
    raycaster.far = far
    return raycaster.intersectObjects(meshes, false).length > 0
  }

  const side = new THREE.Vector3(-direction.z, 0, direction.x).multiplyScalar(
    PLAYER_RADIUS * 0.8,
  )
  const heights = [STEP_UP + 0.1, 2.0, 3.1]
  const offsets = [side, side.clone().negate(), new THREE.Vector3()]

  for (const height of heights) {
    for (const offset of offsets) {
      const origin = new THREE.Vector3(
        position.x + offset.x,
        position.y + height,
        position.z + offset.z,
      )
      raycaster.set(origin, direction)
      raycaster.far = far + PLAYER_RADIUS
      if (raycaster.intersectObjects(meshes, false).length > 0) return true
    }
  }
  return false
}

const DEADZONE = 0.15
const LOOK_SPEED = 2.6

function readGamepad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : []
  const pad = Array.from(pads).find((candidate) => candidate?.connected)
  if (!pad) return null
  const axis = (index) => {
    const value = pad.axes[index] ?? 0
    if (Math.abs(value) < DEADZONE) return 0
    return Math.sign(value) * ((Math.abs(value) - DEADZONE) / (1 - DEADZONE))
  }
  const button = (index) => Boolean(pad.buttons[index]?.pressed)
  return {
    moveX: axis(0),
    moveY: axis(1),
    lookX: axis(2),
    lookY: axis(3),
    jump: button(0),
    down: button(1),
    noclip: button(3),
    run: button(10) || button(7) || button(6),
    start: button(9),
  }
}

function Player({ meshes, bounds, spawn, onNoclip, active, onPadToggle }) {
  const { camera } = useThree()
  const keys = useRef(new Set())
  const feet = useRef(new THREE.Vector3())
  const velocity = useRef(new THREE.Vector3())
  const grounded = useRef(false)
  const bobTime = useRef(0)
  const noclip = useRef(false)
  const activeRef = useRef(active)
  const lastPad = useRef({ start: false, noclip: false })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.altKey && event.code === 'KeyN' && !event.repeat) {
        noclip.current = !noclip.current
        onNoclip(noclip.current)
        velocity.current.set(0, 0, 0)
        event.preventDefault()
        return
      }
      keys.current.add(event.code)
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
        event.preventDefault()
      }
    }
    const onKeyUp = (event) => keys.current.delete(event.code)
    const clearKeys = () => keys.current.clear()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearKeys)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearKeys)
    }
  }, [onNoclip])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    feet.current.copy(spawn.position)
    velocity.current.set(0, 0, 0)
    camera.position.set(feet.current.x, feet.current.y + EYE_HEIGHT, feet.current.z)
    camera.rotation.set(0, spawn.yaw, 0, 'YXZ')
  }, [camera, spawn])

  useFrame((_, frameDelta) => {
    const delta = Math.min(frameDelta, 0.05)
    const pressed = keys.current
    const position = feet.current
    const pad = readGamepad()
    const last = lastPad.current
    if (pad) {
      if (pad.start && !last.start) onPadToggle()
      if (pad.noclip && !last.noclip && activeRef.current) {
        noclip.current = !noclip.current
        onNoclip(noclip.current)
        velocity.current.set(0, 0, 0)
      }
      last.start = pad.start
      last.noclip = pad.noclip
    }
    const padInput = pad && activeRef.current ? pad : null
    if (padInput && (padInput.lookX || padInput.lookY)) {
      const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ')
      euler.y -= padInput.lookX * LOOK_SPEED * delta
      euler.x = THREE.MathUtils.clamp(
        euler.x - padInput.lookY * LOOK_SPEED * delta,
        -Math.PI / 2 + 0.05,
        Math.PI / 2 - 0.05,
      )
      camera.quaternion.setFromEuler(euler)
    }
    const jumpHeld = pressed.has('Space') || Boolean(padInput?.jump)
    const speed = pressed.has('ShiftLeft') || pressed.has('ShiftRight') || padInput?.run
      ? RUN_SPEED
      : WALK_SPEED
    const forwardInput = THREE.MathUtils.clamp(
      Number(pressed.has('KeyW') || pressed.has('ArrowUp')) -
        Number(pressed.has('KeyS') || pressed.has('ArrowDown')) -
        (padInput?.moveY ?? 0),
      -1,
      1,
    )
    const strafeInput = THREE.MathUtils.clamp(
      Number(pressed.has('KeyD') || pressed.has('ArrowRight')) -
        Number(pressed.has('KeyA') || pressed.has('ArrowLeft')) +
        (padInput?.moveX ?? 0),
      -1,
      1,
    )

    const forward = camera.getWorldDirection(new THREE.Vector3())
    if (noclip.current) {
      const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()
      const fly = forward
        .multiplyScalar(forwardInput)
        .addScaledVector(right, strafeInput)
      fly.y += Number(jumpHeld) - Number(pressed.has('KeyC') || Boolean(padInput?.down))
      if (fly.lengthSq() > 1) fly.normalize()
      position.addScaledVector(fly, speed * 2 * delta)
      camera.position.set(position.x, position.y + EYE_HEIGHT, position.z)
      return
    }
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()
    const movement = forward
      .multiplyScalar(forwardInput)
      .addScaledVector(right, strafeInput)
    if (movement.lengthSq() > 1) movement.normalize()
    movement.multiplyScalar(speed * delta)

    const steps = Math.max(
      1,
      Math.ceil(Math.max(Math.abs(movement.x), Math.abs(movement.z)) / MAX_STEP),
    )
    const stepX = movement.x / steps
    const stepZ = movement.z / steps
    for (let index = 0; index < steps; index += 1) {
      if (
        stepX !== 0 &&
        !isBlocked(
          meshes,
          position,
          new THREE.Vector3(Math.sign(stepX), 0, 0),
          Math.abs(stepX),
        )
      ) {
        position.x += stepX
      }
      if (
        stepZ !== 0 &&
        !isBlocked(
          meshes,
          position,
          new THREE.Vector3(0, 0, Math.sign(stepZ)),
          Math.abs(stepZ),
        )
      ) {
        position.z += stepZ
      }
    }

    const verticalVelocity = velocity.current
    if (grounded.current && jumpHeld) {
      verticalVelocity.y = JUMP_SPEED
      grounded.current = false
    }
    verticalVelocity.y -= GRAVITY * delta
    const verticalStep = verticalVelocity.y * delta
    if (
      verticalStep > 0 &&
      isBlocked(meshes, position, up, verticalStep)
    ) {
      verticalVelocity.y = 0
    } else {
      position.y += verticalStep
    }

    raycaster.set(
      new THREE.Vector3(position.x, position.y + STEP_UP, position.z),
      down,
    )
    raycaster.far = STEP_UP + Math.max(0.15, -verticalStep + 0.05)
    const floorHit = raycaster.intersectObjects(meshes, false)[0]
    if (floorHit && verticalVelocity.y <= 0) {
      position.y = floorHit.point.y
      verticalVelocity.y = 0
      grounded.current = true
    } else {
      grounded.current = false
    }

    if (position.y < bounds.min.y - 20) {
      position.copy(spawn.position)
      verticalVelocity.set(0, 0, 0)
    }

    const horizontalSpeed = Math.hypot(movement.x, movement.z) / delta
    if (grounded.current && horizontalSpeed > 0.1) {
      bobTime.current += delta * horizontalSpeed * 1.5
    }
    const bob = grounded.current
      ? Math.sin(bobTime.current) * 0.025 * Math.min(horizontalSpeed / WALK_SPEED, 1)
      : 0
    camera.position.set(position.x, position.y + EYE_HEIGHT + bob, position.z)
  })

  return <PointerLockControls />
}

class ModelErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mall-error" role="alert">
          Could not load the mall model: {this.state.error.message}
        </div>
      )
    }
    return this.props.children
  }
}

export default function MallExplorer() {
  const [colliders, setColliders] = useState(null)
  const [playing, setPlaying] = useState(false)
  const requestLock = () => {
    const canvas = document.querySelector('.mall-explorer canvas')
    const result = canvas?.requestPointerLock()
    if (result?.catch) result.catch(() => {})
  }
  const [padPlaying, setPadPlaying] = useState(false)
  const togglePad = useCallback(() => setPadPlaying((value) => !value), [])
  const [noclip, setNoclip] = useState(false)
  const [status, setStatus] = useState('Preparing the mall…')
  const { active, progress } = useProgress()
  const onReady = useMemo(
    () => (meshes, bounds, spawn) => setColliders({ meshes, bounds, spawn }),
    [],
  )

  useEffect(() => {
    const onLockChange = () => setPlaying(document.pointerLockElement !== null)
    document.addEventListener('pointerlockchange', onLockChange)
    return () => document.removeEventListener('pointerlockchange', onLockChange)
  }, [])

  return (
    <main className="mall-explorer">
      <ModelErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          camera={{ fov: 75, near: 0.1, far: 2000 }}
        >
          <color attach="background" args={['#9d8b41']} />
          <fog attach="fog" args={['#191b19', 100, 550]} />
          <hemisphereLight args={['#dce8ff', '#6a664d', 2.2]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[40, 80, 20]} intensity={1.7} />
          <Suspense fallback={null}>
            <Model onReady={onReady} onStatus={setStatus} />
            {colliders && <Player
                {...colliders}
                onNoclip={setNoclip}
                active={playing || padPlaying}
                onPadToggle={togglePad}
              />}
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>

      <div className="vhs-overlay" aria-hidden="true">
        <span className="vhs-recording">● REC</span>
        <span className="vhs-timestamp">PLAY&nbsp; SP&nbsp; 00:00:00</span>
      </div>

      {!playing && !padPlaying && (
        <button
          id="mall-start-overlay"
          className="mall-start-overlay"
          type="button"
          disabled={!colliders}
          onClick={requestLock}
        >
          <span className="mall-start-title">
            {colliders
              ? 'Click to explore'
              : active
                ? `Downloading the mall… ${Math.round(progress)}%`
                : status}
          </span>
          <span>WASD / arrows to move · Mouse to look · Space to jump · Shift to run</span>
          <span>Alt+N toggles noclip (fly through walls) · Esc to pause</span>
          <span>Controller: Start to play/pause · Left stick move · Right stick look · A jump · L3/triggers run · Y noclip (A up, B down)</span>
        </button>
      )}

      {noclip && <div className="mall-noclip">NOCLIP · Space up · C down · Alt+N to exit</div>}

      {(playing || padPlaying) && <div className="mall-crosshair" aria-hidden="true">+</div>}

      <a
        className="mall-attribution"
        href="https://sketchfab.com/3d-models/oldest-view-mall-fully-textured-79483a934b0a46d28b79a30f4b465311"
        target="_blank"
        rel="noreferrer"
      >
        Model by maxwellpray · CC BY 4.0
      </a>
    </main>
  )
}
