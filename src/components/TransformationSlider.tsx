'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { ArrowLeftRight, Trophy, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import AnimatedCounter from './AnimatedCounter';

export default function TransformationSlider() {
  const { openModal } = useTheme();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number>(896);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(updateWidth);
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateWidth);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="transformations" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Proven Physical Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Real Athletes. <span className="text-gold-gradient">Documented Results.</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 text-sm sm:text-base">
              Drag the interactive slider below to inspect 16-week physiological recomposition achieved through RawFit biomechanical coaching and contrast therapy protocols.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={150}>
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[var(--border-gold)] shadow-2xl select-none cursor-ew-resize glass-panel"
            >
              {/* AFTER Image (Background Base) */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=80"
                  alt="After 16 Weeks Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-xs font-black uppercase text-gold-gradient">
                  After: 16 Weeks (7.8% Body Fat)
                </div>
              </div>

              {/* BEFORE Image (Clipped Layer on Top - Exactly matches width of container) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80"
                  alt="Before Transformation"
                  className="absolute inset-0 h-full object-cover max-w-none pointer-events-none"
                  style={{ width: `${containerWidth}px` }}
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-black uppercase text-white whitespace-nowrap">
                  Before: Baseline (22.4% Body Fat)
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[var(--gold-primary)] shadow-[0_0_15px_rgba(212,175,55,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--gold-primary)] text-black flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto">
                  <ArrowLeftRight className="w-4 h-4 font-black" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Member Metric Callout Card with TiltCard */}
          <ScrollReveal direction="up" delay={250}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <TiltCard maxTilt={8} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)]">
                <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">Athlete</span>
                <span className="text-lg font-black text-[var(--text-primary)]">Karan V., 31 Yrs</span>
              </TiltCard>
              <TiltCard maxTilt={8} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)]">
                <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">Transformation Delta</span>
                <span className="text-lg font-black text-[var(--flame-accent)]">
                  <AnimatedCounter prefix="-" end={14.6} decimals={1} suffix="% Body Fat" duration={2200} />
                </span>
              </TiltCard>
              <TiltCard maxTilt={8} className="p-4 rounded-2xl glass-panel border border-[var(--border-subtle)]">
                <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">Lean Mass Added</span>
                <span className="text-lg font-black text-gold-gradient">
                  <AnimatedCounter prefix="+" end={5.8} decimals={1} suffix=" KG Muscle" duration={2400} />
                </span>
              </TiltCard>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="text-center mt-6">
              <button
                onClick={() => openModal('tour')}
                className="btn-gold py-3.5 px-8 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Start Your Transformation Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
