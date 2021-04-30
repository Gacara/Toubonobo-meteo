import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function NightCamp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/nightCamp.glb");

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default NightCamp;
