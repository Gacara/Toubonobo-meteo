import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Button, createStyles, Grid, makeStyles, Slider } from '@material-ui/core';
import {Bar} from 'react-chartjs-2';
import { meteoInterface } from '../../component/meteoHook';
import { wearablesInterface } from '../../component/wearablesHook';
import { switchModetype } from '../../views/model';
import GradientBtn from '../button/button';
import {
  TemperatureChart,
  mockedTemperatureCharts,
  HumidityChart,
  mockedHumidityCharts,
  CloudChart,
  mockedCloudCharts,
  mockedMeteoData,
} from './utils';



interface DrawerInterface {
    open: boolean;
    switchMode: switchModetype;
    meteoVariables: meteoInterface;
    wearablesVariables: wearablesInterface;
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    allData: forecastInterface[] | null;
    city: string;
    action: (value: any, type: string, action: string) => void;
}

export default function TemporaryDrawer({open, onClose, allData, city, switchMode, action, meteoVariables, wearablesVariables}: DrawerInterface) {
  const data = allData ? allData[0] : mockedMeteoData;
  const defaultSelectedButton = "Hide";
  const defaultNotSelectedButton = "Show";
  const temperatureChart = allData ? TemperatureChart(allData) : mockedTemperatureCharts;
  const humidityChart = allData ? HumidityChart(allData) : mockedHumidityCharts;
  const cloudChart = allData ? CloudChart(allData) : mockedCloudCharts;

  const styles = makeStyles(() => createStyles({
    root: {
      position: "relative",
      overflow: "hidden",
      "& .MuiButton-root": {
        fontSize: "1.5rem",
      },
      "& .MuiBackdrop-root": {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      "& .iconButton": {
        height: "40px",
        minWidth: "45px",
        maxWidth: "45px",
        background: "white",
        borderRadius: "5px",
      }
    },
  }))();

function renderOnApiMode(){
  return  (<Grid style={{height: "100%", width: "800px", background: "#FFC371", padding: "25px 30px 0 30px"}} container item sm={12} justify="center">

  <Grid container item sm={12} justify="center" alignItems="center" style={{height: "15%"}}>


  <Grid container item sm={4} alignItems="center" justify="center">
    <Grid container item sm={6} justify="center">
    <span style={{fontSize: "2rem"}} role="img" aria-label="Sun">☀️</span>
    </Grid>
    <Grid container item sm={6} justify="flex-start">
      {data.weather}
    </Grid>
  </Grid>

  <Grid container item sm={4} alignItems="center" justify="center">
  <Grid container item sm={6} justify="center">
    <span style={{fontSize: "2rem"}} role="img" aria-label="Temperature">🌡️</span>
    </Grid>
    <Grid container item sm={6} justify="flex-start">
      {data.Temperature.value} °C
    </Grid>
  </Grid>
  <Grid container item sm={4} alignItems="center" justify="center">
  <Grid container item sm={6} justify="center">
    <span style={{fontSize: "2rem"}} role="img" aria-label="Humidity">💧</span>
    </Grid>
    <Grid container item sm={6} justify="flex-start">
      {data.humidity} %
    </Grid>
  </Grid>
  </Grid>

  <Grid container item sm={12} justify="space-between" alignItems="flex-start" style={{height: "85%"}}>
  <Grid container item sm={6} justify="center">
  <div>{city}</div>
  <Grid container item sm={12} justify="center" style={{padding: "10px 0"}}>
  <GradientBtn disabled={city === "Paris"} label={"Paris"} onClick={()=> action("Paris", "onCityClick", "Paris")} />
      </Grid>
      <Grid container item sm={12} justify="center" style={{padding: "10px 0"}}>
      <GradientBtn disabled={city === "Lyon"} label={"Lyon"} onClick={()=> action("Lyon", "onCityClick", "Lyon")} />
      </Grid>
      <Grid container item sm={12} justify="center" style={{padding: "10px 0"}}>
      <GradientBtn disabled={city === "Annecy"} label={"Annecy"} onClick={()=> action("Annecy", "onCityClick", "Annecy")} />
      </Grid>
    </Grid>
  

  <Grid container item sm={6} justify="center">
      <Bar
      data={temperatureChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={6} justify="center">
      <Bar
      data={cloudChart}
      width={400}
      height={200}
      options={{
      maintainAspectRatio: false
      }}
      />
      </Grid>
      <Grid container item sm={6} justify="center">
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
  return  (<Grid style={{height: "100%", width: "500px", background: "#FFC371", overflow: "hidden", padding: "10px 30px"}} container item sm={12}  justify="center" alignItems="flex-start">
  
  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>
  
  <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "40px 0 10px 0"}}>
      <Grid container item sm={6} justify="center">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.sun, "updateMeteoVariables", "sun")}>
      {<span role="img" aria-label="Sun">☀️</span>}
      </Button>
      </Grid>
    
      <Grid container item sm={6} justify="center">
      <Button className="iconButton" color="primary" onClick={() => action(undefined, "stormClick", "storm")}>
      {<span role="img" aria-label="storm">⚡</span>}
      </Button>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.cloud, "updateMeteoVariables", "cloud")}>
      {<span role="img" aria-label="Clouds">☁️</span>}
      </Button>
      </Grid>    

      <Grid container item sm={6} justify="center">
        <Grid container item sm={12} justify="center">
        <Slider
        value={meteoVariables.cloudCover}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "cloudCover") }}
        min={1}
        max={10}
      />
        </Grid>
        <Grid container item sm={12} justify="center">
        <Slider
        value={meteoVariables.cloudIntensity}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "cloudIntensity")}}
        min={1}
        max={15}
      />
        </Grid>
        <Grid container item sm={12} justify="center">
        <Slider
        value={meteoVariables.windSpeed}
        step={1}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "windSpeed")}}
        min={1}
        max={20}
      />
        </Grid>
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => {action(!meteoVariables.snow, "updateMeteoVariables", "snow")}}>
      {<span role="img" aria-label="Snow">❄️</span>}
      </Button>
      </Grid>
      <Grid container item sm={6} justify="center">
      <Slider
        value={meteoVariables.snowPrecipitation}
        step={2500}
        onChange={(_e, value) => { action(value, "updateMeteoVariables", "snowPrecipitation");}}
        min={0}
        max={40000}
      />
      </Grid>
      </Grid>

      <Grid container item sm={12} justify="space-between" alignItems="center" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button className="iconButton" color="primary" onClick={() => action(!meteoVariables.rain, "updateMeteoVariables", "rain")}>
      {<span role="img" aria-label="Rain">⛆</span>}
      </Button>
      </Grid>
      <Grid container item sm={6} justify="center">
      <Slider
        value={meteoVariables.rainPrecipitation}
        step={5000}
        onChange={(_e, value) => {action(value, "updateMeteoVariables", "rainPrecipitation");}}
        min={0}
        max={80000}
      />
      </Grid>
      </Grid>


    </Grid>
    
  </Grid>


  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      Wear Hat
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearHat ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearHat, "updateWearablesVariables", "wearHat")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      Wear Sunglasses
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearSunglasses ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearSunglasses, "updateWearablesVariables", "wearSunglasses")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      Wear Mask
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearMask ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearMask, "updateWearablesVariables", "wearMask")} />      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      Wear Bottle
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearBottle ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearBottle, "updateWearablesVariables", "wearBottle")} />
      </Grid>
    </Grid>

    <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      Wear Umbrella
      </Grid>
      <Grid container item sm={6} justify="center">
      <GradientBtn label={wearablesVariables.wearUmbrella ? defaultSelectedButton : defaultNotSelectedButton} onClick={()=> action(!wearablesVariables.wearUmbrella, "updateWearablesVariables", "wearUmbrella")} />
      </Grid>
    </Grid>


      </Grid>
      <Grid container item sm={12}  direction="column" justify="center" style={{minHeight: "33%"}}>
      <GradientBtn label={<span role="img" aria-label="scene"> Change scene</span>} onClick={() => action(undefined, "changeScene", "scene")} />
      </Grid>
     
</Grid>);
}


  return (
          <Drawer anchor="left" open={open} onClose={onClose} classes={styles}>
            <div style={{overflow: "hidden", position: "absolute", top: "5px", right: "0"}}>
            <GradientBtn label={`Switch to ${switchMode === "api" ? "test" : "api"} mode`} onClick={()=> action(undefined, "setSwitchMode", "switch")} />

            </div>

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
