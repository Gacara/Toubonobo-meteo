import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function MonkeyBis(props: JSX.IntrinsicElements['mesh']) {
const gltf = useLoader(GLTFLoader, "/source/scene.glb");
const bonobo = gltf.scene;

return (
   <mesh
   {...props}
   scale={[0.5, 0.5, 0.5]}>
   <primitive object={bonobo} />
  </mesh>
)
}
export default MonkeyBis;