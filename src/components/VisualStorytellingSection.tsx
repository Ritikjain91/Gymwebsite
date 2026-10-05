'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import ThreeDumbbellViewer from './ThreeDumbbellViewer';
import { Shield, Sparkles, Cpu, Layers, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function VisualStorytellingSection() {
  const { openModal } = useTheme();
  const [selectedWeight, setSelectedWeight] = useState<16 | 24 | 32 | 48>(32);

  return (
    <section className="relative py-20 sm:py-32 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] overflow-hidden">
      {/* Background electric volt glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.12),transparent_70%)] pointer-events-none blur-3xl animate-pulse-volt" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-volt)] text-xs font-bold uppercase tracking-wider text-[var(--volt-bright)] mb-4 shadow-lg">
              <Cpu className="w-3.5 h-3.5 text-[var(--volt-bright)]" />
              <span>THE BIOMECHANICAL STANDARD</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)]">
              ENGINEERED FOR <br />
              <span className="text-volt-gradient">MAXIMAL HYPERTROPHY</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              We partnered with leading sports kinesiologists to calibrate every angle, knurl pattern, and lever pivot. 
              Zero wasted energy. Pure targeted mechanical tension on every repetition.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive 3D Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3D Metallic Viewer with Real-Time Physics */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <ScrollReveal direction="right">
              <div className="relative w-full max-w-[520px] rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-volt)] p-4 sm:p-8 shadow-2xl bg-gradient-to-b from-[#0e1408] via-[var(--bg-card)] to-[#070a04]">
                {/* 3D Viewer Header */}
                <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[var(--volt-bright)] block">
                      3D Asset Viewer
                    </span>
                    <h3 className="text-base sm:text-lg font-black uppercase text-[var(--text-primary)]">
                      Calibrated Solid Steel Dumbbell
                    </h3>
                  </div>

                  {/* Weight Toggle Buttons */}
                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-[var(--border-subtle)] self-start min-[480px]:self-auto">
                    {([16, 24, 32, 48] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase transition-all cursor-pointer ${
                          selectedWeight === w
                            ? 'bg-[var(--volt-primary)] text-black shadow-md'
                            : 'text-[var(--text-muted)] hover:text-white'
                        }`}
                      >
                        {w}kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3D Canvas Box */}
                <div className="relative min-h-[300px] sm:min-h-[380px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_65%)] pointer-events-none blur-2xl" />
                  <ThreeDumbbellViewer initialWeight={selectedWeight} />
                </div>

                {/* Hint under 3D canvas */}
                <div className="mt-2 text-center text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue-bright)] animate-ping" />
                  <span>Click & Drag to rotate • Scroll to zoom</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 4 Engineering Standards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <ScrollReveal direction="left" delay={100}>
              <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-blue)] transition-all hover:shadow-xl hover:shadow-[rgba(37,99,235,0.12)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--blue-glow)] flex items-center justify-center text-[var(--blue-bright)] shadow-md">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-black uppercase text-[var(--text-primary)]">
                    01 • Diamond Knurl Grip Physics
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Precision-milled diamond knurling ensures maximum tactile friction without tearing your palms, enabling heavier pulls with total control.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200}>
              <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-blue)] transition-all hover:shadow-xl hover:shadow-[rgba(37,99,235,0.12)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--blue-glow)] flex items-center justify-center text-[var(--blue-bright)] shadow-md">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-black uppercase text-[var(--text-primary)]">
                    02 • Optimal Ascending Strength Curves
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Pin-loaded cam profiles mirror the natural length-tension curve of human skeletal muscle, maintaining peak resistance where muscles are strongest.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300}>
              <div className="p-5 rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-blue)] transition-all hover:shadow-xl hover:shadow-[rgba(37,99,235,0.12)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--blue-glow)] flex items-center justify-center text-[var(--blue-bright)] shadow-md">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-black uppercase text-[var(--text-primary)]">
                    03 • Joint-Preserving Isolation Levers
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Independent unilateral arms prevent muscular imbalances and eliminate awkward rotator cuff impingement during heavy chest and shoulder presses.
                </p>
              </div>
            </ScrollReveal>

            {/* Bottom CTA */}
            <ScrollReveal direction="left" delay={400}>
              <div className="pt-2">
                <button
                  onClick={() => openModal('tour')}
                  className="btn-blue text-xs py-3.5 sm:py-4 px-4 sm:px-8 w-full font-black flex items-center justify-center gap-2 cursor-pointer shadow-xl tracking-wider text-center"
                >
                  <span>TEST OUR EQUIPMENT ON A VIP DAY PASS</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
