'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32 bg-[var(--bg-surface)] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-violet)] text-xs font-bold uppercase tracking-wider text-[var(--violet-bright)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATHLETE REPUTATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              STORIES FROM THE <br />
              <span className="text-violet-gradient">IRON SANCTUARY</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Don’t take our word for it. Hear directly from founders, surgeons, executives, 
              and competitive athletes who elevated their physical limits at Raw Fit.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test, idx) => (
            <ScrollReveal key={test.id} direction="up" delay={100 * (idx + 1)}>
              <TiltCard
                maxTilt={5}
                className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-violet)] transition-all duration-300 flex flex-col justify-between h-full group hover:shadow-2xl hover:shadow-[rgba(168,85,247,0.12)] relative overflow-hidden"
              >
                {/* Subtle top-right glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Bar with Avatar, Stars, and Verified Badge */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[var(--border-violet)] shadow-md group-hover:scale-105 transition-transform shrink-0"
                      />
                      <div>
                        <h3 className="text-base sm:text-lg font-black uppercase text-[var(--text-primary)] group-hover:text-[var(--violet-bright)] transition-colors">
                          {test.name}
                        </h3>
                        <span className="text-[11px] sm:text-xs text-[var(--text-muted)] block">
                          {test.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex text-[var(--violet-bright)]">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[var(--violet-bright)] text-[var(--violet-bright)]" />
                      ))}
                    </div>
                  </div>

                  {/* Transformation Result Highlight Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-[var(--border-violet)]/40 text-xs font-black text-[var(--violet-bright)] mb-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Result: {test.resultAchieved}</span>
                  </div>

                  {/* Review Quote */}
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed italic relative z-10">
                    &ldquo;{test.review}&rdquo;
                  </p>
                </div>

                {/* Bottom Footer */}
                <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">
                    {test.programTaken}
                  </span>
                  <span>{test.memberSince}</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
