import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Box(props: any): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null);

  const [hovered, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
              <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box;