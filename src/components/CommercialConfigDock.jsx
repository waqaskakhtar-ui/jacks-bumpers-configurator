import React from 'react';
import {
  Truck,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Phone,
  FileText,
  Sliders,
  Flame,
  Gauge,
  Compass,
  Hammer,
  Radio,
  Eye,
  Plus,
  Check,
  Columns,
  Maximize2
} from 'lucide-react';
import {
  configuratorData,
  VEHICLE_PLATFORMS,
  BUMPER_SERIES,
  ARMOR_FINISHES,
  UPFIT_OPTIONS
} from '../data/commercialConfig';

export default function CommercialConfigDock({
  currentStep,
  setCurrentStep,
  vehicle,
  setVehicle,
  bumper,
  setBumper,
  finish,
  setFinish,
  upfits,
  setUpfits,
  totalPrice,
  telemetry,
  partNumber,
  onOpenQuoteModal,
  layoutMode,
  setLayoutMode
}) {
  const steps = [
    { id: 1, num: '01', label: 'VEHICLE', icon: Truck },
    { id: 2, num: '02', label: 'BUMPER', icon: Shield },
    { id: 3, num: '03', label: 'ARMOR & FINISH', icon: Layers },
    { id: 4, num: '04', label: 'UPFITS & CPQ', icon: Sparkles }
  ];

  const toggleUpfit = (upfitId) => {
    setUpfits((prev) => ({
      ...prev,
      [upfitId]: !prev[upfitId]
    }));
  };

  // If in pure stage mode on desktop, render a floating trigger to reopen the dock
  if (layoutMode === 'stage') {
    return (
      <button
        onClick={() => setLayoutMode('split')}
        className="fixed right-4 top-20 z-40 px-3.5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-display font-black text-xs uppercase tracking-wider shadow-glow-amber flex items-center gap-2 transition-transform hover:scale-105"
        title="Open Configurator Dock"
      >
        <Sliders className="w-4 h-4 stroke-[2.5]" />
        <span>Open CPQ Dock</span>
      </button>
    );
  }

  return (
    <aside className="w-full md:w-[330px] lg:w-[410px] xl:w-[460px] shrink-0 bg-[#0F1116] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-full min-h-0 overflow-hidden select-none z-20">
      {/* 1. TOP STEP NAVIGATION TABS */}
      <div className="grid grid-cols-4 p-1.5 sm:p-2 bg-[#13161D] border-b border-white/10 gap-1 shrink-0">
        {steps.map((s) => {
          const isActive = currentStep === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold">{s.num}</span>
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <span className="text-[8px] sm:text-[9px] font-display font-black tracking-wider uppercase truncate w-full text-center mt-0.5">
                {s.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. TAB BODY (SCROLLABLE DOCK) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-4 custom-scrollbar min-h-0">
        {/* ============================================================ */}
        {/* STEP 1: VEHICLE PLATFORM & FACTORY SENSOR SUITE */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                STEP 01 // PLATFORM VERIFICATION
              </span>
              <h2 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                Select Heavy Duty Chassis
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
                Every Jack's Bumper is 3D laser-scanned and engineered to bolt directly to OEM factory frame horns with zero cutting or welding.
              </p>
            </div>

            {/* Vehicle Cards */}
            <div className="space-y-2">
              {configuratorData.vehicles.map((v) => {
                const isSelected = vehicle.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVehicle(v)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all relative overflow-hidden flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-[#181C24] border-amber-500 shadow-glow-amber'
                        : 'bg-[#12141A] border-white/5 hover:border-white/15 hover:bg-[#151820]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-mono font-bold text-[9px] sm:text-[10px]">
                          {v.years}
                        </span>
                        <h3 className="font-display font-black text-xs sm:text-sm text-white tracking-wide">
                          {v.name}
                        </h3>
                      </div>
                      {isSelected ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-black flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-zinc-600" />
                      )}
                    </div>

                    {/* Badge Pill */}
                    <div className="mt-0.5">
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {v.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* OEM Sensor & ADAS Verification Box */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#14171E] border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-display font-black text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>OEM Electronics & Radar Guaranteed Retained</span>
              </div>
              <div className="space-y-1 font-mono text-[9px] sm:text-[10px]">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">{vehicle.sensorVerification?.accRadar || 'ACC Radar Relocation Bracket Included'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">{vehicle.sensorVerification?.parkingSensors || '4x OEM Ultrasonic Sensor Cutouts Pre-Drilled'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">{vehicle.sensorVerification?.frontCamera || 'Front 360° Camera Line-of-Sight Retained'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: BUMPER ARCHITECTURE & STEEL GAUGE */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                STEP 02 // ARCHITECTURAL SERIES
              </span>
              <h2 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                Choose Bumper Series
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
                CNC plasma cut and hand TIG/MIG welded in Craig, Colorado. Built with genuine A36 structural steel plate.
              </p>
            </div>

            {/* Bumper Series Cards */}
            <div className="space-y-2.5">
              {configuratorData.series.map((b) => {
                const isSelected = bumper.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setBumper(b)}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all relative overflow-hidden flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#181C24] border-amber-500 shadow-glow-amber'
                        : 'bg-[#12141A] border-white/5 hover:border-white/15 hover:bg-[#151820]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold text-[9px]">
                            {b.badge || 'Heavy Duty'}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            +{b.approachGain || 6.5}° Approach
                          </span>
                        </div>
                        <h3 className="font-display font-black text-xs sm:text-sm text-white tracking-wide mt-1">
                          {b.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-xs sm:text-sm text-amber-400">
                          ${b.basePrice.toLocaleString()}
                        </span>
                        <span className="block text-[9px] font-mono text-zinc-500">BASE</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                      {b.desc}
                    </p>

                    {/* Quick Specs Pill Row */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-300">
                      <div>
                        <span className="text-zinc-500 block text-[8px]">WEIGHT</span>
                        <strong>{b.weight}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[8px]">STEEL</span>
                        <strong className="truncate block">{b.steelGauge || '1/4" Plate'}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[8px]">WINCH</span>
                        <strong className="text-emerald-400 truncate block">{b.winchCapacity}</strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: ARMOR FINISH & DURABILITY COATING */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                STEP 03 // SURFACE DEFENSE
              </span>
              <h2 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                Armor Finish & Protective Coating
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
                Engineered for extreme Colorado mountain winters, magnesium chloride highway brine, and high-velocity gravel impacts.
              </p>
            </div>

            {/* Armor Finish Cards */}
            <div className="space-y-2.5">
              {configuratorData.finishes.map((f) => {
                const isSelected = finish.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f)}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border transition-all relative overflow-hidden flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-[#181C24] border-amber-500 shadow-glow-amber'
                        : 'bg-[#12141A] border-white/5 hover:border-white/15 hover:bg-[#151820]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Metallic Swatch preview */}
                      <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-white/20 shadow-md shrink-0 flex items-center justify-center"
                        style={{ background: f.gradient }}
                      >
                        <Shield className="w-4 h-4 text-white/40 drop-shadow" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-display font-black text-xs sm:text-sm text-white truncate">
                          {f.name}
                        </h3>
                        <p className="text-[10px] text-zinc-400 font-sans truncate">
                          {f.desc}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-mono text-amber-400 font-bold">
                            Durability: {f.durabilityRating || '10.0 / 10'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-white">
                        {f.price === 0 ? 'INCL.' : `+$${f.price}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: MODULAR ADDONS & CPQ QUOTE SUMMARY */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block">
                STEP 04 // MODULAR ADD-ONS & ACCESSORIES
              </span>
              <h2 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                Add-On Accessories & Recovery
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">
                Select factory-integrated recovery winches, Quake LED high-lux optics, and structural ranch guards.
              </p>
            </div>

            {/* Addons Checkbox Cards */}
            <div className="space-y-2">
              {configuratorData.addons.map((u) => {
                const isChecked = !!upfits[u.id];
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleUpfit(u.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${
                      isChecked
                        ? 'bg-[#181C24] border-amber-500 shadow-glow-amber'
                        : 'bg-[#12141A] border-white/5 hover:border-white/15 hover:bg-[#151820]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-black'
                            : 'border-zinc-600 bg-black/40 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-black text-xs text-white truncate">
                            {u.name}
                          </span>
                          {u.badge && (
                            <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-white/5 text-amber-400 shrink-0">
                              {u.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5 truncate">
                          {u.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs text-amber-400">
                        +${u.price.toLocaleString()}
                      </span>
                      {u.weight && (
                        <span className="block text-[8px] font-mono text-zinc-500">
                          +{u.weight} LBS
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM STICKY CPQ PRICING & QUOTE ACTION BAR */}
      <div className="p-3 sm:p-4 bg-[#14171E] border-t border-white/10 space-y-2.5 shrink-0">
        {/* Dynamic Part Number Badge & Lead Time */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-zinc-500 uppercase shrink-0">SPEC:</span>
            <span className="font-bold text-amber-400 truncate max-w-[190px] sm:max-w-[240px]">
              {partNumber}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-400 font-semibold shrink-0">
            <span>LEAD:</span>
            <span>{telemetry?.leadTime || '2-3 Weeks'}</span>
          </div>
        </div>

        {/* Live Total Ticker & Quote Button */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="shrink-0">
            <span className="text-[9px] font-mono text-zinc-400 block uppercase">
              TURNKEY TOTAL
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-lg sm:text-xl text-white tracking-tight">
                ${totalPrice.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">USD</span>
            </div>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="flex-1 py-2.5 sm:py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-black font-display font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-glow-amber transition-all flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="truncate">REQUEST FABRICATION QUOTE</span>
          </button>
        </div>

        {/* Quick Shop Hotline */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500 pt-0.5">
          <a
            href="tel:9708242423"
            className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition"
          >
            <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <span>Shop Line: (970) 824-2423</span>
          </a>
          <span>Craig, CO</span>
        </div>
      </div>
    </aside>
  );
}
