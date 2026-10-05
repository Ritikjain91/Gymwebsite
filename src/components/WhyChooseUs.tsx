'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface EditorialReason {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  tag: string;
}

const EDITORIAL_REASONS: EditorialReason[] = [
  {
    number: '01',
    title: 'EXPERT TRAINERS',
    subtitle: 'CSCS, ACSM & IFBB Credentialed Mentors',
    description: 'We don’t employ generic floor instructors. Every Raw Fit coach has spent at least 8+ years analyzing joint kinematics, force curves, and progressive overload periodization. You receive real-time biomechanical guidance on every single set.',
    metric: '100%',
    metricLabel: 'Degree & Certification Rate',
    tag: 'ELITE PEDIGREE',
  },
  {
    number: '02',
    title: 'PREMIUM EQUIPMENT',
    subtitle: 'Eleiko Competition Iron & Hammer Strength',
    description: 'Calibrated cast-iron plates, custom matte-black steel power cages, Woodway motorless sprint treadmills, and isolated plate-loaded levers designed to match human muscular strength curves with clinical joint protection.',
    metric: '250+',
    metricLabel: 'Engineered Lifting Stations',
    tag: 'OLYMPIC CALIBER',
  },
  {
    number: '03',
    title: 'PERSONALIZED TRAINING',
    subtitle: 'Bespoke Biology & Macronutrient Maps',
    description: 'No two physiques are identical. From day one, we map your kinetic mobility, body fat distribution via InBody 770 scans, and daily metabolic rate to build a progressive workout and nutritional blueprint that fits your real life.',
    metric: '1-ON-1',
    metricLabel: 'Tailored Programming',
    tag: 'ZERO GUESSWORK',
  },
  {
    number: '04',
    title: 'REAL RESULTS',
    subtitle: 'Over 50,000+ Documented Transformations',
    description: 'We measure success through clinical progress charts and 3D body scans—not subjective optimism. Our members experience measurable fat drops, muscle gain, and structural physical resilience within their initial 14 days.',
    metric: '98.4%',
    metricLabel: 'Member Goal Achievement',
    tag: 'PROVEN SCIENCE',
  },
];

export default function WhyChooseUs() {
  const { openModal } = useTheme();

  return (
    <section id="why-us" className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none blur-3xl animate-pulse-blue" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-blue)] text-xs font-bold uppercase tracking-wider text-[var(--blue-bright)] mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE RAW FIT STANDARD</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              WHY THE BEST <br />
              <span className="text-blue-gradient">TRAIN AT RAW FIT</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We stripped away the superficial gym gimmicks to build an uncompromising sanctuary for serious athletes, 
              executives, and individuals who hold themselves to a higher physical standard.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Rows */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {EDITORIAL_REASONS.map((item, idx) => (
            <ScrollReveal key={item.number} direction="up" delay={100 * (idx + 1)}>
              <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start group hover:bg-[var(--bg-card)]/60 transition-all duration-500 rounded-2xl px-4 sm:px-6 hover:shadow-2xl hover:shadow-[rgba(37,99,235,0.08)] border border-transparent hover:border-[var(--border-blue)]/30">
                {/* Number & Tag Column */}
                <div className="lg:col-span-3 flex lg:flex-col justify-between items-baseline lg:items-start gap-4">
                  <span className="text-5xl sm:text-7xl font-black text-[var(--text-muted)] group-hover:text-[var(--blue-bright)] transition-colors duration-300 font-display">
                    {item.number}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--blue-glow)] text-[var(--blue-bright)] border border-[var(--border-blue)] shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description Column */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-4xl font-black uppercase text-[var(--text-primary)] group-hover:text-white transition-colors font-display tracking-tight">
                    {item.title}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--blue-bright)] mt-1 mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Metric & CTA Column */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between items-end lg:items-end gap-2 pt-2">
                  <div className="text-right">
                    <span className="text-3xl sm:text-5xl font-black text-blue-gradient font-display block">
                      {item.metric}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {item.metricLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => openModal('tour')}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--blue-bright)] hover:underline mt-4 cursor-pointer"
                  >
                    <span>Experience This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner Reassurance */}
        <ScrollReveal direction="up" delay={500}>
          <div className="mt-16 p-8 rounded-3xl glass-panel border border-[var(--border-blue)]/60 bg-gradient-to-r from-[var(--bg-card)] via-[#091124] to-[var(--bg-card)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--blue-primary)] flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-[rgba(37,99,235,0.4)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black uppercase text-[var(--text-primary)]">
                  Ready To Experience The Standard?
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Book a complimentary VIP trial workout. 100% obligation-free.
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal('tour')}
              className="btn-blue text-xs py-4 px-8 shrink-0 cursor-pointer font-black flex items-center gap-2 shadow-xl tracking-wider"
            >
              <span>CLAIM YOUR VIP TRIAL PASS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
