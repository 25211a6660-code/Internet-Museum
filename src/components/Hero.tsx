import React from 'react';
import { HeroGlobeCanvas } from './HeroGlobeCanvas';
import { MUSEUM_STATS } from '../data/museumData';
import { 
  ArrowDown, 
  Sparkles, 
  Compass, 
  Zap, 
  Globe2, 
  Volume2, 
  VolumeX,
  Play
} from 'lucide-react';
import { playUiClick, playFuturisticChime } from '../utils/audio';

interface HeroProps {
  onExploreTimeline: () => void;
  onExploreThenVsNow: () => void;
  isDark?: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTimeline,
  onExploreThenVsNow,
  isDark = true,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden">
      {/* 3D Interactive Rotating Globe Background */}
      <div className="absolute inset-0 z-0 opacity-80 sm:opacity-90 pointer-events-auto">
        <HeroGlobeCanvas isDark={isDark} />
      </div>

      {/* Atmospheric lighting gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060814]/40 via-transparent to-[#060814] pointer-events-none z-1" />

      {/* Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto pointer-events-none">
        {/* Curatorial Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>PERMANENT DIGITAL HERITAGE EXHIBIT</span>
        </div>

        {/* Hero Title: Exactly as requested: "THE INTERNET MUSEUM" */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none mb-6">
          <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
            THE INTERNET
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            MUSEUM
          </span>
        </h1>

        {/* Subtitle: Exactly as requested: "Explore how the digital world changed humanity." */}
        <p className="text-lg sm:text-2xl md:text-3xl text-slate-300 font-light max-w-3xl mx-auto mb-10 leading-snug tracking-tight">
          Explore how the digital world changed humanity.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          {/* Main button requested: "Explore Timeline" */}
          <button
            onClick={() => {
              playFuturisticChime();
              onExploreTimeline();
            }}
            className="px-8 py-4 rounded-2xl text-sm sm:text-base font-bold font-mono tracking-wide bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-black transition-all duration-200 shadow-xl shadow-cyan-500/25 flex items-center gap-3 cursor-pointer group"
          >
            <span>Explore Timeline</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={() => {
              playUiClick();
              onExploreThenVsNow();
            }}
            className="px-6 py-4 rounded-2xl text-sm sm:text-base font-mono text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-400/40 transition-all backdrop-blur-xl shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Then vs. Now</span>
          </button>

          <button
            onClick={() => {
              onToggleSound();
              playUiClick();
            }}
            className="p-4 rounded-2xl text-slate-400 hover:text-white bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-xl cursor-pointer"
            title={soundEnabled ? 'Mute audio synthesizer' : 'Enable audio synthesizer'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Museum Quick Stats Bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-10">
        <div 
          className="rounded-2xl border backdrop-blur-xl p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 shadow-2xl transition-all"
          style={{
            backgroundColor: isDark ? 'rgba(10, 15, 30, 0.75)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
          }}
        >
          {MUSEUM_STATS.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-cyan-400">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
