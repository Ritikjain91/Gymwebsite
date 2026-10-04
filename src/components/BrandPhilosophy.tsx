'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { ShieldCheck, Flame, Award, Zap, ArrowRight } from 'lucide-react';

export default function BrandPhilosophy() {
  const { openModal } = useTheme();

  return (
    <section id="brand" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] self-start">
              <span>The Brand Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05]">
              More Than A Gym. <br />
              <span className="text-gold-gradient">An Athletic Sanctuary.</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              RAW FIT GYM was conceived to eradicate the generic, overcrowded gym experience. By pairing institutional design standards, customized biomechanical strength machines, contrast recovery suites, and executive amenities, we deliver an environment where elite performance becomes everyday reality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-base uppercase text-[var(--text-primary)]">
                  Biomechanical Standard
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Every machine angle and load curve is calibrated to protect joint health while maximizing muscle fiber recruitment.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[var(--flame-accent)]/15 text-[var(--flame-accent)] flex items-center justify-center font-black">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-base uppercase text-[var(--text-primary)]">
                  Active Contrast Recovery
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  4°C cold immersion tubs paired with Finnish saunas flush lactic acid and accelerate nervous system repair.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openModal('tour')}
                className="btn-gold py-3.5 px-7 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Experience The Facility In Person</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Montage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border-gold)] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                alt="RawFit Training Ground"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/75 backdrop-blur-xl border border-[var(--border-gold)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--gold-bright)]">
                    National Expansion
                  </span>
                  <span className="block text-2xl sm:text-3xl font-black text-white">
                    14+ Planned Clubs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Retention Metric
                  </span>
                  <span className="block text-2xl sm:text-3xl font-black text-gold-gradient">
                    89.4% LTV
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
