import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, useGLTF, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}mall.glb`
const EYE_HEIGHT = 1.7
const WALK_SPEED = 5
const RUN_SPEED = 12

function Model() {
  const { scene } = useGLTF(MODEL_URL)
  return <primitive object={scene} />
}

function Player() {
  const { camera } = useThree()
  const keys = useRef({})

  useEffect(() => {
    camera.position.set(0, EYE_HEIGHT, 0)
    const down = (e) => (keys.current[e.code] = true)
    const up = (e) => (keys.current[e.code] = false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [camera])

  useFrame((_, delta) => {
    const k = keys.current
    const speed = (k.ShiftLeft || k.ShiftRight ? RUN_SPEED : WALK_SPEED) * delta
    const forward = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0)
    const strafe = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0)
    if (!forward && !strafe) return

    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    dir.y = 0
    dir.normalize()
    const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize()

    camera.position.addScaledVector(dir, forward * speed)
    camera.position.addScaledVector(right, strafe * speed)
  })

  return <PointerLockControls />
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center style={{ color: 'white', whiteSpace: 'nowrap' }}>
      Loading model… {progress.toFixed(0)}%
    </Html>
  )
}

export default function Explore() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ fov: 70, near: 0.1, far: 1000 }}>
        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#ffffff', '#444444', 1]} />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <Player />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          color: 'white',
          font: '14px sans-serif',
          pointerEvents: 'none',
        }}
      >
        Click to look around · WASD / arrows to move · Shift to run · Esc to release mouse
      </div>
    </div>
  )
}
