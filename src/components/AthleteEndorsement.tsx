'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Award, Zap, Users, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function AthleteEndorsement() {
  const { openModal } = useTheme();

  return (
    <section id="athlete" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Athlete Media Visual (Left) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right" delay={150}>
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-[var(--border-gold)] p-3 shadow-2xl group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80"
                    alt="IFBB Pro Rahul - Face of Performance"
                    className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark gradient shading overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-xs font-black text-gold-gradient uppercase tracking-widest shadow-lg">
                      <Award className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                      <span>IFBB PRO ATHLETE</span>
                    </span>
                  </div>

                  {/* Bottom Athlete Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--gold-bright)] block mb-1">
                      The Face Of Performance
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                      Rahul <span className="text-gold-gradient">Aryan</span>
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 font-medium">
                      International Bodybuilding Champion • Raw Fit Brand Ambassador
                    </p>
                  </div>
                </div>

                {/* Bottom Trust Badge Ribbon */}
                <div className="mt-3 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5 text-[var(--gold-primary)]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Verified Institutional Endorsement</span>
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    CONTRACTED TIER
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Athlete Narrative & Commercial Activations (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ScrollReveal direction="up" delay={50}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] animate-ping" />
                <span>Brand Ambassador Ecosystem</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.02]">
                The Face Of <span className="text-gold-gradient">Elite Performance</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250}>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                RAW FIT GYM is associated with international IFBB Pro athlete culture. Franchise partners benefit from contracted athlete presence that drives massive local pre-sales, grand-opening media coverage, and intense brand credibility.
              </p>
            </ScrollReveal>

            {/* 4 Key Commercial Activations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ScrollReveal direction="up" delay={300}>
                <TiltCard maxTilt={6} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors flex flex-col gap-1.5 h-full">
                  <div className="flex items-center gap-2.5 text-[var(--gold-primary)] font-bold text-sm">
                    <Trophy className="w-4 h-4 shrink-0" />
                    <span className="uppercase text-xs font-black">Grand Launch Ribbon Cutting</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Celebrity launch event with high-converting influencer buzz, local press interviews, and VIP ticket drives.
                  </p>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={350}>
                <TiltCard maxTilt={6} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors flex flex-col gap-1.5 h-full">
                  <div className="flex items-center gap-2.5 text-[var(--gold-primary)] font-bold text-sm">
                    <Zap className="w-4 h-4 shrink-0" />
                    <span className="uppercase text-xs font-black">Athlete Masterclasses</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Exclusive live training workshops, advanced lifting technique clinics, and biomechanical master demonstrations.
                  </p>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <TiltCard maxTilt={6} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors flex flex-col gap-1.5 h-full">
                  <div className="flex items-center gap-2.5 text-[var(--gold-primary)] font-bold text-sm">
                    <Users className="w-4 h-4 shrink-0" />
                    <span className="uppercase text-xs font-black">Member Meet & Greets</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Founding-member photo sessions, autographed lifting straps, and high-engagement social media content.
                  </p>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={450}>
                <TiltCard maxTilt={6} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors flex flex-col gap-1.5 h-full">
                  <div className="flex items-center gap-2.5 text-[var(--gold-primary)] font-bold text-sm">
                    <Award className="w-4 h-4 shrink-0" />
                    <span className="uppercase text-xs font-black">90-Day Challenge Finale</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Celebrity judging for physical transformation contestants, amplifying member retention and annual renewals.
                  </p>
                </TiltCard>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={500}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  onClick={() => openModal('franchise')}
                  className="btn-gold py-3.5 px-7 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Franchise Opportunities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-[var(--text-muted)] italic max-w-sm">
                  *Any endorsement, appearance schedule or commercial association is subject to a separate written franchise agreement.
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
