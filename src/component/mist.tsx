import React, { useMemo, useRef } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from "three";

interface rainInterface{
    mistCount: number;
    isVisible: boolean;
}

const setInitialPositions = (mistCount: number) => {
    const initialPositions = [];
    const initialVelocities = [];
    const initialAccelerations = [];
    for (let i = 0; i < mistCount; i++) {
      initialPositions.push(-12 + Math.random() * 40);
      initialPositions.push(Math.random() * 10);
      initialPositions.push(-18.5 + Math.random() * 5);
      initialVelocities.push(0);
      initialVelocities.push(-0.5);
      initialVelocities.push(0);
      initialAccelerations.push(0);
      initialAccelerations.push(2);
      initialAccelerations.push(0);
    }
    return [initialPositions, initialVelocities, initialAccelerations];
  };

const Mist = ({ mistCount, isVisible }: rainInterface) => {
    const [positions, velocities, accelerations] = useMemo(() => {
      const [
        initialPositions,
        initialVelocities,
        initialAccelerations
      ] = setInitialPositions(mistCount);
      const positions = new Float32Array(initialPositions);
      const velocities = new Float32Array(initialVelocities);
      const accelerations = new Float32Array(initialAccelerations);
      return [positions, velocities, accelerations];
    }, [mistCount]);
    const uniforms = useMemo(() => ({ time: { value: 1.0 } }), []);
  
    const geom: React.MutableRefObject<any> = useRef<THREE.Group>()
    const vert = `uniform float time;
      attribute vec3 velocity;
      attribute vec3 acceleration;
      varying float curY;
      void main() {
          vec3 pos = vec3(position[0], position[1], position[2]);
          
          gl_Position = projectionMatrix 
              * modelViewMatrix
              * vec4(
                  vec3(
                      mod(30.+pos[0]+time*.6,30.)-10.,
                      mod(pos[1] + (time * velocity[1] * acceleration[2]),8.),
                      pos[2]), 1.0);
          gl_PointSize = 5.;
      }`;
  
    const frag = `uniform float time;
      void main() {

          float z = 1.0 - gl_FragCoord.z;
          float x = 3.0 - gl_FragCoord.x;
          gl_FragColor = vec4(vec3(0.855,0.795,0.731), 0.1);
          gl_FragColor.a = 0.5;
      }`;
  
    useFrame(({ clock }) => {
      if (geom.current) {
        geom.current.material.uniforms.time.value = clock.getElapsedTime();
        geom.current.geometry.verticesNeedUpdate = true;
      }
    });
  
    return (
      <points key={mistCount} ref={geom} visible={isVisible}>
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
    );
  };
  export default Mist;