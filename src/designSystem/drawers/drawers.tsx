import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Button, createStyles, Grid, makeStyles, Slider } from '@material-ui/core';
import useStyle from "../../component/changeDateStyle";
import {Bar} from 'react-chartjs-2';
import { meteoInterface } from '../../component/meteoHook';
import { wearablesInterface } from '../../component/wearablesHook';
import { switchModetype } from '../../views/model';
import GradientBtn from '../button/button';
import CloseIcon from '@material-ui/icons/Close';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {
  TemperatureChart,
  mockedTemperatureCharts,
  HumidityChart,
  mockedHumidityCharts,
  CloudChart,
  mockedCloudCharts,
  mockedMeteoData,
  convertTimeToDay,
} from './utils';
import useWindowDimensions from '../../component/useWindowDimensions';

interface DrawerInterface {
    open: boolean;
    switchMode: switchModetype;
    meteoVariables: meteoInterface;
    wearablesVariables: wearablesInterface;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    allData: forecastInterface[] | null;
    action: (value: unknown, type: string, action: string) => void;
    selectedDate: number;
    disableButton: boolean;
    onNextClick: () => void;
    onPreviousClick: () => void;
    maxDate: number;
    city: string;
}

export default function TemporaryDrawer({city, maxDate, onPreviousClick, onNextClick, selectedDate, disableButton, open, onClose, allData, switchMode, action, meteoVariables, wearablesVariables}: DrawerInterface) {
  const { width } = useWindowDimensions();
  const classes = useStyle();

  const switchViewWidth = width > 960;
  const switchMenuWidth = width > 1360;
  const addPaddingWidth = width < 1280;

  const switchMenuTestWidth = width > 400;

  const data = setData() || mockedMeteoData;
  const defaultSelectedButton = "Enlever";
  const defaultNotSelectedButton = "Porter";
  const temperatureChart = allData ? TemperatureChart(allData) : mockedTemperatureCharts;
  const humidityChart = allData ? HumidityChart(allData) : mockedHumidityCharts;
  const cloudChart = allData ? CloudChart(allData) : mockedCloudCharts;

  function widthTestSwitch(){
    if(switchMenuTestWidth)return "400px";
    return "100vw";
  }

  function widthApiSwitch(){
    if(switchMenuWidth)return `${width/2.5}px`;
    if(switchViewWidth)return "550px";
    if(switchMenuTestWidth)return "400px";

    return "100vw";
  }

  function setData(){
    return allData ? allData[selectedDate] : null;
  }

  const styles = makeStyles(() => createStyles({
    root: {
      position: "relative",
      overflow: "hidden",
      "& .MuiButton-root": {
        fontSize: "2rem",
      },
      "& .MuiBackdrop-root": {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      "& .iconButton": {
        height: "40px",
        minWidth: "45px",
        maxWidth: "45px",
        // background: "white",
        borderRadius: "5px",
      }
    },
  }))();


  function compareTemperature(value: number){
    const dataToCompare = allData ? +allData[1].Temperature.value : 1;
    const evolution = value-dataToCompare;
    const isPositive = evolution > 0;
    return <span style={{color: isPositive ? "green" : "red"}}>{`${isPositive ? "+" : "-"} ${Math.floor(Math.abs(evolution))} °C`}</span>;
  }

  function compareHumidity(value: number){
    const dataToCompare = allData && allData[selectedDate-1] ? +allData[selectedDate-1].humidity : 1;
    const evolution = value-dataToCompare;
    const isPositive = evolution > 0;
    return <span style={{color: isPositive ? "green" : "red"}}>{`${isPositive ? "+" : "-"} ${Math.floor(Math.abs(evolution))} %`}</span>;
  }

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

  function changeHat(){

  const hatNumber = getRandomIntInclusive(1,2);

  switch (hatNumber) {
    case 1:
      
      break;
  
    default:
      break;
  }
  }

function renderOnApiMode(){
  return  (<Grid style={{height: "100%", width: widthApiSwitch(), background: "#f9e4b7", padding: "10px 30px 0 30px", overflow: "auto"}} container item sm={12} justify="center">


  <Grid container item sm={12} justify="space-between" alignItems="flex-start" style={{height: "100%"}}>
  <Grid container item sm={12} justify="center">

  <div onClick={onPreviousClick}>
      <NavigateBeforeIcon className={classes.chevron} style={{color: selectedDate !== 1 ? "black" : "grey"}} fontSize="large" />
   </div>
    <div onClick={onNextClick}>
      <NavigateNextIcon className={classes.chevron} style={{color: selectedDate !== maxDate ? "black" : "grey"}} fontSize="large" />
    </div>
  <Grid container item sm={12} justify="center">
  <div><h4>Temps du {convertTimeToDay(data.dateObj as Date)} à {city} :</h4></div>
  </Grid>
  <Grid container item xs={12} md={4} alignItems="center" justify="flex-start">
    <Grid container item xs={4} md={6} justify="center">
      <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} width="60px" height="60px" alt="meteo" />
    </Grid>
    <Grid container item xs={4} md={6} justify="flex-start">
    <h4>{data.weather}</h4>
    </Grid>
  </Grid>

  <Grid container item xs={12} md={4} alignItems="center" justify="flex-start" style={{paddingTop: addPaddingWidth ? "6px" : 0}}>
  <Grid container item xs={4} justify="center">
    <span style={{fontSize: "2.4rem"}} role="img" aria-label="Temperature">🌡️</span>
    </Grid>
    <Grid container item xs={4} justify="flex-start">
    <h4>{`${Math.floor(+data.Temperature.value)} °C`}</h4>
      
    </Grid>
    <Grid container item xs={4} justify="flex-start">
      {selectedDate !== 1 && compareTemperature(+data.Temperature.value)}
    </Grid>
  </Grid>
  <Grid container item xs={12} md={4} alignItems="center" justify="flex-start" style={{paddingTop: addPaddingWidth ? "6px" : 0}}>
  <Grid container item xs={4} justify="center">
    <span style={{fontSize: "2.4rem"}} role="img" aria-label="Humidity">💧</span>
    </Grid>
    <Grid container item xs={4} justify="flex-start">
      <h4>{Math.floor(+data.humidity)} %</h4>
    </Grid>
    <Grid container item xs={4} justify="flex-start">
      {selectedDate !== 1 && compareHumidity(+data.humidity)}
    </Grid>
  </Grid>
    </Grid>
  
    
  <Grid container item sm={12} justify="center" alignItems="flex-end"  style={{paddingTop: "10px"}}>
      <Bar
      data={temperatureChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={12} justify="center">
      <Bar
      data={cloudChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={12} justify="center" style={{paddingBottom: "12px"}}>
      <Bar
      data={humidityChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
  </Grid>
  
</Grid>);
}


function renderOnTestMode(){
  return  (<Grid style={{height: "100%", width: widthTestSwitch(), background: "#f9e4b7", overflow: "auto", padding: "10px 15px"}} container item sm={12}  justify="center" alignItems="flex-start">
  
  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>
  
  <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 15px 5px 15px", background:"white", borderRadius: "12px"}}>
      <Grid container item xs={6} md={6} justify="center">
      <Button style={{background: meteoVariables.sun ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => action(!meteoVariables.sun, "updateMeteoVariables", "sun")}>
      {<span role="img" aria-label="Sun">☀️</span>}
      </Button>
      </Grid>
    
      <Grid container item xs={6} md={6} justify="center">
      <Button style={{background: meteoVariables.storm ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => action(undefined, "stormClick", "storm")}>
      {<span role="img" aria-label="storm">⚡</span>}
      </Button>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{marginTop: "10px", padding: "10px 15px 5px 15px", background:"white", borderRadius: "12px"}}>
      <Grid container item xs={12} md={6} justify={ switchViewWidth ? "flex-start" : "center"}>
      <Button style={{background: meteoVariables.cloud ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => action(!meteoVariables.cloud, "updateMeteoVariables", "cloud")}>
      {<span role="img" aria-label="Clouds">☁️</span>}
      </Button>
      </Grid>    

      <Grid container item xs={12} md={6} justify="center">
        <Grid container item sm={12} justify="center">
        <Slider
        disabled={disableButton || !meteoVariables.cloud}
        value={meteoVariables.cloudCover}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "cloudCover") }}
        min={1}
        max={10}
      />
        </Grid>
        <Grid container item sm={12} justify="center">
        <Slider
        disabled={disableButton || !meteoVariables.cloud}
        value={meteoVariables.windSpeed}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "windSpeed")}}
        min={1}
        max={20}
      />
        </Grid>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{marginTop: "10px", padding: "10px 15px 5px 15px", background:"white", borderRadius: "12px"}}>
      <Grid container item xs={12} md={6} justify={ switchViewWidth ? "flex-start" : "center"}>
      <Button style={{background: meteoVariables.snow ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => {action(!meteoVariables.snow, "updateMeteoVariables", "snow")}}>
      {<span role="img" aria-label="Snow">❄️</span>}
      </Button>
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <Slider
        disabled={disableButton || !meteoVariables.snow}
        value={meteoVariables.snowPrecipitation}
        step={2500}
        onChange={(_e, value) => { action(value, "updateMeteoVariables", "snowPrecipitation");}}
        min={0}
        max={40000}
      />
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{marginTop: "10px", padding: "10px 15px 5px 15px", background:"white", borderRadius: "12px"}}>
      <Grid container item xs={12} md={6} justify={ switchViewWidth ? "flex-start" : "center"}>
      <Button style={{background: meteoVariables.rain ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => action(!meteoVariables.rain, "updateMeteoVariables", "rain")}>
      {<span role="img" aria-label="Rain">⛆</span>}
      </Button>
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <Slider
        disabled={disableButton || !meteoVariables.rain}
        value={meteoVariables.rainPrecipitation}
        step={5000}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "rainPrecipitation");}}
        min={0}
        max={80000}
      />
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{marginTop: "10px", padding: "10px 15px 5px 15px", background:"white", borderRadius: "12px"}}>
      <Grid container item xs={12} md={6} justify={ switchViewWidth ? "flex-start" : "center"}>
      <Button style={{background: meteoVariables.mist ? "#e8e8e8" : "none"}} disabled={disableButton} className="iconButton" color="primary" onClick={() => action(!meteoVariables.mist, "updateMeteoVariables", "mist")}>
      {<span role="img" aria-label="Mist">🌫️</span>}
      </Button>
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <Slider
        disabled={disableButton || !meteoVariables.mist}
        value={meteoVariables.mistOpacity}
        step={5000}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "mistOpacity");}}
        min={0}
        max={80000}
      />
      </Grid>
      </Grid>


    </Grid>
  </Grid>

  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Porter un chapeau
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearHat ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearHat, "updateWearablesVariables", "wearHat")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Mettre un sac sur la tête
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearBag ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearBag, "updateWearablesVariables", "wearBag")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Mettre des lunettes
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearSunglasses ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearSunglasses, "updateWearablesVariables", "wearSunglasses")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Mettre un masque
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearMask ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearMask, "updateWearablesVariables", "wearMask")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Prendre une bouteille
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearBottle ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearBottle, "updateWearablesVariables", "wearBottle")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Prendre un parapluie
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearUmbrella ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearUmbrella, "updateWearablesVariables", "wearUmbrella")} />
      </Grid>
    </Grid>

{
/*
    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item xs={12} md={6} alignItems="center" justify={ switchViewWidth ? "flex-start" : "center"} style={{padding: switchViewWidth ? "0 0" : "10px 0"}}>
      Mettre des chaussures
      </Grid>
      <Grid container item xs={12} md={6} justify="center">
      <GradientBtn disabled={disableButton} label={wearablesVariables.wearShoes ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearShoes, "updateWearablesVariables", "wearShoes")} />
      </Grid>
    </Grid>
*/
}




      </Grid>
      <Grid container item sm={12} direction="column" justify="center" style={{paddingTop: "24px"}}>
      <GradientBtn disabled={disableButton} label={<span role="img" aria-label="scene"> Changer le fond</span>} onClick={() => action(undefined, "changeScene", "scene")} />
      </Grid>
     
</Grid>);
}


  return (
          <Drawer anchor="left" open={open} onClose={onClose} classes={styles}>
            <Grid container item sm={12} justify="center" alignItems="center" style={{maxHeight: "80px", padding: "15px 0", backgroundColor: "#f9e4b7", position: "relative"}}>
            {
              !switchViewWidth && <CloseIcon fontSize="large" style={{position: "absolute", top: "15px", left: "15px"}} onClick={()=> action(false, "openMenu", "openMenu")}/>
            }
            <GradientBtn disabled={disableButton} label={`Changer en mode ${switchMode === "api" ? "Jeu" : "Info"}`} onClick={()=> action(undefined, "setSwitchMode", "switch")} />
            </Grid>

              {
                switchMode === "api"
              ?
              renderOnApiMode()
              :
              renderOnTestMode()
              }
          </Drawer>
  );
}
