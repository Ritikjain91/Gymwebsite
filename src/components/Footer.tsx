'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { ArrowUp, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { openModal } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] pt-16 pb-12 overflow-hidden text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700] via-[#cfa95c] to-[#9a7533] flex items-center justify-center font-black text-black text-lg shadow-md">
                RF
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-black text-2xl tracking-tight text-[var(--text-primary)]">
                    RAW<span className="text-gold-gradient font-black">FIT</span>
                  </span>
                  <span className="text-xs font-extrabold tracking-[0.3em] text-[var(--gold-primary)] uppercase">
                    GYM
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-[var(--text-muted)] font-semibold uppercase">
                  Institutional Fitness Franchise
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              India’s premier institutional fitness franchise. Standardized architecture, Olympic equipment fleets, and contrast recovery suites engineered for high-retention athletic performance and scalable investor profitability.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:text-[var(--gold-primary)] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:text-[var(--gold-primary)] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:text-[var(--gold-primary)] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links for Investors */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--gold-primary)] mb-4">
              For Investors
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              <li><a href="#formats" className="hover:text-[var(--text-primary)]">Franchise Formats</a></li>
              <li><a href="#calculator" className="hover:text-[var(--text-primary)]">ROI Simulator</a></li>
              <li><a href="#revenue" className="hover:text-[var(--text-primary)]">6 Revenue Channels</a></li>
              <li><a href="#roadmap" className="hover:text-[var(--text-primary)]">Turnkey Roadmap</a></li>
              <li><a href="#site" className="hover:text-[var(--text-primary)]">Site Diligence</a></li>
              <li><button onClick={() => openModal('franchise')} className="text-[var(--gold-primary)] hover:underline cursor-pointer">Apply Online</button></li>
            </ul>
          </div>

          {/* Quick Links for Members */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--gold-primary)] mb-4">
              For Athletes
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              <li><a href="#zones" className="hover:text-[var(--text-primary)]">Training Zones</a></li>
              <li><a href="#schedule" className="hover:text-[var(--text-primary)]">Class Timetable</a></li>
              <li><a href="#bmi" className="hover:text-[var(--text-primary)]">Physique Blueprint</a></li>
              <li><a href="#transformations" className="hover:text-[var(--text-primary)]">Case Studies</a></li>
              <li><a href="#faq" className="hover:text-[var(--text-primary)]">Member FAQs</a></li>
              <li><button onClick={() => openModal('tour')} className="text-[var(--gold-primary)] hover:underline cursor-pointer">Book VIP Pass</button></li>
            </ul>
          </div>

          {/* Corporate Headquarters & Contact */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--gold-primary)] mb-2">
              Corporate Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--gold-primary)] shrink-0 mt-1" />
                <span>RawFit Commercial Towers, Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                <a href="mailto:franchise@rawfitgym.com" className="hover:text-[var(--gold-primary)]">franchise@rawfitgym.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[var(--gold-primary)]">+91 98765 43210 (Direct Expansion Line)</a>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] mt-2 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-[var(--text-primary)]">Expansion Director Desk</span>
                <span className="text-[11px] text-[var(--text-muted)]">Available Mon–Sat, 9AM–8PM IST</span>
              </div>
              <button
                onClick={() => openModal('franchise')}
                className="btn-gold text-[11px] py-1.5 px-3"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} RAW FIT GYM FRANCHISE HOLDINGS PVT. LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[var(--text-primary)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-primary)]">Commercial Terms</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[var(--gold-primary)] hover:underline cursor-pointer font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
