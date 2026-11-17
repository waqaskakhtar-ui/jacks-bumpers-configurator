// ============================================================================
// FILE: src/components/CanvasStudio.jsx
// ============================================================================
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, N8AO, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Procedural, Photorealistic Heavy-Duty Commercial Bumper & Truck Chassis
function TruckAssembly({ config }) {
  const groupRef = useRef();

  // Subtle floating industrial vibration when active
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.03;
    }
  });

  // Material finish selection based on config state
  const getMaterialProps = () => {
    switch (config?.finish) {
      case 'stainless':
      case 'raw-steel':
        return { color: '#D1D5DB', metalness: 0.95, roughness: 0.15 };
      case 'hammered':
      case 'bedliner':
        return { color: '#374151', metalness: 0.6, roughness: 0.5 };
      case 'matte-black':
      default:
        return { color: '#111827', metalness: 0.4, roughness: 0.85 };
    }
  };

  const mat = getMaterialProps();
  const hasGrilleGuard = config?.grilleGuard !== false && (config?.bumper === 'full-grille-guard' || config?.grilleGuard === true);
  const hasLedPods = config?.ledPods !== false && (config?.optics?.lightBar || config?.optics?.fogPods || config?.ledPods === true);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Heavy Duty Chassis Frame Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.4, 4.8]} />
        <meshStandardMaterial color="#0A0B0D" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Heavy Duty Commercial Bumper Shell */}
      <group position={[0, 0.15, 2.4]}>
        {/* Main Bumper Bar */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.36, 0.55, 0.65]} />
          <meshStandardMaterial {...mat} />
        </mesh>

        {/* Steel Winch Mount Housing Center Plate */}
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[0.9, 0.38, 0.5]} />
          <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.4} />
        </mesh>

        {/* Conditional Option: Grille Guard / Stinger Hoop */}
        {hasGrilleGuard && (
          <group position={[0, 0.5, -0.1]}>
            {/* Left Upright Pillar */}
            <mesh position={[-0.8, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.9, 32]} />
              <meshStandardMaterial {...mat} />
            </mesh>
            {/* Right Upright Pillar */}
            <mesh position={[0.8, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.9, 32]} />
              <meshStandardMaterial {...mat} />
            </mesh>
            {/* Center Top Hoop Bar */}
            <mesh position={[0, 0.85, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 1.68, 32]} />
              <meshStandardMaterial {...mat} />
            </mesh>
          </group>
        )}

        {/* Conditional Option: LED Light Pods */}
        {hasLedPods && (
          <>
            <mesh position={[-0.7, 0, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.22, 0.12, 0.08]} />
              <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.7, 0, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.22, 0.12, 0.08]} />
              <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={2} />
            </mesh>
          </>
        )}

        {/* Heavy Duty D-Ring Shackles */}
        <mesh position={[-0.75, -0.15, 0.38]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.025, 16, 32]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.75, -0.15, 0.38]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.08, 0.025, 16, 32]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function CanvasStudio({ config }) {
  return (
    <div className="w-full h-full relative bg-[#050608]">
      <Canvas
        shadows
        camera={{ position: [3.5, 2.2, 4.5], fov: 45 }}
        gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      >
        {/* Studio Environment & Lighting */}
        <color attach="background" args={['#050608']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]} />
        <pointLight position={[-5, 3, -3]} intensity={1.5} color="#5336CC" />
        <pointLight position={[0, -2, 3]} intensity={0.8} color="#F59E0B" />

        <Environment preset="city" />

        {/* 3D Model Assembly */}
        <TruckAssembly config={config} />

        {/* Ground Floor Reflector */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={40}
            roughness={0.6}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050608"
            metalness={0.5}
            mirror={0.4}
          />
        </mesh>

        <ContactShadows position={[0, -1.19, 0]} opacity={0.75} scale={12} blur={2.5} far={4} />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2 - 0.02}
          autoRotate={false}
          makeDefault
        />

        {/* Cinematic Post Processing */}
        <EffectComposer multisampling={4}>
          <N8AO intensity={18} color="#000000" aoRadius={0.6} distanceFalloff={1} />
          <Bloom luminanceThreshold={0.8} intensity={0.6} mipmapBlur />
          <Vignette eskil={false} offset={0.1} darkness={0.75} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
