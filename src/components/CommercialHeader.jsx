import React from 'react';
import {
  RotateCcw,
  QrCode,
  ShieldCheck,
  Camera,
  ExternalLink,
  Phone,
  Columns,
  Maximize2,
  SlidersHorizontal,
  LayoutTemplate
} from 'lucide-react';
import { CAMERA_ANGLES, SHOP_INFO } from '../data/commercialConfig';

export default function CommercialHeader({
  partNumber,
  vehicle,
  cameraAngle,
  setCameraAngle,
  onResetAll,
  onOpenShareModal,
  totalPrice,
  layoutMode,
  setLayoutMode
}) {
  return (
    <header className="h-14 sm:h-16 w-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 bg-[#0F1116]/90 backdrop-blur-2xl border-b border-white/10 z-40 relative select-none shrink-0">
      {/* 1. LEFT: Brand Emblem & Studio Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <img
          src="/assets/jacks-logo.png"
          alt="Jack's Bumpers Logo"
          className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.35)]"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-display font-black text-xs sm:text-base text-white tracking-wider sm:tracking-widest uppercase truncate max-w-[140px] sm:max-w-none">
              JACK'S BUMPERS
            </span>
            <span className="text-zinc-600 font-mono hidden md:inline">//</span>
            <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase hidden lg:inline">
              COMMERCIAL STUDIO
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 hidden sm:inline">
            CRAIG, COLORADO • 970-824-2423
          </span>
        </div>
      </div>

      {/* 2. CENTER: Dynamic Part Number Badge */}
      <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-xl bg-[#14171E] border border-white/10 shadow-inner">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono uppercase font-bold text-zinc-500">
            PART NO:
          </span>
          <span className="font-mono font-bold text-xs text-amber-400 tracking-wider truncate max-w-[220px]">
            {partNumber}
          </span>
        </div>
        <div className="w-[1px] h-3.5 bg-white/10" />
        <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>OEM RADAR VERIFIED</span>
        </div>
      </div>

      {/* 3. RIGHT: Layout Mode Switcher + Camera Angles + Reset + QR */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Layout View Mode Switcher: Split vs Full Stage */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#14171E] border border-white/10">
          <button
            onClick={() => setLayoutMode('split')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1 ${
              layoutMode === 'split'
                ? 'bg-amber-500 text-black shadow-glow-amber'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Split View (Studio Stage + CPQ Dock)"
          >
            <Columns className="w-3 h-3" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            onClick={() => setLayoutMode('stage')}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all flex items-center gap-1 ${
              layoutMode === 'stage'
                ? 'bg-amber-500 text-black shadow-glow-amber'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Expand Visualizer Stage (Cinema Mode)"
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Stage</span>
          </button>
        </div>

        {/* Camera Angle Switcher Pills */}
        <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-xl bg-[#14171E] border border-white/10">
          {CAMERA_ANGLES.map((cam) => {
            const isActive = cameraAngle === cam.id;
            return (
              <button
                key={cam.id}
                onClick={() => setCameraAngle(cam.id)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-glow-amber'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cam.label.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Reset Build Button */}
        <button
          onClick={onResetAll}
          className="p-1.5 sm:p-2 rounded-xl bg-[#14171E] hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition"
          title="Reset to Base Configuration"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* QR Share Trigger */}
        <button
          onClick={onOpenShareModal}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-glow-amber transition-all"
        >
          <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">QR</span>
        </button>
      </div>
    </header>
  );
}
