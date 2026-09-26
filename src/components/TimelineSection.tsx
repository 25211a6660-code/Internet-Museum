import React, { useState, useMemo } from 'react';
import { Era } from '../types';
import { MUSEUM_ERAS } from '../data/museumData';
import { 
  Search, 
  Sparkles, 
  Cpu, 
  Mail, 
  Globe, 
  Layout, 
  Users, 
  Smartphone, 
  SlidersHorizontal, 
  ChevronRight, 
  ArrowRight,
  Filter,
  Layers,
  RotateCcw
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface TimelineSectionProps {
  onSelectEra: (era: Era) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDark?: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onSelectEra,
  searchQuery,
  onSearchChange,
  isDark = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const categories = [
    { id: 'all', label: 'All Eras' },
    { id: 'origins', label: 'Origins (1960s)' },
    { id: 'protocol', label: 'Protocols (1970s-80s)' },
    { id: 'web', label: 'Web Boom (1990s)' },
    { id: 'social', label: 'Social & Web 2.0' },
    { id: 'mobile', label: 'Mobile & Cloud' },
    { id: 'ai', label: 'AI Era (2020s)' }
  ];

  const getEraIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const filteredEras = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MUSEUM_ERAS.filter((era) => {
      const matchesCategory = selectedCategory === 'all' || era.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      return (
        era.year.toLowerCase().includes(q) ||
        era.title.toLowerCase().includes(q) ||
        era.subtitle.toLowerCase().includes(q) ||
        era.shortExplanation.toLowerCase().includes(q) ||
        era.detailedStory.toLowerCase().includes(q) ||
        era.interestingFact.toLowerCase().includes(q) ||
        era.relatedTechnologies.some(t => t.toLowerCase().includes(q)) ||
        era.pioneers.some(p => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background neon ambient aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header & Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Chronological Exhibit</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          The Seven Epochs of the Digital Age
        </h2>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          From the first two letters typed on ARPANET to synthetic intelligence spanning billions of parameters.
          Select any era to inspect artifacts, historical code, and breakthroughs.
        </p>
      </div>

      {/* Search & Filter Controls Toolbar */}
      <div 
        className="p-4 sm:p-5 rounded-2xl border backdrop-blur-xl mb-12 shadow-lg transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='Search timeline (e.g. "social media", "packet switching", "CERN", "DNS")...'
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-sans transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              style={{
                backgroundColor: isDark ? 'rgba(6, 10, 24, 0.6)' : 'rgba(241, 245, 249, 0.9)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                color: isDark ? '#f8fafc' : '#0f172a'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                title="Clear search"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* View Mode Toggle (Vertical vs Horizontal Track) */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">LAYOUT:</span>
            <div className="flex rounded-xl p-1 bg-black/30 border border-white/10">
              <button
                onClick={() => { playUiClick(); setViewLayout('vertical'); }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  viewLayout === 'vertical'
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vertical Stream
              </button>
              <button
                onClick={() => { playUiClick(); setViewLayout('horizontal'); }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  viewLayout === 'horizontal'
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Horizontal Track
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playUiClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-white/20 text-cyan-300 border-cyan-400/50 shadow-sm'
                  : 'text-slate-400 border-white/5 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => { playUiClick(); setSelectedCategory('all'); }}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono shrink-0 ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Zero results feedback */}
      {filteredEras.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-white/10">
          <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No matching museum exhibits found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            No entries matched "{searchQuery}". Try searching for terms like "packet", "CERN", "email", or "Google".
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-mono hover:bg-cyan-500/30"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* VERTICAL STREAM LAYOUT */}
      {viewLayout === 'vertical' && filteredEras.length > 0 && (
        <div className="relative">
          {/* Central glowing vertical timeline spine (for desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/60 via-purple-500/60 to-indigo-500/60" />

          <div className="space-y-12">
            {filteredEras.map((era, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={era.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline central node marker */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center border-2 bg-slate-950 z-10 shadow-lg group cursor-pointer transition-transform hover:scale-125"
                    style={{ borderColor: era.accentColor }}
                    onClick={() => {
                      playUiClick();
                      onSelectEra(era);
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full transition-transform group-hover:scale-110"
                      style={{ backgroundColor: era.accentColor }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:text-left' : 'md:text-left'}`}>
                    <div
                      onClick={() => {
                        playUiClick();
                        onSelectEra(era);
                      }}
                      className="group cursor-pointer rounded-2xl border p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl relative overflow-hidden"
                      style={{
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                        boxShadow: `0 10px 30px -15px ${era.accentColor}30`
                      }}
                    >
                      {/* Top neon edge highlight */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: era.accentColor }}
                      />

                      {/* Header with year & icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2.5 rounded-xl border flex items-center justify-center transition-transform group-hover:rotate-6"
                            style={{ 
                              backgroundColor: `${era.accentColor}18`,
                              borderColor: `${era.accentColor}40`,
                              color: era.accentColor 
                            }}
                          >
                            {getEraIcon(era.iconName)}
                          </div>
                          <div>
                            <span 
                              className="text-xs font-mono font-bold tracking-wider uppercase block"
                              style={{ color: era.accentColor }}
                            >
                              {era.period}
                            </span>
                            <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: isDark ? '#fff' : '#0f172a' }}>
                              {era.year}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          EPOCH 0{index + 1}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-base sm:text-lg font-bold mb-1.5 text-white group-hover:text-cyan-300 transition-colors">
                        {era.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/80 mb-3">
                        {era.subtitle}
                      </p>

                      {/* Short Explanation */}
                      <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {era.shortExplanation}
                      </p>

                      {/* Fact Preview Banner */}
                      <div 
                        className="p-3 rounded-xl border text-xs mb-4 flex items-start gap-2.5"
                        style={{
                          backgroundColor: `${era.accentColor}0c`,
                          borderColor: `${era.accentColor}25`
                        }}
                      >
                        <Sparkles className="w-4 h-4 shrink-0 text-amber-300 mt-0.5" />
                        <span className={`line-clamp-2 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <strong className="font-semibold text-white mr-1">Fact:</strong>
                          {era.interestingFact}
                        </span>
                      </div>

                      {/* Related Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {era.relatedTechnologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] rounded font-mono border"
                            style={{
                              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                              color: isDark ? '#94a3b8' : '#475569'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {era.relatedTechnologies.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-500 self-center">
                            +{era.relatedTechnologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Explore Era CTA Button */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                          Click to enter exhibit
                        </span>
                        <div 
                          className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                          style={{
                            backgroundColor: era.accentColor,
                            color: '#000'
                          }}
                        >
                          <span>Explore Era</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HORIZONTAL CHRONO-TRACK LAYOUT */}
      {viewLayout === 'horizontal' && filteredEras.length > 0 && (
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-cyan-500/30">
            {filteredEras.map((era, index) => (
              <div
                key={era.id}
                onClick={() => {
                  playUiClick();
                  onSelectEra(era);
                }}
                className="snap-center shrink-0 w-[320px] sm:w-[380px] rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl relative overflow-hidden group flex flex-col justify-between"
                style={{
                  backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  boxShadow: `0 15px 35px -15px ${era.accentColor}35`
                }}
              >
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100"
                  style={{ backgroundColor: era.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                      style={{ 
                        backgroundColor: `${era.accentColor}20`,
                        color: era.accentColor 
                      }}
                    >
                      {era.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      STAGE {index + 1} / {filteredEras.length}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {era.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80 mb-3">
                    {era.period}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {era.shortExplanation}
                  </p>

                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 mb-4 text-[11px] text-slate-300">
                    <strong className="text-amber-300 block mb-1">Key Innovation:</strong>
                    {era.keyMilestones[0]}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Interactive Exhibit</span>
                  <div 
                    className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1"
                    style={{ backgroundColor: era.accentColor, color: '#000' }}
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-xs font-mono text-slate-400 mt-2">
            ← Scroll horizontally to traverse chronological eras →
          </div>
        </div>
      )}
    </section>
  );
};
