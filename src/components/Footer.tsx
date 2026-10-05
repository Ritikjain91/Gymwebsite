'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { ArrowUp, Mail, Phone, MapPin, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { openModal } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 sm:pt-20 pb-12 overflow-hidden text-[var(--text-secondary)]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-[var(--border-subtle)]">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-tight text-white font-display">
                FIT<span className="text-[var(--volt-primary)]">&amp;</span>FAB
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase bg-[var(--volt-primary)]/15 text-[var(--volt-bright)] border border-[var(--volt-primary)]/30">
                PRO
              </span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm mt-1">
              Being fit is the new sexy in this century. High-performance sanctuary engineered for relentless physical evolution. Olympic Eleiko iron, 4°C cryo contrast recovery suites, and certified master coaches.
            </p>

            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-panel border border-[var(--border-subtle)] hover:border-[var(--violet-bright)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-[var(--border-subtle)] hover:border-[var(--violet-bright)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--violet-bright)] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel border border-[var(--border-subtle)] hover:border-[var(--violet-bright)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--violet-bright)] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--violet-bright)] mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#programs" className="hover:text-white transition-colors">Strength Architecture</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Metabolic Fat Shred</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Athletic Agility & Turf</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">1-on-1 Master Coaching</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">4°C Contrast Therapy</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--violet-bright)] mb-4">
              Explore Club
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">Club Philosophy</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#transformations" className="hover:text-white transition-colors">Member Results</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Masterclasses Timetable</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Membership Options</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--violet-bright)] mb-1">
              Club Concierge & Hours
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--violet-bright)] shrink-0" />
                <span>Plot 42, Executive Sector, Main Ring Road</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--violet-bright)] shrink-0" />
                <span>+91 90000 00000 / 011-4567-8900</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--violet-bright)] shrink-0" />
                <span>concierge@rawfitgym.com</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-[var(--border-subtle)] text-xs mt-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block mb-1">
                HOURS OF OPERATION
              </span>
              <div className="text-[var(--text-primary)] font-semibold flex justify-between">
                <span>Mon – Sat:</span>
                <span>05:30 AM – 11:00 PM</span>
              </div>
              <div className="text-[var(--text-primary)] font-semibold flex justify-between mt-1">
                <span>Sun:</span>
                <span>07:00 AM – 08:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] text-center sm:text-left pb-16 sm:pb-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <span>© 2026 FIT&amp;FAB. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Membership</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[var(--violet-bright)] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
