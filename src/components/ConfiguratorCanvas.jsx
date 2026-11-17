import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Lightbulb,
  Maximize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Camera,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import TruckVisualizer from './TruckVisualizer';

export default function ConfiguratorCanvas({
  truck,
  paintColor,
  bumper,
  finish,
  winch,
  lighting,
  recovery,
  onOpenGallery
}) {
  const [backdropMode, setBackdropMode] = useState('craig'); // 'craig' or 'studio'
  const [lightsOn, setLightsOn] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspotInfo, setShowHotspotInfo] = useState(false);

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(Number((prev + delta).toFixed(1)), 0.8), 1.5));
  };

  const resetView = () => {
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full min-h-[460px] bg-[#0E1013] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-between">
      {/* Top Floating Stage HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Live Build Spec Pill */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#17191E]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-[220px]">
            {truck.name.split('/')[0]}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="text-amber-400 font-medium truncate max-w-[120px] sm:max-w-[180px]">
            {bumper.name.split(' ')[0]} {bumper.name.split(' ')[1]}
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#17191E]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
          {/* Backdrop Mode Toggle */}
          <button
            onClick={() => setBackdropMode(backdropMode === 'craig' ? 'studio' : 'craig')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Toggle Craig Rockies vs Studio Floor"
          >
            {backdropMode === 'craig' ? (
              <>
                <span className="text-amber-400">🏔️</span>
                <span className="hidden sm:inline">Craig Backdrop</span>
              </>
            ) : (
              <>
                <span className="text-blue-400">🏢</span>
                <span className="hidden sm:inline">Studio Grid</span>
              </>
            )}
          </button>

          <div className="w-[1px] h-4 bg-white/10"></div>

          {/* Quake LED & Headlights Switch */}
          <button
            onClick={() => setLightsOn(!lightsOn)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              lightsOn
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
            title="Toggle Quake LED Lights & Headlight Beams"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${lightsOn ? 'text-amber-400 fill-amber-400' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">LEDs {lightsOn ? 'ON' : 'OFF'}</span>
          </button>

          <div className="w-[1px] h-4 bg-white/10"></div>

          {/* Zoom Controls */}
          <button
            onClick={() => handleZoom(0.1)}
            disabled={zoomLevel >= 1.5}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            disabled={zoomLevel <= 0.8}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={resetView}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-white/10 transition"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive SVG Vehicle Stage */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <TruckVisualizer
            truckId={truck.id}
            paintColor={paintColor}
            bumperId={bumper.id}
            finishId={finish.id}
            winchId={winch.id}
            lighting={lighting}
            recovery={recovery}
            lightsOn={lightsOn}
            backdropMode={backdropMode}
          />
        </div>

        {/* Hotspot details tooltip toggle */}
        <button
          onClick={() => setShowHotspotInfo(!showHotspotInfo)}
          className="absolute bottom-16 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17191E]/90 hover:bg-[#20232B] border border-white/10 text-xs text-zinc-300 hover:text-white shadow-lg transition"
        >
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Mounting Specs</span>
        </button>

        {showHotspotInfo && (
          <div className="absolute bottom-28 left-4 z-30 max-w-xs bg-[#1A1D24] p-3.5 rounded-xl border border-amber-500/30 shadow-2xl text-xs space-y-2 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between font-semibold text-white">
              <span className="flex items-center gap-1.5 text-amber-400">
                <ShieldCheck className="w-4 h-4" /> Direct Frame Mount
              </span>
              <button
                onClick={() => setShowHotspotInfo(false)}
                className="text-zinc-400 hover:text-white text-base leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Every Jack's Bumper bolts directly to the truck's high-tensile hydroformed chassis horns using 1/4" Grade 8 steel mounting brackets. No drilling required.
            </p>
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
              <span>Craig, Colorado Fab Shop</span>
              <span className="text-emerald-400 font-mono">100% US Steel</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Bar: Active Options Pills & Scraped Real Builds Launcher */}
      <div className="relative z-20 px-4 py-3 bg-gradient-to-t from-[#101216] via-[#101216]/95 to-transparent border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
        {/* Active Specs Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Finish Chip */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300">
            <span
              className="w-2 h-2 rounded-full border border-white/30"
              style={{
                backgroundColor:
                  finish.id === 'color-match' ? paintColor.hex : finish.id === 'raw-steel' ? '#94A3B8' : '#27272A'
              }}
            ></span>
            {finish.name.split(' ')[0]} Finish
          </span>

          {/* Winch Chip */}
          {winch.id === 'winch-12k' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-[11px] text-red-300">
              <CheckCircle2 className="w-3 h-3 text-red-400" />
              12,000 lb Winch
            </span>
          )}

          {/* Quake LED Chip */}
          {(lighting.lightBar || lighting.fogPods) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Quake LED {lighting.lightBar && lighting.fogPods ? 'Bar + Pods' : lighting.lightBar ? '20" Bar' : 'Fog Pods'}
            </span>
          )}

          {/* Recovery Shackles */}
          {recovery.shackles && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 border border-white/10 text-[11px] text-zinc-300">
              3/4" D-Rings
            </span>
          )}
        </div>

        {/* Real Shop Builds Launcher Button */}
        <button
          onClick={onOpenGallery}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 text-xs font-semibold shadow-sm transition-all group"
        >
          <Camera className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Real Shop Builds (Craig, CO)</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[10px] text-amber-300 font-mono">
            5 Photos
          </span>
        </button>
      </div>
    </div>
  );
}
