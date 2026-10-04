'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import ThreePlateViewer from './ThreePlateViewer';
import {
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  Sparkles,
  Layers,
  Percent,
} from 'lucide-react';

export default function Hero() {
  const { perspective, openModal } = useTheme();

  return (
    <section className="relative flex flex-col pt-12 sm:pt-16 pb-0 overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://assets.mixkit.co/videos/40248/40248-thumb-720-0.jpg"
          className="w-full h-full object-cover opacity-25 filter contrast-125 saturate-75 scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/40248/40248-720.mp4"
            type="video/mp4"
          />
        </video>
        {/* Radial Dark Gradient Mask */}
        <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
        {/* Subtle Geometric Energy Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--gold-primary) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] animate-float">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-ping" />
              <span>
                {perspective === 'investor'
                  ? 'Institutional Franchise Opportunity'
                  : 'Ultra-Luxury Athletic Destination'}
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.96] uppercase text-[var(--text-primary)]">
              {perspective === 'investor' ? (
                <>
                  Build The Next <br />
                  <span className="text-gold-gradient">Raw Fit Gym</span>
                </>
              ) : (
                <>
                  Where Power Meets <br />
                  <span className="text-gold-gradient">Elite Luxury</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed">
              {perspective === 'investor'
                ? 'A premier fitness franchise engineered for institutional returns. Standardized architecture, prime catchments, and 6 synchronized revenue engines delivering 36%–48% projected EBITDA.'
                : 'Experience biomechanical strength equipment, 4°C cryo cold plunge suites, cedar saunas, and certified coaching in an atmosphere created for high-achievers.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 w-full sm:w-auto">
              {perspective === 'investor' ? (
                <>
                  <button
                    onClick={() => openModal('franchise')}
                    className="btn-gold text-sm py-3.5 px-7 shadow-xl w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span>Request Franchise Deck</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#calculator"
                    className="btn-outline text-sm py-3.5 px-7 w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span>Simulate ROI Model</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('tour')}
                    className="btn-gold text-sm py-3.5 px-7 shadow-xl w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span>Book VIP Day Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#zones"
                    className="btn-outline text-sm py-3.5 px-7 w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <span>Explore Training Zones</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Column: 3D Interactive Three.js Plate Viewer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[390px] flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[var(--gold-primary)]/20 via-transparent to-[var(--flame-accent)]/15 blur-3xl pointer-events-none scale-105" />
              <ThreePlateViewer initialEdition="prime" />
            </div>
          </div>
        </div>

        {/* Aligned Full-Width 4-Column Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[var(--border-subtle)]">
          <div className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-2xl sm:text-3xl font-black text-gold-gradient">
              ₹1.80 Cr+
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mt-1 block">
              Prime & Luxury Formats
            </span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-2xl sm:text-3xl font-black text-gold-gradient">
              06 Streams
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mt-1 block">
              Diversified Revenue
            </span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-2xl sm:text-3xl font-black text-[var(--flame-accent)]">
              36% – 48%
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mt-1 block">
              Projected EBITDA
            </span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-2xl sm:text-3xl font-black text-gold-gradient">
              100% Turnkey
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold mt-1 block">
              Corporate SOPs & Ops
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative z-10 w-full overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[var(--text-secondary)]">
              <span>RAW FIT PRIME</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>BIOMECHANICAL STRENGTH</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>4°C CRYO COLD PLUNGE</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>RAW FIT LUXURY</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>6 DIVERSIFIED REVENUE STREAMS</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>CERTIFIED MASTER COACHING</span>
              <span className="text-[var(--gold-primary)]">✦</span>
              <span>SCALABLE BUSINESS ARCHITECTURE</span>
              <span className="text-[var(--gold-primary)]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
