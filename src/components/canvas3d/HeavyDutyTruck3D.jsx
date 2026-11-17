import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function HeavyDutyTruck3D({
  truckId = 'ford-superduty',
  paintColor = { hex: '#F4F6F9', name: 'Oxford White' },
  lightsOn = true
}) {
  // Automotive Clearcoat Paint Material
  const paintMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(paintColor.hex),
      metalness: 0.65,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.88,
      envMapIntensity: 1.2
    });
  }, [paintColor]);

  // Dark Tinted Limo Glass Material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#10141A'),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.75,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.95,
      clearcoat: 1.0
    });
  }, []);

  // Tire Rugged Rubber Material
  const tireRubberMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141619'),
      roughness: 0.88,
      metalness: 0.12
    });
  }, []);

  // Beadlock Rim Alloy Material
  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22252B'),
      metalness: 0.85,
      roughness: 0.28
    });
  }, []);

  // Chrome & Trim Material
  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8DEEB'),
      metalness: 0.95,
      roughness: 0.12
    });
  }, []);

  // Frame Steel
  const frameSteelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1A1C20'),
      metalness: 0.4,
      roughness: 0.6
    });
  }, []);

  // Amber Cab Lights
  const amberLightMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F59E0B'),
      emissive: new THREE.Color(lightsOn ? '#F59E0B' : '#000000'),
      emissiveIntensity: lightsOn ? 2.5 : 0,
      roughness: 0.2
    });
  }, [lightsOn]);

  // Headlight LED DRL Material
  const ledHeadlightMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      emissive: new THREE.Color(lightsOn ? '#FEF08A' : '#1E293B'),
      emissiveIntensity: lightsOn ? 3.8 : 0.1,
      roughness: 0.1
    });
  }, [lightsOn]);

  return (
    <group position={[0, 0, 0]} castShadow receiveShadow>
      {/* ========================================================= */}
      {/* 1. CHASSIS FRAME RAILS (Heavy-Duty Hydroformed Box Steel) */}
      {/* ========================================================= */}
      <group position={[0, 0.45, 0]}>
        {/* Left Frame Rail */}
        <mesh position={[-0.55, 0, 0]} material={frameSteelMaterial} castShadow>
          <boxGeometry args={[0.12, 0.2, 5.0]} />
        </mesh>
        {/* Right Frame Rail */}
        <mesh position={[0.55, 0, 0]} material={frameSteelMaterial} castShadow>
          <boxGeometry args={[0.12, 0.2, 5.0]} />
        </mesh>
        {/* Front Chassis Horn Mounting Brackets (Where Jack's Bumpers Bolt On) */}
        <mesh position={[-0.55, 0.05, 2.45]} material={chromeMaterial} castShadow>
          <boxGeometry args={[0.14, 0.24, 0.16]} />
        </mesh>
        <mesh position={[0.55, 0.05, 2.45]} material={chromeMaterial} castShadow>
          <boxGeometry args={[0.14, 0.24, 0.16]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. CREW CAB BODY & ROOF                                   */}
      {/* ========================================================= */}
      <group position={[0, 1.35, -0.15]}>
        {/* Lower Main Cab Body */}
        <mesh material={paintMaterial} castShadow receiveShadow position={[0, -0.22, 0]}>
          <boxGeometry args={[2.08, 0.72, 2.2]} />
        </mesh>

        {/* Upper Cab Glasshouse & Pillars */}
        <mesh material={paintMaterial} castShadow receiveShadow position={[0, 0.38, -0.1]}>
          <boxGeometry args={[1.92, 0.58, 1.85]} />
        </mesh>

        {/* Front Windshield (Angled 3D Glass) */}
        <mesh
          material={glassMaterial}
          position={[0, 0.38, 0.76]}
          rotation={[-0.45, 0, 0]}
        >
          <planeGeometry args={[1.76, 0.72]} />
        </mesh>

        {/* Side Windows Driver */}
        <mesh
          material={glassMaterial}
          position={[-0.97, 0.38, -0.1]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <planeGeometry args={[1.72, 0.52]} />
        </mesh>
        {/* Side Windows Passenger */}
        <mesh
          material={glassMaterial}
          position={[0.97, 0.38, -0.1]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[1.72, 0.52]} />
        </mesh>

        {/* Rear Cab Window */}
        <mesh
          material={glassMaterial}
          position={[0, 0.38, -1.03]}
          rotation={[0, Math.PI, 0]}
        >
          <planeGeometry args={[1.68, 0.52]} />
        </mesh>

        {/* Heavy Duty Tow Mirrors */}
        {/* Driver Mirror */}
        <group position={[-1.12, 0.2, 0.65]}>
          <mesh material={frameSteelMaterial} castShadow>
            <boxGeometry args={[0.18, 0.06, 0.06]} />
          </mesh>
          <mesh material={frameSteelMaterial} position={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.32, 0.16]} />
          </mesh>
          <mesh position={[-0.05, 0, 0.08]} material={amberLightMaterial}>
            <boxGeometry args={[0.02, 0.16, 0.02]} />
          </mesh>
        </group>
        {/* Passenger Mirror */}
        <group position={[1.12, 0.2, 0.65]}>
          <mesh material={frameSteelMaterial} castShadow>
            <boxGeometry args={[0.18, 0.06, 0.06]} />
          </mesh>
          <mesh material={frameSteelMaterial} position={[0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.32, 0.16]} />
          </mesh>
          <mesh position={[0.05, 0, 0.08]} material={amberLightMaterial}>
            <boxGeometry args={[0.02, 0.16, 0.02]} />
          </mesh>
        </group>

        {/* 5 Amber Cab Roof Clearance Lights (HD Truck Hallmark) */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
          <mesh
            key={`cab-light-${i}`}
            position={[x, 0.68, 0.68]}
            material={amberLightMaterial}
          >
            <cylinderGeometry args={[0.025, 0.035, 0.04, 12]} />
          </mesh>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 3. HOOD & FRONT FENDERS                                   */}
      {/* ========================================================= */}
      <group position={[0, 1.22, 1.62]}>
        {/* Main Sculpted Hood */}
        <mesh material={paintMaterial} castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.08, 0.44, 1.55]} />
        </mesh>
        {/* Hood Power Bulge (Center Ridge) */}
        <mesh material={paintMaterial} castShadow position={[0, 0.24, 0]}>
          <boxGeometry args={[1.1, 0.08, 1.4]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 4. FRONT GRILLE & LIGHTING ARCHITECTURE (BY RIG)          */}
      {/* ========================================================= */}
      <group position={[0, 1.15, 2.4]}>
        {/* FORD SUPER DUTY: C-Clamp LED Perimeter & Twin Billet Bars */}
        {truckId === 'ford-superduty' && (
          <group>
            {/* Grille Honeycomb Matrix */}
            <mesh material={frameSteelMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.52, 0.06]} />
            </mesh>
            {/* Twin Billet Horizontal Bars */}
            <mesh material={chromeMaterial} position={[0, 0.12, 0.04]} castShadow>
              <boxGeometry args={[1.48, 0.09, 0.05]} />
            </mesh>
            <mesh material={chromeMaterial} position={[0, -0.12, 0.04]} castShadow>
              <boxGeometry args={[1.48, 0.09, 0.05]} />
            </mesh>
            {/* Ford Blue Oval Badge */}
            <mesh position={[0, 0, 0.08]}>
              <cylinderGeometry args={[0.09, 0.09, 0.03, 24]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#1E3A8A" roughness={0.2} metalness={0.6} />
            </mesh>

            {/* Left C-Clamp LED Headlight Assembly */}
            <group position={[-0.92, 0, 0]}>
              <mesh material={frameSteelMaterial}>
                <boxGeometry args={[0.26, 0.54, 0.1]} />
              </mesh>
              {/* Upper Projector */}
              <mesh position={[0, 0.14, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
              {/* Lower Projector */}
              <mesh position={[0, -0.14, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
              {/* C-Clamp Glowing DRL Ribbon */}
              <mesh position={[-0.09, 0, 0.06]} material={ledHeadlightMaterial}>
                <boxGeometry args={[0.04, 0.5, 0.03]} />
              </mesh>
            </group>

            {/* Right C-Clamp LED Headlight Assembly */}
            <group position={[0.92, 0, 0]}>
              <mesh material={frameSteelMaterial}>
                <boxGeometry args={[0.26, 0.54, 0.1]} />
              </mesh>
              <mesh position={[0, 0.14, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
              <mesh position={[0, -0.14, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
              <mesh position={[0.09, 0, 0.06]} material={ledHeadlightMaterial}>
                <boxGeometry args={[0.04, 0.5, 0.03]} />
              </mesh>
            </group>
          </group>
        )}

        {/* RAM 2500/3500 HD: Big Horn Wide Slats & Dual Projectors */}
        {truckId === 'ram-hd' && (
          <group>
            <mesh material={frameSteelMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[1.55, 0.54, 0.06]} />
            </mesh>
            <mesh material={chromeMaterial} position={[0, 0, 0.04]}>
              <boxGeometry args={[1.5, 0.5, 0.03]} />
            </mesh>
            {/* Center RAM Bold Chrome Block */}
            <mesh material={chromeMaterial} position={[0, 0, 0.07]}>
              <boxGeometry args={[0.42, 0.15, 0.04]} />
            </mesh>
            {/* Dual Projectors Left */}
            <group position={[-0.92, 0, 0]}>
              <mesh position={[0, 0.08, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.075, 16, 16]} />
              </mesh>
              <mesh position={[0, -0.08, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.075, 16, 16]} />
              </mesh>
            </group>
            {/* Dual Projectors Right */}
            <group position={[0.92, 0, 0]}>
              <mesh position={[0, 0.08, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.075, 16, 16]} />
              </mesh>
              <mesh position={[0, -0.08, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.075, 16, 16]} />
              </mesh>
            </group>
          </group>
        )}

        {/* CHEVY SILVERADO HD: Stacked Split Headlights & Crossbar */}
        {(truckId === 'chevy-2500hd' || truckId === 'gmc-sierra-hd') && (
          <group>
            <mesh material={frameSteelMaterial} position={[0, 0, 0]}>
              <boxGeometry args={[1.52, 0.56, 0.06]} />
            </mesh>
            {/* Massive Horizontal Crossbar */}
            <mesh material={chromeMaterial} position={[0, 0.05, 0.05]}>
              <boxGeometry args={[1.5, 0.14, 0.04]} />
            </mesh>
            {/* Gold Bowtie / GMC block */}
            <mesh position={[0, 0.05, 0.08]}>
              <boxGeometry args={[0.18, 0.08, 0.02]} />
              <meshStandardMaterial color="#EAB308" roughness={0.2} metalness={0.7} />
            </mesh>
            {/* Stacked Headlights Left */}
            <group position={[-0.92, 0, 0]}>
              <mesh position={[0, 0.18, 0.05]} material={ledHeadlightMaterial}>
                <boxGeometry args={[0.2, 0.08, 0.04]} />
              </mesh>
              <mesh position={[0, -0.12, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.08, 16, 16]} />
              </mesh>
            </group>
            {/* Stacked Headlights Right */}
            <group position={[0.92, 0, 0]}>
              <mesh position={[0, 0.18, 0.05]} material={ledHeadlightMaterial}>
                <boxGeometry args={[0.2, 0.08, 0.04]} />
              </mesh>
              <mesh position={[0, -0.12, 0.05]} material={ledHeadlightMaterial}>
                <sphereGeometry args={[0.08, 16, 16]} />
              </mesh>
            </group>
          </group>
        )}
      </group>

      {/* ========================================================= */}
      {/* 5. TRUCK BED & REAR TAILGATE                              */}
      {/* ========================================================= */}
      <group position={[0, 1.15, -1.9]}>
        {/* Bed Floor */}
        <mesh material={paintMaterial} castShadow receiveShadow position={[0, -0.1, 0]}>
          <boxGeometry args={[2.08, 0.54, 2.1]} />
        </mesh>
        {/* Left Bedside */}
        <mesh material={paintMaterial} castShadow position={[-0.98, 0.28, 0]}>
          <boxGeometry args={[0.12, 0.5, 2.05]} />
        </mesh>
        {/* Right Bedside */}
        <mesh material={paintMaterial} castShadow position={[0.98, 0.28, 0]}>
          <boxGeometry args={[0.12, 0.5, 2.05]} />
        </mesh>
        {/* Rear Tailgate */}
        <mesh material={paintMaterial} castShadow position={[0, 0.28, -1.02]}>
          <boxGeometry args={[2.04, 0.5, 0.1]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 6. WHEELS & ALL-TERRAIN TIRES (4 CORNERS)                 */}
      {/* ========================================================= */}
      {/* Front Left Wheel */}
      <group position={[-1.02, 0.5, 1.65]} rotation={[0, 0, Math.PI / 2]}>
        {/* Outer Tire Rubber */}
        <mesh material={tireRubberMaterial} castShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.36, 32]} />
        </mesh>
        {/* Knobby Tread Ribs */}
        <mesh material={tireRubberMaterial}>
          <torusGeometry args={[0.48, 0.04, 8, 32]} />
        </mesh>
        {/* Beadlock Alloy Rim */}
        <mesh material={rimMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.38, 24]} />
        </mesh>
        {/* Center Hub & 8-Lug Accents */}
        <mesh material={chromeMaterial} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
        </mesh>
        {/* Red Brake Caliper Peek */}
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.14, 0.22, 0.08]} />
          <meshStandardMaterial color="#DC2626" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Front Right Wheel */}
      <group position={[1.02, 0.5, 1.65]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh material={tireRubberMaterial} castShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.36, 32]} />
        </mesh>
        <mesh material={tireRubberMaterial}>
          <torusGeometry args={[0.48, 0.04, 8, 32]} />
        </mesh>
        <mesh material={rimMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.38, 24]} />
        </mesh>
        <mesh material={chromeMaterial} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
        </mesh>
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.14, 0.22, 0.08]} />
          <meshStandardMaterial color="#DC2626" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Rear Left Wheel */}
      <group position={[-1.02, 0.5, -1.75]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={tireRubberMaterial} castShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.36, 32]} />
        </mesh>
        <mesh material={rimMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.38, 24]} />
        </mesh>
      </group>

      {/* Rear Right Wheel */}
      <group position={[1.02, 0.5, -1.75]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh material={tireRubberMaterial} castShadow>
          <cylinderGeometry args={[0.49, 0.49, 0.36, 32]} />
        </mesh>
        <mesh material={rimMaterial}>
          <cylinderGeometry args={[0.32, 0.32, 0.38, 24]} />
        </mesh>
      </group>
    </group>
  );
}
