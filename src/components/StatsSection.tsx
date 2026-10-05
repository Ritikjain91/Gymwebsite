'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

export default function StatsSection() {
  const stats = [
    {
      value: 10,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Pioneering athletic training & body transformations since 2016.',
    },
    {
      value: 2000,
      suffix: '+',
      label: 'Active Dedicated Members',
      description: 'Driven founders, competitive athletes, and relentless high-achievers.',
    },
    {
      value: 25,
      suffix: '+',
      label: 'Certified Master Coaches',
      description: 'CSCS, ACSM & IFBB credentialed mentors on floor full-time.',
    },
    {
      value: 50,
      suffix: 'K+',
      label: 'Documented Transformations',
      description: 'Over 50,000 verified physique evolutions backed by InBody 770 data.',
    },
  ];

  return (
    <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#060709] via-[#0c0f14] to-[#060709] border-b border-[var(--border-subtle)] overflow-hidden">
      {/* Subtle Volt Lime Glow in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`pt-6 sm:pt-0 ${idx !== 0 ? 'sm:pl-8' : ''} flex flex-col justify-between group`}
              >
                <div>
                  <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[var(--violet-bright)] transition-colors duration-300 font-display">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2200} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[var(--violet-bright)] mt-2">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed hidden sm:block max-w-[220px]">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-4 w-8 h-0.5 bg-[var(--border-violet)] group-hover:w-16 group-hover:bg-[var(--violet-primary)] transition-all duration-300" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
