import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import HeavyDutyTruck3D from './HeavyDutyTruck3D';
import CustomBumper3D from './CustomBumper3D';
import BumperAddons3D from './BumperAddons3D';
import CameraRig, { CAMERA_PRESETS } from './CameraRig';

export default function StudioScene({
  truck,
  bumper,
  paintColor,
  finish,
  winch,
  optics,
  hardware,
  lightsOn,
  cameraPreset = 'hero',
  backdropMode = 'studio'
}) {
  const controlsRef = useRef();

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance'
        }}
        camera={{ position: [4.6, 1.9, 5.0], fov: 42 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Animated Camera Rig */}
          <CameraRig presetKey={cameraPreset} controlsRef={controlsRef} />

          {/* Interactive 360° Orbit Controls with Polar Angle Limits */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2 - 0.04}
            minDistance={2.6}
            maxDistance={11.0}
            target={[0, 1.0, 0.4]}
          />

          {/* Studio Lights */}
          <ambientLight intensity={0.55} />

          {/* Overhead Softbox Key Light */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.6}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={1}
            shadow-camera-far={25}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-bias={-0.0001}
          />

          {/* Front Bumper Specular Rim Light */}
          <directionalLight position={[0, 3, 6]} intensity={1.2} />

          {/* Soft Fill Light from Rear Passenger */}
          <directionalLight position={[-6, 5, -4]} intensity={0.7} />

          {/* Realistic Floor Bounce Light */}
          <directionalLight position={[0, -2, 0]} intensity={0.2} color="#1E232E" />

          {/* Environment Reflections */}
          <Environment preset="studio" />

          {/* ======================================================= */}
          {/* 3D TURNTABLE STAGE & VEHICLE ASSEMBLY                   */}
          {/* ======================================================= */}
          <group position={[0, 0, 0]}>
            {/* The Stationary Heavy-Duty Pickup Truck (Clearcoat Paint) */}
            <HeavyDutyTruck3D
              truckId={truck.id}
              paintColor={paintColor}
              lightsOn={lightsOn}
            />

            {/* Modular Custom Steel Bumper Assembly */}
            <CustomBumper3D
              bumperId={bumper.id}
              finishId={finish.id}
              paintColor={paintColor}
            />

            {/* Modular 3D Add-Ons (Winch, Quake LEDs, Shackles, Logo) */}
            <BumperAddons3D
              bumperId={bumper.id}
              winchId={winch.id}
              optics={optics}
              hardware={hardware}
              lightsOn={lightsOn}
            />
          </group>

          {/* ======================================================= */}
          {/* REFLECTIVE STUDIO FLOOR & CONTACT SHADOWS               */}
          {/* ======================================================= */}
          {/* Dark Mirror Reflector Turntable Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
            <planeGeometry args={[45, 45]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mirror={0.55}
              mixBlur={1.4}
              mixStrength={2.5}
              roughness={0.35}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color={backdropMode === 'craig' ? '#12141C' : '#0B0D11'}
              metalness={0.7}
            />
          </mesh>

          {/* Realistic Soft Contact Shadows under Tires & Chassis */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.88}
            scale={12}
            blur={2.4}
            far={4.0}
            resolution={1024}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
