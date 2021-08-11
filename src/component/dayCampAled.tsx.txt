import { PrimitiveProps, useLoader } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function DayCamp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/dayCamp.glb");
const group: React.MutableRefObject<PrimitiveProps | undefined> = useRef();

useLayoutEffect(()=>{
  props.callback();
}, [props])

return (
   <mesh
   {...props}
   >
   <primitive ref={group} object={gltf.scene} />
  </mesh>
)
}
export default DayCamp;
