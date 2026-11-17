import React, { useState } from 'react';
import { Truck, Shield, Layers, Zap, CheckCircle2, Printer, Share2 } from 'lucide-react';
import { configuratorData } from '../data/configuratorData';

export default function ConfiguratorDock({ config, setConfig, onExport, onShare }) {
  const [activeTab, setActiveTab] = useState('vehicle');

  const selectedSeries = configuratorData.series.find((s) => s.id === config.series);
  const selectedFinish = configuratorData.finishes.find((f) => f.id === config.finish);
  
  let addonsTotal = 0;
  if (config.grilleGuard) {
    const item = configuratorData.addons.find((a) => a.id === 'grilleGuard');
    if (item) addonsTotal += item.price;
  }
  if (config.ledPods) {
    const item = configuratorData.addons.find((a) => a.id === 'ledPods');
    if (item) addonsTotal += item.price;
  }
  if (config.winch) {
    const item = configuratorData.addons.find((a) => a.id === 'winch');
    if (item) addonsTotal += item.price;
  }
  if (config.shackles) {
    const item = configuratorData.addons.find((a) => a.id === 'shackles');
    if (item) addonsTotal += item.price;
  }

  const totalPrice = (selectedSeries?.basePrice || 1899) + (selectedFinish?.price || 0) + addonsTotal;

  const handleShareClick = () => {
    if (onShare) {
      onShare();
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Configuration URL Copied to Clipboard!');
    }
  };

  return (
    <div className="relative md:static h-full w-full md:w-[360px] lg:w-[440px] xl:w-[460px] shrink-0 bg-[#0A0B0D]/95 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-[#1D212A] flex flex-col z-20 text-[#F8F9FA] shadow-2xl overflow-hidden min-h-0 select-none">
      
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-[#1D212A] flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[#F59E0B] font-mono text-xs tracking-widest uppercase font-bold">
            <Shield className="w-4 h-4" /> Commercial Studio
          </div>
          <h1 className="text-lg sm:text-xl font-display font-bold mt-1">Jack's Bumpers Configurator</h1>
        </div>
      </div>

      {/* 4 Step Navigation Tabs */}
      <div className="grid grid-cols-4 bg-[#14171D] border-b border-[#1D212A] text-xs font-semibold text-[#8893A6] shrink-0">
        {[
          { id: 'vehicle', label: 'Vehicle', icon: Truck },
          { id: 'series', label: 'Series', icon: Shield },
          { id: 'finish', label: 'Finish', icon: Layers },
          { id: 'addons', label: 'Upfits', icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 sm:py-3.5 flex flex-col items-center gap-1 transition-all ${
                isActive
                  ? 'text-[#F59E0B] border-b-2 border-[#F59E0B] bg-[#1D212A]/50 font-bold'
                  : 'hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar min-h-0">
        
        {activeTab === 'vehicle' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xs sm:text-sm font-mono text-[#8893A6] uppercase tracking-wider">
              Select Truck Platform
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {configuratorData.vehicles.map((v) => {
                const isSelected = config.vehicle === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setConfig({ ...config, vehicle: v.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-glow-amber'
                        : 'border-[#1D212A] bg-[#14171D] hover:border-[#3E4657]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold font-display text-sm sm:text-base text-white">
                        {v.name}
                      </span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#F59E0B] shrink-0" />}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-mono text-[#8893A6]">{v.years}</span>
                      <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                        {v.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'series' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xs sm:text-sm font-mono text-[#8893A6] uppercase tracking-wider">
              Select Bumper Series
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {configuratorData.series.map((s) => {
                const isSelected = config.series === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setConfig({ ...config, series: s.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-glow-amber'
                        : 'border-[#1D212A] bg-[#14171D] hover:border-[#3E4657]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold font-display text-sm sm:text-base text-white">
                        {s.name}
                      </span>
                      <span className="text-sm font-mono font-bold text-[#F59E0B]">
                        ${s.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#8893A6] mt-2 leading-relaxed">{s.desc}</p>
                    <div className="flex gap-3 mt-3 pt-3 border-t border-[#1D212A] text-[10px] font-mono text-[#8893A6]">
                      <span>Weight: {s.weight}</span>
                      <span>•</span>
                      <span>{s.winchCapacity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'finish' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xs sm:text-sm font-mono text-[#8893A6] uppercase tracking-wider">
              Armor Coating & Finish
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {configuratorData.finishes.map((f) => {
                const isSelected = config.finish === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setConfig({ ...config, finish: f.id })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-glow-amber'
                        : 'border-[#1D212A] bg-[#14171D] hover:border-[#3E4657]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold font-display text-sm sm:text-base text-white">
                        {f.name}
                      </span>
                      <span className="text-xs font-mono text-[#F59E0B] font-bold">
                        {f.price === 0 ? 'Included' : `+$${f.price}`}
                      </span>
                    </div>
                    <p className="text-xs text-[#8893A6] mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'addons' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <h3 className="text-xs sm:text-sm font-mono text-[#8893A6] uppercase tracking-wider">
              Modular Upgrades & Upfits
            </h3>
            <div className="space-y-3">
              {[
                { key: 'grilleGuard', item: configuratorData.addons[0] },
                { key: 'ledPods', item: configuratorData.addons[1] },
                { key: 'winch', item: configuratorData.addons[2] },
                { key: 'shackles', item: configuratorData.addons[3] }
              ].map(({ key, item }) => (
                <label 
                  key={key}
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    config[key]
                      ? 'border-[#F59E0B] bg-[#F59E0B]/10 shadow-glow-amber'
                      : 'border-[#1D212A] bg-[#14171D] hover:border-[#3E4657]'
                  }`}
                >
                  <div className="flex gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={!!config[key]}
                      onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
                      className="mt-1 accent-[#F59E0B] w-4 h-4 rounded cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-bold font-display text-sm text-white block">
                        {item.name}
                      </span>
                      <span className="text-xs text-[#8893A6] leading-relaxed block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#F59E0B] shrink-0 ml-3 font-bold">
                    +${item.price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Pricing & Checkout Footer */}
      <div className="p-4 sm:p-6 border-t border-[#1D212A] bg-[#14171D] space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-[#8893A6] font-mono uppercase tracking-wider">
            Total Build Price
          </span>
          <span className="text-xl sm:text-2xl font-display font-bold text-[#F59E0B]">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExport}
            className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold py-3.5 px-4 rounded-xl font-display text-xs sm:text-sm uppercase tracking-wider transition-all shadow-glow-amber flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Spec Quote</span>
          </button>
          <button
            onClick={handleShareClick}
            className="bg-[#1D212A] hover:bg-[#2A303C] text-white p-3.5 rounded-xl border border-[#3E4657] transition-all cursor-pointer hover:border-[#F59E0B]"
            title="Share Build"
          >
            <Share2 className="w-5 h-5 text-zinc-300 hover:text-white" />
          </button>
        </div>
      </div>

    </div>
  );
}
