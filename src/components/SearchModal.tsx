import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MUSEUM_ERAS, ICONIC_WEBSITES, INTERNET_FACTS } from '../data/museumData';
import { Era, IconicWebsite, InternetFact } from '../types';
import { Search, X, Layers, Globe, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEra: (era: Era) => void;
  onSelectWebsite?: (site: IconicWebsite) => void;
  isDark?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEra,
  onSelectWebsite,
  isDark = true
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        // Trigger handled by parent if needed
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        eras: MUSEUM_ERAS.slice(0, 3),
        websites: ICONIC_WEBSITES.slice(0, 3),
        facts: INTERNET_FACTS.slice(0, 2)
      };
    }

    const matchedEras = MUSEUM_ERAS.filter((era) => 
      era.title.toLowerCase().includes(q) ||
      era.year.toLowerCase().includes(q) ||
      era.subtitle.toLowerCase().includes(q) ||
      era.shortExplanation.toLowerCase().includes(q) ||
      era.relatedTechnologies.some(t => t.toLowerCase().includes(q)) ||
      era.pioneers.some(p => p.toLowerCase().includes(q))
    );

    const matchedWebsites = ICONIC_WEBSITES.filter((site) =>
      site.name.toLowerCase().includes(q) ||
      site.originalPurpose.toLowerCase().includes(q) ||
      site.category.toLowerCase().includes(q) ||
      site.evolution.toLowerCase().includes(q)
    );

    const matchedFacts = INTERNET_FACTS.filter((fact) =>
      fact.fact.toLowerCase().includes(q) ||
      fact.title.toLowerCase().includes(q) ||
      fact.category.toLowerCase().includes(q)
    );

    return {
      eras: matchedEras,
      websites: matchedWebsites,
      facts: matchedFacts
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(10, 15, 30, 0.96)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
        }}
      >
        {/* Search Input Bar */}
        <div className="relative px-5 py-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search museum records (e.g., "social media", "packet", "CERN", "1990s")...'
            className="w-full bg-transparent text-base sm:text-lg focus:outline-none text-white placeholder-slate-500 font-sans"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              CLEAR
            </button>
          ) : (
            <kbd className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono text-slate-400">
              ESC
            </kbd>
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Timeline Eras Results */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Timeline Epochs & Eras ({results.eras.length})</span>
            </div>
            {results.eras.length === 0 ? (
              <p className="text-xs text-slate-500 italic pl-2">No matching timeline epochs</p>
            ) : (
              <div className="space-y-1.5">
                {results.eras.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => {
                      playUiClick();
                      onSelectEra(era);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold"
                          style={{ backgroundColor: `${era.accentColor}20`, color: era.accentColor }}
                        >
                          {era.year}
                        </span>
                        <span className="font-bold text-sm text-white group-hover:text-cyan-300">
                          {era.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{era.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Iconic Websites Results */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Iconic Websites ({results.websites.length})</span>
            </div>
            {results.websites.length === 0 ? (
              <p className="text-xs text-slate-500 italic pl-2">No matching historical websites</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.websites.map((site) => (
                  <div
                    key={site.id}
                    onClick={() => {
                      playUiClick();
                      if (onSelectWebsite) onSelectWebsite(site);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white group-hover:text-purple-300">
                        {site.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{site.launchYear}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{site.originalPurpose}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internet Facts Results */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Verified Facts ({results.facts.length})</span>
            </div>
            {results.facts.length === 0 ? (
              <p className="text-xs text-slate-500 italic pl-2">No matching trivia facts</p>
            ) : (
              <div className="space-y-1.5">
                {results.facts.map((fact) => (
                  <div
                    key={fact.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                  >
                    <strong className="text-amber-300 block mb-0.5">{fact.title}</strong>
                    "{fact.fact}"
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Search spans 7 eras, 5 comparisons & 15+ museum facts</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select result
          </span>
        </div>
      </div>
    </div>
  );
};
