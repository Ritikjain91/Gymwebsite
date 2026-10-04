'use client';

import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/gymData';
import { useTheme } from './ThemeContext';
import { CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function Roadmap() {
  const { openModal } = useTheme();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="roadmap" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                <span>04 • Turnkey Execution</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Seven Steps to <span className="text-gold-gradient">Grand Opening Day</span>
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base">
              From initial territory discovery to founding-member ribbon cutting, our central operations team guides every phase with institutional precision.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Timeline Track */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
            {ROADMAP_STEPS.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <TiltCard
                  key={step.step}
                  maxTilt={6}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[110px] cursor-pointer ${
                    isSelected
                      ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/15 shadow-lg scale-102'
                      : 'glass-panel border-[var(--border-subtle)] hover:border-[var(--border-gold)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-black ${isSelected ? 'text-gold-gradient' : 'text-[var(--text-muted)]'}`}>
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">
                      {step.duration.split(' ')[0]} {step.duration.split(' ')[1]}
                    </span>
                  </div>
                  <span className="font-extrabold text-xs uppercase tracking-tight text-[var(--text-primary)]">
                    {step.title}
                  </span>
                </TiltCard>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Step Spotlight Card */}
        {ROADMAP_STEPS[activeStepIndex] && (
          <ScrollReveal direction="up" delay={250}>
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-gold)] relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[var(--gold-primary)] text-black text-xs font-black uppercase">
                      Stage {ROADMAP_STEPS[activeStepIndex].step}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                      <span>Timeline: {ROADMAP_STEPS[activeStepIndex].duration}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)]">
                    {ROADMAP_STEPS[activeStepIndex].title}
                  </h3>

                  <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                    {ROADMAP_STEPS[activeStepIndex].description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                      Corporate Deliverables & Milestones
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ROADMAP_STEPS[activeStepIndex].deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold-primary)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Column */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)] text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] flex items-center justify-center animate-pulse-gold">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black uppercase text-[var(--text-primary)]">
                    Ready to Start Stage 01?
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-xs">
                    Submit your desired territory and investment budget. Our director of expansion will review your application within 24 hours.
                  </p>
                  <button
                    onClick={() => openModal('franchise')}
                    className="btn-gold w-full py-3.5 text-xs uppercase font-extrabold tracking-wider cursor-pointer"
                  >
                    Initiate Step 01 Discovery
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
