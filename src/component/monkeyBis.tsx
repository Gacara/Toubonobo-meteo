import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function MonkeyBis(props: JSX.IntrinsicElements['mesh']) {
const gltf = useLoader(GLTFLoader, "/source/monkeyBis.glb");
const bonobo = gltf.scene;

return (
   <mesh
   {...props}
   scale={[4.62, 4.62, 4.62]}>
   <primitive object={bonobo} />
  </mesh>
)
}
export default MonkeyBis;