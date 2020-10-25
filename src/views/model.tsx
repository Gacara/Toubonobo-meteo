import React, { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls, Html } from 'drei'
import Monkey from '../component/monkey';
import Sun from "../component/sun";
import Forest from "../component/forest";
import Flamingo from '../component/Flamingo';
import Parrot from '../component/Parrot';
import Stork from '../component/Stork';
import Storm from '../component/storm';

function ModelViewer(): React.ReactElement{
  const [storm, setStorm] = useState<boolean>(false);


  function handleCLick() {
    setStorm(true);
    setTimeout(()=>setStorm(false), 5000);
  }

  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas 
     camera={{ far: 2000, position: [5, 1.2, -18] }}
    >
    <pointLight intensity={storm ? 0 : 1.5} position={[10, 40, -20]} scale={[2,2,2]} />
{
    <OrbitControls />
}
    <Storm trigger={storm} />
    {
      !storm && 
      <>
      <Sun />
      <ambientLight />
      </>
      }
      <Suspense fallback={<Html>loading..</Html>}>
         <Forest />
      </Suspense>
      <Suspense fallback={null}>
        <Flamingo scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={null}>
        <Parrot scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={null}>
        <Stork scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={<Html>loading..</Html>}>
         <Monkey  position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
      </Suspense>

      <Html zIndexRange={[1,5]} position={[7.5, 0, -15]} rotation-z={100}>
        <button
          style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
          onClick={handleCLick}
        >
        <span role="img" aria-label="storm"> Storm  !!⚡</span>
        </button>
      </Html>

      <Html scaleFactor={5} position={[4.25, -0.75, -13.5]} rotation-z={100}>
        <button
          style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
          onClick={()=>{}}
        > Reset camera
        </button>
      </Html>
      <Html position={[4.5, -0.2, -13.5]} rotation-z={100}>
        <div style={{width:"max-content"}}>
        Toubo le bonobo
        </div>
      </Html>
    </Canvas>
    </div>
  );
}

export default ModelViewer;
