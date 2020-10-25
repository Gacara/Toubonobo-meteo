import React, { Suspense, useState } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Html, draco } from 'drei'
import Box from "../component/box";
import Monkey from '../component/monkey';
import { Group } from 'three';

interface urlInterface{
  url: string;
}

function Model({ url }: urlInterface) {
  const { scene } = useLoader(GLTFLoader, url, draco())
  return <primitive object={scene} dispose={null} />
}

function ModelViewer(): React.ReactElement{
  
  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Box position={[-3, 1.5, -0.5]} />
      <Suspense fallback={<Html>loading..</Html>}>
        <Monkey position={[0, -3, 0]}/>
      </Suspense>
    <Box position={[3, 0, 2.5]} />
    </Canvas>
    </div>
  );
}

export default ModelViewer;