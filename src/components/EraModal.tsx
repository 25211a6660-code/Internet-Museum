import React, { useState, useEffect } from 'react';
import { Era } from '../types';
import { 
  X, 
  Sparkles, 
  Lightbulb, 
  Users, 
  Cpu, 
  Layers, 
  Volume2, 
  CheckCircle2, 
  Terminal, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { playUiClick, playFuturisticChime, playDialUpSimulation } from '../utils/audio';

interface EraModalProps {
  era: Era | null;
  onClose: () => void;
  onSelectTag?: (tag: string) => void;
  isDark?: boolean;
}

export const EraModal: React.FC<EraModalProps> = ({ era, onClose, onSelectTag, isDark = true }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'timeline'>('overview');
  
  // Interactive Simulator states
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'IMP #1 (UCLA Sigma 7) ONLINE -- 50kbps circuit ready',
    'Connected to SRI SDS 940 host at Stanford',
    'Type "LOGIN" or click the button below to transmit packet:'
  ]);
  const [hasSimulatedCrash, setHasSimulatedCrash] = useState(false);

  // DNS lookup simulator
  const [dnsQuery, setDnsQuery] = useState('symbolics.com');
  const [dnsResult, setDnsResult] = useState<string | null>(null);

  // 1990s HTML source view toggle
  const [htmlViewMode, setHtmlViewMode] = useState<'preview' | 'source'>('preview');

  // AI Prompt simulator
  const [aiTokens, setAiTokens] = useState<string[]>([]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    if (!era) return;
    playFuturisticChime();
    setActiveTab('overview');
    setTerminalInput('');
    setHasSimulatedCrash(false);
    setDnsResult(null);
    setAiTokens([]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [era, onClose]);

  if (!era) return null;

  // Simulator helper: ARPANET
  const triggerLoginTransmission = () => {
    playUiClick();
    setTerminalLog(prev => [
      ...prev,
      '> TRANSMITTING: L... [OK]',
      '> TRANSMITTING: O... [OK]',
      '*** SYSTEM CRASH: MEMORY OVERFLOW IN SRI HOST IMP ***',
      'Historical Note: Only "LO" arrived! The world’s first internet message was born.',
      'Re-establishing link... Buffer cleared. "G-I-N" sent successfully 60 minutes later.'
    ]);
    setHasSimulatedCrash(true);
  };

  // Simulator helper: DNS lookup
  const runDnsLookup = (domain: string) => {
    playUiClick();
    const mockMap: Record<string, string> = {
      'symbolics.com': '128.81.0.1 (First registered .com domain, March 15, 1985)',
      'cern.ch': '137.138.144.169 (CERN Geneva Hypertext Host)',
      'whitehouse.gov': '198.137.240.91 (Official Executive Branch)',
      'stanford.edu': '36.8.0.2 (ARPANET Node 2, SRI Neighbor)'
    };
    setDnsResult(mockMap[domain.toLowerCase()] || `Resolved 192.0.2.${Math.floor(Math.random() * 250 + 1)} via root server [RFC 882]`);
  };

  // Simulator helper: AI Token Stream
  const runAiSimulation = () => {
    if (isGeneratingAi) return;
    setIsGeneratingAi(true);
    setAiTokens([]);
    playUiClick();

    const sampleTokens = [
      'Neural', ' weights', ' activated', ' across', ' 175B', ' parameters.',
      ' Generating', ' synthetic', ' response', ' grounded', ' in', ' global', ' web', ' corpus...',
      ' "The', ' internet', ' is', ' humanity’s', ' collective', ' shared', ' consciousness."'
    ];

    sampleTokens.forEach((token, idx) => {
      setTimeout(() => {
        setAiTokens(prev => [...prev, token]);
        if (idx === sampleTokens.length - 1) {
          setIsGeneratingAi(false);
        }
      }, (idx + 1) * 110);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border overflow-hidden shadow-2xl transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(10, 15, 30, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
          boxShadow: `0 20px 50px -10px ${era.accentColor}33`
        }}
      >
        {/* Top Header Banner */}
        <div 
          className="relative px-6 py-6 border-b flex flex-wrap items-center justify-between gap-4"
          style={{ 
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            background: isDark 
              ? `linear-gradient(135deg, ${era.accentColor}18, transparent 70%)` 
              : `linear-gradient(135deg, ${era.accentColor}12, transparent 70%)`
          }}
        >
          <div className="flex items-center gap-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
              style={{ 
                backgroundColor: `${era.accentColor}20`, 
                borderColor: `${era.accentColor}50`,
                color: era.accentColor 
              }}
            >
              {era.period}
            </span>
            <span className="text-xs font-mono text-slate-400">
              MUSEUM ARCHIVE EXHIBIT #{era.id.replace('era-', '')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {era.id === 'era-1990s' && (
              <button
                onClick={() => playDialUpSimulation()}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors border hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: `${era.accentColor}15`,
                  borderColor: `${era.accentColor}40`,
                  color: isDark ? '#fff' : '#0f172a'
                }}
                title="Play simulated 56k dial-up audio"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hear Dial-Up Sound</span>
              </button>
            )}
            
            <button
              onClick={() => {
                playUiClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            >
              {era.year} — {era.title}
            </span>
          </div>
          <p className="text-sm sm:text-base text-cyan-400/90 font-medium">
            {era.subtitle}
          </p>

          {/* Navigation Tabs inside modal */}
          <div className="flex gap-2 mt-4 border-b border-white/10 pb-2">
            <button
              onClick={() => { playUiClick(); setActiveTab('overview'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Exhibit Overview
            </button>
            <button
              onClick={() => { playUiClick(); setActiveTab('simulator'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Interactive Era Simulator
            </button>
            <button
              onClick={() => { playUiClick(); setActiveTab('timeline'); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Key Milestones ({era.keyMilestones.length})
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Short explanation block */}
              <div 
                className="p-4 rounded-xl border leading-relaxed text-sm sm:text-base font-normal"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  color: isDark ? '#e2e8f0' : '#1e293b'
                }}
              >
                <div className="text-xs font-mono uppercase tracking-wider mb-1 text-slate-400">Curator’s Summary</div>
                {era.shortExplanation}
              </div>

              {/* In-depth Curatorial Story */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Historical Narrative & Technological Breakthrough
                </h4>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {era.detailedStory}
                </p>
              </div>

              {/* Did You Know? Callout Box */}
              <div 
                className="p-4 rounded-xl border relative overflow-hidden"
                style={{
                  backgroundColor: `${era.accentColor}10`,
                  borderColor: `${era.accentColor}35`
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="p-2 rounded-lg shrink-0"
                    style={{ backgroundColor: `${era.accentColor}25` }}
                  >
                    <Lightbulb className="w-5 h-5" style={{ color: era.accentColor }} />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase font-bold tracking-wider mb-1 text-white flex items-center gap-1.5">
                      <span>MUSEUM ARCHIVE FACT</span>
                      <Sparkles className="w-3 h-3 text-amber-300" />
                    </h5>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {era.interestingFact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Technologies & Pioneers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Related Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {era.relatedTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => {
                          playUiClick();
                          if (onSelectTag) onSelectTag(tech);
                        }}
                        className="px-2.5 py-1 text-xs rounded-md font-mono transition-all border hover:border-cyan-400/50 hover:bg-cyan-500/10 cursor-pointer"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          color: isDark ? '#cbd5e1' : '#334155'
                        }}
                        title={`Filter or search for "${tech}"`}
                      >
                        #{tech}
                      </button>
                    ))}
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    Prominent Pioneers
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {era.pioneers.map((pioneer) => (
                      <span
                        key={pioneer}
                        className="px-2.5 py-1 text-xs rounded-md font-medium border"
                        style={{
                          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)',
                          borderColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                          color: isDark ? '#a5b4fc' : '#4338ca'
                        }}
                      >
                        {pioneer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between">
                <span>INTERACTIVE RETRO-HARDWARE & CODE ARTIFACT</span>
                <span className="uppercase">EMULATING {era.year} ENVIRONMENT</span>
              </div>

              {/* 1960s ARPANET Terminal */}
              {era.id === 'era-1960s' && (
                <div className="rounded-xl border border-emerald-500/30 bg-black p-4 font-mono text-xs text-emerald-400 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2 text-[11px] text-emerald-600">
                    <span>ARPA INTERFACE MESSAGE PROCESSOR [IMP #1 - UCLA 1969]</span>
                    <span>BAUD: 50,000 BPS</span>
                  </div>
                  <div className="space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto">
                    {terminalLog.map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-emerald-900/60 flex flex-wrap gap-2">
                    <button
                      onClick={triggerLoginTransmission}
                      disabled={hasSimulatedCrash}
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500 text-emerald-200 rounded text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {hasSimulatedCrash ? 'Transmitted "LO" (Crash Captured!)' : 'Transmit "LOGIN" to Stanford'}
                    </button>
                    {hasSimulatedCrash && (
                      <button
                        onClick={() => {
                          playUiClick();
                          setTerminalLog(['IMP #1 (UCLA Sigma 7) ONLINE -- 50kbps circuit ready', 'Connected to SRI SDS 940 host']);
                          setHasSimulatedCrash(false);
                        }}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded text-xs"
                      >
                        Reset Terminal
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 1970s Email Packet Flow */}
              {era.id === 'era-1970s' && (
                <div className="p-4 rounded-xl border border-blue-500/30 bg-slate-950 text-slate-200 font-mono text-xs space-y-4">
                  <div className="text-blue-400 font-bold flex items-center justify-between">
                    <span>RAY TOMLINSON SNDMSG EMAIL SYNTAX SIMULATOR (1971)</span>
                    <span className="text-[11px] bg-blue-500/20 px-2 py-0.5 rounded">RFC 561 STANDARD</span>
                  </div>
                  <div className="p-3 bg-black/60 rounded-lg border border-slate-800 space-y-2">
                    <div><span className="text-slate-500">FROM:</span> tomlinson@bbn-tenexa</div>
                    <div><span className="text-slate-500">TO:</span> cerf@ucla-nsc</div>
                    <div><span className="text-slate-500">SUBJECT:</span> Testing the @ symbol on SNDMSG</div>
                    <div className="pt-2 border-t border-slate-800 text-emerald-400">
                      "QWERTYUIOP -- The @ character cleanly separates the user mailbox from the remote host!"
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Before Tomlinson's breakthrough, messages could only be left for users on the exact same physical mainframe computer.
                  </p>
                </div>
              )}

              {/* 1980s DNS Resolver Simulator */}
              {era.id === 'era-1980s' && (
                <div className="p-4 rounded-xl border border-violet-500/30 bg-slate-950 text-slate-200 font-mono text-xs space-y-3">
                  <div className="text-violet-400 font-bold">
                    DOMAIN NAME SYSTEM (DNS) RESOLVER SIMULATOR [RFC 882 / 883]
                  </div>
                  <p className="text-slate-400">
                    Replace manual HOSTS.TXT lookups with distributed hierarchical domain trees. Test resolving early domains:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['symbolics.com', 'cern.ch', 'whitehouse.gov', 'stanford.edu'].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDnsQuery(d);
                          runDnsLookup(d);
                        }}
                        className={`px-2.5 py-1 rounded border text-xs transition-colors ${
                          dnsQuery === d ? 'bg-violet-600 text-white border-violet-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-violet-500'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {dnsResult && (
                    <div className="p-3 bg-black/70 rounded-lg border border-violet-500/30 text-emerald-400 animate-in fade-in">
                      <div className="text-slate-500 text-[10px]">DNS QUERY: A-RECORD FOR {dnsQuery}</div>
                      <div className="font-bold mt-1">➜ {dnsResult}</div>
                    </div>
                  )}
                </div>
              )}

              {/* 1990s World Wide Web CERN Browser */}
              {era.id === 'era-1990s' && (
                <div className="rounded-xl border border-pink-500/30 bg-slate-950 overflow-hidden text-xs font-mono">
                  {/* Fake 90s browser chrome */}
                  <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-slate-300">
                    <span className="text-[11px] font-sans">NeXT WorldWideWeb Browser (CERN 1991)</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setHtmlViewMode('preview')}
                        className={`px-2 py-0.5 rounded text-[10px] ${htmlViewMode === 'preview' ? 'bg-pink-600 text-white' : 'bg-slate-800'}`}
                      >
                        Rendered View
                      </button>
                      <button
                        onClick={() => setHtmlViewMode('source')}
                        className={`px-2 py-0.5 rounded text-[10px] ${htmlViewMode === 'source' ? 'bg-pink-600 text-white' : 'bg-slate-800'}`}
                      >
                        View HTML Source
                      </button>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-slate-800/60 border-b border-slate-700 text-slate-400 text-[11px] truncate">
                    Address: http://info.cern.ch/hypertext/WWW/TheProject.html
                  </div>
                  <div className="p-4 bg-[#c0c0c0] text-black min-h-[170px] font-serif">
                    {htmlViewMode === 'preview' ? (
                      <div className="space-y-2">
                        <h1 className="text-base font-bold underline font-sans text-black">World Wide Web</h1>
                        <p className="text-xs">
                          The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents.
                        </p>
                        <p className="text-xs">
                          Everything there is online about W3 is linked directly or indirectly to this document, including an <span className="text-blue-800 underline cursor-pointer">Executive summary</span>, <span className="text-blue-800 underline cursor-pointer">Mailing lists</span>, and <span className="text-blue-800 underline cursor-pointer">Technical specifications</span>.
                        </p>
                        <div className="mt-2 p-1 border border-black/30 text-[11px] font-mono bg-white inline-block">
                          NeXTstation CERN Server #1
                        </div>
                      </div>
                    ) : (
                      <div className="font-mono text-xs bg-slate-900 text-emerald-400 p-3 rounded overflow-x-auto space-y-1">
                        <div>&lt;TITLE&gt;The World Wide Web project&lt;/TITLE&gt;</div>
                        <div>&lt;H1&gt;World Wide Web&lt;/H1&gt;</div>
                        <div>&lt;P&gt;The WorldWideWeb (W3) is a wide-area &lt;A NAME=0 HREF="WhatIs.html"&gt;hypermedia&lt;/A&gt; information retrieval initiative...&lt;/P&gt;</div>
                        <div>&lt;A HREF="Summary.html"&gt;Executive summary&lt;/A&gt;</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2000s Web 2.0 AJAX / Social Simulator */}
              {era.id === 'era-2000s' && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-slate-950 text-slate-200 text-xs space-y-3">
                  <div className="text-emerald-400 font-mono font-bold flex items-center justify-between">
                    <span>WEB 2.0 PARTICIPATORY WALL SIMULATOR (AJAX & USER CONTENT)</span>
                    <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded font-mono">BROADBAND ERA</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg space-y-2 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-[10px]">T</span>
                      <div>
                        <span className="font-bold text-white">Tom (Co-Founder):</span>
                        <span className="text-slate-300 ml-1.5">"Thanks for adding me to your top 8! What song is playing on your page?"</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-6 h-6 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white text-[10px]">E</span>
                      <div>
                        <span className="font-bold text-white">Encyclopedia Contributor:</span>
                        <span className="text-slate-300 ml-1.5">"Edited article #1,000,000 on Wikipedia using collaborative Wiki syntax."</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 font-mono text-[11px]">
                    Key Shift: In Web 2.0, the reader became the writer. Websites refreshed dynamic widgets without reloading the whole screen.
                  </p>
                </div>
              )}

              {/* 2010s Mobile Responsive & App Grid */}
              {era.id === 'era-2010s' && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-950 text-slate-200 text-xs space-y-3">
                  <div className="text-amber-400 font-mono font-bold flex items-center justify-between">
                    <span>SMARTPHONE TOUCH ECOSYSTEM & 4G SPEED COMPARISON</span>
                    <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono">ALWAYS-CONNECTED</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-amber-400 font-bold text-sm">4G LTE</div>
                      <div className="text-[10px] text-slate-400 mt-1">100 Mbps mobile speed</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-cyan-400 font-bold text-sm">Cloud API</div>
                      <div className="text-[10px] text-slate-400 mt-1">AWS & Azure backbones</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-pink-400 font-bold text-sm">Responsive</div>
                      <div className="text-[10px] text-slate-400 mt-1">CSS Media Queries</div>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center">
                      <div className="text-emerald-400 font-bold text-sm">&gt; 50% Mobile</div>
                      <div className="text-[10px] text-slate-400 mt-1">Crossed desktop in 2016</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2020s AI Neural Stream Simulator */}
              {era.id === 'era-2020s' && (
                <div className="p-4 rounded-xl border border-indigo-500/40 bg-slate-950 text-slate-200 font-mono text-xs space-y-3">
                  <div className="text-indigo-400 font-bold flex items-center justify-between">
                    <span>LARGE LANGUAGE MODEL SYNTHESIS SIMULATOR</span>
                    <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded">TRANSFORMER ARCHITECTURE</span>
                  </div>
                  <p className="text-slate-400">
                    Click to simulate client-side real-time token generation:
                  </p>
                  <div className="p-3 bg-black/80 rounded-lg border border-indigo-500/30 min-h-[90px]">
                    <div className="text-slate-500 text-[10px] mb-1">PROMPT: "Summarize the essence of the Internet."</div>
                    <div className="text-indigo-200 text-sm font-sans flex flex-wrap gap-0.5">
                      {aiTokens.map((t, idx) => (
                        <span key={idx} className="animate-in fade-in duration-100">{t}</span>
                      ))}
                      {isGeneratingAi && (
                        <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse ml-1" />
                      )}
                      {!isGeneratingAi && aiTokens.length === 0 && (
                        <span className="text-slate-600 italic">Press button below to generate tokens...</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={runAiSimulation}
                    disabled={isGeneratingAi}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold transition-all disabled:opacity-50"
                  >
                    {isGeneratingAi ? 'Synthesizing Tokens...' : 'Run Generative Token Stream'}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Detailed Milestones of the {era.year}
              </div>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {era.keyMilestones.map((milestone, idx) => {
                  const [date, ...rest] = milestone.split(': ');
                  return (
                    <div key={idx} className="relative group">
                      <span 
                        className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2 transition-transform group-hover:scale-125"
                        style={{
                          backgroundColor: era.accentColor,
                          borderColor: isDark ? '#0a0f1e' : '#ffffff'
                        }}
                      />
                      <div className="font-mono text-xs font-bold" style={{ color: era.accentColor }}>
                        {date}
                      </div>
                      <div className={`text-sm mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {rest.join(': ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div 
          className="px-6 py-4 border-t flex items-center justify-between gap-4"
          style={{ 
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            backgroundColor: isDark ? 'rgba(10, 15, 30, 0.5)' : 'rgba(248, 250, 252, 0.8)'
          }}
        >
          <span className="text-xs font-mono text-slate-400">
            Click outside or press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">ESC</kbd> to return to gallery
          </span>

          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md active:scale-95"
            style={{
              backgroundColor: era.accentColor,
              color: '#000'
            }}
          >
            Close Exhibit Panel
          </button>
        </div>
      </div>
    </div>
  );
};
