import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function CustomBumper3D({
  bumperId = 'full-grille-guard',
  finishId = 'matte-black',
  paintColor = { hex: '#F4F6F9' }
}) {
  // PBR Steel Finish Materials
  const finishMaterial = useMemo(() => {
    if (finishId === 'raw-steel') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#949CAE'),
        metalness: 0.88,
        roughness: 0.35,
        envMapIntensity: 1.4
      });
    }
    if (finishId === 'color-match') {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(paintColor.hex),
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.88
      });
    }
    if (finishId === 'bedliner') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#101114'),
        metalness: 0.1,
        roughness: 0.94
      });
    }
    // Default: Textured Matte Black Powder Coat
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1A1C21'),
      metalness: 0.25,
      roughness: 0.76,
      envMapIntensity: 0.8
    });
  }, [finishId, paintColor]);

  // Diamond Plate / Accents
  const diamondPlateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22262E'),
      metalness: 0.5,
      roughness: 0.65
    });
  }, []);

  return (
    <group position={[0, 0.75, 2.5]} castShadow receiveShadow>
      {/* ========================================================= */}
      {/* 1. FULL GRILLE GUARD RANCH BUMPER                         */}
      {/* ========================================================= */}
      {bumperId === 'full-grille-guard' && (
        <group>
          {/* Main 3/16" Heavy CNC Plate Bumper Body */}
          <mesh material={finishMaterial} position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.22, 0.44, 0.38]} />
          </mesh>

          {/* Diamond Plate Top Step Deck */}
          <mesh material={diamondPlateMaterial} position={[0, 0.23, 0.04]} castShadow>
            <boxGeometry args={[2.24, 0.02, 0.34]} />
          </mesh>

          {/* Angled Lower Skid Deflector */}
          <mesh material={finishMaterial} position={[0, -0.28, -0.06]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[1.5, 0.24, 0.06]} />
          </mesh>

          {/* Vertical Heavy 2" Schedule 40 Pipe Push Bars */}
          {/* Left Vertical Upright */}
          <mesh material={finishMaterial} position={[-0.45, 0.48, 0.12]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.88, 16]} />
          </mesh>
          {/* Right Vertical Upright */}
          <mesh material={finishMaterial} position={[0.45, 0.48, 0.12]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.88, 16]} />
          </mesh>

          {/* Top Pipe Crossbar */}
          <mesh material={finishMaterial} position={[0, 0.9, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.92, 16]} />
          </mesh>
          {/* Middle Crossbar */}
          <mesh material={finishMaterial} position={[0, 0.52, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.9, 16]} />
          </mesh>

          {/* Full Wraparound Headlight Loops (Heavy Protection) */}
          {/* Left Headlight Loop */}
          <group position={[-0.78, 0.58, 0.08]}>
            <mesh material={finishMaterial} rotation={[0, 0.3, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.68, 16]} />
            </mesh>
            <mesh material={finishMaterial} position={[-0.32, -0.2, -0.1]} rotation={[0.3, 0, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.45, 16]} />
            </mesh>
          </group>

          {/* Right Headlight Loop */}
          <group position={[0.78, 0.58, 0.08]}>
            <mesh material={finishMaterial} rotation={[0, -0.3, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.68, 16]} />
            </mesh>
            <mesh material={finishMaterial} position={[0.32, -0.2, -0.1]} rotation={[0.3, 0, 0]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.45, 16]} />
            </mesh>
          </group>

          {/* Punched Steel Radiator Screen (Center Mesh) */}
          <mesh position={[0, 0.52, 0.08]} castShadow>
            <boxGeometry args={[0.78, 0.68, 0.015]} />
            <meshStandardMaterial color="#0F1115" roughness={0.9} wireframe />
          </mesh>

          {/* Welded 1" Thick Recovery Clevis Mount Tabs */}
          <mesh material={diamondPlateMaterial} position={[-0.45, -0.08, 0.22]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.14]} />
          </mesh>
          <mesh material={diamondPlateMaterial} position={[0.45, -0.08, 0.22]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.14]} />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* 2. STUBBY WINCH-READY OFF-ROAD BUMPER                     */}
      {/* ========================================================= */}
      {bumperId === 'stubby-winch' && (
        <group>
          {/* Center Main Winch Tub (Recessed Winch Cradle) */}
          <mesh material={finishMaterial} position={[0, -0.04, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.05, 0.42, 0.48]} />
          </mesh>

          {/* Left High-Approach 45-degree Wing (Exposes 35" Tires for Crawling) */}
          <mesh
            material={finishMaterial}
            position={[-0.72, 0.06, -0.06]}
            rotation={[0, -0.55, 0.18]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.62, 0.32, 0.28]} />
          </mesh>

          {/* Right High-Approach 45-degree Wing */}
          <mesh
            material={finishMaterial}
            position={[0.72, 0.06, -0.06]}
            rotation={[0, 0.55, -0.18]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.62, 0.32, 0.28]} />
          </mesh>

          {/* Low-Profile Tubular Stinger / Pre-Runner Bull Bar */}
          <group position={[0, 0.22, 0.16]}>
            {/* Left Stinger Leg */}
            <mesh material={finishMaterial} position={[-0.32, 0.22, -0.04]} rotation={[0.45, 0, -0.22]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.52, 16]} />
            </mesh>
            {/* Right Stinger Leg */}
            <mesh material={finishMaterial} position={[0.32, 0.22, -0.04]} rotation={[0.45, 0, 0.22]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.52, 16]} />
            </mesh>
            {/* Top Stinger Bar */}
            <mesh material={finishMaterial} position={[0, 0.44, 0.08]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.6, 16]} />
            </mesh>
            {/* Gusset Plates with Speed Holes */}
            <mesh material={diamondPlateMaterial} position={[-0.26, 0.14, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.08, 0.16, 0.015]} />
            </mesh>
            <mesh material={diamondPlateMaterial} position={[0.26, 0.14, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.08, 0.16, 0.015]} />
            </mesh>
          </group>

          {/* Heavy 1" Recovery Clevis Tabs */}
          <mesh material={diamondPlateMaterial} position={[-0.38, -0.08, 0.26]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.14]} />
          </mesh>
          <mesh material={diamondPlateMaterial} position={[0.38, -0.08, 0.26]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.14]} />
          </mesh>
        </group>
      )}

      {/* ========================================================= */}
      {/* 3. CLASSIC SMOOTH PLATE HEAVY-DUTY BUMPER                 */}
      {/* ========================================================= */}
      {(bumperId === 'classic-smooth-plate' || bumperId === 'prerunner-baja') && (
        <group>
          {/* Smooth Contoured Full-Width Faceplate */}
          <mesh material={finishMaterial} position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.18, 0.44, 0.36]} />
          </mesh>

          {/* Upper Brake Formed Facet */}
          <mesh material={finishMaterial} position={[0, 0.22, -0.04]} rotation={[-0.35, 0, 0]} castShadow>
            <boxGeometry args={[2.16, 0.12, 0.28]} />
          </mesh>

          {/* Mandrel-Bent Center Bull Bar */}
          <group position={[0, 0.28, 0.12]}>
            {/* Left Upright */}
            <mesh material={finishMaterial} position={[-0.42, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.48, 16]} />
            </mesh>
            {/* Right Upright */}
            <mesh material={finishMaterial} position={[0.42, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.48, 16]} />
            </mesh>
            {/* Top Bar */}
            <mesh material={finishMaterial} position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.038, 0.038, 0.86, 16]} />
            </mesh>
          </group>

          {/* Recessed Fog Light Pockets */}
          <mesh material={diamondPlateMaterial} position={[-0.75, 0, 0.14]}>
            <boxGeometry args={[0.22, 0.2, 0.1]} />
          </mesh>
          <mesh material={diamondPlateMaterial} position={[0.75, 0, 0.14]}>
            <boxGeometry args={[0.22, 0.2, 0.1]} />
          </mesh>

          {/* Lower Air Dam / Skid */}
          <mesh material={finishMaterial} position={[0, -0.26, -0.04]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[1.4, 0.2, 0.05]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
