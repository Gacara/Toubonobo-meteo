import { useState } from "react"

interface meteoInterface {
    storm: boolean;
    sun: boolean;
    rain: boolean;
    snow: boolean;
    cloud: boolean;
}

interface meteoHookProps {
    initMeteoVariables: meteoInterface;
}

interface meteoHookInterface {
    meteoVariables: meteoInterface;
    updateMeteoVariables: (value: boolean, type: keyof meteoInterface) => void;
}

export default function MeteoHook({initMeteoVariables}: meteoHookProps): meteoHookInterface {

    const [meteoVariables, setMeteoVariables] = useState<meteoInterface>(initMeteoVariables);

    function updateMeteoVariables(value: boolean, type: keyof meteoInterface) {
        let newVariables = {...meteoVariables};
        newVariables[type]= value;
        setMeteoVariables(newVariables)
    }

    return {
        meteoVariables,
        updateMeteoVariables,
    }
}
