import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function Forest(props: any) {
const gltf = useLoader(GLTFLoader, "/forest/source/pine.glb", draco());

return (
   <mesh
   {...props}
   scale={[1, 1, 1]}
   position={[0,0,0]}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default Forest;
