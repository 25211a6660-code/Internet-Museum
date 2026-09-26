import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  History, 
  Terminal,
  Quote
} from 'lucide-react';
import { playUiClick } from '../utils/audio';

interface GuestbookEntry {
  id: string;
  name: string;
  yearFirstOnline: string;
  memory: string;
  timestamp: string;
}

const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Elena Rostova',
    yearFirstOnline: '1996',
    memory: 'Waiting 45 minutes for a single photograph of the Martian surface to render line-by-line in Netscape 2.0.',
    timestamp: 'Archived Record'
  },
  {
    id: '2',
    name: 'David Chen',
    yearFirstOnline: '2004',
    memory: 'Tinkering with CSS stylesheets on MySpace until 3 AM to get a custom song playlist to autoplay.',
    timestamp: 'Archived Record'
  },
  {
    id: '3',
    name: 'Dr. Sarah Mitchell',
    yearFirstOnline: '1988',
    memory: 'Logging into Usenet newsgroups via VT100 terminals to discuss physics preprints with CERN colleagues.',
    timestamp: 'Archived Record'
  }
];

interface AboutSectionProps {
  isDark?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDark = true }) => {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);
  const [userName, setUserName] = useState('');
  const [firstYear, setFirstYear] = useState('2005');
  const [memoryText, setMemoryText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !memoryText.trim()) return;

    playUiClick();
    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: userName.trim(),
      yearFirstOnline: firstYear,
      memory: memoryText.trim(),
      timestamp: 'Just now'
    };

    setGuestbook([newEntry, ...guestbook]);
    setUserName('');
    setMemoryText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background aura */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-purple-500/10 border border-purple-500/30 text-purple-400 mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>Curatorial Mission & Heritage Archive</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
          About The Internet Museum
        </h2>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          The global Internet is the most complex machine and shared cultural archive ever assembled by humanity.
          Our mission is to chronicle its inception, its pioneers, and its ongoing evolution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Curatorial Manifesto Card (7 cols) */}
        <div 
          className="lg:col-span-7 rounded-3xl border backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Quote Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-indigo-500/10 border border-cyan-500/20 relative">
            <Quote className="w-8 h-8 text-cyan-400/40 mb-2" />
            <p className="text-lg sm:text-xl font-serif italic text-white leading-snug">
              "This is for everyone."
            </p>
            <p className="text-xs font-mono text-cyan-400 mt-2">
              — Sir Tim Berners-Lee, Inventor of the World Wide Web (London 2012)
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <h3 className="text-xl font-bold text-white">The Living Archive</h3>
            <p>
              In 1969, four research mainframe computers communicated via 50 kbps copper lines. Today, over 5.5 billion human beings communicate across continents in fractions of a second through light traveling inside glass threads under the ocean.
            </p>
            <p>
              The Internet Museum was engineered to provide students, software engineers, and curious citizens a sensory, interactive journey through the landmark decisions that forged our modern digital reality: packet switching, the @ symbol, open-source protocols, and generative cognition.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-white">Open Protocols</div>
              <p className="text-[11px] text-slate-400 mt-1">Preserving unencumbered open standards</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
              <History className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-white">Digital Heritage</div>
              <p className="text-[11px] text-slate-400 mt-1">Documenting ephemeral software history</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-center">
              <Sparkles className="w-5 h-5 text-amber-300 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-white">Future Horizons</div>
              <p className="text-[11px] text-slate-400 mt-1">Exploring AI and decentralized futures</p>
            </div>
          </div>
        </div>

        {/* Interactive Digital Visitor Guestbook (5 cols) */}
        <div 
          className="lg:col-span-5 rounded-3xl border backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-5"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Visitor Memories Guestbook
              </h3>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">
              {guestbook.length} Entries Logged
            </span>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmitMemory} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Year First Online</label>
                <select
                  value={firstYear}
                  onChange={(e) => setFirstYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                >
                  {Array.from({ length: 45 }, (_, i) => 1980 + i).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Your Earliest Internet Memory</label>
              <textarea
                required
                rows={2}
                placeholder="e.g., The screech of a 56k modem, building my first website..."
                value={memoryText}
                onChange={(e) => setMemoryText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log Memory in Archive</span>
            </button>

            {submitted && (
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center animate-in fade-in">
                Memory successfully inscribed in the museum guestbook!
              </div>
            )}
          </form>

          {/* Guestbook Entries Feed */}
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {guestbook.map((entry) => (
              <div 
                key={entry.id}
                className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1 animate-in fade-in"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">{entry.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    Online since {entry.yearFirstOnline}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  "{entry.memory}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
