'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, Flame, Check, Sparkles, Clock, Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface EditorialProgram {
  number: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  specs: string[];
  duration: string;
  intensity: string;
  primaryBenefit: string;
}

const EDITORIAL_PROGRAMS: EditorialProgram[] = [
  {
    number: '01',
    tag: 'POWER & HYPERTROPHY',
    title: 'STRENGTH',
    headline: 'Build Monumental Power & Dense Lean Muscle',
    description: 'Calibrated Eleiko competition barbells, Olympic power cages, and isolated pin-loaded biomechanical angles engineered to stimulate maximal motor-unit recruitment without spinal fatigue.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    specs: ['Conjugate periodization protocols', 'Biomechanically tested force curves', 'Targeted posterior chain development'],
    duration: '60–75 Min',
    intensity: 'High / Elite',
    primaryBenefit: 'Build structural muscle density and monumental compound lifting power.',
  },
  {
    number: '02',
    tag: 'FAT SHRED & DEFINITION',
    title: 'TRANSFORMATION',
    headline: 'Lose Visceral Fat & Completely Recompose Your Physique',
    description: 'A scientifically calibrated metabolic conditioning protocol combining lactate intervals, sled pushes, and targeted hypertrophy that elevates your metabolic rate for 36 hours post-training.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    specs: ['Average 4–8% body fat drop in 12 weeks', 'Continuous heart-rate telemetry', 'Full InBody 770 composition tracking'],
    duration: '50 Min',
    intensity: 'Extreme EPOC',
    primaryBenefit: 'Incinerate stubborn fat while preserving every gram of hard-earned lean muscle.',
  },
  {
    number: '03',
    tag: 'HYBRID AGILITY & COMBAT',
    title: 'PERFORMANCE',
    headline: 'Train With The Kinetic Speed & Durability Of An Athlete',
    description: '30 meters of indoor sprint turf, Fairtex heavy leather punching bags, Tank M1 push sleds, and plyometric vaults designed to build rotational power, endurance, and cardiovascular grit.',
    image: '/athlete-editorial.jpg',
    specs: ['Combat boxing & padwork drills', 'Multi-directional agility & turf sprints', 'Neuromuscular velocity training'],
    duration: '60 Min',
    intensity: 'High Athletic',
    primaryBenefit: 'Unmatched athletic conditioning, functional speed, and explosive endurance.',
  },
  {
    number: '04',
    tag: 'BESPOKE 1-ON-1',
    title: 'PERSONAL TRAINING',
    headline: 'White-Glove 1-on-1 Coaching Tailored Exclusively To You',
    description: 'Partner with a CSCS or IFBB master trainer who programs every rep, rest interval, caloric target, and sleep protocol around your career schedule, anatomical levers, and personal ambitions.',
    image: '/personal-training.jpg',
    specs: ['Kinetic movement & postural screening', 'Daily macronutrient accountability', 'Weekly Styku 3D posture & fat mapping'],
    duration: '60 Min',
    intensity: 'Bespoke',
    primaryBenefit: 'Achieve 3x faster physical results with zero wasted effort or injury risk.',
  },
];

export default function ProgramsSection() {
  const { openModal } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="programs" className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background Atmosphere */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.07),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(121,40,202,0.06),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-violet)] text-xs font-bold uppercase tracking-wider text-[var(--violet-bright)] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                TRANSFORMATION PROTOCOLS
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
                PROGRAMS ENGINEERED FOR <br />
                <span className="text-violet-gradient">PHYSICAL SUPREMACY</span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
              Every training discipline is designed without compromise. Select your objective and experience 
              how world-class coaching accelerates your physical potential.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {EDITORIAL_PROGRAMS.map((prog, idx) => (
            <ScrollReveal key={prog.number} direction="up" delay={100 * (idx + 1)}>
              <div
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-violet)] transition-all duration-500 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] shadow-2xl hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)]"
              >
                {/* Background Editorial Image Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-108 filter contrast-125 saturate-110"
                    style={{ backgroundImage: `url('${prog.image}')` }}
                  />
                  {/* Heavy cinematic gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]/40 group-hover:via-[var(--bg-primary)]/70 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2),transparent_70%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Top Section: Number & Tag */}
                <div className="relative z-10 p-7 sm:p-9 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-violet-gradient font-display">
                      {prog.number}
                    </span>
                    <div className="h-4 w-px bg-[var(--border-light)]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[var(--violet-bright)]">
                      {prog.tag}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-full border border-[var(--border-violet)] bg-black/60 backdrop-blur-md flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--violet-primary)] group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Section: Title, Benefit & Specs */}
                <div className="relative z-10 p-7 sm:p-9 pt-0">
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-primary)] group-hover:text-[var(--violet-bright)] transition-colors duration-300 mb-2 font-display">
                    {prog.title}
                  </h3>

                  <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                    {prog.headline}
                  </p>

                  {/* Customer Benefit Callout */}
                  <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-[var(--border-violet)]/40 mb-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--violet-bright)]">
                      <Flame className="w-4 h-4 text-[var(--violet-primary)]" />
                      <span>{prog.primaryBenefit}</span>
                    </div>
                  </div>

                  {/* Key specs */}
                  <div className="space-y-2 mb-6">
                    {prog.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <Check className="w-3.5 h-3.5 text-[var(--violet-bright)]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration & CTA */}
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[var(--violet-bright)]" />
                        {prog.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-[var(--magenta-accent)]" />
                        {prog.intensity}
                      </span>
                    </div>

                    <button
                      onClick={() => openModal('tour')}
                      className="text-xs font-black uppercase tracking-wider text-[var(--violet-bright)] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Book Free Trial</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
