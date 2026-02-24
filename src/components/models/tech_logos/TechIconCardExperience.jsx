import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useDevicePerformance } from "../../../hooks/useDevicePerformance";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);
  const { isLowEnd, isMidRange } = useDevicePerformance();

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.name]);

  // Reduce DPR on low-end devices
  const dpr = isLowEnd ? [0.8, 1] : isMidRange ? [1, 1.5] : [1, 2];

  // Reduce float animation intensity on low-end
  const floatSpeed = isLowEnd ? 2 : 5.5;
  const floatIntensity = isLowEnd ? 0.3 : 0.9;
  const rotationIntensity = isLowEnd ? 0.2 : 0.5;

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: !isLowEnd,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Skip spotLight on low-end devices */}
      {!isLowEnd && (
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
        />
      )}
      <Environment preset="city" />

      <Float
        speed={floatSpeed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatIntensity}
      >
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
