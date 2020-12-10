import React, { Suspense, useState } from 'react';
import { Canvas, ReactThreeFiber } from 'react-three-fiber';
import { OrbitControls, Html } from 'drei'
import Monkey from '../component/monkey';
import Sun from "../component/sun";
import Forest from "../component/forest";
import Flamingo from '../component/Flamingo';
import Parrot from '../component/Parrot';
import Stork from '../component/Stork';
import Storm from '../component/storm';
import THREE from 'three';
import Clouds from '../component/clouds';
import Hat from '../component/clothes/hats/Hat';
import Mask from '../component/clothes/masks/Mask';
import Sunglasses from '../component/clothes/sunglasses/Sunglasses';
import Umbrella from '../component/clothes/umbrella/Umbrella';

interface cameraInterface {
  far: number;
  position: number[];
}

function ModelViewer(): React.ReactElement{
  const [storm, setStorm] = useState<boolean>(false);
  const [wearMask, setWearMask] = useState<boolean>(false);
  const [wearHat, setWearHat] = useState<boolean>(false);
  const [wearSunglasses, setWearSunglasses] = useState<boolean>(false);
  const [wearUmbrella, setWearUmbrella] = useState<boolean>(false);
  const [camera, setCamera] = useState<Partial<ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> & ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> & ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>>>({ far: 2000, position: [5, 1.2, -18] });
 
  function handleCLick() {
    setStorm(true);
    setTimeout(()=>setStorm(false), 5000);
  }

  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas 
     camera={camera}
     shadowMap
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
        <Clouds intensity={8} number={4} />
        <Flamingo scale={[0.3, 0.3, 0.3]} />
        <Parrot scale={[0.3, 0.3, 0.3]} />
        <Stork scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={<Html>Toubonobo is coming..</Html>}>
         <Monkey position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Hat visible={wearHat} position={[4.05, 2, -13.6]} rotation= {[0, 1, 0]}/>
          <Mask visible={wearMask} position={[4.01, 1.458, -13.57]}  rotation= {[0, 3.4, 0]}/>
          <Sunglasses visible={wearSunglasses} position={[4.05, 1.8, -13.55]}  rotation= {[0, 2.9, 0]}/>
          <Umbrella visible={wearUmbrella} position={[4.18, 2.0, -13.55]}  rotation= {[0, 2.2, 0]}/>
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
          onClick={()=> setWearHat(!wearHat)}
        > wear hat
      </button>
      <button
          style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
          onClick={()=> setWearSunglasses(!wearSunglasses)}
        > wear Sunglasses
        </button>
        <button
          style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
          onClick={()=> setWearMask(!wearMask)}
        > Wear mask
        </button>
        <button
          style={{ padding: "2rem", width:"max-content", background: "#d3d3d3", fontSize: "x-large" }}
          onClick={()=> setWearUmbrella(!wearUmbrella)}
        > Wear Umbrella
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