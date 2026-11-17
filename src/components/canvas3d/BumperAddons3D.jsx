import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function BumperAddons3D({
  bumperId = 'full-grille-guard',
  winchId = 'warn-12k',
  optics = { lightBar: true, fogPods: true },
  hardware = { shackles: true, logoPlate: true },
  lightsOn = true
}) {
  // Fairlead & Hardware Alloy Material
  const aluminumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#CBD5E1'),
      metalness: 0.9,
      roughness: 0.22
    });
  }, []);

  // Winch Red Synthetic Line Material
  const redRopeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DC2626'),
      roughness: 0.6,
      metalness: 0.1
    });
  }, []);

  // Forged Red Shackle Material
  const shackleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#DC2626'),
      metalness: 0.35,
      roughness: 0.4
    });
  }, []);

  // LED Emissive Glow Material
  const ledEmissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      emissive: new THREE.Color(lightsOn ? '#FEF08A' : '#1E293B'),
      emissiveIntensity: lightsOn ? 4.5 : 0.1,
      roughness: 0.1
    });
  }, [lightsOn]);

  const casingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141619'),
      roughness: 0.7,
      metalness: 0.3
    });
  }, []);

  // Determine shackle X positions based on bumper style
  const shackleX = bumperId === 'stubby-winch' ? 0.38 : 0.45;

  return (
    <group position={[0, 0.75, 2.5]}>
      {/* ========================================================= */}
      {/* 1. 12,000 LB WARN WINCH + ROLLER/HAWSE FAIRLEAD + HOOK    */}
      {/* ========================================================= */}
      {winchId === 'warn-12k' && (
        <group position={[0, 0.12, 0.05]}>
          {/* Winch Motor Drum Body */}
          <mesh material={casingMaterial} castShadow>
            <boxGeometry args={[0.54, 0.22, 0.24]} />
          </mesh>

          {/* Spooled Red Synthetic Rope Drum */}
          <mesh material={redRopeMaterial} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.02]} castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.26, 24]} />
          </mesh>

          {/* Polished Aluminum Hawse Fairlead */}
          <mesh material={aluminumMaterial} position={[0, -0.14, 0.21]} castShadow>
            <boxGeometry args={[0.34, 0.1, 0.04]} />
          </mesh>
          {/* Center Hawse Opening */}
          <mesh position={[0, -0.14, 0.23]}>
            <boxGeometry args={[0.22, 0.04, 0.02]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Forged Steel Recovery Hook & Red Safety Pull Strap */}
          <group position={[0, -0.16, 0.26]}>
            {/* Hook Clevis */}
            <mesh material={shackleMaterial} rotation={[0.4, 0, 0]}>
              <torusGeometry args={[0.04, 0.016, 12, 24, Math.PI * 1.5]} />
            </mesh>
            {/* Red Safety Pull Strap ("WARN / JACK'S") */}
            <mesh position={[0.02, -0.1, 0.02]} material={redRopeMaterial}>
              <boxGeometry args={[0.035, 0.16, 0.008]} />
            </mesh>
          </group>
        </group>
      )}

      {/* ========================================================= */}
      {/* 2. QUAKE LED 20" CENTER LIGHT BAR                         */}
      {/* ========================================================= */}
      {optics.lightBar && (
        <group position={[0, bumperId === 'full-grille-guard' ? 0.35 : 0.25, 0.2]}>
          {/* Aluminum Heat Sink Housing */}
          <mesh material={casingMaterial} castShadow>
            <boxGeometry args={[0.62, 0.08, 0.08]} />
          </mesh>
          {/* High-Output Emissive LED Lens Strip */}
          <mesh material={ledEmissiveMaterial} position={[0, 0, 0.042]}>
            <boxGeometry args={[0.58, 0.05, 0.01]} />
          </mesh>

          {/* Real Three.js SpotLight casting forward light when ON */}
          {lightsOn && (
            <spotLight
              position={[0, 0, 0.1]}
              target-position={[0, 0, 5]}
              color="#FEF08A"
              intensity={4.0}
              distance={15}
              angle={0.65}
              penumbra={0.7}
              castShadow
            />
          )}
        </group>
      )}

      {/* ========================================================= */}
      {/* 3. DUAL QUAKE LED CUBE FOG PODS (OUTER POCKETS)           */}
      {/* ========================================================= */}
      {optics.fogPods && (
        <group>
          {/* Driver Side Fog Pod */}
          <group position={[-0.75, 0, 0.18]}>
            <mesh material={casingMaterial} castShadow>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
            </mesh>
            <mesh material={ledEmissiveMaterial} position={[0, 0, 0.042]}>
              <boxGeometry args={[0.09, 0.09, 0.01]} />
            </mesh>
            {lightsOn && (
              <spotLight
                position={[0, 0, 0.05]}
                color="#FEF08A"
                intensity={2.0}
                distance={10}
                angle={0.5}
                penumbra={0.5}
              />
            )}
          </group>

          {/* Passenger Side Fog Pod */}
          <group position={[0.75, 0, 0.18]}>
            <mesh material={casingMaterial} castShadow>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
            </mesh>
            <mesh material={ledEmissiveMaterial} position={[0, 0, 0.042]}>
              <boxGeometry args={[0.09, 0.09, 0.01]} />
            </mesh>
            {lightsOn && (
              <spotLight
                position={[0, 0, 0.05]}
                color="#FEF08A"
                intensity={2.0}
                distance={10}
                angle={0.5}
                penumbra={0.5}
              />
            )}
          </group>
        </group>
      )}

      {/* ========================================================= */}
      {/* 4. 3/4" FORGED D-RING RECOVERY SHACKLES                   */}
      {/* ========================================================= */}
      {hardware.shackles && (
        <group>
          {/* Driver Side D-Ring Shackle */}
          <group position={[-shackleX, -0.16, 0.28]} rotation={[0.3, 0, 0]}>
            {/* Bow Loop */}
            <mesh material={shackleMaterial} castShadow>
              <torusGeometry args={[0.055, 0.018, 16, 28, Math.PI * 1.7]} />
            </mesh>
            {/* Cross Pin & Black Isolator */}
            <mesh material={casingMaterial} position={[0, 0.045, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.016, 0.016, 0.08, 16]} />
            </mesh>
          </group>

          {/* Passenger Side D-Ring Shackle */}
          <group position={[shackleX, -0.16, 0.28]} rotation={[0.3, 0, 0]}>
            <mesh material={shackleMaterial} castShadow>
              <torusGeometry args={[0.055, 0.018, 16, 28, Math.PI * 1.7]} />
            </mesh>
            <mesh material={casingMaterial} position={[0, 0.045, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.016, 0.016, 0.08, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {/* ========================================================= */}
      {/* 5. CNC LASER-CUT "JACK'S" CENTER LOGO PLATE               */}
      {/* ========================================================= */}
      {hardware.logoPlate && (
        <group position={[0, -0.22, 0.2]}>
          {/* Stainless Skid Emblem Plate */}
          <mesh material={aluminumMaterial} castShadow>
            <boxGeometry args={[0.36, 0.1, 0.01]} />
          </mesh>
          {/* Laser Cut Amber Emblem Accent */}
          <mesh position={[0, 0, 0.008]}>
            <boxGeometry args={[0.26, 0.04, 0.005]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
}
