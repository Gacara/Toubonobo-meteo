import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { forecastInterface } from '../../interfaces/utils';
import { Button, createStyles, Grid, makeStyles } from '@material-ui/core';
import {Bar} from 'react-chartjs-2';
import { meteoInterface } from '../../component/meteoHook';
import { wearablesInterface } from '../../component/wearablesHook';
import { switchModetype } from '../../views/model';
import { TemperatureChart, mockedCharts } from './utils';
import GradientBtn from '../button/button';


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
  const data = allData ? allData[0] : null;
  const defaultSelectedButton = "Hide";
  const defaultNotSelectedButton = "Show";

  const temperatureChart = allData ? TemperatureChart(allData) : mockedCharts;

  const styles = makeStyles(() => createStyles({
    root: {
      "& .MuiButton-root":{
        fontSize: "1.5rem",
      },
      "& .MuiBackdrop-root":{
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }
    },
  }))();
/*
<Slider
  defaultValue={20}
  getAriaValueText={valuetext}
  aria-labelledby="discrete-slider-custom"
  step={10}
  valueLabelDisplay="auto"
  marks={marks}
/>
*/

function renderOnApiMode(){
  return  (<Grid style={{width: "800px", background: "#FFC371"}} container item sm={12} justify="center" alignItems="center">
  <Grid container item sm={6} justify="center">
  <iframe title="city" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDERFj1udznFe_t0Dw_jQFgsxHG7EGmg2E&q=${city}+France`} sandbox=''/>
  </Grid>
  <Grid container item sm={6} justify="center">
      {//`${data?.Temperature.value}°C`
      }
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
      {`${data?.Wind.speed}km/h`}
      </Grid>
      <Grid container item sm={6} justify="center">
     {`${data?.humidity}%`}
      </Grid>
</Grid>);
}

function renderOnTestMode(){
  return  (<Grid style={{height: "100%", width: "500px", background: "#FFC371", overflow: "hidden", padding: "10px 30px"}} container item sm={12}  justify="center" alignItems="flex-start">
  
  <Grid container item sm={12} direction="column" justify="center" style={{minHeight: "33%"}}>
  <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>

      <Grid container item sm={12} justify="space-between" style={{padding: "10px 0"}}>
      <Grid container item sm={6} justify="flex-start">
      <Button color="primary" onClick={() => action(!meteoVariables.sun, "updateMeteoVariables", "sun")}>
      {<span role="img" aria-label="Sun">☀️</span>}
      </Button>
      </Grid>
      
      <Grid container item sm={6} justify="center">
      </Grid>
    </Grid>



      <Grid container item sm={10} justify="center">
      <Button color="primary" onClick={() => action(!meteoVariables.cloud, "updateMeteoVariables", "cloud")}>
      {<span role="img" aria-label="Clouds">☁️</span>}
      </Button>
      </Grid>

      <Grid container item sm={10} justify="center">
      <Button color="primary" onClick={() => action(!meteoVariables.snow, "updateMeteoVariables", "snow")}>
      {<span role="img" aria-label="Snow">❄️</span>}
      </Button>
      </Grid>

      <Grid container item sm={10} justify="center">
      <Button color="primary" onClick={() => action(!meteoVariables.rain, "updateMeteoVariables", "rain")}>
      {<span role="img" aria-label="Rain">⛆</span>}
      </Button>
      </Grid>

      <Grid container item sm={10} justify="center">
      <Button color="primary" onClick={() => action(undefined, "stormClick", "storm")}>
      {<span role="img" aria-label="storm">⚡</span>}
      </Button>
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
      {`${data?.Wind.speed}km/h`}
      </Grid>
     
</Grid>);
}


  return (
          <Drawer anchor="left" open={open} onClose={onClose} classes={styles}>
              
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
