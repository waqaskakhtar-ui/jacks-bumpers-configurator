import React from 'react';
import { X, Camera, MapPin, Wrench, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { REAL_BUILDS, SHOP_INFO } from '../data/commercialConfig';

export default function GalleryDrawer({
  isOpen,
  onClose,
  onApplyBuild
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#14171E] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0E1015]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-display">
                Real Shop Builds (Craig, Colorado)
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Authentic handcrafted steel builds scraped from <span className="text-amber-400 font-medium">jacksbumpers.com/gallery-projects</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REAL_BUILDS.map((build) => (
              <div
                key={build.id}
                className="group relative bg-[#0D0F14] rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/40">
                  <img
                    src={build.image}
                    alt={build.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://static.wixstatic.com/media/fefbce_1e7f5170719b42beb3e389c109812f2a~mv2.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-black/30"></div>

                  {/* Truck Make Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-amber-400">
                    {build.truck}
                  </span>

                  {/* Location Pin */}
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-zinc-300 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-red-400" />
                    {build.location}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-display font-black text-sm text-white group-hover:text-amber-400 transition">
                    {build.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {build.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">
                      {build.bumper}
                    </span>
                    {onApplyBuild && (
                      <button
                        onClick={() => onApplyBuild(build)}
                        className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <span>Match Build</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info banner */}
        <div className="p-3.5 bg-[#0E1015] border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>{SHOP_INFO.address}</span>
          <span className="text-amber-400 font-bold">{SHOP_INFO.phone}</span>
        </div>
      </div>
    </div>
  );
}
