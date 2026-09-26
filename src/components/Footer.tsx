import React from 'react';
import { Globe2, ArrowUp, Github, Heart, Sparkles, Terminal } from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface FooterProps {
  onScrollToTop: () => void;
  isDark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, isDark = true }) => {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-12 overflow-hidden bg-[#04060e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Statement */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#060814] rounded-[10px] flex items-center justify-center">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-mono text-lg font-black tracking-wider text-white">
                INTERNET<span className="text-cyan-400">.MUSEUM</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An open digital museum commemorating the technical architecture, pioneers, and human culture of the global network from ARPANET in 1969 to modern synthetic intelligence.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Free & Open Cultural Artifact</span>
            </div>
          </div>

          {/* Col 2: Museum Exhibits */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Permanent Galleries
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  1960s: ARPANET Origins
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  1970s: Protocols & SNDMSG
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  1980s: TCP/IP & DNS Flag Day
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  1990s: World Wide Web at CERN
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  2000s: Web 2.0 & Wikipedia
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  2010s: Smartphone Ubiquity
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  2020s: Generative AI Epoch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#then-vs-now" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  Then vs Now Comparison
                </a>
              </li>
              <li>
                <a href="#websites" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  Iconic Websites Gallery
                </a>
              </li>
              <li>
                <a href="#facts" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  Random Fact Generator
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => playUiClick()} className="hover:text-cyan-400 transition-colors">
                  Visitor Memories Guestbook
                </a>
              </li>
              <li>
                <span className="text-slate-500">Audio Synthesizer: Web Audio API</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-500 text-center sm:text-left">
            Internet Museum • Dedicated to the public domain and the pioneers who built the free internet.
          </div>

          <button
            onClick={() => {
              playUiClick();
              onScrollToTop();
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
