import { useState } from "react"
import { forecastInterface } from "../interfaces/utils";
import { switchModetype } from "../views/model";

export interface wearablesInterface {
    wearMask: boolean;
    wearHat: boolean;
    wearSunglasses: boolean;
    wearBottle: boolean;
    wearUmbrella: boolean;
}

interface wearablesHookProps {
    data: forecastInterface | null;
    mode: switchModetype;
}

interface wearablesHookInterface {
    wearablesVariables: wearablesInterface;
    updateWearablesVariables: (value: boolean, type: keyof wearablesInterface) => void;
}

export default function WearablesHook({data, mode}: wearablesHookProps): wearablesHookInterface {

    const initMeteoVariables = {
        wearMask: true,
        wearHat: defineSeason() === "summer",
        wearSunglasses: defineSeason() === "summer",
        wearBottle: defineSeason() === "summer",
        wearUmbrella: defineSeason() === "spring",
    }

    function defineSeason(){
        switch (data) {
            case data && +data.Temperature.feeling > 1 && data.Precipitation.mode === null:
                return "summer";
            case data && +data.Temperature.feeling <= 1 && data.Precipitation.mode === null:
                return "winter";
            case data && +data.Temperature.feeling > 1 && data.Precipitation.mode !== null:
                return "spring";
            default:
                return "summer";
        } 
    }


    const [wearablesVariables, setWearablesVariables] = useState<wearablesInterface>(initMeteoVariables);

    function updateWearablesVariables(value: boolean, type: keyof wearablesInterface) {
        let newVariables = {...wearablesVariables};
        newVariables[type]= value;
        setWearablesVariables(newVariables)
    }

    return {
        wearablesVariables: mode === "test" ? wearablesVariables : initMeteoVariables,
        updateWearablesVariables,
    }
}
