import React, { useMemo, useRef } from "react";
import { useFrame } from '@react-three/fiber';
// import { OrbitControls, MeshDistortMaterial, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
// import setInitialPositions from "./set-initial-positions";

interface positionInterface{
    height : number;
    position: number;
    isVisible: boolean;
    velocity: number;
}

interface cloudInterface{
    number: number;
    isVisible: boolean;
    velocity: number;
}

const Cloud = ({ height, position, isVisible, velocity}: positionInterface) => {
  const group: React.MutableRefObject<any> = useRef<THREE.Group>()
  const z = -10;

  useFrame(({ clock }) => {
  if (group && group.current){
    if (group.current.position.x >= 70) {group.current.position.x = positionRand(0, -25)};
    group.current.position.x = (clock.getElapsedTime() * velocity) % 35;
  } 
  });

  return (
    <group ref={group} visible={isVisible}>
      <mesh castShadow receiveShadow position={[position, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[2, 2]} />
      </mesh>
      <mesh castShadow receiveShadow position={[position - 2, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
       </mesh>
      <mesh castShadow receiveShadow position={[position + 2, height, z]}>
        <icosahedronBufferGeometry attach="geometry" args={[1.5, 2]} />
      </mesh>
    </group>
  );
};

const heightRand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const positionRand = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };


const Clouds = ({number, isVisible, velocity}: cloudInterface) => {

  const CloudSpawn = useMemo(() => {
    let cloudsDisplay = [];
  
    for(let i=0; i<number; i++){
    cloudsDisplay.push(<Cloud isVisible={isVisible} velocity={velocity} height={heightRand(1, 7)} position={positionRand(-5, -30)} />);
    cloudsDisplay.push(<Cloud isVisible={isVisible} velocity={velocity} height={heightRand(2, 9)} position={positionRand(0, -20)} />);
    };
    return cloudsDisplay;
  }, [number, isVisible, velocity]);

  return (
    <group key={number}>
    {CloudSpawn.map((cloud) => {
      return (cloud)
    })}
    </group>
  );
};


export default Clouds;
