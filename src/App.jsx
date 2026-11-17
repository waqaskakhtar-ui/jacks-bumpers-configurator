import React, { useState, useMemo } from 'react';
import StudioViewport from './components/StudioViewport';
import ConfiguratorDock from './components/ConfiguratorDock';
import QuoteModal from './components/QuoteModal';
import QrCodeShareModal from './components/QrCodeShareModal';
import { configuratorData } from './data/configuratorData';

export default function App() {
  const [config, setConfig] = useState({
    vehicle: 'ford',
    series: 'apex',
    finish: 'matte-black',
    grilleGuard: true,
    ledPods: true,
    winch: false,
    shackles: true
  });

  const [mobileTab, setMobileTab] = useState('dock');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const selectedVehicle = configuratorData.vehicles.find((v) => v.id === config.vehicle) || configuratorData.vehicles[0];
  const selectedSeries = configuratorData.series.find((s) => s.id === config.series) || configuratorData.series[0];
  const selectedFinish = configuratorData.finishes.find((f) => f.id === config.finish) || configuratorData.finishes[0];

  let addonsTotal = 0;
  if (config.grilleGuard) addonsTotal += configuratorData.addons.find((a) => a.id === 'grilleGuard')?.price || 0;
  if (config.ledPods) addonsTotal += configuratorData.addons.find((a) => a.id === 'ledPods')?.price || 0;
  if (config.winch) addonsTotal += configuratorData.addons.find((a) => a.id === 'winch')?.price || 0;
  if (config.shackles) addonsTotal += configuratorData.addons.find((a) => a.id === 'shackles')?.price || 0;

  const totalPrice = (selectedSeries?.basePrice || 1899) + (selectedFinish?.price || 0) + addonsTotal;

  const partNumber = `JB-${config.vehicle.toUpperCase()}-${config.series.toUpperCase()}-${config.finish.toUpperCase()}${
    config.grilleGuard ? '-GG' : ''
  }${config.ledPods ? '-LED' : ''}${config.winch ? '-WN' : ''}${config.shackles ? '-SHK' : ''}`;

  const buildStateForModals = useMemo(() => ({
    vehicle: selectedVehicle,
    bumper: selectedSeries,
    finish: selectedFinish,
    upfits: {
      grilleGuard: config.grilleGuard,
      ledPods: config.ledPods,
      winch: config.winch,
      shackles: config.shackles
    },
    partNumber,
    telemetry: {
      leadTime: selectedSeries?.leadTime || '2-3 Weeks'
    }
  }), [selectedVehicle, selectedSeries, selectedFinish, config, partNumber]);

  const handleExport = () => {
    setIsQuoteModalOpen(true);
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <main className="w-screen h-screen overflow-hidden relative flex flex-col md:flex-row bg-[#050608] font-sans select-none antialiased">
      {/* Top Navigation Brand Bar */}
      <nav className="absolute top-0 left-0 h-16 px-4 sm:px-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 bg-[#F59E0B] rounded-lg flex items-center justify-center font-display font-black text-black text-lg shadow-glow-amber">
            J
          </div>
          <div>
            <span className="font-display font-bold text-white text-base sm:text-lg tracking-wide">JACK'S BUMPERS</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-[#8893A6] uppercase tracking-widest">| Commercial Studio</span>
          </div>
        </div>
      </nav>

      {/* Mobile Screen Switcher (only on screens < 768px) */}
      <div className="md:hidden absolute top-3.5 right-4 z-40 flex items-center gap-1 bg-[#14171D] p-1 rounded-xl border border-[#1D212A] shadow-glass pointer-events-auto">
        <button
          onClick={() => setMobileTab('stage')}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
            mobileTab === 'stage' ? 'bg-[#F59E0B] text-black shadow-glow-amber' : 'text-[#8893A6] hover:text-white'
          }`}
        >
          Visualizer
        </button>
        <button
          onClick={() => setMobileTab('dock')}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
            mobileTab === 'dock' ? 'bg-[#F59E0B] text-black shadow-glow-amber' : 'text-[#8893A6] hover:text-white'
          }`}
        >
          Options
        </button>
      </div>

      {/* Multi-Layer Studio Viewport (Left Stage) */}
      <div className={`flex-1 min-w-0 h-full relative ${mobileTab === 'dock' ? 'hidden md:block' : 'block'}`}>
        <StudioViewport config={config} />
      </div>

      {/* Precision Configurator Control Dock (Right Dock) */}
      <div className={`w-full md:w-[380px] lg:w-[460px] shrink-0 h-full relative z-20 ${mobileTab === 'stage' ? 'hidden md:block' : 'block'}`}>
        <ConfiguratorDock config={config} setConfig={setConfig} onExport={handleExport} onShare={handleShare} />
      </div>

      {/* Quote / Spec Sheet Handoff Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        buildState={buildStateForModals}
        estimatedTotal={totalPrice}
        shareUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />

      {/* Mobile QR Scan Modal */}
      <QrCodeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={typeof window !== 'undefined' ? window.location.href : ''}
        buildState={buildStateForModals}
        estimatedTotal={totalPrice}
      />
    </main>
  );
}
