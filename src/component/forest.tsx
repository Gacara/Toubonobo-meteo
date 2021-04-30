import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Forest(props: any) {
const gltf = useLoader(GLTFLoader, "/forest/source/pine.glb");

return (
   <mesh
   {...props}
   scale={[1, 1, 1]}
   position={[0,0,7]}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default Forest;
