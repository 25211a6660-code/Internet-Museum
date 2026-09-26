/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TimelineSection } from './components/TimelineSection';
import { ThenVsNowSection } from './components/ThenVsNowSection';
import { WebsitesSection } from './components/WebsitesSection';
import { FactsSection } from './components/FactsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { EraModal } from './components/EraModal';
import { SearchModal } from './components/SearchModal';
import { Era, IconicWebsite } from './types';
import { setSoundEnabled, getSoundEnabled, playUiClick } from './utils/audio';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeEra, setActiveEra] = useState<Era | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    setSoundEnabled(soundOn);
  }, [soundOn]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '/' || (e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key.toLowerCase() === 't') {
        document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key.toLowerCase() === 'w') {
        document.getElementById('websites')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key.toLowerCase() === 'f') {
        document.getElementById('facts')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const handleExploreTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreThenVsNow = () => {
    document.getElementById('then-vs-now')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTag = (tag: string) => {
    setActiveEra(null);
    setSearchQuery(tag);
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark 
          ? 'bg-[#060814] text-slate-100 selection:bg-cyan-500 selection:text-black' 
          : 'bg-[#f4f6fb] text-slate-900 selection:bg-cyan-400 selection:text-black'
      }`}
    >
      {/* Sticky Header Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with 3D Canvas Globe */}
        <Hero
          onExploreTimeline={handleExploreTimeline}
          onExploreThenVsNow={handleExploreThenVsNow}
          isDark={isDark}
          soundEnabled={soundOn}
          onToggleSound={handleToggleSound}
        />

        {/* 2. Interactive Timeline Section */}
        <TimelineSection
          onSelectEra={(era) => setActiveEra(era)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDark={isDark}
        />

        {/* 3. Special "Then vs Now" Comparison Section */}
        <ThenVsNowSection isDark={isDark} />

        {/* 4. Iconic Websites Section */}
        <WebsitesSection isDark={isDark} />

        {/* 5. Internet Facts Section */}
        <FactsSection isDark={isDark} />

        {/* 6. About the Museum & Visitor Guestbook */}
        <AboutSection isDark={isDark} />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={handleScrollToTop} isDark={isDark} />

      {/* Interactive Era Detail Modal */}
      {activeEra && (
        <EraModal
          era={activeEra}
          onClose={() => setActiveEra(null)}
          onSelectTag={handleSelectTag}
          isDark={isDark}
        />
      )}

      {/* Global Archive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEra={(era) => {
          setActiveEra(era);
          setIsSearchOpen(false);
        }}
        isDark={isDark}
      />
    </div>
  );
}
