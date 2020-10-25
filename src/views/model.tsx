import React, { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Html } from 'drei'
import Box from "../component/box";
import Monkey from '../component/monkey';
import Sun from "../component/sun";
import Forest from "../component/forest";
import Flamingo from '../component/Flamingo';

function ModelViewer(): React.ReactElement{
  const [clicked, setClicked] = useState<boolean>(false);
  
  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas 
     camera={{ far: 2000, position: [5, 1.2, -18] }}
    >
    <ambientLight/>
    <pointLight intensity={clicked ? 50 : 1.5} position={[10, 40, -20]} scale={[2,2,2]} />
    <Sun />
    <OrbitControls />
      <Suspense fallback={<Html>loading..</Html>}>
         <Forest />
      </Suspense>
      <Suspense fallback={null}>
        <Flamingo scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={<Html>loading..</Html>}>
         <Monkey  position={[4, -0.03, -15]} rotation= {[0, 2.7, 0]}/>
      </Suspense>

      <Html position={[4.5, -0.75, -15]} rotation-z={100}>
      <button
        style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
        onClick={()=>setClicked(!clicked)}
      >
        {
          clicked ?
          "ALEEEEEDD"
          :
          "Il fait beau"
        }
      </button>
    </Html>
    <Html position={[4.5, -0.2, -15]} rotation-z={100}>
      <div style={{width:"max-content"}}>
      Toubo le bonobo
      </div>
    </Html>
    </Canvas>
    </div>
  );
}

export default ModelViewer;




/*
 <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas>
    <ambientLight />
    <Sun />
    <OrbitControls />
    <Box position={[-3, 1.5, -0.5]} />
      <Suspense fallback={<Html>loading..</Html>}>
        <Monkey position={[0, -3, 0]}/>
      </Suspense>
    <Box position={[3, 0, 2.5]} />
    </Canvas>
    </div>

*/