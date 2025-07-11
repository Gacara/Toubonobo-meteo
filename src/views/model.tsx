/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import Monkey from '../component/monkey';
import Sun from "../component/sun";
import Storm from '../component/storm';
import Clouds from '../component/clouds';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import Rain from '../component/rain';
import Snow from '../component/snow';
import { forecastInterface } from "../interfaces/utils";
import TemporaryDrawer from '../designSystem/drawers/drawers';
import IntervalCamera from "../component/interval";
import WaitingScene from '../component/waitingScene';
import DayCamp from '../component/dayCamp';
import MeteoHook, { meteoInterface, meteoVariablesType } from "../component/meteoHook";
import WearablesHook, { wearablesInterface } from '../component/wearablesHook';
import { PerspectiveCamera } from 'three';
import HelpIcon from '@mui/icons-material/Help';
import MovieIcon from '@mui/icons-material/Movie';
import ExploreIcon from '@mui/icons-material/Explore';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FranceMap from '../component/france';
import { Modal, CircularProgress } from '@mui/material';
import { convertTimeToDay } from '../designSystem/drawers/utils';
import ChangeDate from '../component/changeDate';
import Mist from '../component/mist';
import useWindowDimensions from '../component/useWindowDimensions';
import MonkeyBis from '../component/monkeyBis';


interface modelInterface{
  data: forecastInterface[] | null;
  onCityClick: (city: string) => void;
  mode?: switchModetype;
  city: string;
}

interface cameraOptionsInferface{
  position: number[];
  rotation: number[];
  fov: number;
}

export type switchModetype = "api" | "test";
const defaultCameraRotation = [0,-16.1,0];
const defaultCameraPosition = [7,1.2,-21];
//const defaultCameraPosition = [7-(400/125),1.2,-17];

const defaultFov = 50;
const rotationValue = 400;
const huntValue = 200;

const LowPoly = lazy(() => import('../component/lowPolyBackground'));
const NightCamp = lazy(() => import('../component/nightCamp'));
const Forest = lazy(() => import('../component/forest'));
const Flamingo = lazy(() => import('../component/Flamingo'));
const Parrot = lazy(() => import('../component/Parrot'));
const Stork = lazy(() => import('../component/Stork'));
const Hat = lazy(() => import('../component/clothes/hats/Hat'));
const Mask = lazy(() => import('../component/clothes/masks/Mask'));
const WaterBottle = lazy(() => import('../component/accessories/WaterBottle'));
const Umbrella = lazy(() => import('../component/accessories/umbrella'));
const Sunglasses = lazy(() => import('../component/clothes/sunglasses/Sunglasses'));
// onst CatShoe = lazy(() => import('../component/outfits/CatShoe'));
const Bag = lazy(() => import('../component/outfits/Bag'));


function ModelViewer({data: allData, onCityClick, mode, city}: modelInterface): React.ReactElement{
  const { height, width } = useWindowDimensions();
  const smallScreen = width <= 850;

  const [selectedDate, setSelectedDate] = useState<number>(1);
  const data = setData();
  const [switchMode, setSwitchMode] = useState<switchModetype>(mode || "api");
  const [cameraOptions, setCameraOptions] = useState<cameraOptionsInferface>({
    position: defaultCameraPosition,
    rotation: defaultCameraRotation,
    fov: defaultFov,
  });

  const {
    meteoVariables,
    updateMeteoVariables,
  } = MeteoHook({data, mode: switchMode});

  const {
    wearablesVariables,
    updateWearablesVariables,
  } = WearablesHook({data, mode: switchMode});
  const [sceneNumber, setSceneNumber] = useState<number>(1);
  const [cameraTrigger, setCameraTrigger] = useState<boolean>(false);
  const [wearableTrigger, setWearableTrigger] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [birdCounter, setBirdCounter] = useState<number>(0);
  const [huntMode, setHuntMode] = useState<boolean>(false);
  const [huntTrigger, setHuntTrigger] = useState<boolean>(false);

  const dateWidth = screen.availWidth > screen.availHeight ? screen.availWidth/4 : screen.availWidth*0.90;
  const realHeight = height > screen.availHeight ? screen.availHeight : height;
  const dateResponsive = realHeight < 800;
  const dateTopPosition = dateResponsive ? "5px" : "25px";

  function setData(){
    return allData ? allData[selectedDate] : null;
  }

  function nextDate(){
    if(allData && selectedDate === allData.length - 1){
      return;
    }
    setSelectedDate(selectedDate + 1);
  }

  function previousDate(){
    if(selectedDate === 1){
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
    if (type === "openMenu"){
      setOpenMenu(value as boolean);
    }
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

  function cameraTriggerEvent(){
    return wearableTrigger || cameraTrigger || huntTrigger;
  }

  function maxValue(){
    if(cameraTrigger) return rotationValue*2;
    if(wearableTrigger) return defaultFov-35;
    if(huntTrigger) return huntValue;
    return 10;
  }

  function CameraSwitch(coef: number){
    if (cameraTrigger){
      if(coef-1 < rotationValue ){
        setCameraOptions(
          {
            ...cameraOptions,
            rotation: [defaultCameraRotation[0]+coef/10000, defaultCameraRotation[1]+coef/1000, defaultCameraRotation[2]],
            position: [defaultCameraPosition[0]-coef/125, defaultCameraPosition[1], defaultCameraPosition[2]+coef/100],
          }
        );
      }else {
        setCameraOptions(
          {
            ...cameraOptions,
            rotation: [defaultCameraRotation[0]+rotationValue/10000-(coef-rotationValue)/10000, defaultCameraRotation[1]+rotationValue/1000-(coef-rotationValue)/1000, defaultCameraRotation[2]],
            position: [defaultCameraPosition[0]-rotationValue/125+(coef-rotationValue)/125, defaultCameraPosition[1], defaultCameraPosition[2]+rotationValue/100-(coef-rotationValue)/100],
          }
        );
      }
    }
    if (wearableTrigger){
      if(cameraOptions.fov > 35){
        setCameraOptions(
          {
            ...cameraOptions,
            fov: cameraOptions.fov-coef,
          }
        );
      } else {
        setCameraOptions(
          {
            ...cameraOptions,
            fov: cameraOptions.fov+coef,
          }
        );
      }
    }
    if (huntTrigger){
      if(!huntMode){
        setCameraOptions(
          {
            ...cameraOptions,
            rotation: [defaultCameraRotation[0]+coef/2500, defaultCameraRotation[1], defaultCameraRotation[2]],
            position: [defaultCameraPosition[0], defaultCameraPosition[1]+coef/50, defaultCameraPosition[2]+coef/125],
          }
        );
      } else {
        setCameraOptions(
          {
            ...cameraOptions,
            rotation: [defaultCameraRotation[0]+huntValue/2500-coef/2500, defaultCameraRotation[1], defaultCameraRotation[2]],
            position: [defaultCameraPosition[0], defaultCameraPosition[1]+huntValue/50-coef/50, defaultCameraPosition[2]+huntValue/125-coef/125],
          }
        );
      }
    }
  }

  function CameraReset(){
    if (cameraTrigger){
      setCameraTrigger(false);
    }
    if (wearableTrigger){
      setWearableTrigger(false);
    }
    if (huntTrigger){
      setHuntTrigger(false);
      setHuntMode(!huntMode);
    }
  }

  function birdy(){
    if(birdCounter >= 30 && birdCounter < 50){
      return <span>Bravo, duck hunt n'a qu'à bien se tenir</span>
    }
    if(birdCounter >= 50 && birdCounter < 75){
      return <span>Attention, ça va de plus en plus vite !</span>
    }
    if(birdCounter >= 75 && birdCounter < 100){
      return <span>Ça fait beaucoup là non ??</span>
    }
    if(birdCounter >= 100){
      return <a target="_blank" href="https://www.instagram.com/rom.goulet/?hl=fr" rel="noreferrer">Félicitations, tu gagnes mon insta </a>
    }
    return <></>
  }
  function zoomOnActions(value: unknown, type: string, action: string){
    if(type === "updateWearablesVariables"){
        if(cameraOptions.fov >= 35){
            setWearableTrigger(true);
          }
  }else if(cameraOptions.fov <= 35) {
    setWearableTrigger(true);
  }
    onAction(value, type, action);
  }


  function CustomCamera(props: any) {
    const cameraRef = useRef<PerspectiveCamera>(null)
    const set = useThree(({ set }) => set)
    const size = useThree(({ size }) => size)
    


      useLayoutEffect(() => {
        if (cameraRef.current) {
          cameraRef.current!.aspect! = size.width / size.height;
    
          cameraRef.current.rotation.x = cameraOptions.rotation[0];
          cameraRef.current.rotation.y = cameraOptions.rotation[1];
          cameraRef.current.rotation.z = cameraOptions.rotation[2];

          cameraRef.current.position.x = cameraOptions.position[0];
          cameraRef.current.position.y = cameraOptions.position[1];
          cameraRef.current.position.z = cameraOptions.position[2];
          cameraRef.current.fov = cameraOptions.fov;
          cameraRef.current.updateProjectionMatrix()
         }
      }, [size.height, size.width])

      useLayoutEffect(() => {
        set({ camera: cameraRef.current as unknown as PerspectiveCamera })
      }, [set])
    
    
    return <perspectiveCamera ref={cameraRef} />
}


function renderLoadingScreen(){
  return (
    <div style={{ width: "100%", height: "100%", zIndex: 9999999999999999999, top: 0, left: 0, paddingTop: `${height/2.75}px`, color: "black", background: "#f9e4b7", position: "fixed", display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
    <div style={{ height: "150px", width: "1000px" }}>
      <CircularProgress size="3rem" />
      <div style={{paddingTop: "30px"}}>
        <WaitingScene />
      </div>
    </div>
</div>
  );
}

  return (
    <div style={{ height:"100vh", width:"100vw", position: "relative" }}>
      {
        pageLoaded ? 
        <>
        <div style={{pointerEvents: "none",width: "100%", color: "black", position: "fixed", top: dateTopPosition, left: 0, zIndex: 999, display: "flex", justifyContent:"center"}}>
          <div style={{width: dateWidth, color: "black"}}>
            <ChangeDate
              disabled={openMenu || openModal || huntMode || huntTrigger || cameraTrigger || switchMode === "test"}
              dateNumber={selectedDate}
              city={city}
              onPreviousClick={previousDate}
              onNextClick={nextDate}
              label={data && convertTimeToDay(data.dateObj)}
              maxDate={allData ? allData.length - 1 : 1}
              />
          </div>
    </div>
    <div 
    style={
      (smallScreen) ? 
      {
        position: "fixed", bottom:"25px", right:"30px", zIndex: 99999999999, display: (smallScreen && openMenu) ? "none" : "flex", flexDirection: "column",
      }
      :
      {
        position: "fixed", top:"25px", right:"50px", zIndex: 99999999999, display: openMenu ? "none" : "flex", flexDirection: "column",
      }
    }
    >
        {!cameraTrigger
        && !huntTrigger
        && !huntMode
        && <ExploreIcon style= {{ marginTop: "10px", color: "black", borderRadius: "50%", padding: smallScreen ? "5px" : "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setOpenModal(!openModal)}/>}
        {!openMenu
        &&!cameraTrigger
        && !huntTrigger
        && !huntMode
        && !openModal
        && <HelpIcon style= {{ marginTop: "10px", color: "black", borderRadius: "50%", padding: smallScreen ? "5px" : "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setOpenMenu(true)} />}
        {!openMenu
        &&!cameraTrigger
        && !huntTrigger
        && !openModal
        && !huntMode
        && <MovieIcon style= {{ marginTop: "10px", color: "black", borderRadius: "50%", padding: smallScreen ? "5px" : "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setCameraTrigger(true)} />}
        {!openMenu
        &&!cameraTrigger
        && !openModal
        && !huntTrigger
        && <SportsEsportsIcon style= {{ marginTop: "10px", color: "black", borderRadius: "50%", padding: smallScreen ? "5px" : "10px", cursor: "pointer", backgroundColor: "white"}} fontSize="large" onClick={()=> setHuntTrigger(true)} />}
    </div>
        </>
        :
        renderLoadingScreen()
      }

    <TemporaryDrawer
      disableButton={wearableTrigger}
      switchMode={switchMode}
      meteoVariables={meteoVariables}
      wearablesVariables={wearablesVariables}
      open={openMenu}
      onPreviousClick={previousDate}
      onNextClick={nextDate}
      selectedDate={selectedDate}
      allData={allData}
      onClose={() => {setOpenMenu(false); if(cameraOptions.fov <= 35){setWearableTrigger(true)}}}
      action={zoomOnActions}
      maxDate={allData ? allData.length - 1 : 1}
      city={city}
      sceneNumber={sceneNumber}
      />
    <Canvas>
      {
        (meteoVariables.rain && meteoVariables.rainPrecipitation >= 35000) && 
        <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.2} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer>
      }
     {
        !huntTrigger &&
        huntMode && 
        <EffectComposer>
        <Vignette eskil={false} offset={0.8} darkness={1.1} />
      </EffectComposer>
      }
    
    <CustomCamera />

    <pointLight intensity={meteoVariables.storm ? 0 : 15} position={[10, 40, -10]} scale={[2,2,2]} />
    {
    // <OrbitControls />
    }
    <Storm trigger={meteoVariables.storm} />
      <Suspense fallback={null}>
          <DayCamp callback={()=> setPageLoaded(true)} visible={sceneNumber === 1} position={[8, 7.25, -3.40]} rotation={[0.042, 3.4, 0]} />
          
          {          
    //<Monkey visible={!huntMode || (huntTrigger && huntMode)} position={[4, -0.03, -13.5]} rotation= {[0, 2.8, 0]}/>
}  
{          
    //<MonkeyBis visible={!huntMode || (huntTrigger && huntMode)} position={[4.018, 1.03, -12.88]} rotation= {[-0.1, Math.PI/0.965, 0]}/>
    <MonkeyBis visible={!huntMode || (huntTrigger && huntMode)} position={[4.1, 1.09, -12.2]} rotation= {[-0.1, Math.PI/0.965, 0]}/>
}      
</Suspense>

      <Suspense fallback={null}>
          <LowPoly visible={sceneNumber === 4} position={[14, 3.95, -4.3]} scale={[0.005,0.005,0.005]} rotation={[0, 0.1, 0]} />
          <Forest visible={sceneNumber === 2} rotation={[0, 1.37, -0.001]} />
          <NightCamp visible={sceneNumber === 3} position={[3, -0.18, -12]} scale={[1.75,1.75,1.75]} rotation={[0, 3.40, 0]} />
      </Suspense>

      <Suspense fallback={null}>
        <Sun visible={meteoVariables.sun && !meteoVariables.storm} color={sceneNumber !== 3 ? "yellow" : "#DCD8AE"}/>
        <ambientLight visible={!meteoVariables.storm} intensity={meteoVariables.sun ? 2.5 : 1.8} />
        <directionalLight 
          visible={!meteoVariables.storm} 
          intensity={meteoVariables.sun ? 3.0 : 2.2} 
          position={[10, 10, 5]} 
          color={sceneNumber !== 3 ? "#ffffff" : "#DCD8AE"}
        />
        <hemisphereLight 
          visible={!meteoVariables.storm}
          color="#87CEEB" 
          groundColor="#654321" 
          intensity={meteoVariables.sun ? 1.5 : 1.0}
        />
        <Rain
        isVisible={meteoVariables.rain}
        rainCount={meteoVariables.rainPrecipitation}
        />
        <Mist
        isVisible={meteoVariables.mist}
        mistCount={meteoVariables.mistOpacity}
        />
        <Snow 
        isVisible={meteoVariables.snow}
        snowCount={meteoVariables.snowPrecipitation}
        />
        <Clouds isVisible={meteoVariables.cloud} velocity={meteoVariables.windSpeed} number={meteoVariables.cloudCover} />
        <Flamingo props={{scale:[0.3, 0.3, 0.3]}} birdSpeed={birdCounter} callback={() => setBirdCounter(birdCounter+2)} />
        <Parrot props={{scale:[0.3, 0.3, 0.3]}} birdSpeed={birdCounter} callback={() => setBirdCounter(birdCounter+5)} />
        <Stork props={{scale:[0.3, 0.3, 0.3]}} birdSpeed={birdCounter} callback={() => setBirdCounter(birdCounter+10)} />
      </Suspense>
      <Suspense fallback={null}>
      <Umbrella visible={wearablesVariables.wearUmbrella} position={[3.2, 1.22, -13.45]}  rotation= {[0, 1.6, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Mask visible={wearablesVariables.wearMask} position={[4.03, 1.47, -13.64]} rotation= {[0.17, 3.35, -0.05]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Hat visible={wearablesVariables.wearHat} position={[4.035, 1.96, -13.57]} rotation= {[3.12, 1.9, 3.19]}/>
          <Bag visible={wearablesVariables.wearBag} scale={[0.43,0.43,0.43]} position={[4.035, 1.70, -13.55]} rotation= {[0, 2.75, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <Sunglasses visible={wearablesVariables.wearSunglasses} position={[4.02, 1.8, -13.49]}  rotation= {[-0.12, 2.95, 0]}/>
      </Suspense>

      <Suspense fallback={null}>
          <WaterBottle visible={wearablesVariables.wearBottle} position={[4.68, 1.36, -13.15]}  rotation= {[0, 2.9, 0]}/>

          {
          //<CatShoe visible={wearablesVariables.wearShoes}scale={[0.48,0.48,0.48]} position={[3.8, -0.015, -13.65]} rotation= {[-0.1, 1.5, 0]}/>
          //<CatShoe visible={wearablesVariables.wearShoes} scale={[0.48,0.48,0.48]} position={[4.27, -0.015, -13.65]} rotation= {[-0.1, 1, 0]}/>
          }
      </Suspense>

    
      <Html style={{width: "400px", color: "black"}} position={[5.6, 4, -13.5]} rotation-z={100}>
      <IntervalCamera
      frequency={50}
      max={maxValue()}
      trigger={cameraTriggerEvent()}
      callback={CameraSwitch}
      reset={CameraReset}
      />
      </Html>

      <Html
      style={{display: (!huntTrigger && !cameraTrigger && birdCounter > 0) ? "block" : "none", color: "black", background: "white", width: "50px", borderRadius:"10px"}}
      position={huntMode ? [-28, -6, 0] : [-26, -10, 0]}
      rotation-z={100}
      >
        <span style={{userSelect: "none"}}>{birdCounter}</span>
      </Html>
      <Html 
      style={{userSelect: "none", display: (birdCounter >= 30 && huntMode) && !huntTrigger ? "flex" : "none", alignItems: "center", width: "250px", height: "50px", color: "black", background: "white", borderRadius:"10px", fontSize:"1rem", padding: "5px 15px"}}
      position={[-22, -8, 0]}
      rotation-z={100}
      >
        {
          birdy()
        }
      </Html>

      <Html position={[5.3, -0.1, -13.5]} rotation-z={100}>
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
        <div style={{width:"max-content", userSelect: "none", pointerEvents: "none"}}>
        {!openModal && !openMenu && "Toubonobo"}
        </div>
      </Html>
    </Canvas>
    </div>
  );
}

export default ModelViewer;

/*
      <Html
      style={{display: (!huntTrigger && !cameraTrigger && birdCounter > 0) ? "block" : "none", color: "black", background: "white", width: "50px", borderRadius:"10px"}}
      position={huntMode ? [-28, -6, 0] : [-26, -10, 0]}
      rotation-z={100}
      >
        <span style={{userSelect: "none"}}>{birdCounter}</span>
      </Html>
      <Html 
      style={{userSelect: "none", display: (birdCounter >= 30 && huntMode) && !huntTrigger ? "flex" : "none", alignItems: "center", width: "250px", height: "50px", color: "black", background: "white", borderRadius:"10px", fontSize:"1rem", padding: "5px 15px"}}
      position={[-22, -8, 0]}
      rotation-z={100}
      >
        {
          birdy()
        }
      </Html>
      */