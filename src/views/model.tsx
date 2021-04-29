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
import GradientBtn from "../designSystem/button/button";
import Rain from '../component/rain';
import Snow from '../component/snow';
import WaterBottle from '../component/accessories/WaterBottle';
import Umbrella from '../component/accessories/umbrella';
import { forecastInterface } from "../interfaces/utils";
import useStyles from './modelStyle';
import TemporaryDrawer from '../designSystem/drawers/drawers';
import LowPoly from '../component/lowPolyBackground';
import NightCamp from '../component/nightCamp';
import DayCamp from '../component/nightCamp';
import MeteoHook, { meteoInterface } from "../component/meteoHook";
import WearablesHook, { wearablesInterface } from '../component/wearablesHook';

interface modelInterface{
  data: forecastInterface[] | null;
  onCityClick: (city: string) => void;
  mode?: switchModetype;
  city: string;
}

export type switchModetype = "api" | "test";

function ModelViewer({data: allData, onCityClick, mode, city}: modelInterface): React.ReactElement{
  const classes = useStyles();
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

  const [camera, setCamera] = useState<Partial<ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> & ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> & ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>>>({ far: 2000, position: [5, 1.2, -18] });

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  console.log(data);

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

  function onAction(value: any, type: string, action: string){
    if (type === "stormClick"){
      stormClick();
    }
    if( type === "updateMeteoVariables"){
      updateMeteoVariables(value, action as keyof meteoInterface);
    }
    if( type === "updateWearablesVariables"){
      updateWearablesVariables(value, action as keyof wearablesInterface);
    }
    if( type === "setSwitchMode"){
      setSwitchMode(switchModeValue());
    }
  }

  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas 
     camera={camera}
     shadowMap
    >
    <pointLight intensity={meteoVariables.storm ? 0 : 1.5} position={[10, 40, -20]} scale={[2,2,2]} />
{
     // <OrbitControls />
}
    <Storm trigger={meteoVariables.storm} />
      <Suspense fallback={<Html>loading..</Html>}>
          <LowPoly visible={sceneNumber === 1} position={[14, 3.95, -3.2]} scale={[0.005,0.005,0.005]} rotation= {[0, 0.1, 0]} />
          <Forest visible={sceneNumber === 2} />
          <NightCamp visible={sceneNumber === 3} position={[3, 0, -11]} scale={[1.75,1.75,1.75]} rotation= {[0, 3.5, 0]}/>
          <DayCamp visible={sceneNumber === 4} position={[3, 0, -11]} scale={[1.75,1.75,1.75]} rotation= {[0, 3.5, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
        <Sun visible={meteoVariables.sun && !meteoVariables.storm} />
        <ambientLight visible={!meteoVariables.storm} />
        <Rain isVisible={meteoVariables.rain} rainCount={meteoVariables.rainPrecipitation} />
        <Snow isVisible={meteoVariables.snow} snowCount={meteoVariables.snowPrecipitation} />
        <Clouds isVisible={meteoVariables.cloud} velocity={meteoVariables.cloudCover} intensity={meteoVariables.cloudIntensity} number={meteoVariables.windSpeed} />
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

      <Html scaleFactor={13} position={[0, 4.5, -13.5]} rotation-z={100}>
      <GradientBtn label={`Switch to ${switchModeValue()} mode`} onClick={()=> setSwitchMode(switchModeValue())} />
      </Html>
{
/*
 <Html style={{display: switchMode === "test" ? "initial" : "none"}} zIndexRange={[1,5]} scaleFactor={7} position={[7.5, 1, -15]} rotation-z={100}>
      <GradientBtn label={<span role="img" aria-label="Sun"> Sun  ☀️</span>} onClick={() => updateMeteoVariables(!meteoVariables.sun, "sun")} />
      <GradientBtn label={<span role="img" aria-label="Clouds"> Clouds  ☁️</span>} onClick={() => updateMeteoVariables(!meteoVariables.cloud, "cloud")} />
      <GradientBtn label={<span role="img" aria-label="Snow"> Snow  ❄️</span>} onClick={() => updateMeteoVariables(!meteoVariables.snow, "snow")} />
      <GradientBtn label={<span role="img" aria-label="Rain"> Rain  ⛆</span>} onClick={() => updateMeteoVariables(!meteoVariables.rain, "rain")} />
      <GradientBtn label={<span role="img" aria-label="scene"> Change scene</span>} onClick={changeScene} />
      </Html>
*/
}
{
/*

      <Html style={{display: switchMode === "test" ? "initial" : "none"}} scaleFactor={6} position={[4.25, -0.75, -13.5]} rotation-z={100}>
      <GradientBtn label={"Wear hat"} onClick={()=> updateWearablesVariables(!wearablesVariables.wearHat, "wearHat")} />
      <GradientBtn label={"Wear Sunglasses"} onClick={()=> updateWearablesVariables(!wearablesVariables.wearSunglasses, "wearSunglasses")} />
      <GradientBtn label={"Wear Mask"} onClick={()=> updateWearablesVariables(!wearablesVariables.wearMask, "wearMask")} />
      <GradientBtn label={"Wear Bottle"} onClick={()=> updateWearablesVariables(!wearablesVariables.wearBottle, "wearBottle")} />
      <GradientBtn label={"Wear Umbrella"} onClick={()=> updateWearablesVariables(!wearablesVariables.wearUmbrella, "wearUmbrella")} />
      </Html>
      */
}
      <Html style={{display: switchMode === "api" ? "initial" : "none"}} scaleFactor={7} position={[7.5, 0.5, -15]} rotation-z={100}>
    <div>{city}</div>
    <GradientBtn disabled={city === "Paris"} label={"Paris"} onClick={()=> onCityClick("Paris")} />
    <GradientBtn disabled={city === "Lyon"} label={"Lyon"} onClick={()=> onCityClick("Lyon")} />
    <GradientBtn disabled={city === "Annecy"} label={"Annecy"} onClick={()=> onCityClick("Annecy")} />
      </Html>
      <Html scaleFactor={7} position={[1, -0.75, -15.5]} rotation-z={100}>
      {!openMenu && <GradientBtn label="See info" onClick={()=> setOpenMenu(true)} />}
      <TemporaryDrawer
      switchMode={switchMode}
      meteoVariables={meteoVariables}
      wearablesVariables={wearablesVariables}
      city={city}
      open={true}
      allData={allData}
      onClose={() => setOpenMenu(false)}
      action={onAction}
      />
      </Html>
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
