import React, { useEffect, useState } from 'react'

interface triggerInterface{
  trigger: boolean;
}

export default function Storm({trigger}: triggerInterface) {
  const [storm, setStorm] = useState<boolean>(false);
     
  useEffect(() => {
    let counter = 25;
    let intervalId: any = null;
    function start() {  intervalId = setInterval(bip, 150);
    }	
    function finish() {
      clearInterval(intervalId);
      setStorm(false);
    }
    function bip() {
        if(counter === 0) finish();
        else {
          setTimeout(()=> setStorm(!!(Math.round(Math.random()-0.05))), Math.random()*50);
        }
        counter--;
    }
    if(trigger){
      start();
    }}, [trigger]);

  return <pointLight intensity={storm ? 50 : 0} position={[4, 4, -15]} scale={[4,4,4]} />
}
