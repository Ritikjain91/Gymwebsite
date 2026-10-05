'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { ArrowLeftRight, Trophy, ArrowRight, ShieldCheck, Flame, Star, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import AnimatedCounter from './AnimatedCounter';

interface ClientCase {
  id: string;
  name: string;
  age: number;
  role: string;
  duration: string;
  headline: string;
  quote: string;
  image: string;
  metrics: {
    weightLost: string;
    bodyFatDrop: string;
    muscleAdded: string;
    timeline: string;
  };
  coach: string;
  protocol: string;
}

const CASES: ClientCase[] = [
  {
    id: 'c1',
    name: 'David Sterling',
    age: 38,
    role: 'Managing Partner, Private Equity',
    duration: '24 Weeks Protocol',
    headline: 'Lost 15kg Fat, Gained 4.5kg Muscle & Reversed 10 Years Of Sedentary Fatigue',
    quote: 'Raw Fit Gym fundamentally re-engineered my physique. Training under CSCS coaches combined with the 4°C cold plunge after heavy compound pulls eliminated my back pain and restored my athletic energy.',
    image: '/transformation-1.jpg',
    metrics: {
      weightLost: '-15 KG (-33 LBS)',
      bodyFatDrop: '20% → 10% BF',
      muscleAdded: '+4.5 KG Muscle',
      timeline: '24 Weeks',
    },
    coach: 'Vikram Rajput (CSCS)',
    protocol: 'Strength Hypertrophy & Metabolic Shred',
  },
  {
    id: 'c2',
    name: 'Sarah Jenkins',
    age: 32,
    role: 'Architectural Director',
    duration: '12 Months Progression',
    headline: 'From Exhausted & Intimidated To Lifting 110kg Deadlifts & Hyrox Conditioning',
    quote: 'I used to think lifting heavy was not for women. At Raw Fit, the coaches taught me proper biomechanics and progressive overload. I dropped 3 dress sizes, doubled my strength, and gained unstoppable confidence.',
    image: '/transformation-2.jpg',
    metrics: {
      weightLost: '-11 KG Tone',
      bodyFatDrop: '28% → 17% BF',
      muscleAdded: '+3.2 KG Muscle',
      timeline: '12 Months',
    },
    coach: 'Dr. Sarah Mathews',
    protocol: 'Functional Conditioning & Clinical Nutrition',
  },
];

export default function TransformationSlider() {
  const { openModal } = useTheme();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIdx];

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section id="transformations" className="py-20 sm:py-32 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(121,40,202,0.06),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-violet)] text-xs font-bold uppercase tracking-wider text-[var(--violet-bright)] mb-4">
              <Trophy className="w-3.5 h-3.5" />
              <span>VERIFIED INBODY 770 METRICS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              REAL DISCIPLINE. <br />
              <span className="text-violet-gradient">DOCUMENTED RESULTS.</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-4 text-sm sm:text-base leading-relaxed">
              Every transformation is verified with clinical multi-frequency bio-impedance scans. 
              No filters, no deceptive camera angles—just hard, undeniable proof of physical evolution.
            </p>
          </div>
        </ScrollReveal>

        {/* Client Selection Switcher */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {CASES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCaseIdx(idx)}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
                  activeCaseIdx === idx
                    ? 'bg-[var(--violet-primary)] text-white border-[var(--violet-primary)] shadow-lg shadow-[rgba(168,85,247,0.35)] scale-105'
                    : 'glass-panel border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-violet)]'
                }`}
              >
                <span>{c.name}</span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                  activeCaseIdx === idx ? 'bg-black/30 text-white' : 'bg-[var(--border-subtle)] text-[var(--violet-bright)]'
                }`}>
                  {c.duration}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Transformation Showcase Container */}
        <ScrollReveal direction="up" delay={250}>
          <div className="rounded-3xl glass-panel border border-[var(--border-violet)] overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--bg-card)] via-[#120d18] to-[var(--bg-surface)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              {/* Left Column: Authentic Split Before & After Visual with Interactive Draggable Curtain */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[520px] overflow-hidden select-none">
                <div
                  ref={containerRef}
                  onMouseMove={(e) => {
                    if (e.buttons === 1) handlePointerMove(e.clientX);
                  }}
                  onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                  className="relative w-full h-full min-h-[380px] sm:min-h-[520px] cursor-ew-resize overflow-hidden touch-none"
                >
                  {/* Full image display */}
                  <img
                    src={activeCase.image}
                    alt={`${activeCase.name} Transformation Result`}
                    className="w-full h-full object-cover select-none pointer-events-none filter contrast-115"
                  />

                  {/* Gradient shade overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Draggable Vertical Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--violet-primary)] border-2 border-white shadow-xl flex items-center justify-center text-white">
                      <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Top Tags */}
                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-emerald-500/50 text-[10px] sm:text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Verified InBody 770</span>
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[var(--violet-bright)] border border-[var(--border-violet)]">
                      {activeCase.metrics.timeline}
                    </span>
                  </div>

                  {/* Bottom Client Bar */}
                  <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 pointer-events-none">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[var(--violet-bright)] block">
                        Client Profile
                      </span>
                      <span className="text-sm sm:text-base font-black text-white">
                        {activeCase.name}, {activeCase.age}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[var(--text-muted)] block line-clamp-1">
                        {activeCase.role}
                      </span>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)] block">
                        Head Master Coach
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[var(--violet-bright)]">
                        {activeCase.coach}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Metrics & Quote */}
              <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[var(--violet-bright)] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[var(--violet-bright)]" />
                    ))}
                    <span className="text-xs font-bold text-[var(--text-primary)] ml-2">
                      5.0 Verified Member Milestone
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black uppercase text-[var(--text-primary)] mb-3 sm:mb-4 leading-snug font-display">
                    &ldquo;{activeCase.headline}&rdquo;
                  </h3>

                  {/* Quote */}
                  <blockquote className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border-l-4 border-[var(--violet-primary)] text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed mb-5 sm:mb-6">
                    &ldquo;{activeCase.quote}&rdquo;
                  </blockquote>

                  {/* 3 Metric Badges */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
                      <span className="text-lg sm:text-xl font-black text-emerald-400 block font-display">
                        {activeCase.metrics.weightLost}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Total Weight Loss
                      </span>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
                      <span className="text-lg sm:text-xl font-black text-violet-gradient block font-display">
                        {activeCase.metrics.bodyFatDrop}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Body Fat Drop
                      </span>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-[var(--border-subtle)] text-center col-span-2">
                      <span className="text-lg sm:text-xl font-black text-[var(--violet-bright)] block font-display">
                        {activeCase.metrics.muscleAdded}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        Verified Skeletal Muscle Added
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--text-muted)] mb-5 sm:mb-6 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[var(--violet-primary)] shrink-0" />
                    <span className="truncate">Protocol: <strong className="text-[var(--text-primary)]">{activeCase.protocol}</strong></span>
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  onClick={() => openModal('tour')}
                  className="btn-violet text-xs py-3.5 sm:py-4 px-4 sm:px-6 w-full font-black flex items-center justify-center gap-2 cursor-pointer shadow-xl tracking-wider text-center"
                >
                  <span className="truncate">CLAIM FREE 3D BODY SCAN &amp; CONSULT</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Trust Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <TiltCard maxTilt={6} className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-4xl font-black text-violet-gradient font-display">
              <AnimatedCounter end={50000} suffix="+" duration={2000} />
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold mt-1.5 block">
              Documented Member Transformations
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Proven results across fat loss, functional athletics & hypertrophy.
            </p>
          </TiltCard>

          <TiltCard maxTilt={6} className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-4xl font-black text-emerald-400 font-display">
              100%
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold mt-1.5 block">
              Natural Drug-Free Protocols
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Pure progressive overload, whole foods, and cold contrast recovery.
            </p>
          </TiltCard>

          <TiltCard maxTilt={6} className="p-6 rounded-2xl glass-panel border border-[var(--border-subtle)] text-center">
            <span className="block text-4xl font-black text-violet-gradient font-display">
              14 Days
            </span>
            <span className="text-xs uppercase tracking-wider text-[var(--text-primary)] font-bold mt-1.5 block">
              Noticeable Energy & Strength Surge
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Members feel the physiological shift within their initial 2 weeks.
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
