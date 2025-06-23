import React, { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh
    mesh_1: THREE.Mesh
  }
  materials: {
    wire_145028177: THREE.MeshStandardMaterial
  }
}

export default function WaterBottle(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/water/water_bottle.glb");
  const { nodes, materials } = gltf as GLTFResult
  return (
    <group ref={group} {...props} scale={[0.01,0.01,0.01]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} userData={{ name: 'RootNode (gltf orientation matrix)' }}>
        <group userData={{ name: 'RootNode (model correction matrix)' }}>
          <group userData={{ name: '119f3cc8adab4152a98a23ebdcb33fdf.obj.cleaner' }}>
            <mesh material={materials.wire_145028177} geometry={nodes.mesh_0.geometry} />
            <mesh material={materials.wire_145028177} geometry={nodes.mesh_1.geometry} />
          </group>
        </group>
      </group>
    </group>
  )
}
