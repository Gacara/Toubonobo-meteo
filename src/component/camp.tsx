import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function Camp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/scene.glb", draco());

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default Camp;
