import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import { useDevicePerformance } from "../../../hooks/useDevicePerformance";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { isLowEnd, isMidRange } = useDevicePerformance();
  const screensRef = useRef();

  // Disable bloom on low-end and mid-range devices to save GPU
  const enableBloom = !isLowEnd && !isMidRange && !isMobile;

  // On low-end devices, cap DPR at 1 to halve the pixel fill rate
  const dpr = isLowEnd ? [0.8, 1] : isMidRange ? [1, 1.5] : [1, 2];

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={dpr}
      gl={{
        antialias: !isMobile && !isLowEnd,
        powerPreference: "high-performance",
        alpha: true,
      }}
      style={{ background: "transparent" }}
      shadows={!isMobile && !isLowEnd}
      performance={{ min: 0.5 }}
    >
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />

      <Suspense fallback={null}>
        <HeroLights isLowEnd={isLowEnd} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room screensRef={screensRef} />
        </group>

        {/* Only render bloom post-processing on high-end devices */}
        {enableBloom && (
          <EffectComposer>
            <SelectiveBloom
              selection={screensRef}
              intensity={1.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
