import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { draco } from "drei";

function Monkey(props: any) {
const gltf = useLoader(GLTFLoader, "/source/out.glb", draco());
const bonobo = gltf.scene;

return (
   <mesh
   {...props}
   scale={[0.0015, 0.0015, 0.0015]}>
   <primitive object={bonobo} />
  </mesh>
)
}
export default Monkey;