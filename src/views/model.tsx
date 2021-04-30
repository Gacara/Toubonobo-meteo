import React, { MutableRefObject, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, PerspectiveCameraProps, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei'
import Monkey from '../component/monkey';
import Sun from "../component/sun";
import Forest from "../component/forest";
import Flamingo from '../component/Flamingo';
import Parrot from '../component/Parrot';
import Stork from '../component/Stork';
import Storm from '../component/storm';
import Clouds from '../component/clouds';
import Hat from '../component/clothes/hats/Hat';
import Mask from '../component/clothes/masks/Mask';
import Sunglasses from '../component/clothes/sunglasses/Sunglasses';
import GradientBtn from "../designSystem/button/button";
import Rain from '../component/rain';
import Snow from '../component/snow';
import WaterBottle from '../component/accessories/WaterBottle';
import Umbrella from '../component/accessories/umbrella';
import { forecastInterface } from "../interfaces/utils";
import TemporaryDrawer from '../designSystem/drawers/drawers';
import LowPoly from '../component/lowPolyBackground';
import NightCamp from '../component/nightCamp';
import DayCamp from '../component/dayCamp';
import MeteoHook, { meteoInterface, meteoVariablesType } from "../component/meteoHook";
import WearablesHook, { wearablesInterface } from '../component/wearablesHook';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';

interface modelInterface{
  data: forecastInterface[] | null;
  onCityClick: (city: string) => void;
  mode?: switchModetype;
  city: string;
}

export type switchModetype = "api" | "test";

function ModelViewer({data: allData, onCityClick, mode, city}: modelInterface): React.ReactElement{
  const data = allData ? allData[0] : null;
  const [switchMode, setSwitchMode] = useState<switchModetype>(mode || "api");

  const {
    meteoVariables,
    updateMeteoVariables,
  } = MeteoHook({data, mode: switchMode});

  const {
    wearablesVariables,
    updateWearablesVariables,
  } = WearablesHook({data, mode: switchMode});
  const [sceneNumber, setSceneNumber] = useState<number>(4);
const [fov, setFov] = useState<number>(50);
  const [camera, setCamera] = useState<any>({ position: [10, 1.2, -18] });

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  function stormClick() {
    updateMeteoVariables(true, "storm");
    setTimeout(()=>updateMeteoVariables(false, "storm"), 5000);
  }

  function changeScene(){
    if(sceneNumber === 5){
      setSceneNumber(1);
    }
    else {setSceneNumber(sceneNumber + 1);}
  }

  function switchModeValue(): switchModetype {
    return switchMode === "api" ? "test" : "api";
  }

  function onAction(value: unknown, type: string, action: string){
    if (type === "stormClick"){
      stormClick();
    }
    if( type === "updateMeteoVariables"){
      updateMeteoVariables(value as meteoVariablesType, action as keyof meteoInterface);
    }
    if( type === "updateWearablesVariables"){
      updateWearablesVariables(value as boolean, action as keyof wearablesInterface);
    }
    if( type === "setSwitchMode"){
      setSwitchMode(switchModeValue());
    }
    if( type === "changeScene")
    {
      changeScene();
    }
    if ( type === "onCityClick"){
      onCityClick(value as string);
    }
  }

  function CustomCamera(props: any) {
    const cameraRef: React.MutableRefObject<PerspectiveCamera | undefined>= useRef()
    const set = useThree(({ set }) => set)
    const size = useThree(({ size }) => size)
    
    function zoomOnActions(value: unknown, type: string, action: string){
      
      if (cameraRef.current) {
        if(type === "updateWearablesVariables"){
          if (action === "wearUmbrella") {
            setFov(35);
          } else {
          setFov(20);
        }
    }else {
      resetFov();
    }
  }
      
      onAction(value, type, action);
    }

    function resetFov(){
      setFov(50);
      }

      useLayoutEffect(() => {
        if (cameraRef.current) {
          cameraRef.current!.aspect! = size.width / size.height;
          cameraRef.current.rotation.y = -16;
          cameraRef.current.position.x = 7;
          cameraRef.current.position.y = 1.2;
          cameraRef.current.position.z = -20;
          cameraRef.current.fov = fov;
           // cameraRef.current!.fov! = 20;
           cameraRef.current!.updateProjectionMatrix()
         }
      }, [size.height, size.width])
    
      useLayoutEffect(() => {
        set({ camera: cameraRef.current as unknown as PerspectiveCamera })
      }, [set])
    
    return <>
    <perspectiveCamera ref={cameraRef} />
    <Html position={[1, -0.75, -15.5]} rotation-z={100}>
      {!openMenu && <GradientBtn label="See info" onClick={()=> setOpenMenu(true)} />}
      <TemporaryDrawer
      switchMode={switchMode}
      meteoVariables={meteoVariables}
      wearablesVariables={wearablesVariables}
      city={city}
      open={openMenu}
      allData={allData}
      onClose={() => {setOpenMenu(false); resetFov();}}
      action={zoomOnActions}
      />
      </Html>
  
    </>
}

  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas>
    <CustomCamera />

    <pointLight intensity={meteoVariables.storm ? 0 : 1.5} position={[10, 40, -20]} scale={[2,2,2]} />
    {
    // <OrbitControls />
}

    <Storm trigger={meteoVariables.storm} />
      <Suspense fallback={<Html>loading..</Html>}>
          <LowPoly visible={sceneNumber === 1} position={[14, 3.95, -3.2]} scale={[0.005,0.005,0.005]} rotation= {[0, 0.1, 0]} />
          <Forest visible={sceneNumber === 2} />
          <NightCamp visible={sceneNumber === 3} position={[3, -0.18, -11]} scale={[1.75,1.75,1.75]} rotation= {[0, 3.45, 0]}/>
          <DayCamp visible={sceneNumber === 4} position={[8, 6.37, -5]} scale={[35,35,35]} rotation= {[0.04, 3.35, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
        <Sun visible={meteoVariables.sun && !meteoVariables.storm} color={sceneNumber !== 3 ? "yellow" : "#DCD8AE"}/>
        <ambientLight visible={!meteoVariables.storm} />
        <Rain
        isVisible={meteoVariables.rain}
        rainCount={meteoVariables.rainPrecipitation}
        />
        <Snow 
        isVisible={meteoVariables.snow}
        snowCount={meteoVariables.snowPrecipitation}
        />
        <Clouds isVisible={meteoVariables.cloud} velocity={meteoVariables.windSpeed} intensity={meteoVariables.cloudIntensity} number={meteoVariables.cloudCover} />
        <Flamingo scale={[0.3, 0.3, 0.3]} />
        <Parrot scale={[0.3, 0.3, 0.3]} />
        <Stork scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={<Html>Toubonobo is coming..</Html>}>
         <Monkey position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Hat visible={wearablesVariables.wearHat} position={[4.05, 2, -13.6]} rotation= {[0, 1, 0]}/>
          <Mask visible={wearablesVariables.wearMask} position={[4.01, 1.458, -13.57]}  rotation= {[0, 3.4, 0]}/>
          <Sunglasses visible={wearablesVariables.wearSunglasses} position={[4.02, 1.8, -13.54]}  rotation= {[0, 2.8, 0]}/>
          <WaterBottle visible={wearablesVariables.wearBottle} position={[4.97, 1.3, -13.2]}  rotation= {[0, 2.9, 0]}/>
          <Umbrella visible={wearablesVariables.wearUmbrella} position={[3.10, 1.25, -13.70]}  rotation= {[0, 2.2, 0]}/>
      </Suspense>
    

      <Html position={[4.5, -0.2, -13.5]} rotation-z={100}>
        <div style={{width:"max-content"}}>
        Toubonobo 
        </div>
      </Html>
    </Canvas>
    </div>
  );
}

export default ModelViewer;
