import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CAMERA_PRESETS = {
  hero: {
    name: 'Front 3/4 Hero',
    position: [4.6, 1.9, 5.0],
    target: [0, 1.0, 0.4]
  },
  bumperClose: {
    name: 'Bumper Close-Up',
    position: [1.6, 1.15, 3.8],
    target: [0, 0.85, 2.3]
  },
  sideProfile: {
    name: 'Side Profile',
    position: [6.8, 1.6, 0.2],
    target: [0, 1.1, 0]
  },
  lowAggressive: {
    name: 'Low Aggressive Angle',
    position: [3.4, 0.55, 4.4],
    target: [0, 0.8, 1.5]
  }
};

export default function CameraRig({ presetKey = 'hero', controlsRef }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...CAMERA_PRESETS[presetKey].position));
  const targetLook = useRef(new THREE.Vector3(...CAMERA_PRESETS[presetKey].target));

  useEffect(() => {
    const preset = CAMERA_PRESETS[presetKey] || CAMERA_PRESETS.hero;
    targetPos.current.set(...preset.position);
    targetLook.current.set(...preset.target);
  }, [presetKey]);

  useFrame((state, delta) => {
    // Smooth lerp camera position
    const step = Math.min(delta * 4, 0.1);
    camera.position.lerp(targetPos.current, step);

    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, step);
      controlsRef.current.update();
    }
  });

  return null;
}
