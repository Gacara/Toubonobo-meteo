import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function LowPoly(props: any) {
const gltf = useLoader(GLTFLoader, "/lowpoly/scene.glb");

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default LowPoly;
