import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function NightCamp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/nightCamp.glb", draco());

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default NightCamp;
