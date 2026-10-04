'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { ShieldCheck, Flame, Award, Zap, ArrowRight, Box, Image as ImageIcon } from 'lucide-react';
import ThreeDumbbellViewer from './ThreeDumbbellViewer';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import AnimatedCounter from './AnimatedCounter';

export default function BrandPhilosophy() {
  const { openModal } = useTheme();
  const [activeMediaTab, setActiveMediaTab] = useState<'3d' | 'photo'>('3d');

  return (
    <section id="brand" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                <span>The Brand Philosophy</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.05]">
                More Than A Gym. <br />
                <span className="text-gold-gradient">An Athletic Sanctuary.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                RAW FIT GYM was conceived to eradicate the generic, overcrowded gym experience. By pairing institutional design standards, customized biomechanical strength machines, contrast recovery suites, and executive amenities, we deliver an environment where elite performance becomes everyday reality.
              </p>
            </ScrollReveal>

            {/* Feature Cards with 3D Tilt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ScrollReveal direction="up" delay={350}>
                <TiltCard maxTilt={10} className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-2 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] flex items-center justify-center font-black">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base uppercase text-[var(--text-primary)]">
                    Biomechanical Standard
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Every machine angle and load curve is calibrated to protect joint health while maximizing muscle fiber recruitment.
                  </p>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={450}>
                <TiltCard maxTilt={10} className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-2 h-full">
                  <div className="w-10 h-10 rounded-xl bg-[var(--flame-accent)]/15 text-[var(--flame-accent)] flex items-center justify-center font-black">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base uppercase text-[var(--text-primary)]">
                    Active Contrast Recovery
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    4°C cold immersion tubs paired with Finnish saunas flush lactic acid and accelerate nervous system repair.
                  </p>
                </TiltCard>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={550}>
              <div className="pt-2">
                <button
                  onClick={() => openModal('tour')}
                  className="btn-gold py-3.5 px-7 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Experience The Facility In Person</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Showcase: 3D Biomechanical Equipment Rig vs High-Res Photo */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="up" delay={200}>
              <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-[var(--border-gold)] shadow-2xl relative overflow-hidden flex flex-col">
                {/* Media Switcher Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-primary)]">
                      {activeMediaTab === '3d' ? '3D Biomechanical Rig' : 'Club Floor Reality'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 p-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-bold">
                    <button
                      onClick={() => setActiveMediaTab('3d')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        activeMediaTab === '3d'
                          ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>3D Model</span>
                    </button>
                    <button
                      onClick={() => setActiveMediaTab('photo')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        activeMediaTab === 'photo'
                          ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-sm'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Photo</span>
                    </button>
                  </div>
                </div>

                {/* Display Area */}
                {activeMediaTab === '3d' ? (
                  <div className="w-full">
                    <ThreeDumbbellViewer initialWeight={32} />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                      alt="RawFit Training Ground"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </div>
                )}

                {/* Bottom Metric Stat Ribbon */}
                <div className="mt-4 p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--gold-bright)]">
                      National Expansion
                    </span>
                    <span className="block text-2xl sm:text-3xl font-black text-white">
                      <AnimatedCounter end={14} suffix="+ Planned Clubs" duration={2200} />
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Retention Metric
                    </span>
                    <span className="block text-2xl sm:text-3xl font-black text-gold-gradient">
                      <AnimatedCounter end={89.4} decimals={1} suffix="% LTV" duration={2400} />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
