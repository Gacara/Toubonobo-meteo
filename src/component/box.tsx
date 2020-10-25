import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

function Box(props: any): React.ReactElement {
  const meshRef: React.MutableRefObject<any> = useRef();

  const [hovered, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false)

  useFrame(() => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box;