import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Shield,
  Wrench,
  FileText,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  RotateCcw,
  Clock,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import {
  TRUCK_MODELS,
  BUMPER_STYLES,
  PAINT_COLORS,
  FINISH_OPTIONS,
  WINCH_OPTIONS,
  OPTICS_OPTIONS,
  HARDWARE_OPTIONS
} from '../data/configuratorOptions';

export default function ConfiguratorRail({
  currentStep,
  setCurrentStep,
  selectedTruck,
  setSelectedTruck,
  selectedBumper,
  setSelectedBumper,
  selectedPaint,
  setSelectedPaint,
  selectedFinish,
  setSelectedFinish,
  selectedWinch,
  setSelectedWinch,
  optics,
  setOptics,
  hardware,
  setHardware,
  estimatedTotal,
  onOpenQuoteModal,
  onResetAll
}) {
  const steps = [
    { num: 1, label: '01 VEHICLE', icon: Truck },
    { num: 2, label: '02 BUMPER', icon: Shield },
    { num: 3, label: '03 ARMOR & OPTICS', icon: Wrench },
    { num: 4, label: '04 BUILD SHEET', icon: FileText }
  ];

  return (
    <aside className="w-full lg:w-[410px] h-auto lg:h-full flex flex-col bg-[#0F1116]/90 backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/10 z-30 shadow-glass overflow-hidden">
      {/* Top Breadcrumb Step Navigator */}
      <div className="flex border-b border-white/10 p-2 gap-1 bg-[#0A0B0E]/80">
        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          return (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`flex-1 py-2 px-1.5 rounded-xl text-[10px] sm:text-xs font-bold tracking-wider font-display transition-all flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-amber-500 text-black shadow-glow-amber'
                  : isCompleted
                  ? 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1">
                {isCompleted ? (
                  <Check className="w-3 h-3 stroke-[3]" />
                ) : (
                  <span>{step.label.split(' ')[0]}</span>
                )}
              </div>
              <span className="text-[9px] uppercase tracking-wider hidden sm:inline opacity-90 truncate">
                {step.label.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rail Body Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* STEP 1: VEHICLE PLATFORM & FACTORY PAINT                 */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5" /> Select Heavy-Duty Rig
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-mono">4 Verified Chassis</span>
                </div>

                <div className="space-y-2.5">
                  {TRUCK_MODELS.map((truck) => {
                    const isSelected = selectedTruck.id === truck.id;
                    return (
                      <div
                        key={truck.id}
                        onClick={() => setSelectedTruck(truck)}
                        className={`p-3.5 rounded-2xl cursor-pointer border transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'bg-[#181C24] border-amber-500 shadow-glow-amber ring-1 ring-amber-500/40'
                            : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white font-display">
                                {truck.name}
                              </h4>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">
                                {truck.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                              {truck.sub}
                            </p>
                            <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                              {truck.description}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 shrink-0 ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-black'
                                : 'border-zinc-700 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Factory Paint Colors */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display">
                    OEM Factory Clearcoat
                  </h3>
                  <span className="text-xs font-semibold text-white font-display">
                    {selectedPaint.name}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {PAINT_COLORS.map((color) => {
                    const isSelected = selectedPaint.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setSelectedPaint(color)}
                        className="group flex flex-col items-center gap-1.5 focus:outline-none"
                        title={color.name}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center border-2 shadow-md relative ${
                            isSelected
                              ? 'border-amber-400 scale-105 shadow-glow-amber'
                              : 'border-white/20 hover:border-white/50'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && (
                            <Check
                              className={`w-4 h-4 stroke-[3] ${
                                color.id === 'oxford-white' || color.id === 'iconic-silver'
                                  ? 'text-black'
                                  : 'text-white'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[9px] text-zinc-400 group-hover:text-white truncate max-w-[48px] text-center">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: BUMPER ARCHITECTURE                              */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Bumper Architecture
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Jack's Custom Fab</span>
              </div>

              <div className="space-y-3">
                {BUMPER_STYLES.map((b) => {
                  const isSelected = selectedBumper.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBumper(b)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'bg-[#181C24] border-amber-500 shadow-glow-amber ring-1 ring-amber-500/40'
                          : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white font-display">
                              {b.name}
                            </h4>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">
                              {b.badge}
                            </span>
                          </div>
                          <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                            {b.tagline}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                            {b.description}
                          </p>

                          {/* Key Specs */}
                          <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2.5 border-t border-white/10">
                            {b.specs.slice(0, 2).map((s, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-[10px] text-zinc-300 truncate">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                <span className="truncate">{s}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 text-[10px] text-zinc-400 font-mono">
                            <span>Weight: <strong className="text-zinc-200">{b.weight}</strong></span>
                            <span>Lead: <strong className="text-emerald-400">{b.leadTime}</strong></span>
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-white font-mono">
                            ${b.basePrice.toLocaleString()}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border mt-2 ml-auto ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-black'
                                : 'border-zinc-700 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: ARMOR FINISH, RECOVERY & QUAKE OPTICS            */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* 1. Armor Coating & Finish */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5" /> Armor Finish & Coating
                  </h3>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {selectedFinish.price === 0 ? 'Included' : `+$${selectedFinish.price}`}
                  </span>
                </div>
                <div className="space-y-2">
                  {FINISH_OPTIONS.map((f) => {
                    const isSelected = selectedFinish.id === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFinish(f)}
                        className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white font-display">{f.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{f.sub}</div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-2">
                          {f.price === 0 ? '+$0' : `+$${f.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Winch System */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" /> Winch System
                  </h3>
                </div>
                <div className="space-y-2">
                  {WINCH_OPTIONS.map((w) => {
                    const isSelected = selectedWinch.id === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => setSelectedWinch(w)}
                        className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white font-display">{w.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{w.sub}</div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-2">
                          {w.price === 0 ? '+$0' : `+$${w.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Quake LED Lighting Optics */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" /> Quake LED Optics
                  </h3>
                </div>
                <div className="space-y-2">
                  {/* 20" Bar */}
                  <div
                    onClick={() => setOptics((prev) => ({ ...prev, lightBar: !prev.lightBar }))}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      optics.lightBar
                        ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">{OPTICS_OPTIONS.lightBar.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{OPTICS_OPTIONS.lightBar.sub}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-mono font-bold text-amber-400">+${OPTICS_OPTIONS.lightBar.price}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${optics.lightBar ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-700'}`}>
                        {optics.lightBar && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  {/* Fog Pods */}
                  <div
                    onClick={() => setOptics((prev) => ({ ...prev, fogPods: !prev.fogPods }))}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      optics.fogPods
                        ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">{OPTICS_OPTIONS.fogPods.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{OPTICS_OPTIONS.fogPods.sub}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-mono font-bold text-amber-400">+${OPTICS_OPTIONS.fogPods.price}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${optics.fogPods ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-700'}`}>
                        {optics.fogPods && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Recovery Hardware & Custom Logo */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Recovery & Shop Touches
                  </h3>
                </div>
                <div className="space-y-2">
                  {/* Shackles */}
                  <div
                    onClick={() => setHardware((prev) => ({ ...prev, shackles: !prev.shackles }))}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      hardware.shackles
                        ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">{HARDWARE_OPTIONS.shackles.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{HARDWARE_OPTIONS.shackles.sub}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-mono font-bold text-amber-400">+${HARDWARE_OPTIONS.shackles.price}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${hardware.shackles ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-700'}`}>
                        {hardware.shackles && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  {/* Logo Plate */}
                  <div
                    onClick={() => setHardware((prev) => ({ ...prev, logoPlate: !prev.logoPlate }))}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      hardware.logoPlate
                        ? 'bg-[#181C24] border-amber-500 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-[#12141A] border-white/5 hover:border-white/20 hover:bg-[#161820]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-display">{HARDWARE_OPTIONS.logoPlate.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{HARDWARE_OPTIONS.logoPlate.sub}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs font-mono font-bold text-amber-400">+${HARDWARE_OPTIONS.logoPlate.price}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${hardware.logoPlate ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-700'}`}>
                        {hardware.logoPlate && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: BUILD SHEET BREAKDOWN                            */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Studio Build Sheet
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Full Spec</span>
              </div>

              <div className="bg-[#12141A] rounded-2xl p-4 border border-white/10 space-y-3 font-mono text-xs">
                {/* Truck */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-white font-display">{selectedTruck.name}</div>
                    <div className="text-[10px] text-zinc-400 font-sans mt-0.5">Paint: {selectedPaint.name}</div>
                  </div>
                  <span className="text-zinc-500 text-[11px]">Base Rig</span>
                </div>

                {/* Bumper */}
                <div className="pt-2 border-t border-white/5 flex items-start justify-between">
                  <div>
                    <div className="font-bold text-amber-400 font-display">{selectedBumper.name}</div>
                    <div className="text-[10px] text-zinc-400 font-sans mt-0.5">{selectedBumper.tagline}</div>
                  </div>
                  <span className="font-bold text-white">${selectedBumper.basePrice.toLocaleString()}</span>
                </div>

                {/* Finish */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-zinc-300 font-sans text-[11px]">{selectedFinish.name}</span>
                  <span className="text-zinc-400 text-[11px]">{selectedFinish.price === 0 ? 'Included' : `+$${selectedFinish.price}`}</span>
                </div>

                {/* Winch */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-zinc-300 font-sans text-[11px]">{selectedWinch.name}</span>
                  <span className="text-zinc-400 text-[11px]">{selectedWinch.price === 0 ? 'Included' : `+$${selectedWinch.price}`}</span>
                </div>

                {/* Optics */}
                {optics.lightBar && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300 font-sans text-[11px]">{OPTICS_OPTIONS.lightBar.name}</span>
                    <span className="text-zinc-400 text-[11px]">+${OPTICS_OPTIONS.lightBar.price}</span>
                  </div>
                )}
                {optics.fogPods && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300 font-sans text-[11px]">{OPTICS_OPTIONS.fogPods.name}</span>
                    <span className="text-zinc-400 text-[11px]">+${OPTICS_OPTIONS.fogPods.price}</span>
                  </div>
                )}

                {/* Recovery */}
                {hardware.shackles && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300 font-sans text-[11px]">{HARDWARE_OPTIONS.shackles.name}</span>
                    <span className="text-zinc-400 text-[11px]">+${HARDWARE_OPTIONS.shackles.price}</span>
                  </div>
                )}
                {hardware.logoPlate && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300 font-sans text-[11px]">{HARDWARE_OPTIONS.logoPlate.name}</span>
                    <span className="text-zinc-400 text-[11px]">+${HARDWARE_OPTIONS.logoPlate.price}</span>
                  </div>
                )}
              </div>

              {/* Craig, Colorado Warranty & Craftsmanship Callout */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="font-bold text-amber-300 font-display flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>🏔️</span> Craig, Colorado Steel Warranty
                </div>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  Every Jack's Bumper is 100% laser cut, CNC brake formed, and welded in Craig, CO. Guaranteed fitment with factory chassis horn hardware.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Bottom Bar: Live Estimated Build Range & CTA */}
      <div className="p-4 bg-[#0A0B0E] border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider font-display">
              Estimated Build Total
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono flex items-baseline gap-1">
              ${estimatedTotal.toLocaleString()}
              <span className="text-xs text-zinc-500 font-normal"> – ${(estimatedTotal + 450).toLocaleString()}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 font-mono block">Estimated Fab</span>
            <span className="text-xs font-bold text-emerald-400 font-display">{selectedBumper.leadTime}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-bold flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onResetAll}
              className="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1 transition"
              title="Reset to Factory Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1C2028] hover:bg-[#252B36] text-white border border-white/10 text-xs font-bold font-display tracking-wider uppercase flex items-center justify-center gap-1.5 transition"
            >
              <span>Next: {steps[currentStep].label.split(' ')[1]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}

          {/* Primary High-Contrast Quote CTA */}
          <button
            onClick={onOpenQuoteModal}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm font-display uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-amber transition-all"
          >
            <span>Request Quote / Save</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </aside>
  );
}
