import { useState } from "react"
import { forecastInterface } from "../interfaces/utils";
import { switchModetype } from "../views/model";

export interface meteoInterface {
    storm: boolean;
    sun: boolean;
    rain: boolean;
    snow: boolean;
    cloud: boolean;
}

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
    const cloud = !!((data && data.Cloud.cover > 0) || true);
    const sun = !!((data && data.Cloud.cover > 75));
    const storm = !!(data && +data.Precipitation.value > 10);
    const initMeteoVariables = {
      storm: rain && storm,
      sun,
      rain,
      snow,
      cloud,
    }

    const [meteoVariables, setMeteoVariables] = useState<meteoInterface>(initMeteoVariables);

    function updateMeteoVariables(value: boolean, type: keyof meteoInterface) {
        let newVariables = {...meteoVariables};
        newVariables[type]= value;
        setMeteoVariables(newVariables)
    }

    return {
        meteoVariables: mode === "test" ? meteoVariables : initMeteoVariables,
        updateMeteoVariables,
    }
}
