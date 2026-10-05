'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Menu, X, ArrowRight, ShoppingCart, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, openModal } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CLASSES', href: '#programs' },
    { label: 'SCHEDULE', href: '#schedule' },
    { label: 'TRAINERS', href: '#trainers' },
    { label: 'PAGES', href: '#transformations' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'SHOP', href: '#shop' },
  ];

  return (
    <>
      {/* Top Ticker Bar with Volt Accent */}
      <div className="bg-[#090b0e] text-white py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 relative z-50 border-b border-[var(--border-subtle)]">
        <Sparkles className="w-3.5 h-3.5 text-[var(--volt-primary)] animate-spin shrink-0" style={{ animationDuration: '6s' }} />
        <span className="truncate">EXCLUSIVE FIT&amp;FAB PASSES: 7-DAY COMPLIMENTARY TRIAL NOW OPEN</span>
        <button
          onClick={() => openModal('tour')}
          className="text-[var(--volt-bright)] hover:underline ml-2 hidden sm:inline-block cursor-pointer font-black shrink-0"
        >
          Claim Now →
        </button>
      </div>

      {/* Main Sticky Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-[var(--navbar-bg)] backdrop-blur-2xl border-b border-[var(--border-volt)]/40 shadow-2xl py-3 sm:py-3.5'
            : 'bg-[var(--navbar-bg)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo: FIT&FAB */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] font-display group-hover:text-[var(--volt-bright)] transition-colors">
              FIT<span className="text-[var(--volt-primary)]">&amp;</span>FAB
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-[var(--volt-primary)]/15 text-[var(--volt-bright)] border border-[var(--volt-primary)]/30">
              PRO
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-center">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-extrabold tracking-wider transition-all duration-200 whitespace-nowrap ${
                  idx === 0
                    ? 'text-[var(--text-primary)] hover:text-[var(--volt-bright)] font-black'
                    : 'text-[var(--text-secondary)] hover:text-[var(--volt-bright)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Cart Badge + Theme Switch + CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Shopping Cart Icon */}
            <a
              href="#shop"
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--volt-primary)] text-black flex items-center justify-center font-bold shadow-[0_0_18px_rgba(163,230,53,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer group shrink-0"
              title="View Cart & Gear"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black group-hover:rotate-6 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-[var(--volt-bright)] text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border border-[var(--volt-primary)]">
                  {cartCount}
                </span>
              )}
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-panel flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--volt-primary)] transition-colors cursor-pointer shrink-0"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffd700]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--volt-primary)]" />
              )}
            </button>

            {/* Prominent CTA Button: Shown on tablets and desktop, hidden on phone header where bottom bar exists */}
            <button
              onClick={() => openModal('tour')}
              className="btn-volt text-xs py-2.5 px-5 shadow-xl hidden md:inline-flex items-center gap-1.5 shrink-0 cursor-pointer font-black tracking-wider"
            >
              <span>JOIN THE FORCE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-panel flex items-center justify-center text-[var(--text-primary)] shrink-0 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[88px] z-40 bg-[var(--bg-primary)]/98 backdrop-blur-3xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto border-t border-[var(--border-subtle)] lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            <nav className="flex flex-col gap-1 sm:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--volt-bright)] py-2.5 border-b border-[var(--border-subtle)] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--volt-primary)] opacity-60" />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-5 border-t border-[var(--border-subtle)] mt-5 pb-16 sm:pb-0">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('tour');
              }}
              className="btn-volt w-full py-3.5 sm:py-4 text-center font-black tracking-wider shadow-2xl"
            >
              JOIN THE FORCE NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
}
