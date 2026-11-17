import React, { useState } from 'react';
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
  Info,
  DollarSign,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import {
  TRUCK_MODELS,
  PAINT_COLORS,
  BUMPER_STYLES,
  FINISH_OPTIONS,
  WINCH_OPTIONS,
  LIGHTING_OPTIONS,
  RECOVERY_OPTIONS
} from '../data/configuratorOptions';

export default function ControlPanel({
  selectedTruck,
  setSelectedTruck,
  selectedPaint,
  setSelectedPaint,
  selectedBumper,
  setSelectedBumper,
  selectedFinish,
  setSelectedFinish,
  selectedWinch,
  setSelectedWinch,
  lighting,
  setLighting,
  recovery,
  setRecovery,
  estimatedTotal,
  onOpenQuoteModal,
  onResetAll
}) {
  const [activeTab, setActiveTab] = useState(1); // 1: Truck, 2: Bumper, 3: Add-Ons, 4: Summary

  const tabs = [
    { id: 1, label: '1. Truck', icon: Truck },
    { id: 2, label: '2. Bumper', icon: Shield },
    { id: 3, label: '3. Fabrication', icon: Wrench },
    { id: 4, label: '4. Summary', icon: FileText }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#1A1C22] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="flex border-b border-white/10 bg-[#14161A] p-1.5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#262A34] text-amber-400 shadow-md border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* ======================================================= */}
        {/* TAB 1: TRUCK PROFILE & FACTORY PAINT                    */}
        {/* ======================================================= */}
        {activeTab === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  Select Heavy Duty Truck
                </h3>
                <span className="text-[11px] text-zinc-400">Step 1 of 4</span>
              </div>
              <div className="space-y-2.5">
                {TRUCK_MODELS.map((truck) => {
                  const isSelected = selectedTruck.id === truck.id;
                  return (
                    <div
                      key={truck.id}
                      onClick={() => setSelectedTruck(truck)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#232731] border-amber-500 shadow-lg shadow-amber-500/10'
                          : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-white">{truck.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                              {truck.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">{truck.sub}</p>
                          <p className="text-[11px] text-zinc-500 mt-1">{truck.description}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Truck Factory Paint Swatches */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Factory Body Paint Color
                </h3>
                <span className="text-xs text-amber-400 font-medium">{selectedPaint.name}</span>
              </div>
              <div className="grid grid-cols-5 gap-2.5">
                {PAINT_COLORS.map((color) => {
                  const isSelected = selectedPaint.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedPaint(color)}
                      className="group flex flex-col items-center gap-1.5 focus:outline-none"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl transition-all flex items-center justify-center border-2 shadow-md relative ${
                          isSelected
                            ? 'border-amber-400 scale-105 shadow-amber-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        style={{ background: color.gradient }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-5 h-5 stroke-[3] ${
                              color.id === 'oxford-white' ? 'text-black' : 'text-white'
                            }`}
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200 text-center leading-tight">
                        {color.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: BUMPER STYLE                                     */}
        {/* ======================================================= */}
        {activeTab === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                Select Custom Bumper Style
              </h3>
              <span className="text-[11px] text-zinc-400">Step 2 of 4</span>
            </div>

            <div className="space-y-3">
              {BUMPER_STYLES.map((bumper) => {
                const isSelected = selectedBumper.id === bumper.id;
                return (
                  <div
                    key={bumper.id}
                    onClick={() => setSelectedBumper(bumper)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#232731] border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                        : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{bumper.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                            {bumper.badge}
                          </span>
                        </div>
                        <p className="text-xs text-amber-400/90 font-medium mt-0.5">{bumper.tagline}</p>
                        <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                          {bumper.description}
                        </p>

                        {/* Specs Bullets */}
                        <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-white/10">
                          {bumper.specs.map((spec, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                        </div>

                        {/* Weight & Lead Time Footer */}
                        <div className="flex items-center justify-between mt-3 text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                          <span>Approx. Weight: <strong className="text-zinc-200">{bumper.weight}</strong></span>
                          <span>Lead Time: <strong className="text-zinc-200">{bumper.leadTime}</strong></span>
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="text-right">
                        <span className="text-base font-bold text-white font-mono-num">
                          ${bumper.basePrice.toLocaleString()}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border mt-2 ml-auto ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: CUSTOM FABRICATION & ADD-ONS                     */}
        {/* ======================================================= */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 1. Finish & Powder Coating */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Steel Finish & Coating
                </h3>
                <span className="text-xs text-amber-400 font-mono">
                  {selectedFinish.price === 0 ? 'Included' : `+$${selectedFinish.price}`}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FINISH_OPTIONS.map((f) => {
                  const isSelected = selectedFinish.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFinish(f)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-[#232731] border-amber-500 shadow-md'
                          : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{f.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{f.sub}</div>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-400">
                          {f.price === 0 ? '+$0' : `+$${f.price}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Winch Mount & Winch Option */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  Winch System
                </h3>
                <span className="text-xs text-amber-400 font-mono">
                  {selectedWinch.price === 0 ? 'Plate Included' : `+$${selectedWinch.price}`}
                </span>
              </div>
              <div className="space-y-2">
                {WINCH_OPTIONS.map((w) => {
                  const isSelected = selectedWinch.id === w.id;
                  return (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWinch(w)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-[#232731] border-amber-500 shadow-md'
                          : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{w.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{w.sub}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            {w.price === 0 ? '+$0' : `+$${w.price}`}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border mt-1 ml-auto ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-black'
                                : 'border-zinc-600'
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
            </div>

            {/* 3. Quake LED Lighting Toggles */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Quake LED Lighting (Craig, CO Partner)
                </h3>
              </div>
              <div className="space-y-2">
                {/* Center 20" Light Bar */}
                <div
                  onClick={() =>
                    setLighting((prev) => ({ ...prev, lightBar: !prev.lightBar }))
                  }
                  className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                    lighting.lightBar
                      ? 'bg-[#232731] border-amber-500 shadow-md'
                      : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {LIGHTING_OPTIONS.lightBar.name}
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        18.5k Lumens
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {LIGHTING_OPTIONS.lightBar.sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +${LIGHTING_OPTIONS.lightBar.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        lighting.lightBar
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'border-zinc-600 bg-transparent'
                      }`}
                    >
                      {lighting.lightBar && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Dual Fog Light Pods */}
                <div
                  onClick={() =>
                    setLighting((prev) => ({ ...prev, fogPods: !prev.fogPods }))
                  }
                  className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                    lighting.fogPods
                      ? 'bg-[#232731] border-amber-500 shadow-md'
                      : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">
                      {LIGHTING_OPTIONS.fogPods.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {LIGHTING_OPTIONS.fogPods.sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +${LIGHTING_OPTIONS.fogPods.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        lighting.fogPods
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'border-zinc-600 bg-transparent'
                      }`}
                    >
                      {lighting.fogPods && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Recovery & Custom Touches */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Recovery & Custom Shop Touches
                </h3>
              </div>
              <div className="space-y-2">
                {/* 3/4" Shackles */}
                <div
                  onClick={() =>
                    setRecovery((prev) => ({ ...prev, shackles: !prev.shackles }))
                  }
                  className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                    recovery.shackles
                      ? 'bg-[#232731] border-amber-500 shadow-md'
                      : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">
                      {RECOVERY_OPTIONS.shackles.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {RECOVERY_OPTIONS.shackles.sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +${RECOVERY_OPTIONS.shackles.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        recovery.shackles
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'border-zinc-600 bg-transparent'
                      }`}
                    >
                      {recovery.shackles && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Laser-Cut Logo Plate */}
                <div
                  onClick={() =>
                    setRecovery((prev) => ({ ...prev, logoPlate: !prev.logoPlate }))
                  }
                  className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                    recovery.logoPlate
                      ? 'bg-[#232731] border-amber-500 shadow-md'
                      : 'bg-[#16181D] border-white/5 hover:border-white/20 hover:bg-[#1D2027]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">
                      {RECOVERY_OPTIONS.logoPlate.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {RECOVERY_OPTIONS.logoPlate.sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +${RECOVERY_OPTIONS.logoPlate.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        recovery.logoPlate
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'border-zinc-600 bg-transparent'
                      }`}
                    >
                      {recovery.logoPlate && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: SUMMARY & SPEC SHEET                             */}
        {/* ======================================================= */}
        {activeTab === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Build Configuration Breakdown
              </h3>
              <span className="text-[11px] text-zinc-400">Step 4 of 4</span>
            </div>

            <div className="bg-[#14161A] rounded-xl p-4 border border-white/10 space-y-3">
              {/* Item 1: Vehicle Platform */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{selectedTruck.name}</div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ backgroundColor: selectedPaint.hex }}
                    ></span>
                    {selectedPaint.name}
                  </div>
                </div>
                <span className="font-mono text-zinc-400">Base Platform</span>
              </div>

              {/* Item 2: Bumper Style */}
              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                <div>
                  <div className="font-semibold text-white">{selectedBumper.name}</div>
                  <div className="text-[11px] text-amber-400/90">{selectedBumper.tagline}</div>
                </div>
                <span className="font-mono font-bold text-white">
                  ${selectedBumper.basePrice.toLocaleString()}
                </span>
              </div>

              {/* Item 3: Finish */}
              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                <div>
                  <div className="text-zinc-300">{selectedFinish.name}</div>
                  <div className="text-[10px] text-zinc-500">{selectedFinish.sub}</div>
                </div>
                <span className="font-mono text-zinc-300">
                  {selectedFinish.price === 0 ? 'Included' : `+$${selectedFinish.price}`}
                </span>
              </div>

              {/* Item 4: Winch */}
              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                <div>
                  <div className="text-zinc-300">{selectedWinch.name}</div>
                  <div className="text-[10px] text-zinc-500">{selectedWinch.sub}</div>
                </div>
                <span className="font-mono text-zinc-300">
                  {selectedWinch.price === 0 ? 'Included' : `+$${selectedWinch.price}`}
                </span>
              </div>

              {/* Item 5: Lighting */}
              {lighting.lightBar && (
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                  <span className="text-zinc-300">{LIGHTING_OPTIONS.lightBar.name}</span>
                  <span className="font-mono text-zinc-300">+${LIGHTING_OPTIONS.lightBar.price}</span>
                </div>
              )}
              {lighting.fogPods && (
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                  <span className="text-zinc-300">{LIGHTING_OPTIONS.fogPods.name}</span>
                  <span className="font-mono text-zinc-300">+${LIGHTING_OPTIONS.fogPods.price}</span>
                </div>
              )}

              {/* Item 6: Recovery */}
              {recovery.shackles && (
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                  <span className="text-zinc-300">{RECOVERY_OPTIONS.shackles.name}</span>
                  <span className="font-mono text-zinc-300">+${RECOVERY_OPTIONS.shackles.price}</span>
                </div>
              )}
              {recovery.logoPlate && (
                <div className="flex items-center justify-between text-xs pt-2.5 border-t border-white/5">
                  <span className="text-zinc-300">{RECOVERY_OPTIONS.logoPlate.name}</span>
                  <span className="font-mono text-zinc-300">+${RECOVERY_OPTIONS.logoPlate.price}</span>
                </div>
              )}
            </div>

            {/* Shop Guarantee & Craig CO Note */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>📍</span> Handcrafted in Craig, Colorado
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Every bumper is custom cut, CNC brake formed, and welded in our Craig shop. Ships or installs with all Grade-8 hardware included.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Bottom Bar: Live Estimated Build Range & CTA */}
      <div className="p-4 bg-[#14161A] border-t border-white/10 space-y-3">
        {/* Estimated Price Range & Lead Time Ticker */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              Estimated Build Range
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono-num flex items-baseline gap-1">
              ${estimatedTotal.toLocaleString()}
              <span className="text-xs text-zinc-400 font-normal"> – ${(estimatedTotal + 450).toLocaleString()}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-400 block">Fab Lead Time</span>
            <span className="text-xs font-semibold text-emerald-400">{selectedBumper.leadTime}</span>
          </div>
        </div>

        {/* Step Navigation & Action Buttons */}
        <div className="flex items-center gap-2">
          {activeTab > 1 ? (
            <button
              onClick={() => setActiveTab(activeTab - 1)}
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 text-xs font-semibold flex items-center gap-1 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onResetAll}
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1 transition"
              title="Reset to Factory Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {activeTab < 4 ? (
            <button
              onClick={() => setActiveTab(activeTab + 1)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#2A2E39] hover:bg-[#343946] text-white border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <span>Next: {tabs[activeTab].label.split('. ')[1]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}

          {/* Primary High-Contrast Quote CTA */}
          <button
            onClick={onOpenQuoteModal}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all pulse-amber"
          >
            <span>Request Quote / Save</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
