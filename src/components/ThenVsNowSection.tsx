import React, { useState } from 'react';
import { THEN_VS_NOW } from '../data/museumData';
import { ComparisonItem } from '../types';
import { 
  ArrowRight, 
  Zap, 
  Sliders, 
  Volume2, 
  Layers, 
  Sparkles, 
  Check, 
  Clock, 
  PhoneCall, 
  Bot, 
  Cloud, 
  FileCode, 
  TabletSmartphone,
  Gauge
} from 'lucide-react';
import { playUiClick, playDialUpSimulation } from '../utils/audio';

interface ThenVsNowSectionProps {
  isDark?: boolean;
}

export const ThenVsNowSection: React.FC<ThenVsNowSectionProps> = ({ isDark = true }) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(THEN_VS_NOW[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSimulatingSpeed, setIsSimulatingSpeed] = useState<boolean>(false);
  const [dialupDownloaded, setDialupDownloaded] = useState<number>(0);
  const [fiberDownloaded, setFiberDownloaded] = useState<number>(0);

  const activeComp = THEN_VS_NOW.find((c) => c.id === selectedCompId) || THEN_VS_NOW[0];

  const getCompIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode': return <FileCode className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      case 'TabletSmartphone': return <TabletSmartphone className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Speed simulator comparison benchmark
  const startSpeedBenchmark = () => {
    playUiClick();
    setIsSimulatingSpeed(true);
    setDialupDownloaded(0);
    setFiberDownloaded(0);

    // Modern 5G finishes almost instantaneously
    setTimeout(() => {
      setFiberDownloaded(100);
    }, 400);

    // Dial-up creeps along slowly
    const interval = setInterval(() => {
      setDialupDownloaded((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsSimulatingSpeed(false);
          return 6; // Still only 6% after seconds
        }
        return prev + 1;
      });
    }, 450);
  };

  return (
    <section id="then-vs-now" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Epoch Contrast Exhibition</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          Then vs. Now: The Great Leap
        </h2>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          Witness how the architecture of everyday life transformed from screeching 56kbps copper lines into instantaneous planetary intelligence.
        </p>
      </div>

      {/* Interactive Item Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center scrollbar-none">
        {THEN_VS_NOW.map((comp) => {
          const isSelected = comp.id === selectedCompId;
          return (
            <button
              key={comp.id}
              onClick={() => {
                playUiClick();
                setSelectedCompId(comp.id);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all shrink-0 border flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-cyan-400 shadow-md scale-105'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{comp.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Showcase Card */}
      <div 
        className="rounded-3xl border backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Animated Connecting Line Indicator */}
        <div className="hidden lg:flex items-center justify-between mb-8 px-6 text-xs font-mono text-slate-400 relative">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ORIGIN ERA (THEN)</span>
          </div>

          <div className="flex-1 mx-8 relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 opacity-60" />
            <div className="absolute px-3 py-1 rounded-full bg-slate-900 border border-purple-500/40 text-purple-300 text-[11px] font-mono shadow-sm">
              EVOLUTION VECTOR
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span>MODERN REALITY (NOW)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* "THEN" Box */}
          <div 
            className="rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden transition-all group hover:border-cyan-500/50"
            style={{
              backgroundColor: isDark ? 'rgba(6, 12, 28, 0.65)' : 'rgba(248, 250, 252, 0.9)',
              borderColor: isDark ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.3)'
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {activeComp.then.era}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Historical Epoch
                </span>
              </div>

              <h3 className="text-2xl font-black mb-1.5 text-white">
                {activeComp.then.title}
              </h3>
              
              <div className="inline-block px-2.5 py-1 rounded bg-black/40 border border-cyan-500/20 text-cyan-300 font-mono text-xs mb-4">
                {activeComp.then.speedOrStat}
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeComp.then.description}
              </p>
            </div>

            {/* Vintage Visual Artifact / Snippet */}
            <div className="rounded-xl bg-black/80 border border-cyan-500/30 p-3.5 font-mono text-xs text-cyan-300/90 shadow-inner overflow-x-auto">
              <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider flex items-center justify-between">
                <span>VINTAGE CONSOLE / RAW SPEC</span>
                {activeComp.id === 'comp-2' && (
                  <button
                    onClick={() => playDialUpSimulation()}
                    className="text-cyan-400 hover:text-white flex items-center gap-1 text-[10px] underline"
                  >
                    <Volume2 className="w-3 h-3" /> Play 56k Modem Tone
                  </button>
                )}
              </div>
              <div className="text-xs select-all text-emerald-400/90 break-words">
                {activeComp.then.visualDetail}
              </div>
            </div>
          </div>

          {/* "NOW" Box */}
          <div 
            className="rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden transition-all group hover:border-emerald-500/50"
            style={{
              backgroundColor: isDark ? 'rgba(6, 20, 20, 0.65)' : 'rgba(240, 253, 250, 0.9)',
              borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.35)'
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeComp.now.era}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Contemporary Standard
                </span>
              </div>

              <h3 className="text-2xl font-black mb-1.5 text-white">
                {activeComp.now.title}
              </h3>
              
              <div className="inline-block px-2.5 py-1 rounded bg-black/40 border border-emerald-500/20 text-emerald-300 font-mono text-xs mb-4">
                {activeComp.now.speedOrStat}
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeComp.now.description}
              </p>
            </div>

            {/* Modern Visual Code / Spec */}
            <div className="rounded-xl bg-black/80 border border-emerald-500/30 p-3.5 font-mono text-xs text-emerald-300/90 shadow-inner overflow-x-auto">
              <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">
                CONTEMPORARY CODE / PIPELINE SPEC
              </div>
              <div className="text-xs select-all text-cyan-300/90 break-words">
                {activeComp.now.visualDetail}
              </div>
            </div>
          </div>
        </div>

        {/* Historical Impact Banner */}
        <div 
          className="mt-6 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)',
            borderColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.2)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 block">
                CULTURAL & CIVILIZATIONAL SHIFT
              </span>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {activeComp.impactHighlight}
              </p>
            </div>
          </div>

          {/* Interactive Benchmark Button */}
          {activeComp.id === 'comp-2' && (
            <button
              onClick={startSpeedBenchmark}
              disabled={isSimulatingSpeed}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold rounded-xl transition-all shadow-md shrink-0 disabled:opacity-60 flex items-center gap-1.5"
            >
              <Gauge className="w-4 h-4" />
              <span>Simulate Speed Race</span>
            </button>
          )}
        </div>

        {/* Interactive Download Speed Benchmark Simulation Bar (when test is running or completed) */}
        {activeComp.id === 'comp-2' && (dialupDownloaded > 0 || fiberDownloaded > 0) && (
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>TEST: TRANSFERRING 50MB DIGITAL ASSET</span>
              <span className="text-cyan-400">{isSimulatingSpeed ? 'SIMULATING...' : 'BENCHMARK COMPLETE'}</span>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-slate-300">
                <span>1995 Dial-up (56 kbps):</span>
                <span>{dialupDownloaded}% (Estimated: 2 hr 15 min remaining)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${dialupDownloaded}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-emerald-400 font-bold">
                <span>Today's Gigabit Fiber / 5G (1 Gbps):</span>
                <span>{fiberDownloaded}% (Completed in 0.4 seconds)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${fiberDownloaded}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
