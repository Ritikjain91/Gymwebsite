'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { ShieldCheck, Flame, Sparkles, CheckCircle2, ArrowRight, Zap, Droplets } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function AboutSection() {
  const { openModal } = useTheme();

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#050608] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Subtle high-voltage ambient glow without 3D canvas */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.06),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Media with Clean Contrast Facility Showcase (No 3D overlay) */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="right">
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-[var(--border-volt)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
                <div
                  className="h-[380px] sm:h-[480px] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-105"
                  style={{ backgroundImage: `url('/recovery-suite.jpg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                {/* Clean Non-3D Floating Facility Spec Badge */}
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/85 backdrop-blur-xl border border-[var(--border-volt)] text-xs font-black uppercase tracking-wider text-white shadow-2xl">
                    <Droplets className="w-4 h-4 text-[var(--volt-bright)] animate-pulse" />
                    <span className="text-[var(--volt-bright)]">CONTRAST THERAPY</span>
                    <span className="text-gray-500 font-normal">|</span>
                    <span className="text-gray-300 font-mono text-[11px]">4°C PLUNGE &amp; SAUNA</span>
                  </div>
                </div>

                {/* Bottom Overlay Facility Story Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Zap className="w-4 h-4 text-[var(--volt-bright)] shrink-0 animate-pulse" />
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[var(--volt-bright)]">
                      30,000 SQ FT HIGH-PERFORMANCE FACILITY
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Designed from the ground up for zero overcrowding, optimal training flow, 
                    and medical-grade thermal contrast recovery.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: The Story & Philosophy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <ScrollReveal direction="down">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-volt)] text-xs font-black uppercase tracking-wider text-[var(--volt-bright)] shadow-[0_0_15px_rgba(163,230,53,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[var(--volt-bright)] animate-ping" />
                Our Philosophy &amp; Standard
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[1.02] font-['Montserrat',sans-serif]">
                Not Just Another Gym. <br />
                <span className="text-[var(--volt-bright)] drop-shadow-[0_0_25px_rgba(163,230,53,0.45)]">
                  A Crucible For Greatness.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-base text-gray-300 leading-relaxed font-medium">
                FIT&amp;FAB was engineered to eliminate the frustrations of mainstream fitness clubs: 
                broken machines, indifferent trainers, chaotic crowds, and zero accountability. 
                We engineered an unapologetic high-standard sanctuary where human ambition meets sports science.
              </p>
            </ScrollReveal>

            {/* 3 Core Pillars */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-4 w-full">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-volt)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[var(--volt-primary)]/15 border border-[var(--volt-primary)]/30 flex items-center justify-center shrink-0 text-[var(--volt-bright)] mt-0.5 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-white tracking-wide">
                      Biomechanically Flawless Equipment
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Target muscles through their optimal strength curves without joint shear or lower back strain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-volt)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[var(--volt-primary)]/15 border border-[var(--volt-primary)]/30 flex items-center justify-center shrink-0 text-[var(--volt-bright)] mt-0.5 group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-white tracking-wide">
                      Medical-Grade Contrast Therapy
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Accelerate neuromuscular recovery, spike dopamine, and flush lactic acid with 4°C cold plunge and Finnish sauna.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-volt)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-[var(--volt-primary)]/15 border border-[var(--volt-primary)]/30 flex items-center justify-center shrink-0 text-[var(--volt-bright)] mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-white tracking-wide">
                      Full Lifestyle &amp; Nutritional Accountability
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Your workout is 1 hour; your results depend on the other 23. We coach your sleep, stress, and macros daily.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openModal('tour')}
                  className="btn-volt text-xs sm:text-sm py-4 px-8 font-black flex items-center gap-2.5 cursor-pointer shadow-[0_0_25px_rgba(163,230,53,0.45)] hover:shadow-[0_0_35px_rgba(190,242,100,0.7)] tracking-wider"
                >
                  <span>BOOK VIP FACILITY TOUR</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <a
                  href="#zones"
                  className="btn-outline text-xs sm:text-sm py-3.5 px-6 font-extrabold hover:border-[var(--border-volt)] hover:text-[var(--volt-bright)] transition-all"
                >
                  <span>EXPLORE FLOORPLAN</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
