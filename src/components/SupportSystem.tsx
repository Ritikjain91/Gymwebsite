'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { ShieldCheck, CheckCircle2, ArrowRight, Settings, Users, Laptop, Megaphone, Wrench, HardHat } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function SupportSystem() {
  const { openModal } = useTheme();
  const [activePhase, setActivePhase] = useState<'pre' | 'post'>('pre');

  const preOpeningDeliverables = [
    {
      title: 'Territory Exclusivity & Catchment Analysis',
      desc: 'Exclusive territorial mapping within your catchment to safeguard revenue and prevent brand cannibalization.',
      tag: 'Location',
    },
    {
      title: 'Architectural 2D Blueprint & 3D Walkthrough',
      desc: 'Complete architectural equipment zoning, circulation paths, luxury locker room layout, and 3D customer renders.',
      tag: 'Design',
    },
    {
      title: 'MEP, HVAC & Acoustic Engineering',
      desc: 'Detailed structural drawings for 60–100 KVA electrical load, fresh-air ventilation, and cold plunge drainage.',
      tag: 'Engineering',
    },
    {
      title: 'Direct Factory Equipment Procurement',
      desc: 'Corporate pricing on imported biomechanical plate-loaded machines and Olympic rigs, saving 25%–35% on capex.',
      tag: 'Procurement',
    },
    {
      title: 'Turnkey Civil Fit-Out Supervision',
      desc: 'Dedicated on-site project engineer auditing flooring density, mirror illumination, and sauna construction.',
      tag: 'Fit-out',
    },
    {
      title: 'RawFit Academy Staff Certification',
      desc: 'Comprehensive hiring, background verification, and intensive certification for trainers, front desk, and GM.',
      tag: 'Talent',
    },
  ];

  const ongoingOperationsDeliverables = [
    {
      title: 'VIP Pre-Sale Blitz & Campaign Engine',
      desc: 'Hyper-targeted meta ad funnels and local billboard blitz designed to secure 200–350 founding members pre-launch.',
      tag: 'Pre-Sale',
    },
    {
      title: 'Cloud ERP & Biometric Turnstile Integration',
      desc: 'Unified member management platform with automated subscription debit, billing, attendance, and member mobile app.',
      tag: 'Technology',
    },
    {
      title: 'Central National Marketing Fund',
      desc: 'National brand campaigns, athlete endorsements, influencer activations, and PR coverage elevating local club status.',
      tag: 'Marketing',
    },
    {
      title: 'Quarterly Quality & Maintenance Audits',
      desc: 'Routine biomechanical cable inspections, contrast suite sanitization checks, and preventive maintenance protocols.',
      tag: 'Auditing',
    },
    {
      title: 'Continuous Trainer Education & Masterclasses',
      desc: 'Quarterly curriculum upgrades covering modern hypertrophy, mobility protocols, and customer retention psychology.',
      tag: 'Education',
    },
    {
      title: 'Dedicated Expansion Director Support',
      desc: 'Single-point executive contact for monthly P&L reviews, payroll optimization, and territory expansion.',
      tag: 'Governance',
    },
  ];

  const currentList = activePhase === 'pre' ? preOpeningDeliverables : ongoingOperationsDeliverables;

  return (
    <section id="support" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] animate-ping" />
                <span>Turnkey Investor Support Ecosystem</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                Complete Support. <span className="text-gold-gradient">From Day 0 to Scale.</span>
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base">
              You invest capital; our corporate engine handles architectural blueprints, vendor negotiations, staff certification, and pre-sale member acquisition.
            </p>
          </div>
        </ScrollReveal>

        {/* Phase Toggle Tabs */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex items-center justify-center p-1.5 max-w-md mx-auto mb-12 rounded-full glass-panel border border-[var(--border-gold)]">
            <button
              onClick={() => setActivePhase('pre')}
              className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activePhase === 'pre'
                  ? 'bg-[var(--gold-primary)] text-black shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <HardHat className="w-4 h-4 shrink-0" />
              <span>Phase 1: Pre-Opening</span>
            </button>
            <button
              onClick={() => setActivePhase('post')}
              className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activePhase === 'post'
                  ? 'bg-[var(--gold-primary)] text-black shadow-lg'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Phase 2: Ongoing Ops</span>
            </button>
          </div>
        </ScrollReveal>

        {/* 6 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentList.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 80}>
              <TiltCard
                maxTilt={6}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300 flex flex-col justify-between group h-full hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[var(--gold-primary)] px-2.5 py-1 rounded-full bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20">
                      {item.tag}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold-primary)]">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black uppercase text-[var(--text-primary)] mb-2 group-hover:text-gold-gradient transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Operational SLA Banner */}
        <ScrollReveal direction="up" delay={200}>
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-[var(--border-gold)]/60 bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-surface-elevated)] to-[var(--bg-card)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black uppercase text-[var(--text-primary)]">
                  Guaranteed Operational Support SLA
                </h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  24-Hour response time for all club franchise queries • Dedicated Regional General Manager • Central Spares Inventory
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal('franchise')}
              className="btn-gold py-3 px-6 text-xs font-extrabold uppercase tracking-wider shrink-0 whitespace-nowrap cursor-pointer"
            >
              <span>Download Operational SOP Handbook</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
