// ModelView.jsx
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";
import Phone from "./Phone";

import Lights from "./Lights";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  // Handle camera rotation
  useFrame(() => {
    if (controlRef.current) {
      const cameraAngle = controlRef.current.getAzimuthalAngle();
      if (setRotationState) {
        setRotationState(cameraAngle);
      }
    }
  });

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={size === "large" ? [0, 0, 5] : [0, 0, 4]}
      />

      <Lights />

      {/* Orbit Controls */}
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />

      {/* Model Group */}
      <group ref={groupRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
        <Suspense fallback={<Loader />}>
          <Phone
            item={item}
            size={size}
            scale={size === "large" ? [17, 17, 17] : [15, 15, 15]}
            position={[0, 0, 0]}
          />
        </Suspense>
      </group>
    </>
  );
};

export default ModelView;
