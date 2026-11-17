import React from 'react';
import { QrCode, Phone, MapPin, Sparkles, Share2 } from 'lucide-react';
import { SHOP_INFO } from '../data/configuratorOptions';

export default function Header({
  currentStep,
  setCurrentStep,
  onOpenShareModal,
  estimatedTotal
}) {
  const steps = [
    { num: 1, title: '01 VEHICLE' },
    { num: 2, title: '02 BUMPER' },
    { num: 3, title: '03 ARMOR & OPTICS' },
    { num: 4, title: '04 BUILD SHEET' }
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full px-6 py-4 flex items-center justify-between gap-4 pointer-events-none">
      {/* Brand & Studio Emblem */}
      <div className="pointer-events-auto flex items-center gap-3">
        <img
          src="/assets/jacks-logo.png"
          alt="Jack's Bumpers"
          className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)]"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg sm:text-xl text-white tracking-wider">
              JACK'S BUMPERS
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-400 font-display uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              Build Studio
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span className="text-zinc-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-500" />
              Craig, Colorado
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline italic text-zinc-400 font-sans">
              "Protecting Your Investments."
            </span>
          </div>
        </div>
      </div>

      {/* Center Breadcrumb Step Indicator (Desktop) */}
      <nav className="pointer-events-auto hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-[#12141A]/80 backdrop-blur-xl border border-white/10 shadow-glass">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          return (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`px-3 py-1 rounded-xl text-xs font-bold font-display tracking-wider transition-all ${
                isActive
                  ? 'bg-amber-500 text-black shadow-glow-amber'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Phone + QR Code Share */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12141A]/80 hover:bg-[#1A1E26] backdrop-blur-xl border border-white/10 text-xs font-mono font-bold text-zinc-300 hover:text-white transition shadow-glass"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>{SHOP_INFO.phone}</span>
        </a>

        <button
          onClick={onOpenShareModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-display font-black text-xs uppercase tracking-wider shadow-glow-amber transition-all group"
          title="Open build QR code for mobile scanning"
        >
          <QrCode className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
          <span>QR / Share Build</span>
        </button>
      </div>
    </header>
  );
}
