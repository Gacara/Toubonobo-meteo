import React, { useRef } from 'react'

export default function Sun() {
  const ref = useRef()
  return (
    <>
      <group ref={ref}>
        <pointLight intensity={0} position={[1, 10, 0]} scale={[4,4,4]}>
          <mesh position={[5, 0, 0]}>
            <sphereBufferGeometry attach="geometry" args={[0.5, 10, 10]} />
            <meshBasicMaterial attach="material" color="yellow" />
          </mesh>
        </pointLight>
      </group>
    </>
  )
}
