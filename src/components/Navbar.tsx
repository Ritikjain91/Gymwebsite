'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import {
  Sun,
  Moon,
  Briefcase,
  Dumbbell,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, perspective, setPerspective, openModal } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = perspective === 'investor'
    ? [
        { label: 'Brand', href: '#brand' },
        { label: 'Formats', href: '#formats' },
        { label: 'ROI Model', href: '#calculator' },
        { label: 'Revenue', href: '#revenue' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Criteria', href: '#site' },
        { label: 'FAQ', href: '#faq' },
      ]
    : [
        { label: 'Brand', href: '#brand' },
        { label: 'Zones', href: '#zones' },
        { label: 'Timetable', href: '#schedule' },
        { label: 'Physique', href: '#bmi' },
        { label: 'Results', href: '#transformations' },
        { label: 'FAQ', href: '#faq' },
      ];

  return (
    <>
      {/* Top Ticker Announcement */}
      <div className="bg-gradient-to-r from-[#9a7533] via-[#d4af37] to-[#ff6b35] text-black py-1.5 px-4 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
        <span className="truncate">Now Accepting Franchise Applications 2026–2027 • Exclusive Territory Rights Available</span>
        <button
          onClick={() => openModal('franchise')}
          className="underline ml-2 hover:opacity-80 hidden md:inline-block cursor-pointer font-extrabold shrink-0"
        >
          Check Eligibility →
        </button>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-xl py-2.5'
            : 'bg-[var(--navbar-bg)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] via-[#cfa95c] to-[#9a7533] flex items-center justify-center font-black text-black text-lg shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              RF
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-black text-xl tracking-tight text-[var(--text-primary)]">
                  RAW<span className="text-gold-gradient font-black">FIT</span>
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.3em] text-[var(--gold-primary)] uppercase">
                  GYM
                </span>
              </div>
              <span className="text-[9px] tracking-widest text-[var(--text-muted)] font-semibold uppercase">
                Life in Progress
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links (Evenly & Elegantly Spaced) */}
          <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Mode Selector + Theme Toggle + Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Perspective Selector (Investor vs Member) */}
            <div className="hidden lg:flex items-center p-0.5 rounded-full glass-panel border border-[var(--border-gold)] text-[11px] font-bold gap-1 shrink-0">
              <button
                onClick={() => setPerspective('investor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  perspective === 'investor'
                    ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span className="shrink-0">Investor</span>
              </button>
              <button
                onClick={() => setPerspective('member')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  perspective === 'member'
                    ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Dumbbell className="w-3.5 h-3.5 shrink-0" />
                <span className="shrink-0">Athlete</span>
              </button>
            </div>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--border-gold)] transition-colors cursor-pointer shrink-0"
              title={theme === 'dark' ? 'Switch to Ivory Luxury Light Mode' : 'Switch to Onyx Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffd700]" />
              ) : (
                <Moon className="w-4 h-4 text-[#474440]" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => openModal(perspective === 'investor' ? 'franchise' : 'tour')}
              className="btn-gold text-xs py-2 px-4 shadow-lg flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer font-bold tracking-wider"
            >
              <span className="whitespace-nowrap">{perspective === 'investor' ? 'Franchise Deck' : 'VIP Day Pass'}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[var(--text-primary)] shrink-0 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] z-40 bg-[var(--bg-primary)]/95 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto border-t border-[var(--border-subtle)] xl:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            {/* Perspective Switcher for Mobile */}
            <div className="flex items-center p-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-semibold w-full">
              <button
                onClick={() => setPerspective('investor')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all ${
                  perspective === 'investor'
                    ? 'bg-[var(--gold-primary)] text-black font-bold shadow-md'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Investor View</span>
              </button>
              <button
                onClick={() => setPerspective('member')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full transition-all ${
                  perspective === 'member'
                    ? 'bg-[var(--gold-primary)] text-black font-bold shadow-md'
                    : 'text-[var(--text-secondary)]'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>Athlete View</span>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--gold-primary)] py-2 border-b border-[var(--border-subtle)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[var(--border-subtle)] mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('tour');
              }}
              className="btn-outline w-full py-3 text-center"
            >
              Book VIP Facility Tour
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('franchise');
              }}
              className="btn-gold w-full py-3 text-center"
            >
              Request Franchise Dossier
            </button>
          </div>
        </div>
      )}
    </>
  );
}
