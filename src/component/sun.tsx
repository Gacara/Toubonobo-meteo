import React, { useRef } from 'react';
import { Color } from 'three';

interface sunInterface {
  props?: JSX.IntrinsicElements['group'];
  visible: boolean;
  color: Color | string;
}

export default function Sun({props, color, visible}: sunInterface) {
  const ref = useRef()
  return (
      <group ref={ref} {...props} visible={visible}>
        <pointLight intensity={0} position={color === "yellow" ? [-37, 6, -16] : [-44, 7, -12]} scale={[7,7,7]}>
          <mesh position={[5, 0, 0]}>
            <sphereBufferGeometry attach="geometry" args={[0.5, 10, 10]} />
            <meshBasicMaterial attach="material" color={color}/>
          </mesh>
        </pointLight>
      </group>
  )
}
