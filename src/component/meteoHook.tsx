import { useState } from "react"
import { forecastInterface } from "../interfaces/utils";
import { switchModetype } from "../views/model";

export interface meteoInterface {
    storm: boolean;
    sun: boolean;
    rain: boolean;
    snow: boolean;
    cloud: boolean;
    rainPrecipitation: number;
    snowPrecipitation: number;
    cloudIntensity: number;
    cloudCover: number;
    windSpeed: number;
}
type variablesType = number | boolean;

type OnlyBoolean = Omit<meteoInterface, Precipitation>;
type Precipitation = "rainPrecipitation" | "snowPrecipitation" | "cloudIntensity" | "cloudCover" | "windSpeed";

interface meteoHookProps {
    data: forecastInterface | null;
    mode: switchModetype;
}

interface meteoHookInterface {
    meteoVariables: meteoInterface;
    updateMeteoVariables: (value: boolean, type: keyof meteoInterface) => void;
}

export default function MeteoHook({data, mode}: meteoHookProps): meteoHookInterface {
    const rain = !!((data && data.Precipitation.mode === "rain"));
    const snow = !!(data && data.Precipitation.mode === "snow");
    const cloud = !!((data && data.Cloud.cover > 0) || false);
    const sun = !!((data && data.Cloud.cover > 75));
    const storm = !!(data && +data.Precipitation.value > 10);
    const rainPrecipitation = convertDataRainCoverToNumber();
    const snowPrecipitation = 3000;
    const cloudIntensity = convertDataCloudCoverToIntensity();
    const cloudCover = convertDataCloudCoverToNumber();
    const windSpeed = convertDataWindSpeedToVelocity();
    
  function convertDataRainCoverToNumber(): number{
    const precipitation = data ? +data.Precipitation.value : 0;
    switch (true) {
      case precipitation < 5:
        return 4000; 
      case precipitation < 15 && precipitation > 5:
        return 8500; 
      case precipitation > 15:
        return 15000; 
      default:
        return 8000; 
    }
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

    const initMeteoVariables = {
      storm: rain && storm,
      sun,
      rain,
      snow,
      cloud,
      rainPrecipitation,
      snowPrecipitation,
      cloudIntensity,
      cloudCover,
      windSpeed,
    }

    const [meteoVariables, setMeteoVariables] = useState<meteoInterface>(initMeteoVariables);

    function isBool(value: variablesType): value is boolean{
        return typeof value === "boolean";
    }

    function updateMeteoVariables(value: variablesType , type: keyof meteoInterface) {
        let newVariables: meteoInterface = {...meteoVariables};
        if (isBool(value)){
            newVariables[type as keyof OnlyBoolean]= value as boolean;
        } else {
            newVariables[type as Precipitation]= value as number;
        }
  
        setMeteoVariables(newVariables)
    }

    return {
        meteoVariables: mode === "test" ? meteoVariables : initMeteoVariables,
        updateMeteoVariables,
    }
}
