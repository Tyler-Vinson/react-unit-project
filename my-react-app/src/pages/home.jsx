import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function CarvableBlock(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function SculptingApp() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Your custom carving component */}
        <CarvableBlock position={[0, 0, 0]} />

        <OrbitControls />
      </Canvas>
    </div>
  )
}