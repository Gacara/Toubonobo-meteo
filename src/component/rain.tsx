import React, { useMemo, useRef } from "react";
import { PointsProps, useFrame } from '@react-three/fiber';
import * as THREE from "three";

interface rainInterface{
    rainCount: number;
    isVisible: boolean;
}

interface yeahInterface{
  geom: React.MutableRefObject<any>,
  isVisible: boolean,
  positions: Float32Array,
  velocities: Float32Array,
  accelerations: Float32Array,
}

const setInitialPositions = (rainCount: number) => {
    const initialPositions = [];
    const initialVelocities = [];
    const initialAccelerations = [];
    for (let i = 0; i < rainCount; i++) {
      initialPositions.push(-12 + Math.random() * 40);
      initialPositions.push(Math.random() * 10);
      initialPositions.push(-19.5 + Math.random() * 5);
      initialVelocities.push(0);
      initialVelocities.push(-1);
      initialVelocities.push(0);
      initialAccelerations.push(0);
      initialAccelerations.push(2);
      initialAccelerations.push(0);
    }

    return [initialPositions, initialVelocities, initialAccelerations];
  };

function RainPoints({geom, isVisible, positions, velocities, accelerations}: yeahInterface){

  const uniforms = useMemo(() => ({ time: { value: 1.0 } }), []);
  const vert = `uniform float time;
  attribute vec3 velocity;
  attribute vec3 acceleration;
  varying float curY;
  void main() {
      vec3 pos = position;
      
      gl_Position = projectionMatrix 
          * modelViewMatrix
          * vec4(
              vec3(
                  mod(30.+pos[0]+time*.6,30.)-5.,
                  mod(pos[1] + (time * velocity[1] * acceleration[1]),10.),
                  pos[2]), 1.0);
      gl_PointSize = 3.0;
  }`;

const frag = `uniform float time;
  void main() {
      float z = 1.0 - gl_FragCoord.z;
      gl_FragColor = vec4(0., .5, 0.8, 1.0);
  }`;


 return ( 
 <points ref={geom} visible={isVisible}>
  <bufferGeometry attach="geometry">
    <bufferAttribute
      attachObject={["attributes", "position"]}
      count={positions.length / 3}
      array={positions}
      itemSize={3}
    />
    <bufferAttribute
      attachObject={["attributes", "velocity"]}
      count={velocities.length / 3}
      array={velocities}
      itemSize={3}
    />
    <bufferAttribute
      attachObject={["attributes", "acceleration"]}
      count={accelerations.length / 3}
      array={accelerations}
      itemSize={3}
    />
  </bufferGeometry>
  <shaderMaterial
    attach="material"
    uniforms={uniforms}
    vertexShader={vert}
    fragmentShader={frag}
    vertexColors
  />
</points>
)
}

const Rain = ({ rainCount, isVisible }: rainInterface) => {
  const geom: React.MutableRefObject<any> = useRef<THREE.Points>();

    const [positions, velocities, accelerations] = useMemo(() => {

      const [
        initialPositions,
        initialVelocities,
        initialAccelerations
      ] = setInitialPositions(rainCount);
      const positions = new Float32Array(initialPositions);
      const velocities = new Float32Array(initialVelocities);
      const accelerations = new Float32Array(initialAccelerations);
      return [positions, velocities, accelerations];
    }, [rainCount]);

   
    useFrame(({ clock }) => {
      if (geom.current) {
        geom.current.material.uniforms.time.value = clock.getElapsedTime();
        geom.current.verticesNeedUpdate = true;
      }
    });

    return (
     <RainPoints
     key={rainCount}
     positions={positions}
     velocities={velocities}
     isVisible={isVisible}
     accelerations={accelerations}
     geom={geom}
     />
    );
  };
  export default Rain;