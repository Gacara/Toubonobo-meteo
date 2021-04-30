import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function DayCamp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/dayCamp.glb");

return (
   <mesh
   {...props}
   >
   <primitive object={gltf.scene} />
  </mesh>
)
}
export default DayCamp;
