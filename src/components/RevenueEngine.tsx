'use client';

import React from 'react';
import { REVENUE_STREAMS } from '../data/gymData';
import {
  CreditCard,
  Flame,
  Users,
  ShoppingBag,
  Trophy,
  Building,
  TrendingUp,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  CreditCard,
  Flame,
  Users,
  ShoppingBag,
  Trophy,
  Building,
};

export default function RevenueEngine() {
  return (
    <section id="revenue" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <span>03 • Financial Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Six Diversified <span className="text-gold-gradient">Revenue Streams</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base">
            Unlike single-income traditional gyms, Raw Fit partners benefit from 6 institutional monetization channels that shield against seasonality and maximize member lifetime value (LTV).
          </p>
        </div>

        {/* 6 Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVENUE_STREAMS.map((stream) => {
            const Icon = iconMap[stream.iconName] || TrendingUp;
            return (
              <div
                key={stream.id}
                className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[var(--border-light)] group-hover:text-[var(--gold-primary)] transition-colors">
                      {stream.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase text-[var(--text-primary)] mb-3">
                    {stream.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {stream.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[var(--text-muted)]">
                    Revenue Share
                  </span>
                  <span className="text-sm font-black text-gold-gradient">
                    {stream.estimatedContribution}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
