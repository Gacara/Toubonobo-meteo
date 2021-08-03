import { useEffect } from 'react'

interface triggerInterface{
  trigger: boolean;
  callback: (coef: number) => void;
  max: number;
  frequency: number;
  reset: () => void;
}

export default function IntervalCamera({trigger, callback, max, frequency, reset}: triggerInterface) {

  useEffect(() => {
    let counter = 1;
    let intervalId: NodeJS.Timeout | null = null;
    function start() {  intervalId = setInterval(bip, 1000/frequency);
    }	
    function finish() {
      if(intervalId)clearInterval(intervalId);
      callback(1);
      reset();
    }
    function bip() {
        if(counter > max) finish();
        const currentCoef = counter;
        callback(currentCoef);
        counter++;
    }
    if(trigger){
      start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [trigger]);

  return <></>;
}
