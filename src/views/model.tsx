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

interface modelInterface{
  data: forecastInterface | null;
  onCityClick: (city: string) => void;
  mode?: switchModetype;
  city: string;
}

export type switchModetype = "api" | "test";

function ModelViewer({data, onCityClick, mode, city}: modelInterface): React.ReactElement{
  const classes = useStyles();

  const isRaining = !!((data && data.Precipitation.mode === "rain"));
  const isSnowing = !!(data && data.Precipitation.mode === "snow");
  const hasCloud = !!((data && data.Cloud.cover > 0) || true);
  const hasSun = !!((data && data.Cloud.cover > 75));
  const hasStorm = !!(data && +data.Precipitation.value > 10);


  const [storm, setStorm] = useState<boolean>(isRaining && hasStorm);
  const [sun, setSun] = useState<boolean>(hasSun);
  const [rain, setRain] = useState<boolean>(isRaining);
  const [snow, setSnow] = useState<boolean>(isSnowing);
  const [cloud, setCloud] = useState<boolean>(hasCloud);

  const [switchMode, setSwitchMode] = useState<switchModetype>(mode || "api");

  const [wearMask, setWearMask] = useState<boolean>(true);
  const [wearHat, setWearHat] = useState<boolean>(wearSummerClothes());
  const [wearSunglasses, setWearSunglasses] = useState<boolean>(wearSummerClothes());
  const [wearBottle, setWearBottle] = useState<boolean>(wearSummerClothes());
  const [wearUmbrella, setWearUmbrella] = useState<boolean>(isRaining);
  const [camera, setCamera] = useState<Partial<ReactThreeFiber.Object3DNode<THREE.Camera, typeof THREE.Camera> & ReactThreeFiber.Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> & ReactThreeFiber.Object3DNode<THREE.OrthographicCamera, typeof THREE.OrthographicCamera>>>({ far: 2000, position: [5, 1.2, -18] });

  const [openMenu, setOpenMenu] = useState<boolean>(true);
  console.log(data);

  function checkIfApiModeResult(apiBool: boolean, testBool: boolean): boolean{
    return isApiMode() ? apiBool : testBool;
  }

  function handleCLick() {
    setStorm(true);
    setTimeout(()=>setStorm(false), 5000);
  }

  function convertDataCloudCoverToIntensity(): number{
    return data?.Cloud.cover ? data.Cloud.cover / 10 : 1;
  }

  function convertDataCloudCoverToNumber(): number{
    return data?.Cloud.cover ? data.Cloud.cover / 20 : 1;
  }

  function convertDataWindSpeedToVelocity(): number{
    return data?.Wind.speed ? +data.Wind.speed / 6 : 1;
  }

  function wearSummerClothes(): boolean{
    if((data && +data.Temperature.feeling > 1 && data.Precipitation.mode === null)){
      return true;
    } else {
      return false;
    }
  }

  function switchModeValue(): switchModetype {
    return switchMode === "api" ? "test" : "api";
  }

  function isApiMode(): boolean {
    return !!(switchMode === "api");
  }

  return (
    <div style={{ height:"100vh", width:"100vw" }}>
    <Canvas 
     camera={camera}
     shadowMap
    >
    <pointLight intensity={storm ? 0 : 1.5} position={[10, 40, -20]} scale={[2,2,2]} />
{
    //<OrbitControls />
}
    <Storm trigger={storm} />
      <Suspense fallback={<Html>loading..</Html>}>
         <Forest />
      </Suspense>

      <Suspense fallback={null}>
        <Sun visible={checkIfApiModeResult(hasSun, sun) && !storm} />
        <ambientLight visible={!storm} />
        <Rain isVisible={checkIfApiModeResult(isRaining, rain)} rainCount={8000} />
        <Snow isVisible={checkIfApiModeResult(isSnowing,snow)} snowCount={3000} />
        <Clouds isVisible={checkIfApiModeResult(hasCloud, cloud)} velocity={convertDataCloudCoverToNumber()} intensity={convertDataCloudCoverToIntensity()} number={convertDataWindSpeedToVelocity()} />
        <Flamingo scale={[0.3, 0.3, 0.3]} />
        <Parrot scale={[0.3, 0.3, 0.3]} />
        <Stork scale={[0.3, 0.3, 0.3]} />
      </Suspense>
      <Suspense fallback={<Html>Toubonobo is coming..</Html>}>
         <Monkey position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Hat visible={checkIfApiModeResult(wearSummerClothes(), wearHat)} position={[4.05, 2, -13.6]} rotation= {[0, 1, 0]}/>
          <Mask visible={wearMask} position={[4.01, 1.458, -13.57]}  rotation= {[0, 3.4, 0]}/>
          <Sunglasses visible={checkIfApiModeResult(wearSummerClothes(), wearSunglasses)} position={[4.02, 1.8, -13.54]}  rotation= {[0, 2.8, 0]}/>
          <WaterBottle visible={checkIfApiModeResult(wearSummerClothes(), wearBottle)} position={[4.97, 1.3, -13.2]}  rotation= {[0, 2.9, 0]}/>
          <Umbrella visible={checkIfApiModeResult(isRaining, wearUmbrella)} position={[3.10, 1.25, -13.70]}  rotation= {[0, 2.2, 0]}/>
      </Suspense>


      <Html scaleFactor={13} position={[8.3, 3.25, -13.5]} rotation-z={100}>
      <GradientBtn label={`Switch to ${switchModeValue()} mode`} onClick={()=> setSwitchMode(switchModeValue())} />
      </Html>

      <Html style={{display: switchMode === "test" ? "initial" : "none"}} zIndexRange={[1,5]} scaleFactor={7} position={[7.5, 0.5, -15]} rotation-z={100}>
      <GradientBtn label={<span role="img" aria-label="storm"> Sun  ☀️</span>} onClick={() => setSun(!sun)} />
      <GradientBtn label={<span role="img" aria-label="storm"> Clouds  ☁️</span>} onClick={() => setCloud(!cloud)} />
      <GradientBtn label={<span role="img" aria-label="storm"> Snow  ❄️</span>} onClick={() => setSnow(!snow)} />
      <GradientBtn label={<span role="img" aria-label="storm"> Rain  ⛆</span>} onClick={() => setRain(!rain)} />
      <GradientBtn label={<span role="img" aria-label="storm"> Storm  !!⚡</span>} onClick={handleCLick} />
      </Html>

      <Html style={{display: switchMode === "test" ? "initial" : "none"}} scaleFactor={6} position={[4.25, -0.75, -13.5]} rotation-z={100}>
      <GradientBtn label={"Wear hat"} onClick={()=> setWearHat(!wearHat)} />
      <GradientBtn label={"Wear Sunglasses"} onClick={()=> setWearSunglasses(!wearSunglasses)} />
      <GradientBtn label={"Wear Mask"} onClick={()=> setWearMask(!wearMask)} />
      <GradientBtn label={"Wear Bottle"} onClick={()=> setWearBottle(!wearBottle)} />
      <GradientBtn label={"Wear Umbrella"} onClick={()=> setWearUmbrella(!wearUmbrella)} />
      </Html>

      <Html style={{display: switchMode === "api" ? "initial" : "none"}} scaleFactor={7} position={[7.5, 0.5, -15]} rotation-z={100}>
    <div>{city}</div>
    <GradientBtn disabled={city === "Paris"} label={"Paris"} onClick={()=> onCityClick("Paris")} />
    <GradientBtn disabled={city === "Lyon"} label={"Lyon"} onClick={()=> onCityClick("Lyon")} />
    <GradientBtn disabled={city === "Annecy"} label={"Annecy"} onClick={()=> onCityClick("Annecy")} />
      </Html>
      <Html scaleFactor={7} position={[1, -0.75, -15.5]} rotation-z={100}>
      {!openMenu && <GradientBtn label="See info" onClick={()=> setOpenMenu(true)} />}
      <TemporaryDrawer city={city} open={openMenu} data={data} onClose={() => setOpenMenu(false)} />
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
