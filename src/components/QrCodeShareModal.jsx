import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, QrCode, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

export default function QrCodeShareModal({
  isOpen,
  onClose,
  shareUrl,
  buildState,
  estimatedTotal
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const vehicleName = buildState?.vehicle?.model
    ? `${buildState.vehicle.make} ${buildState.vehicle.model}`
    : buildState?.truck?.name || 'Heavy Duty Platform';

  const partNumber = buildState?.partNumber || 'JB-SPEC';
  const bumperName = buildState?.bumper?.name || 'Apex Commercial Full-Width';
  const finishName = buildState?.finish?.name || 'Wrinkle Black';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#161920] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col p-5 sm:p-6 text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-1.5 font-display">
            Test on Mobile / Instant Handoff
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Scan this live QR code with your phone camera to open and test this exact custom build on iOS or Android.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl shadow-xl inline-block mx-auto border-4 border-amber-400/30">
          <QRCodeSVG value={shareUrl || window.location.href} size={190} level="M" />
        </div>

        {/* Current Build Pill */}
        <div className="p-3 bg-[#0E1015] rounded-xl border border-white/10 text-left text-xs space-y-1 font-mono">
          <div className="flex items-center justify-between font-bold">
            <span className="text-white truncate font-display">{vehicleName}</span>
            <span className="text-amber-400 font-mono">${estimatedTotal?.toLocaleString()}</span>
          </div>
          <div className="text-zinc-400 text-[11px] truncate flex items-center justify-between">
            <span>{bumperName} • {finishName.split(' ')[0]}</span>
            <span className="text-amber-400/80 text-[10px]">{partNumber}</span>
          </div>
        </div>

        {/* Copy Shareable Link CTA */}
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition font-display uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span className="text-emerald-400 font-bold">Build Link Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Direct Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
