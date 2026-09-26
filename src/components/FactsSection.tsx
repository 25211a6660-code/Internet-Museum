import React, { useState } from 'react';
import { INTERNET_FACTS } from '../data/museumData';
import { InternetFact } from '../types';
import { 
  Sparkles, 
  Shuffle, 
  Copy, 
  Check, 
  HelpCircle, 
  Quote, 
  Compass, 
  Share2, 
  BookmarkCheck,
  Lightbulb
} from 'lucide-react';
import { playUiClick, playFuturisticChime } from '../utils/audio';

interface FactsSectionProps {
  isDark?: boolean;
}

export const FactsSection: React.FC<FactsSectionProps> = ({ isDark = true }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [factHistory, setFactHistory] = useState<number[]>([0]);

  const currentFact = INTERNET_FACTS[currentIndex];

  const handleNextFact = () => {
    playUiClick();
    setIsAnimating(true);

    setTimeout(() => {
      // Pick next index, avoiding immediate duplicate
      let nextIndex = Math.floor(Math.random() * INTERNET_FACTS.length);
      if (nextIndex === currentIndex) {
        nextIndex = (currentIndex + 1) % INTERNET_FACTS.length;
      }
      setCurrentIndex(nextIndex);
      setFactHistory((prev) => [...prev.slice(-10), nextIndex]);
      setIsAnimating(false);
      setIsCopied(false);
    }, 180);
  };

  const handleCopyFact = () => {
    playUiClick();
    const textToCopy = `"${currentFact.fact}" — Internet Museum Archive (${currentFact.sourceHint})`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="facts" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Curator’s Curiosity Vault</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
          Internet Facts & Curiosities
        </h2>
        <p className="text-base text-slate-400">
          Unusual technical anomalies, forgotten firsts, and jaw-dropping statistics from 60+ years of digital history.
        </p>
      </div>

      {/* Fact Display Container */}
      <div 
        className="relative rounded-3xl border backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: '0 20px 50px -15px rgba(245, 158, 11, 0.15)'
        }}
      >
        {/* Subtle decorative quote watermark */}
        <Quote className="absolute right-6 bottom-6 w-32 h-32 text-white/5 pointer-events-none" />

        {/* Fact Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {currentFact.category}
            </span>
            {currentFact.yearContext && (
              <span className="text-xs font-mono text-slate-400">
                Year: {currentFact.yearContext}
              </span>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <span>ARCHIVE ENTRY #{currentFact.id}</span>
            <span className="text-slate-600">/</span>
            <span>{INTERNET_FACTS.length} TOTAL</span>
          </div>
        </div>

        {/* Dynamic Fact Content with animation */}
        <div className={`transition-all duration-200 min-h-[140px] flex flex-col justify-center ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Did You Know?</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
            {currentFact.title}
          </h3>

          <p className={`text-base sm:text-xl font-normal leading-relaxed mb-6 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            "{currentFact.fact}"
          </p>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Source: {currentFact.sourceHint}</span>
          </div>
        </div>

        {/* Interactive Controls & CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleCopyFact}
            className="px-3 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
            title="Copy fact quote"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Fact</span>
              </>
            )}
          </button>

          {/* MAIN REQUESTED BUTTON: "Generate Another Fact" */}
          <button
            onClick={handleNextFact}
            className="px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 active:scale-95 text-black transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Another Fact</span>
          </button>
        </div>
      </div>
    </section>
  );
};
