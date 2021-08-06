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

    const wearMask = true;
    const wearHat = defineSeason() !== "couvert" && defineSeason() !== "légère pluie";
    const wearSunglasses = defineSeason() === "soleil";
    const wearBottle = defineSeason() === "soleil";
    const wearUmbrella = defineSeason() === "légère pluie";


    function defineSeason(){
        const icon = data ? data.icon : "";
        switch (icon) {
            case "10d":
                return "légère pluie";
            case "03d":
                return "partiellement nuageux";
            case "01d":
                return "ciel dégagé";
            case "13d":
                return "neige";
            case "50d":
                return "brouillard";
            case "04d":
                return "couvert";
            default:
                return "soleil";
        } 
    }

    const initMeteoVariables = {
        wearMask,
        wearHat,
        wearSunglasses,
        wearBottle,
        wearUmbrella,
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
