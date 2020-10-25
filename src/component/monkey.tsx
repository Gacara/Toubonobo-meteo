import React, { useEffect } from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function Monkey(props: any) {
const gltf = useLoader(GLTFLoader, "/source/out.glb", draco());

return (
   <mesh
   {...props}
   scale={[0.004, 0.004, 0.004]}>
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default Monkey;