import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  Check,
  Copy,
  Send,
  X,
  QrCode,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { SHOP_INFO, configuratorData } from '../data/configuratorData';

export default function QuoteModal({
  isOpen,
  onClose,
  buildState,
  estimatedTotal,
  shareUrl
}) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  if (!isOpen) return null;

  const vehicleName = buildState?.vehicle?.name || 'Heavy Duty Truck';
  const partNumber = buildState?.partNumber || 'JB-APX-MB';
  const bumperName = buildState?.bumper?.name || 'Apex Commercial Full-Width';
  const finishName = buildState?.finish?.name || 'Wrinkle Black Powder Coat';
  const leadTime =
    buildState?.telemetry?.leadTime ||
    buildState?.bumper?.leadTime ||
    '2-3 Weeks';

  // Gather selected upfit names
  const activeUpfits = [];
  if (buildState?.upfits) {
    configuratorData.addons.forEach((u) => {
      if (buildState.upfits[u.id]) {
        activeUpfits.push(u.name);
      }
    });
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || (!formData.phone && !formData.email)) {
      alert('Please enter your name and either phone or email so our Craig shop can follow up.');
      return;
    }

    setSubmitted(true);
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#12141A] border border-white/10 rounded-3xl shadow-glass overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#0D0F13]">
          <div className="flex items-center gap-3">
            <img src="/assets/jacks-logo.png" alt="Jack's Bumpers" className="h-9 w-auto object-contain" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                Custom Build Spec & Quote Handoff
              </h2>
              <p className="text-xs text-amber-400 font-mono">Jack's Bumpers • Craig, Colorado</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!submitted ? (
            <>
              {/* Build Summary Grid + QR Code */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Left: Spec Sheet Summary */}
                <div className="md:col-span-7 bg-[#0A0B0E] p-4 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div>
                      <span className="uppercase font-bold text-zinc-400 font-display tracking-wider text-[11px] block">
                        Commercial Spec Sheet
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">
                        {partNumber}
                      </span>
                    </div>
                    <span className="font-bold text-amber-400 text-sm">
                      ${estimatedTotal?.toLocaleString()} est.
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px] font-sans">Chassis Platform:</span>
                      <strong className="text-white font-display text-sm">{vehicleName}</strong>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px] font-sans">Bumper Series:</span>
                      <strong className="text-amber-400 font-display">{bumperName}</strong>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[10px] font-sans">Armor Finish:</span>
                      <strong className="text-zinc-300 font-sans">{finishName}</strong>
                    </div>

                    {activeUpfits.length > 0 && (
                      <div>
                        <span className="text-zinc-500 block text-[10px] font-sans">Add-On Accessories:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {activeUpfits.map((u, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]"
                            >
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Fabrication Lead Time:</span>
                    <span className="text-emerald-400 font-bold">{leadTime}</span>
                  </div>
                </div>

                {/* Right: Dynamic QR Code Handoff */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#0A0B0E] rounded-2xl border border-white/10 text-center space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-display uppercase tracking-wider">
                    <QrCode className="w-4 h-4" />
                    <span>Scan on Phone</span>
                  </div>

                  <div className="p-3 bg-white rounded-2xl shadow-lg inline-block border-2 border-amber-400/40">
                    <QRCodeSVG value={shareUrl || window.location.href} size={140} level="M" />
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-tight font-sans">
                    Scan with your phone camera to open and test this exact build instantly on iOS/Android.
                  </p>

                  <button
                    onClick={handleCopy}
                    className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-white border border-white/10 flex items-center justify-center gap-1.5 transition font-display"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Build URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instant Lead Capture Form */}
              <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-[#0D0F13] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-widest font-black text-amber-400 font-display flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Send Build to Jack's Bumpers Shop
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-mono">Zero Obligation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161820] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="970-555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161820] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="sarah@ranch.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#161820] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">
                    Custom Fabrication Notes (e.g. trim package, winch preference, cattle guard height, local Craig pickup)
                  </label>
                  <input
                    type="text"
                    placeholder="2024 Ford F-350 Dually, need front receiver hitch if possible..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#161820] border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-sans">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct submission to Jack's Bumpers in Craig, CO. Response within 1 business day.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs font-display uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-amber transition"
                  >
                    <span>Submit Build Spec</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black text-white font-display">
                Fabrication Spec Submitted!
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you, <strong className="text-amber-400">{formData.name}</strong>. Your custom{' '}
                <strong className="text-white">{vehicleName} ({partNumber})</strong> spec sheet has been queued with our Craig, Colorado fabrication shop.
              </p>
              <div className="p-4 bg-[#0A0B0E] rounded-2xl border border-white/10 max-w-sm mx-auto text-left text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shop Direct: {SHOP_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{SHOP_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{SHOP_INFO.address}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display text-xs uppercase tracking-wider font-bold transition"
                >
                  Close & Continue Customizing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
