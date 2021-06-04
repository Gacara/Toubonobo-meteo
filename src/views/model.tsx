import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei'
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
import { PerspectiveCamera } from 'three';
import HelpIcon from '@material-ui/icons/Help';
import ExploreIcon from '@material-ui/icons/Explore';
import FranceMap from '../component/france';
import { Modal } from '@material-ui/core';
import { convertTimeToDay } from '../designSystem/drawers/utils';
import ChangeDate from '../component/changeDate';


interface modelInterface{
  data: forecastInterface[] | null;
  onCityClick: (city: string) => void;
  mode?: switchModetype;
  city: string;
}

export type switchModetype = "api" | "test";


function ModelViewer({data: allData, onCityClick, mode, city}: modelInterface): React.ReactElement{
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const data = setData();
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

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function setData(){
    return allData ? allData[selectedDate] : null;
  }

  function nextDate(){
    if(selectedDate === 6){
      return;
    }
    if(selectedDate === 1){
      setSelectedDate(5);
      return;
    }
    setSelectedDate(selectedDate + 1);
  }

  function previousDate(){
    if(selectedDate === 0){
      return;
    }
    if(selectedDate === 5){
      setSelectedDate(1);
      return;
    }
    setSelectedDate(selectedDate - 1);
  }

  
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
          cameraRef.current.rotation.y = -16.1;
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
    <Html position={[1, 4, -15.5]} rotation-z={100}>
      <ExploreIcon style= {{ color: "black", borderRadius: "50%", padding: "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setOpenModal(!openModal)}/>
      {!openMenu && !openModal && <HelpIcon style= {{ color: "black", borderRadius: "50%", padding: "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setOpenMenu(true)} />}
      <TemporaryDrawer
      switchMode={switchMode}
      meteoVariables={meteoVariables}
      wearablesVariables={wearablesVariables}
      open={openMenu}
      selectedDate={selectedDate}
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
      <Suspense fallback={<Html></Html>}>
          <LowPoly visible={sceneNumber === 1} position={[14, 3.95, -4.3]} scale={[0.005,0.005,0.005]} rotation= {[0, 0.1, 0]} />
          <Forest visible={sceneNumber === 2} rotation= {[0, 1.37, -0.001]} />
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
      <Suspense fallback={<Html></Html>}>
         <Monkey position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Hat visible={wearablesVariables.wearHat} position={[4.05, 2, -13.6]} rotation= {[0, 1, 0]}/>
          <Mask visible={wearablesVariables.wearMask} position={[4.01, 1.458, -13.57]}  rotation= {[0, 3.4, 0]}/>
          <Sunglasses visible={wearablesVariables.wearSunglasses} position={[4.02, 1.8, -13.54]}  rotation= {[0, 2.8, 0]}/>
          <WaterBottle visible={wearablesVariables.wearBottle} position={[4.97, 1.3, -13.2]}  rotation= {[0, 2.9, 0]}/>
          <Umbrella visible={wearablesVariables.wearUmbrella} position={[3.10, 1.25, -13.70]}  rotation= {[0, 2.2, 0]}/>
      </Suspense>
    
      <Html style={{width: "400px", color: "black"}} position={[5.6, 4, -13.5]} rotation-z={100}>
        <ChangeDate disabled={openModal} dateNumber={selectedDate} city={city} onPreviousClick={previousDate} onNextClick={nextDate} label={data && convertTimeToDay(data.dateObj)} />
      </Html>

      <Html position={[4.5, -0.2, -13.5]} rotation-z={100}>
        <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{display: "flex", alignItems: "center", justifyContent:"center", width:"100%", height:"100%"}}>
          <FranceMap selectedCity={city} onRegionClick={(city) => {onCityClick(city); setOpenModal(false);}} /> 
        </div>
      </Modal>
        <div style={{width:"max-content"}}>
        {!openModal && "Toubonobo"}
        </div>
      </Html>
    </Canvas>
    </div>
  );
}

export default ModelViewer;
