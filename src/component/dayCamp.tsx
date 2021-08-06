import { PrimitiveProps, useGraph, useLoader, useThree } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { Mesh, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function DayCamp(props: any) {
const gltf = useLoader(GLTFLoader, "/camp/dayCamp.glb");
const group: React.MutableRefObject<PrimitiveProps | undefined> = useRef();

useLayoutEffect(() =>{
  if(group.current){
    const test = group.current.children[0].children[0].children[props.elementObject] as Object3D;
   

    test.scale.set(1, 2, 3);
    const tent = group.current.children[0].children[0].children[5];
/*
    tent.addEventListener("click", ()=> {
      tent.scale.set(100,100,100);
      window.alert("pouet")
    })
    tent.addEventListener("mouseup", ()=> {
      tent.scale.set(100,100,100);
      window.alert("pouet")
    })
    tent.addEventListener("mousedown", ()=> {
      tent.scale.set(100,100,100);
      window.alert("pouet")
    })*/
    
    console.log(tent)
  }
}, [group, props.elementObject])


return (
   <mesh
   {...props}
   >
   <primitive ref={group} object={gltf.scene} />
   
   {
     //console.log(gltf.scene)
   }
  </mesh>
)
}
export default DayCamp;
