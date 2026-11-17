import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Shield,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Camera,
  Layers,
  Wrench,
  CheckCircle2,
  Cpu,
  Activity,
  X,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Columns,
  Square
} from 'lucide-react';
import { SPEC_HOTSPOTS } from '../data/commercialConfig';

export default function CommercialStudioStage({
  vehicle,
  bumper,
  finish,
  upfits,
  cameraAngle,
  lightsOn,
  setLightsOn,
  telemetry,
  onOpenGallery,
  layoutMode,
  setLayoutMode
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isTelemetryCollapsed, setIsTelemetryCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Determine active photorealistic base image
  const activeImage = useMemo(() => {
    if (cameraAngle === 'macro') {
      return '/assets/renders/bumper-macro-detail.jpg';
    }
    if (cameraAngle === 'side') {
      return vehicle.images?.side || '/assets/renders/ford-f350-profile-side.jpg';
    }
    if (cameraAngle === 'front') {
      return vehicle.images?.front || '/assets/renders/ford-f350-headon.jpg';
    }

    // 3/4 Hero Front Angle (Default)
    if (vehicle.id === 'ford') {
      if (bumper.id === 'apex') return '/assets/renders/ford-f350-fullguard.jpg';
      if (bumper.id === 'trail') return '/assets/renders/ford-f350-prerunner.jpg';
      return '/assets/renders/ford-f350-fullguard.jpg';
    }
    if (vehicle.id === 'ram') {
      return '/assets/renders/ram-2500-winch.jpg';
    }
    if (vehicle.id === 'chevy') {
      return '/assets/renders/chevy-2500hd-smooth.jpg';
    }
    return vehicle.images?.hero || '/assets/renders/ford-f350-fullguard.jpg';
  }, [vehicle, bumper, cameraAngle]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-w-0 min-h-0 bg-[#050608] flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. STUDIO LIGHTING GRADIENT & REFLECTIVE FLOOR */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Studio Key Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#181D26_0%,#0A0D12_55%,#050608_100%)] opacity-95" />

        {/* Reflective Concrete Ground Plane */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#050608] via-[#0A0D12] to-transparent" />

        {/* Studio Floor Radial Light Spill */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[300px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(245,158,11,0.07)_0%,transparent_70%)]" />

        {/* Architectural Precision Grid Measurement Ticks along Bottom Edge */}
        <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-zinc-600 border-b border-white/10 pb-1 opacity-60">
          <span>00" [FRAME DATUM]</span>
          <span className="hidden sm:inline">12"</span>
          <span>24" [AXLE]</span>
          <span className="hidden sm:inline">36"</span>
          <span>48" [MOUNT]</span>
          <span className="hidden sm:inline">60"</span>
          <span>72" [APPROACH]</span>
          <span className="hidden sm:inline">84"</span>
          <span>96" [REACH]</span>
        </div>
      </div>

      {/* 2. TOP-LEFT CANVAS SIZING & SCREEN TOOLS */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 flex items-center gap-1.5 p-1 rounded-xl bg-[#12151C]/90 backdrop-blur-xl border border-white/10 shadow-glass text-xs font-mono">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetZoom}
          className="px-2 py-1 rounded-lg text-[10px] font-bold text-zinc-400 hover:text-amber-400 hover:bg-white/10 transition"
          title="Fit to Screen"
        >
          {Math.round(zoomLevel * 100)}%
        </button>
        <div className="w-[1px] h-3.5 bg-white/10" />
        {setLayoutMode && (
          <button
            onClick={() => setLayoutMode(layoutMode === 'stage' ? 'split' : 'stage')}
            className={`p-1.5 rounded-lg transition ${
              layoutMode === 'stage'
                ? 'bg-amber-500 text-black font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title={layoutMode === 'stage' ? 'Restore Split View' : 'Expand Stage (Full Width)'}
          >
            {layoutMode === 'stage' ? <Columns className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        )}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition hidden sm:inline-flex"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 3. MULTI-LAYER IMAGE COMPOSITING ENGINE */}
      <div
        className="relative w-full h-full max-h-[calc(100%-70px)] flex items-center justify-center p-3 sm:p-6 md:p-8 z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoomLevel})`
        }}
      >
        {/* Contact Ambient Occlusion Shadow */}
        <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[18%] bg-black/90 rounded-[100%] blur-3xl transform scale-y-45 pointer-events-none" />

        {/* Layer 0 & Layer 1: Base Vehicle + Bumper Composited View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${vehicle.id}-${bumper.id}-${cameraAngle}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={activeImage}
              alt={`${vehicle.name} - ${bumper.name}`}
              className="max-w-full max-h-[62vh] sm:max-h-[68vh] md:max-h-[74vh] w-auto h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
              style={{
                filter: finish.cssFilter || 'none'
              }}
            />

            {/* Layer 1.5: Finish Material Tint & Specular Grain Overlay */}
            {finish.id === 'stainless' && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%, rgba(200,220,255,0.3) 100%)',
                  maskImage: 'radial-gradient(ellipse at 50% 60%, black 40%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, black 40%, transparent 70%)'
                }}
              />
            )}
            {finish.id === 'hammered' && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                  backgroundColor: '#4B5563',
                  maskImage: 'radial-gradient(ellipse at 50% 65%, black 40%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 65%, black 40%, transparent 70%)'
                }}
              />
            )}

            {/* Layer 2: Structural Add-Ons (Shackles) */}
            {upfits.shackles && (
              <div className="absolute bottom-[35%] left-[30%] pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)] inline-block animate-pulse" />
              </div>
            )}

            {/* Layer 3: High-Lux LED Optical Flare & Beam Throw */}
            {lightsOn && (upfits.ledPods || upfits.lightBar) && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[62%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-48 sm:w-80 h-3 bg-gradient-to-r from-transparent via-cyan-100 to-transparent blur-[2px] opacity-95 animate-pulse" />
                <div className="absolute top-[62%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-32 sm:w-56 h-8 bg-amber-200/80 rounded-full blur-md" />
                <div
                  className="absolute bottom-0 left-[25%] right-[25%] h-[40%] bg-gradient-to-t from-amber-400/20 via-amber-200/10 to-transparent blur-2xl transform perspective-500 rotate-x-60"
                  style={{
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)'
                  }}
                />
              </div>
            )}

            {/* Layer 4: Interactive Safety Amber Pulsing Spec Hotspots */}
            {cameraAngle === 'hero' &&
              SPEC_HOTSPOTS.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{ left: spot.coords.x, top: spot.coords.y }}
                  >
                    <div className="relative group">
                      <button
                        onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-amber-400 text-black shadow-glow-amber scale-110'
                            : 'bg-[#14171E]/90 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/40 shadow-lg'
                        }`}
                        title={spot.label}
                      >
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      </button>

                      {!isActive && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#0F1116]/95 border border-white/10 text-[10px] font-mono text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                          {spot.label}
                        </div>
                      )}

                      {/* Hotspot Technical Card Popover */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-9 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-[#12151C]/95 backdrop-blur-2xl p-4 rounded-2xl border border-amber-500/40 shadow-2xl text-xs space-y-2 pointer-events-auto z-40 text-left"
                        >
                          <div className="flex items-center justify-between font-bold text-white border-b border-white/10 pb-2">
                            <span className="text-amber-400 font-display uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5" />
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
                          <ul className="space-y-1.5 text-[11px] text-zinc-300 font-sans">
                            {spot.specs.map((s, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <span>A36 Structural Steel</span>
                            <span className="text-emerald-400 font-semibold">100% US Made</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. LIVE TELEMETRY HUD (Bottom-Left of Canvas) */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        <button
          onClick={() => setIsTelemetryCollapsed(!isTelemetryCollapsed)}
          className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-[#12151C]/90 backdrop-blur-xl border border-white/10 text-[10px] font-mono text-zinc-400 shadow-glass pointer-events-auto hover:text-white transition w-fit"
        >
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="uppercase tracking-wider font-bold text-zinc-300">Live Telemetry</span>
          </div>
          {isTelemetryCollapsed ? <ChevronUp className="w-3 h-3 text-zinc-500" /> : <ChevronDown className="w-3 h-3 text-zinc-500" />}
        </button>

        {!isTelemetryCollapsed && (
          <div className="grid grid-cols-2 gap-2 p-3 sm:p-3.5 rounded-2xl bg-[#12151C]/90 backdrop-blur-xl border border-white/10 shadow-glass font-mono text-xs max-w-[280px] sm:max-w-xs pointer-events-auto animate-in fade-in duration-150">
            <div>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase">Added Weight</span>
              <strong className="text-white text-xs sm:text-sm font-black">+{telemetry?.weight || 165} LBS</strong>
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase">Approach Gain</span>
              <strong className="text-emerald-400 text-xs sm:text-sm font-black">+{telemetry?.approachAngle || 6.5}°</strong>
            </div>
            <div className="pt-1.5 border-t border-white/5">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase">Steel Gauge</span>
              <span className="text-zinc-300 text-[10px] sm:text-[11px] font-bold truncate block">{bumper.steelGauge || '1/4" A36'}</span>
            </div>
            <div className="pt-1.5 border-t border-white/5">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase">Est. Lead Time</span>
              <span className="text-amber-400 text-[10px] sm:text-[11px] font-bold">{telemetry?.leadTime || '2-3 Weeks'}</span>
            </div>
          </div>
        )}
      </div>

      {/* 5. FLOATING STAGE CONTROLS (Bottom-Right of Canvas) */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2 pointer-events-auto">
        {/* Interactive Studio Lights: ON / OFF Toggle */}
        <button
          onClick={() => setLightsOn(!lightsOn)}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold font-display uppercase tracking-wider transition-all shadow-glass ${
            lightsOn
              ? 'bg-amber-500 text-black shadow-glow-amber'
              : 'bg-[#12151C]/85 hover:bg-[#1A1E26] text-zinc-400 hover:text-white border border-white/10'
          }`}
          title="Toggle Quake LED optics"
        >
          <Lightbulb className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${lightsOn ? 'stroke-[2.5]' : ''}`} />
          <span>Optics: {lightsOn ? 'ON' : 'OFF'}</span>
        </button>

        {/* Real Craig, CO Builds Lightbox Launcher */}
        <button
          onClick={onOpenGallery}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl sm:rounded-2xl bg-[#12151C]/85 hover:bg-[#1A1E26] text-amber-400 text-[11px] sm:text-xs font-bold font-display uppercase tracking-wider border border-white/10 shadow-glass transition-all group"
        >
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Shop Archive</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[9px] sm:text-[10px] text-amber-300 font-mono">5</span>
        </button>
      </div>
    </div>
  );
}
