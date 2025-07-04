/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';
import { useEffect } from 'react';

interface allMaterialInterface {
    ['59']: THREE.MeshStandardMaterial
    ['60']: THREE.MeshStandardMaterial
    ['61']: THREE.MeshStandardMaterial
    ['62']: THREE.MeshStandardMaterial
    ['63']: THREE.MeshStandardMaterial
    ['64']: THREE.MeshStandardMaterial
    ['65']: THREE.MeshStandardMaterial
    ['66']: THREE.MeshStandardMaterial
    ['67']: THREE.MeshStandardMaterial
    ['68']: THREE.MeshStandardMaterial
    ['69']: THREE.MeshStandardMaterial
    ['70']: THREE.MeshStandardMaterial
    ['71']: THREE.MeshStandardMaterial
    ['72']: THREE.MeshStandardMaterial
    ['162']: THREE.MeshStandardMaterial
    ['74']: THREE.MeshStandardMaterial
    ['75']: THREE.MeshStandardMaterial
    ['76']: THREE.MeshStandardMaterial
    ['164']: THREE.MeshStandardMaterial
    ['166']: THREE.MeshStandardMaterial
    ['79']: THREE.MeshStandardMaterial
    ['168']: THREE.MeshStandardMaterial
    ['81']: THREE.MeshStandardMaterial
    ['82']: THREE.MeshStandardMaterial
    ['170']: THREE.MeshStandardMaterial
    ['172']: THREE.MeshStandardMaterial
    ['174']: THREE.MeshStandardMaterial
    ['176']: THREE.MeshStandardMaterial
    ['178']: THREE.MeshStandardMaterial
    ['88']: THREE.MeshStandardMaterial
    ['89']: THREE.MeshStandardMaterial
}

type GLTFResult = GLTF & {
  nodes: {
    node_id10: THREE.Mesh
    node_id14: THREE.Mesh
    node_id18: THREE.Mesh
    node_id22: THREE.Mesh
    node_id26: THREE.Mesh
    node_id30: THREE.Mesh
    node_id34: THREE.Mesh
    node_id38: THREE.Mesh
    node_id42: THREE.Mesh
    node_id46: THREE.Mesh
    node_id50: THREE.Mesh
    node_id54: THREE.Mesh
    node_id58: THREE.Mesh
    node_id62: THREE.Mesh
    node_id66: THREE.Mesh
    node_id70: THREE.Mesh
    node_id74: THREE.Mesh
    node_id78: THREE.Mesh
    node_id82: THREE.Mesh
    node_id86: THREE.Mesh
    node_id92: THREE.Mesh
    node_id98: THREE.Mesh
    node_id102: THREE.Mesh
    node_id106: THREE.Mesh
    node_id110: THREE.Mesh
    node_id114: THREE.Mesh
    node_id122: THREE.Mesh
    node_id126: THREE.Mesh
    node_id130: THREE.Mesh
    node_id134: THREE.Mesh
    node_id138: THREE.Mesh
  }
  materials: {
    ['59']: THREE.MeshStandardMaterial
    ['60']: THREE.MeshStandardMaterial
    ['61']: THREE.MeshStandardMaterial
    ['62']: THREE.MeshStandardMaterial
    ['63']: THREE.MeshStandardMaterial
    ['64']: THREE.MeshStandardMaterial
    ['65']: THREE.MeshStandardMaterial
    ['66']: THREE.MeshStandardMaterial
    ['67']: THREE.MeshStandardMaterial
    ['68']: THREE.MeshStandardMaterial
    ['69']: THREE.MeshStandardMaterial
    ['70']: THREE.MeshStandardMaterial
    ['71']: THREE.MeshStandardMaterial
    ['72']: THREE.MeshStandardMaterial
    ['162']: THREE.MeshStandardMaterial
    ['74']: THREE.MeshStandardMaterial
    ['75']: THREE.MeshStandardMaterial
    ['76']: THREE.MeshStandardMaterial
    ['164']: THREE.MeshStandardMaterial
    ['166']: THREE.MeshStandardMaterial
    ['79']: THREE.MeshStandardMaterial
    ['168']: THREE.MeshStandardMaterial
    ['81']: THREE.MeshStandardMaterial
    ['82']: THREE.MeshStandardMaterial
    ['170']: THREE.MeshStandardMaterial
    ['172']: THREE.MeshStandardMaterial
    ['174']: THREE.MeshStandardMaterial
    ['176']: THREE.MeshStandardMaterial
    ['178']: THREE.MeshStandardMaterial
    ['88']: THREE.MeshStandardMaterial
    ['89']: THREE.MeshStandardMaterial
  }
}

 export function getRandomColor(material: THREE.MeshStandardMaterial) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    material.setValues({color});
  }

export default function DayCamp(props: any) {

  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/camp/dayCamp.glb");
  const { nodes, materials } = gltf as GLTFResult
  const [pointerOnTent, setPointerOnTent] = useState<boolean>(false);
  const [pointerOnFire, setPointerOnFire] = useState<boolean>(false);


  function changeSomething() {
    const allMaterial = Object.entries(materials).map(([key]) => key);
    allMaterial.forEach((e) => {
      getRandomColor(materials[e as keyof allMaterialInterface])
    });
  }

  useEffect(()=>{
    const element = document.querySelector("canvas");
    if(element){

      if(pointerOnFire || pointerOnTent){
        element.style.cursor = "pointer"
      } else {
        element.style.cursor = "auto";
      }
    }
  }, [pointerOnFire, pointerOnTent])

  useLayoutEffect(()=>{
    props.callback();
  }, [props])

  return (
    <group ref={group} {...props} scale={[0.04,0.04,0.04]} dispose={null}>
        <group position={[146.42, 41.2, 230.4]} rotation={[-1.84, 0.6, 1.93]} scale={[38.51, 27.59, 33.9]} />
        <group
          position={[-16.79, -195.19, 270.65]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[-265.74, 265.74, 5.33]}>
          <mesh geometry={nodes.node_id10.geometry} material={materials['59']} />
        </group>
        <group position={[48.38, -64.98, 99.99]} rotation={[-Math.PI / 2, 0, -0.84]} scale={[46.19, 46.19, 153.67]}>
          <mesh geometry={nodes.node_id14.geometry} material={materials['60']} />
        </group>
        <group position={[176.11, -137.25, 161.09]} rotation={[-Math.PI / 2, 0, -1.95]} scale={[26.57, 26.57, 48.06]}>
          <mesh geometry={nodes.node_id18.geometry} material={materials['61']} />
        </group>
        <group position={[-5.23, -192.44, 233.9]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id22.geometry} material={materials['62']} />
        </group>
        {
          //TENTE
        }
        <group
        onClick={(e) => {e.stopPropagation(); getRandomColor(materials['63'])}}
        onPointerEnter={() => setPointerOnTent(true)}
        onPointerLeave={() => setPointerOnTent(false)}
        position={[-35.78, -122.44, 292.89]}
        rotation={[-Math.PI / 2, 0, 0.35]}
        scale={[37.62, 37.62, 6.29]}
        >
          <mesh geometry={nodes.node_id26.geometry} material={materials['63']} />
        </group>
        <group position={[42.59, -157.88, 272.19]} rotation={[-1.95, -0.08, -2.89]} scale={[0.18, 9.33, 0.18]}>
          <mesh geometry={nodes.node_id30.geometry} material={materials['64']} />
        </group>
        <group position={[52, -146.29, 265.59]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id34.geometry} material={materials['65']} />
        </group>
        <group position={[-76.52, -188.18, 374.74]} rotation={[0, 0.4, -1.57]} scale={[7.41, 7.41, 24.4]}>
          <mesh geometry={nodes.node_id38.geometry} material={materials['66']} />
        </group>
        <group position={[-25.1, -190.16, 349.35]} rotation={[-0.73, 0.58, -1.64]} scale={[0.9, 0.9, 6.51]}>
          <mesh geometry={nodes.node_id42.geometry} material={materials['67']} />
        </group>
        <group position={[-31.32, -192.44, 348.06]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id46.geometry} material={materials['68']} />
        </group>
        <group position={[159.3, -63.53, 366.45]} rotation={[-Math.PI / 2, 0, 0.21]} scale={[18.11, 18.11, 14.75]}>
          <mesh geometry={nodes.node_id50.geometry} material={materials['69']} />
        </group>
        <group onClick={() => getRandomColor(materials['70'])} position={[144.57, -138.1, 332.89]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[6.88, 6.88, 6.88]}>
          <mesh geometry={nodes.node_id54.geometry} material={materials['70']} />
        </group>
        <group onClick={() => changeSomething()} position={[146.36, -141.17, 337.45]} rotation={[Math.PI, 1.56, Math.PI / 2]} scale={[11.86, 6.88, 6.88]}>
          <mesh geometry={nodes.node_id58.geometry} material={materials['71']} />
        </group>
        <group
        onClick={() => getRandomColor(materials['72'])}
          position={[139.2, -146.13, 348.88]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id62.geometry} material={materials['72']} />
        </group>
        <group
          position={[-16.79, -195.19, 270.65]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[-265.74, 265.74, 5.33]}>
          <mesh geometry={nodes.node_id66.geometry} material={materials['162']} />
        </group>
        <group position={[-197.85, -188.14, 351.83]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.87, 6.45, 4.28]}>
          <mesh geometry={nodes.node_id70.geometry} material={materials['74']} />
        </group>
        <group position={[-135.67, -153.82, 355.57]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id74.geometry} material={materials['75']} />
        </group>
        <group position={[-170.5, -191.54, 378.51]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.77, 0.77, 0.77]}>
          <mesh geometry={nodes.node_id78.geometry} material={materials['76']} />
        </group>
        {
          //FEU
        }
        <group 
        onClick={() => getRandomColor(materials['164'])}
        onPointerEnter={() => setPointerOnFire(true)}
        onPointerLeave={() => setPointerOnFire(false)}
        position={[-20.32, -34.81, 305.49]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[40.04, 40.04, 40.04]}
        >
          <mesh geometry={nodes.node_id82.geometry} material={materials['164']} />
        </group>
        <group position={[-62.01, -192.03, 247.53]} rotation={[-Math.PI / 2, 0, 0.34]} scale={[23.96, 32.17, 22.68]}>
          <mesh geometry={nodes.node_id86.geometry} material={materials['166']} />
        </group>
        <group position={[-61.12, -154.8, 246.55]} rotation={[-3.03, 0, -1.32]} scale={[21, 21, 21]} />
        <group position={[6.9, 8.59, 156.98]} rotation={[-Math.PI / 2, 0, 0]} scale={[31.01, 31.01, 52.28]}>
          <mesh geometry={nodes.node_id92.geometry} material={materials['79']} />
        </group>
        <group position={[105.26, -24.89, 164.26]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]} />
        <group position={[-74.59, 61.02, 259.65]} rotation={[0.69, -0.59, -2.68]} scale={[1.59, 1.59, 1.59]}>
          <mesh geometry={nodes.node_id98.geometry} material={materials['168']} />
        </group>
        <group position={[-49.06, -168.57, 303.4]} rotation={[2.44, 1.14, 2.24]} scale={[22.54, 22.54, 22.54]}>
          <mesh geometry={nodes.node_id102.geometry} material={materials['81']} />
        </group>
        <group position={[141.15, -104.55, 380.9]} rotation={[2.76, 0.33, 0.24]} scale={[1.19, 1.19, 1.19]}>
          <mesh geometry={nodes.node_id106.geometry} material={materials['82']} />
        </group>
        <group position={[140.42, -110.34, 381.11]} rotation={[-1.57, 0.11, -0.39]} scale={[0.43, 0.43, 0.96]}>
          <mesh geometry={nodes.node_id110.geometry} material={materials['170']} />
        </group>
        <group position={[-200.1, -189.76, 386.72]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.83, 1.83, 1.83]}>
          <mesh geometry={nodes.node_id114.geometry} material={materials['172']} />
        </group>
        <group position={[-200.37, -189.39, 386.86]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]} />
        <group position={[140.09, -108.27, 381.44]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]} />
        <group position={[140.35, -108.64, 381.09]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.83, 1.83, 1.83]}>
          <mesh geometry={nodes.node_id122.geometry} material={materials['174']} />
        </group>
        <group position={[-16.79, 47.05, 270.65]} rotation={[-Math.PI / 2, 0, 0]} scale={[216, 216, 277.1]}>
          <mesh geometry={nodes.node_id126.geometry} material={materials['176']} />
        </group>
        <group position={[-184.51, 57.08, -58.98]} rotation={[-Math.PI / 2, 0, 0]} scale={[40.04, 40.04, 40.04]}>
          <mesh geometry={nodes.node_id130.geometry} material={materials['178']} />
        </group>
        <group
          position={[72.47, -36.15, 266.5]}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[181.08, 215.16, 299.3]}>
          <mesh geometry={nodes.node_id134.geometry} material={materials['88']} />
        </group>
        <group
          position={[413.81, -36.15, 180.33]}
          rotation={[-Math.PI, 0, Math.PI / 2]}
          scale={[181.08, 215.16, 304.76]}>
          <mesh geometry={nodes.node_id138.geometry} material={materials['89']} />
        </group>
    </group>
  )
}
