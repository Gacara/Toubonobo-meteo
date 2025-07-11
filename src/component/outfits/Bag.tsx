/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: shedmon (https://sketchfab.com/shedmon)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/bag-on-the-head-a6dbfbaa4e5e4add8baa308c4459859d
title: Bag on the head
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { getRandomColor } from '../dayCamp'

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
  }
  materials: {
    Default: THREE.MeshStandardMaterial
  }
}

export default function Bag(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const gltf = useLoader(GLTFLoader, "/outfits/bag.glb");
  const { nodes, materials } = gltf as GLTFResult
  
  return (
    <group ref={group} {...props} onClick={(e) => {getRandomColor(materials.Default as THREE.MeshStandardMaterial)}} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Default} />
        </group>
      </group>
    </group>
  )
}
