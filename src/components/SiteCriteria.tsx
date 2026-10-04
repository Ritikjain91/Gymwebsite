'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Eye, Navigation, Users, Ruler, Zap, FileText, ArrowRight } from 'lucide-react';

const criteriaList = [
  {
    num: '01',
    title: 'High Street Visibility',
    description: 'Prominent main road frontage and façade with unobstructed brand signage viewing angles from primary arterial roads.',
    icon: Eye,
  },
  {
    num: '02',
    title: 'Access & Parking',
    description: 'Direct ground or elevator access with dedicated member parking slots (minimum 15-25 four-wheeler spaces for Luxury format).',
    icon: Navigation,
  },
  {
    num: '03',
    title: 'High-Density Catchment',
    description: 'Surrounded by affluent residential societies, IT parks, high-net-worth commercial offices, and luxury retail within a 3–5 KM radius.',
    icon: Users,
  },
  {
    num: '04',
    title: 'Structural Tolerances',
    description: 'Minimum 11.5 FT clear ceiling height, column-free spans for the strength floor, and structural floor load capacity exceeding 500 KG/SQM.',
    icon: Ruler,
  },
  {
    num: '05',
    title: 'Commercial Utilities',
    description: 'Minimum 60–100 KVA 3-phase power supply, dedicated water inlet for saunas & plunges, and exterior HVAC condenser placement provisions.',
    icon: Zap,
  },
  {
    num: '06',
    title: 'Long-Term Secure Lease',
    description: 'Minimum 9-year commercial lease with a 3–5 year initial lock-in period and clear registration documentation.',
    icon: FileText,
  },
];

export default function SiteCriteria() {
  const { openModal } = useTheme();

  return (
    <section id="site" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <span>05 • Real Estate Diligence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              The Right Property <span className="text-gold-gradient">Builds The Right Club</span>
            </h2>
          </div>
          <button
            onClick={() => openModal('franchise')}
            className="btn-gold self-start md:self-auto py-3 px-6 text-xs font-extrabold uppercase tracking-wider"
          >
            Submit A Commercial Space
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteriaList.map((crit) => {
            const Icon = crit.icon;
            return (
              <div
                key={crit.num}
                className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[var(--gold-primary)]">
                      {crit.num}
                    </span>
                    <div className="p-3 rounded-xl bg-[var(--bg-primary)] text-[var(--gold-primary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black uppercase text-[var(--text-primary)] mb-2">
                    {crit.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {crit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
