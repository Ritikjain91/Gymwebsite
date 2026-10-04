'use client';

import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { FRANCHISE_FORMATS } from '../data/gymData';
import { Check, ArrowRight, ShieldCheck, Flame, Layers, Maximize2 } from 'lucide-react';

export default function FormatComparison() {
  const { openModal } = useTheme();
  const [selectedFormat, setSelectedFormat] = useState<'Prime' | 'Luxury'>('Prime');

  const current = FRANCHISE_FORMATS.find((f) => f.id === selectedFormat)!;
  const prime = FRANCHISE_FORMATS.find((f) => f.id === 'Prime')!;
  const luxury = FRANCHISE_FORMATS.find((f) => f.id === 'Luxury')!;

  return (
    <section id="formats" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <span>01 • Franchise Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Two Formats. <span className="text-gold-gradient">One Standard.</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base">
            Engineered for distinct commercial footprints. Both models are powered by the same institutional operating system, vendor pricing, and high-retention member journey.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center justify-center p-1.5 max-w-md mx-auto mb-12 rounded-full glass-panel border border-[var(--border-gold)]">
          <button
            onClick={() => setSelectedFormat('Prime')}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedFormat === 'Prime'
                ? 'bg-[var(--gold-primary)] text-black shadow-lg'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>Raw Fit Prime</span>
            <span className="text-[11px] opacity-75 font-semibold">₹1.80 Cr</span>
          </button>
          <button
            onClick={() => setSelectedFormat('Luxury')}
            className={`flex-1 py-3 px-6 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedFormat === 'Luxury'
                ? 'bg-[var(--gold-primary)] text-black shadow-lg'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>Raw Fit Luxury</span>
            <span className="text-[11px] opacity-75 font-semibold">₹3.20 Cr</span>
          </button>
        </div>

        {/* Selected Format Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl glass-panel p-6 sm:p-10 border border-[var(--border-gold)] shadow-2xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-primary)]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Visual Image & Key Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[var(--gold-bright)]">
                    {current.badge}
                  </span>
                  <h3 className="text-2xl font-black uppercase">{current.name}</h3>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold text-[var(--gold-primary)]">
                  {current.facilitiesCount} Key Zones
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--bg-primary)]/60 border border-[var(--border-subtle)] text-center">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  Total Capex
                </span>
                <span className="text-lg sm:text-xl font-black text-gold-gradient">
                  {current.investmentAmount}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  Floor Area
                </span>
                <span className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
                  {current.areaSqFt}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  EBITDA Target
                </span>
                <span className="text-lg sm:text-xl font-black text-[var(--flame-accent)]">
                  {current.projectedEbitda}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => openModal('franchise', current.id)}
              className="btn-gold w-full py-4 text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl mt-auto"
            >
              <span>Apply to Own a {current.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Detailed Specifications & Amenities */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black tracking-widest text-[var(--gold-primary)] uppercase">
                  Format Specifications
                </span>
                <span className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black uppercase mb-3">
                {current.tagline}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Turnkey civil construction, bespoke acoustic soundproofing, imported biomechanical equipment, and contrast recovery suites built to institutional standard.
              </p>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">
                    Strength Infrastructure
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {current.highlightSpecs.strengthFloor}
                  </p>
                </div>
                <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">
                    Cardio Fleet
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {current.highlightSpecs.cardioCapacity}
                  </p>
                </div>
                <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">
                    Recovery Suite
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {current.highlightSpecs.recoveryFeatures.join(' • ')}
                  </p>
                </div>
                <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase block mb-1">
                    Lounge & Hospitality
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {current.highlightSpecs.loungeAndRecreation}
                  </p>
                </div>
              </div>

              {/* Comprehensive Feature Checklist */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  Included Amenities & Infrastructure ({current.amenities.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Quick Comparison Matrix */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden glass-panel border border-[var(--border-subtle)]">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <th className="py-4 px-6 font-extrabold uppercase text-[var(--text-muted)]">Benchmark Metric</th>
                <th className="py-4 px-6 font-extrabold uppercase text-[var(--gold-primary)]">Raw Fit Prime</th>
                <th className="py-4 px-6 font-extrabold uppercase text-[var(--flame-accent)]">Raw Fit Luxury (Flagship)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Total Turnkey Investment</td>
                <td className="py-3.5 px-6 font-bold text-[var(--text-primary)]">₹1.80 Crore</td>
                <td className="py-3.5 px-6 font-black text-gold-gradient">₹3.20 Crore</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Carpet Area Requirement</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">3,000 – 4,000 SQ FT</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">6,000 – 8,000 SQ FT</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Contrast Therapy</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">Nordic Finnish Sauna</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">Sub-Zero 4°C Cryo Plunge + Infrared Sauna</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Member Recreation</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">RAW Fuel Protein Bar</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">Executive Lounge + Slate Billiards Table</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Body Analytics</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">Digital Bio-Impedance Pod</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">Styku 3D Medical Optical Body Scanner</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Projected Monthly Revenue</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">₹22 – ₹32 Lakhs</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)]">₹48 – ₹72 Lakhs</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-semibold text-[var(--text-secondary)]">Average Payback Horizon</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)] font-bold">18 – 24 Months</td>
                <td className="py-3.5 px-6 text-[var(--text-primary)] font-bold">20 – 26 Months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
