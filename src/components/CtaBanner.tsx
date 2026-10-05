'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Flame, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function CtaBanner() {
  const { openModal } = useTheme();

  return (
    <section className="relative py-24 sm:py-36 overflow-hidden bg-gradient-to-b from-[#060709] via-[#0e1408] to-[#060709] border-b border-[var(--border-subtle)]">
      {/* Background Volumetric Volt Lime Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(circle,rgba(163,230,53,0.18),transparent_70%)] pointer-events-none blur-3xl animate-pulse-volt" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[var(--border-volt)] text-xs font-bold uppercase tracking-wider text-[var(--volt-bright)] mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[var(--volt-primary)]" />
            <span>LIMITED TO 25 VIP PASSES THIS MONTH</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <h2 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] font-display">
            FEELING GOOD. BEING FIT. <br />
            <span className="text-volt-gradient">JOIN THE FORCE.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed uppercase font-semibold">
            Being fit is the new sexy in this century. Step onto our training floor, test the Olympic Eleiko iron, 
            and experience the transformation engineered by FIT&amp;FAB.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => openModal('tour')}
              className="btn-volt text-xs sm:text-base py-3.5 sm:py-4 px-6 sm:px-10 shadow-2xl flex items-center justify-center gap-2.5 font-black w-full sm:w-auto tracking-wider cursor-pointer group"
            >
              <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-black group-hover:scale-125 transition-transform shrink-0" />
              <span>JOIN THE FORCE NOW</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            <a
              href="https://wa.me/919000000000?text=Hi%20FIT%26FAB%2C%20I%20would%20like%20to%20book%20a%20VIP%20Trial%20Pass%20and%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs sm:text-sm py-3.5 sm:py-4 px-6 sm:px-8 flex items-center justify-center gap-2.5 w-full sm:w-auto font-bold hover:border-[var(--volt-bright)] hover:text-[var(--volt-bright)]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={400}>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[var(--blue-bright)] shrink-0" />
              <span>Zero Initiation Fees</span>
            </div>
            <span>•</span>
            <div>100% Free 3D Body Scan</div>
            <span className="hidden min-[480px]:inline">•</span>
            <div>No Sales Pressure Guarantee</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
