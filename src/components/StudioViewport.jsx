import React, { useState } from 'react';
import {
  Shield,
  Eye,
  Camera,
  Zap,
  CheckCircle,
  X,
  Activity,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { configuratorData, SPEC_HOTSPOTS } from '../data/configuratorData';

export default function StudioViewport({
  config = {
    vehicle: 'ford',
    series: 'apex',
    finish: 'matte-black',
    grilleGuard: true,
    ledPods: true,
    winch: false,
    shackles: true
  },
  onOpenGallery,
  layoutMode,
  setLayoutMode
}) {
  const [cameraAngle, setCameraAngle] = useState('front');
  const [lightsOn, setLightsOn] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Normalize config properties if passed as objects or string IDs
  const vehicleId = typeof config.vehicle === 'object' ? config.vehicle.id : (config.vehicle || 'ford');
  const seriesId = typeof config.series === 'object' ? config.series.id : (config.series || 'apex');
  const finishId = typeof config.finish === 'object' ? config.finish.id : (config.finish || 'matte-black');

  const selectedVehicle = configuratorData.vehicles.find((v) => v.id === vehicleId) || configuratorData.vehicles[0];
  const selectedSeries = configuratorData.series.find((s) => s.id === seriesId) || configuratorData.series[0];
  const selectedFinish = configuratorData.finishes.find((f) => f.id === finishId) || configuratorData.finishes[0];

  // Dynamic part number generation matching user's exact formula
  const buildSKU = `JB-${vehicleId.toUpperCase()}-${seriesId.toUpperCase()}-${finishId.toUpperCase()}${
    config.grilleGuard ? '-GG' : ''
  }${config.ledPods ? '-LED' : ''}${config.winch ? '-WN' : ''}${config.shackles ? '-SHK' : ''}`;

  // Resolve active commercial render
  const resolveImage = () => {
    if (cameraAngle === 'macro') {
      return '/assets/renders/bumper-macro-detail.jpg';
    }
    if (cameraAngle === 'profile') {
      return '/assets/renders/ford-f350-profile-side.jpg';
    }
    // Front 3/4 Hero
    if (vehicleId === 'ford') {
      return seriesId === 'trail'
        ? '/assets/renders/ford-f350-prerunner.jpg'
        : '/assets/renders/ford-f350-fullguard.jpg';
    }
    if (vehicleId === 'ram') {
      return '/assets/renders/ram-2500-winch.jpg';
    }
    if (vehicleId === 'chevy') {
      return '/assets/renders/chevy-2500hd-smooth.jpg';
    }
    return '/assets/renders/ford-f350-fullguard.jpg';
  };

  return (
    <div className="relative w-full h-full bg-[#050608] flex flex-col items-center justify-center overflow-hidden select-none min-h-0 min-w-0">
      {/* Studio Radial Spotlight & Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#161920] via-[#0A0B0D] to-[#050608] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1D212A_1px,transparent_1px),linear-gradient(to_bottom,#1D212A_1px,transparent_1px)] bg-[size:4rem_4.0rem] pointer-events-none" />

      {/* Top Telemetry & SKU Bar (Positioned below the 64px header navbar) */}
      <div className="absolute top-20 left-4 sm:left-6 right-4 sm:right-6 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="bg-[#14171D]/90 backdrop-blur-md border border-[#1D212A] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2.5 shadow-glass">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-[#8893A6]">BUILD SKU:</span>
          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider truncate max-w-[210px] sm:max-w-none">
            {buildSKU}
          </span>
        </div>

        {/* Camera View Switcher */}
        <div className="bg-[#14171D]/90 backdrop-blur-md border border-[#1D212A] p-1 rounded-xl flex items-center gap-1 shadow-glass">
          {[
            { id: 'front', label: '3/4 Hero' },
            { id: 'profile', label: 'Profile' },
            { id: 'macro', label: 'Gusset Detail' }
          ].map((cam) => (
            <button
              key={cam.id}
              onClick={() => setCameraAngle(cam.id)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-display font-medium transition-all ${
                cameraAngle === cam.id
                  ? 'bg-[#F59E0B] text-black font-bold shadow-glow-amber'
                  : 'text-[#8893A6] hover:text-white hover:bg-white/5'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>
      </div>

      {/* Central Visual Stage (Multi-Layer Product Compositor) */}
      <div className="relative z-0 w-full max-w-4xl h-[56vh] sm:h-[60vh] flex items-center justify-center p-3 sm:p-6 mt-16 sm:mt-20">
        <div className="relative w-full h-full border border-[#1D212A]/50 bg-[#0A0B0D]/40 backdrop-blur-xl rounded-3xl shadow-glass flex flex-col items-center justify-center p-4 sm:p-6 group overflow-hidden">
          
          {/* Studio Lighting Toggle Button */}
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`absolute top-4 sm:top-5 left-4 sm:left-5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border flex items-center gap-2 text-[11px] sm:text-xs font-mono transition-all z-20 shadow-glass ${
              lightsOn
                ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]'
                : 'bg-[#14171D] border-[#1D212A] text-[#8893A6] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Studio Auxiliary Lights: {lightsOn ? 'ON' : 'OFF'}</span>
          </button>

          {/* Truck Platform Badge Overlay (Top Right) */}
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-right z-20">
            <div className="text-[10px] sm:text-xs font-mono text-[#8893A6]">PLATFORM FITMENT</div>
            <div className="text-xs sm:text-sm font-display font-bold text-white mt-0.5 truncate max-w-[190px] sm:max-w-none">
              {selectedVehicle?.name}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-[#F59E0B] mt-0.5">
              {selectedVehicle?.badge}
            </div>
          </div>

          {/* Photorealistic Truck Visualizer with Composited Layers */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Ground Contact Shadow */}
            <div className="absolute bottom-[10%] left-[12%] right-[12%] h-[16%] bg-black/90 rounded-[100%] blur-3xl transform scale-y-45 pointer-events-none" />

            {/* Main Photorealistic Render */}
            <div className="relative max-w-full max-h-[80%] flex items-center justify-center">
              <img
                src={resolveImage()}
                alt={`${selectedVehicle?.name} - ${selectedSeries?.name}`}
                className="max-w-full max-h-[44vh] sm:max-h-[48vh] w-auto h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
                style={{
                  filter: selectedFinish?.cssFilter || 'none'
                }}
              />

              {/* Stainless Finish Specular Sheen */}
              {finishId === 'stainless' && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%, rgba(200,220,255,0.3) 100%)',
                    maskImage: 'radial-gradient(ellipse at 50% 60%, black 40%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, black 40%, transparent 70%)'
                  }}
                />
              )}

              {/* Auxiliary Lights Glow Overlay */}
              {lightsOn && config.ledPods && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-[62%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-3 bg-gradient-to-r from-transparent via-cyan-100 to-transparent blur-[2px] opacity-95 animate-pulse" />
                  <div className="absolute top-[62%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-32 sm:w-56 h-8 bg-amber-200/80 rounded-full blur-md" />
                </div>
              )}

              {/* Hotspot Markers on Canvas */}
              {cameraAngle === 'front' &&
                SPEC_HOTSPOTS.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{ left: spot.coords.x, top: spot.coords.y }}
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-glow-amber transition-all ${
                        activeHotspot === spot.id
                          ? 'bg-amber-400 text-black scale-110'
                          : 'bg-[#F59E0B] text-black hover:scale-105'
                      }`}
                      title={spot.label}
                    >
                      +
                    </button>

                    {activeHotspot === spot.id && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-[#12151C]/95 backdrop-blur-xl p-3.5 rounded-xl border border-amber-500/40 shadow-2xl text-xs space-y-1.5 text-left z-40 pointer-events-auto">
                        <div className="flex items-center justify-between font-bold text-white border-b border-white/10 pb-1.5">
                          <span className="text-amber-400 text-[11px] uppercase tracking-wider font-display">
                            {spot.title}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }}
                            className="text-zinc-400 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <ul className="space-y-1 text-[10px] text-zinc-300 font-sans">
                          {spot.specs.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="w-1 h-1 rounded-full bg-amber-400 mt-1 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Active Add-on Badges on Stage */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 justify-center z-20">
              {config.grilleGuard && (
                <span className="px-2.5 py-1 rounded-md bg-[#1D212A] border border-[#3E4657] text-[9px] sm:text-[10px] font-mono text-[#F59E0B]">
                  + Grille Guard Active
                </span>
              )}
              {config.ledPods && (
                <span
                  className={`px-2.5 py-1 rounded-md border text-[9px] sm:text-[10px] font-mono transition-all ${
                    lightsOn
                      ? 'bg-[#F59E0B] text-black border-[#F59E0B] font-bold shadow-glow-amber'
                      : 'bg-[#1D212A] border-[#3E4657] text-[#8893A6]'
                  }`}
                >
                  + Dual LED Pods {lightsOn ? 'GLOWING' : 'OFF'}
                </span>
              )}
              {config.winch && (
                <span className="px-2.5 py-1 rounded-md bg-[#1D212A] border border-[#3E4657] text-[9px] sm:text-[10px] font-mono text-[#F59E0B]">
                  + 16.5k Winch Tray
                </span>
              )}
              {config.shackles && (
                <span className="px-2.5 py-1 rounded-md bg-[#1D212A] border border-[#3E4657] text-[9px] sm:text-[10px] font-mono text-zinc-300">
                  + Forged D-Rings
                </span>
              )}
            </div>

            {/* Spec Hotspots Helper Pill */}
            <div className="absolute bottom-2 left-4 hidden sm:flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-black font-bold text-[10px] flex items-center justify-center shadow-glow-amber">
                +
              </span>
              <span className="text-[10px] font-mono text-[#8893A6] bg-[#14171D]/90 px-2 py-0.5 rounded border border-[#1D212A]">
                Click Hotspots for Specs
              </span>
            </div>
          </div>

          {/* Architectural Floor Grid Ticks */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[8px] sm:text-[9px] font-mono text-[#8893A6] tracking-widest border-t border-[#1D212A] pt-1.5 opacity-70">
            <span>AXIS X: 0.00 IN</span>
            <span className="hidden sm:inline">HEAVY GAUGE A36 STEEL PLATE</span>
            <span>TOLERANCE: ±0.1 MM</span>
          </div>
        </div>
      </div>

      {/* Live Telemetry HUD (Bottom Left) */}
      <div className="absolute bottom-3 left-4 hidden lg:flex items-center gap-5 bg-[#14171D]/90 backdrop-blur-md border border-[#1D212A] px-4 py-2.5 rounded-2xl z-20 shadow-glass">
        <div>
          <div className="text-[9px] font-mono text-[#8893A6]">STEEL GAUGE</div>
          <div className="text-xs font-mono font-bold text-white mt-0.5">
            {selectedSeries?.steelGauge || '1/4" Plate / 3/16" Wings'}
          </div>
        </div>
        <div className="w-px h-7 bg-[#1D212A]" />
        <div>
          <div className="text-[9px] font-mono text-[#8893A6]">APPROACH ANGLE</div>
          <div className="text-xs font-mono font-bold text-[#F59E0B] mt-0.5">
            {selectedSeries?.approachGain || '+14.5°'} Improvement
          </div>
        </div>
        <div className="w-px h-7 bg-[#1D212A]" />
        <div>
          <div className="text-[9px] font-mono text-[#8893A6]">FABRICATION LEAD</div>
          <div className="text-xs font-mono font-bold text-white mt-0.5">
            {selectedSeries?.leadTime || '2-3 Weeks'}
          </div>
        </div>
      </div>
    </div>
  );
}
