import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function LowPoly(props: any) {
const gltf = useLoader(GLTFLoader, "/lowpoly/scene.glb", draco());

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default LowPoly;
