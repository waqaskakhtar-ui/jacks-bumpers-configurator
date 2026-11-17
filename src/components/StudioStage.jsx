import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Info,
  Camera,
  RotateCw,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import CanvasStudio from './CanvasStudio';

export default function StudioStage({
  truck,
  bumper,
  paintColor,
  finish,
  winch,
  optics,
  hardware,
  lightsOn,
  setLightsOn,
  backdropMode,
  setBackdropMode,
  showSpecsHotspot,
  setShowSpecsHotspot,
  onOpenGallery
}) {
  // Map configuration state to CanvasStudio props
  const config = useMemo(() => {
    let finishType = 'matte-black';
    if (finish.id === 'raw-steel') finishType = 'stainless';
    if (finish.id === 'bedliner') finishType = 'hammered';

    return {
      truck: truck.id,
      bumper: bumper.id,
      finish: finishType,
      paint: paintColor.hex,
      grilleGuard: bumper.id === 'full-grille-guard',
      ledPods: lightsOn && (optics.lightBar || optics.fogPods),
      winch: winch.id !== 'none',
      shackles: hardware.shackles,
      logoPlate: hardware.logoPlate
    };
  }, [truck, bumper, finish, paintColor, lightsOn, optics, winch, hardware]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#050608] select-none">
      {/* 1. Backdrop Glow (Studio vs Craig Colorado Mountain Dusk) */}
      <AnimatePresence mode="wait">
        {backdropMode === 'craig' && (
          <motion.div
            key="craig-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
            style={{
              backgroundImage: `url('/assets/renders/craig-twilight-backdrop.jpg')`,
              filter: 'brightness(0.3) contrast(1.2)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-[#050608]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/80 via-transparent to-[#050608]/80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive 3D WebGL CanvasStudio Assembly */}
      <div className="absolute inset-0 w-full h-full z-10">
        <CanvasStudio config={config} />
      </div>

      {/* 360 Orbit Interaction Hint Pill */}
      <div className="absolute top-20 right-6 lg:right-[430px] z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A]/75 backdrop-blur-md border border-white/10 shadow-glass text-[11px] font-mono text-zinc-400 pointer-events-none">
        <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>360° Drag to Orbit • Scroll to Zoom</span>
      </div>

      {/* 3. Bottom Floating Glassmorphic Dock */}
      <div className="absolute bottom-6 left-6 right-6 lg:right-[430px] z-30 flex items-center justify-between gap-3 pointer-events-none">
        {/* Left: Active Truck & Bumper Badge */}
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#12141A]/85 backdrop-blur-xl border border-white/10 shadow-glass">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-wide font-display">
              {truck.name.split('/')[0]}
            </span>
            <span className="text-[11px] text-amber-400/90 font-medium font-mono">
              {bumper.name}
            </span>
          </div>
        </div>

        {/* Center / Right: Interactive Stage Toggles */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#12141A]/85 backdrop-blur-xl border border-white/10 shadow-glass">
          {/* Backdrop Mode Toggle */}
          <button
            onClick={() => setBackdropMode(backdropMode === 'craig' ? 'studio' : 'craig')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              backdropMode === 'craig'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Studio vs Colorado Mountains"
          >
            <span>{backdropMode === 'craig' ? '🏔️ Craig Dusk' : '🏢 Dark Studio'}</span>
          </button>

          <div className="w-[1px] h-5 bg-white/10" />

          {/* Quake LED Lighting Switch */}
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              lightsOn
                ? 'bg-amber-500 text-black shadow-glow-amber font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Quake LED light bars and headlights"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${lightsOn ? 'stroke-[2.5]' : ''}`} />
            <span>LEDs {lightsOn ? 'ON' : 'OFF'}</span>
          </button>

          <div className="w-[1px] h-5 bg-white/10" />

          {/* X-Ray Chassis Mount Hotspot Toggle */}
          <button
            onClick={() => setShowSpecsHotspot(!showSpecsHotspot)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              showSpecsHotspot
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="View chassis horn direct mounting specs"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Chassis Mount</span>
          </button>

          <div className="w-[1px] h-5 bg-white/10" />

          {/* Real Craig, CO Shop Builds Lightbox Launcher */}
          <button
            onClick={onOpenGallery}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 transition-all group"
          >
            <Camera className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Real Builds (5)</span>
          </button>
        </div>
      </div>

      {/* Chassis Mount Specs Modal */}
      {showSpecsHotspot && (
        <div className="absolute bottom-24 left-6 z-40 max-w-sm bg-[#12141A]/95 backdrop-blur-2xl p-5 rounded-3xl border border-amber-500/30 shadow-glass text-xs space-y-2 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between font-bold text-white">
            <span className="text-amber-400 flex items-center gap-2 font-display uppercase tracking-wider text-xs">
              <ShieldAlert className="w-4 h-4" /> 1/4" Grade-8 Direct Chassis Mount
            </span>
            <button
              onClick={() => setShowSpecsHotspot(false)}
              className="text-zinc-400 hover:text-white text-base leading-none"
            >
              &times;
            </button>
          </div>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            Every Jack's Bumper bolts directly to the truck's factory hydroformed frame horns using precision laser-cut 1/4" Grade-8 steel chassis brackets. Zero cutting, drilling, or welding to your factory truck frame required.
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>Craig, Colorado Fab Shop</span>
            <span className="text-emerald-400 font-semibold">100% US Heavy Steel</span>
          </div>
        </div>
      )}
    </div>
  );
}
