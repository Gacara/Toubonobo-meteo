import { useState } from "react"

interface variablesInterface {
    storm: boolean;
    sun: boolean;
    rain: boolean;
    snow: boolean;
    cloud: boolean;
}

interface wearablesHookProps {
    initVariables: variablesInterface
}

interface wearablesHookInterface {
    variables: variablesInterface;
    updateVariables: (value: boolean, type: keyof variablesInterface) => void;
}

export default function WearablesHook({initVariables}: wearablesHookProps): wearablesHookInterface {

    const [variables, setVariables] = useState<variablesInterface>(initVariables);

    function updateVariables(value: boolean, type: keyof variablesInterface) {
        let newVariables = {...variables};
        newVariables[type]= value;
        setVariables(newVariables)
    }

    return {
        variables,
        updateVariables,
    }
}
