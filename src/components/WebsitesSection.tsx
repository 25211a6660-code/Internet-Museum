import React, { useState } from 'react';
import { ICONIC_WEBSITES } from '../data/museumData';
import { IconicWebsite } from '../types';
import { 
  Globe2, 
  ExternalLink, 
  Calendar, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Info, 
  X,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface WebsitesSectionProps {
  isDark?: boolean;
}

export const WebsitesSection: React.FC<WebsitesSectionProps> = ({ isDark = true }) => {
  const [selectedSite, setSelectedSite] = useState<IconicWebsite | null>(null);

  return (
    <section id="websites" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Hall of Iconic Digital Landmarks</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          Architects of the Modern Web
        </h2>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          The seminal platforms that reshaped commerce, human knowledge, social connection, and multimedia. Click any card to inspect their inception and current global role.
        </p>
      </div>

      {/* Website Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ICONIC_WEBSITES.map((site) => {
          return (
            <div
              key={site.id}
              onClick={() => {
                playUiClick();
                setSelectedSite(site);
              }}
              className="group cursor-pointer rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between shadow-xl"
              style={{
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                boxShadow: `0 10px 30px -15px ${site.accentColor}25`
              }}
            >
              {/* Top Accent Strip */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: site.accentColor }}
              />

              <div>
                {/* Header with geometric typographic insignia (No trademark logos) */}
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border shadow-sm transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${site.accentColor}18`,
                      borderColor: `${site.accentColor}40`,
                      color: site.accentColor
                    }}
                  >
                    {site.iconSymbol}
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-slate-300">
                    Est. {site.launchYear}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    {site.name}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {site.category}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {site.originalPurpose}
                </p>

                {/* Traffic badge */}
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 mb-4 text-[11px] font-mono flex items-center gap-2 text-slate-300">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{site.trafficStat}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="group-hover:text-white transition-colors">View Archival Record</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED WEBSITE MODAL POPUP */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl rounded-2xl border p-6 sm:p-8 shadow-2xl overflow-hidden transition-all"
            style={{
              backgroundColor: isDark ? 'rgba(10, 15, 30, 0.96)' : 'rgba(255, 255, 255, 0.98)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              boxShadow: `0 25px 50px -12px ${selectedSite.accentColor}40`
            }}
          >
            {/* Top decorative stripe */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: selectedSite.accentColor }}
            />

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border"
                  style={{
                    backgroundColor: `${selectedSite.accentColor}20`,
                    borderColor: `${selectedSite.accentColor}50`,
                    color: selectedSite.accentColor
                  }}
                >
                  {selectedSite.iconSymbol}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white">{selectedSite.name}</h3>
                    <span 
                      className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                      style={{ 
                        backgroundColor: `${selectedSite.accentColor}20`,
                        color: selectedSite.accentColor 
                      }}
                    >
                      {selectedSite.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Launched in {selectedSite.launchYear} • {selectedSite.trafficStat}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playUiClick();
                  setSelectedSite(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              {/* Original Purpose */}
              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
              >
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  1. Original Genesis & Purpose ({selectedSite.launchYear})
                </span>
                <p className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  {selectedSite.originalPurpose}
                </p>
              </div>

              {/* How it changed over time */}
              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
              >
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block mb-1">
                  2. Architectural & Cultural Evolution
                </span>
                <p className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  {selectedSite.evolution}
                </p>
              </div>

              {/* Current Role */}
              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }}
              >
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  3. Contemporary Global Role Today
                </span>
                <p className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                  {selectedSite.currentRole}
                </p>
              </div>

              {/* Fun Fact */}
              <div 
                className="p-4 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: `${selectedSite.accentColor}12`,
                  borderColor: `${selectedSite.accentColor}35`
                }}
              >
                <Sparkles className="w-5 h-5 shrink-0 text-amber-300 mt-0.5" />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white block mb-0.5">
                    ARCHIVE TRIVIA
                  </span>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {selectedSite.funFact}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Internet Heritage Archive Record #{selectedSite.id}
              </span>
              <button
                onClick={() => {
                  playUiClick();
                  setSelectedSite(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
