/*
auto-generated by: https://github.com/pmndrs/gltfjsx
author: dark-minaz (https://sketchfab.com/dark-minaz)
license: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
source: https://sketchfab.com/models/01aa135a058e4d9396c234294d1691ea
title: Dark Minaz Designs Offical Hat
*/
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { getRandomColor } from '../../dayCamp';

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
    defaultMaterial_1: THREE.Mesh
  }
  materials: {
    material: THREE.MeshStandardMaterial
    logo: THREE.MeshStandardMaterial
  }
}

export default function Hat(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, "/hats/hat.glb");
  const { nodes, materials } = gltf as GLTFResult
  return (
    <group ref={group} scale={[0.26,0.26,0.26]} onClick={(e) => {e.stopPropagation(); getRandomColor(materials.material as THREE.MeshStandardMaterial)}} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.material} geometry={nodes.defaultMaterial.geometry} />
          <mesh material={materials.logo} geometry={nodes.defaultMaterial_1.geometry} />
        </group>
      </group>
    </group>
  )
}

