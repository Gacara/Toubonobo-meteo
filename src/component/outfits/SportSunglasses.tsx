/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Nofil.Khan (https://sketchfab.com/Nofil.Khan)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/fugitive-tac-version-25-outlaw-eyewear-5e0710bda5984399a56aedcc7ab0174d
title: FUGITIVE TAC VERSION 2.5 OutLaw Eyewear
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_10: THREE.Mesh
    Object_12: THREE.Mesh
    Object_14: THREE.Mesh
    Object_16: THREE.Mesh
  }
  materials: {
    M_Rim: THREE.MeshStandardMaterial
    M_Temple2: THREE.MeshStandardMaterial
    M_Screw: THREE.MeshStandardMaterial
    M_Nosepad: THREE.MeshStandardMaterial
    M_TempleLeft: THREE.MeshStandardMaterial
    material_0: THREE.MeshStandardMaterial
    M_glass: THREE.MeshPhysicalMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF('/sportSunglasses.glb') as unknown as GLTFResult as unknown as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-0.01, 0.35, 0.26]}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.M_Rim} />
            <mesh geometry={nodes.Object_5.geometry} material={materials.M_Temple2} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.M_Screw} />
            <mesh geometry={nodes.Object_7.geometry} material={materials.M_Nosepad} />
            <mesh geometry={nodes.Object_8.geometry} material={materials.M_TempleLeft} />
          </group>
          <group position={[-0.01, 0.31, 0.2]} scale={[3.25, 3.25, 0.48]}>
            <mesh geometry={nodes.Object_10.geometry} material={materials.material_0} />
          </group>
          <group position={[-0.01, 0.32, 0.2]}>
            <mesh geometry={nodes.Object_12.geometry} material={materials.material_0} />
          </group>
          <group position={[-0.01, 0.35, 0.26]}>
            <mesh geometry={nodes.Object_14.geometry} material={materials.M_glass} />
          </group>
          <mesh geometry={nodes.Object_16.geometry} material={materials.M_Rim} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/sportSunglasses.glb')
