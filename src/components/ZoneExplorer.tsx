'use client';

import React, { useState } from 'react';
import { TRAINING_ZONES } from '../data/gymData';
import { useTheme } from './ThemeContext';
import { ArrowRight, Zap, Box, Image as ImageIcon, Sparkles, ShieldCheck, Ruler, Users } from 'lucide-react';
import ThreeGymFloorplan from './ThreeGymFloorplan';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const ZONE_METRICS: Record<string, { sqft: string; capacity: string; acoustic: string; airflow: string }> = {
  strength: { sqft: '2,400 SQ FT', capacity: '45 Athletes', acoustic: 'High-Impact Acoustic Rubber (85dB)', airflow: 'High-Volume Negative Pressure' },
  cardio: { sqft: '1,800 SQ FT', capacity: '30 Athletes', acoustic: 'Acoustic Ceiling Clouds (70dB)', airflow: 'HEPA Oxygen-Enriched Purification' },
  functional: { sqft: '2,000 SQ FT', capacity: '35 Athletes', acoustic: 'Open Span Absorptive (80dB)', airflow: 'Continuous Directional Breeze' },
  recovery: { sqft: '1,200 SQ FT', capacity: '16 Athletes', acoustic: 'Soundproof Silent Sanctuary (45dB)', airflow: 'Aromatherapy Micro-Mist' },
  lounge: { sqft: '1,100 SQ FT', capacity: '24 Guests', acoustic: 'Soft Low-Frequency Lounge Beats', airflow: 'Independent Dual-Zone HVAC' },
  studio: { sqft: '650 SQ FT', capacity: 'Private Suite', acoustic: 'Medical Grade Acoustic Isolation', airflow: 'Calibrated Studio Climate Control' },
};

export default function ZoneExplorer() {
  const { openModal } = useTheme();
  const [activeZoneId, setActiveZoneId] = useState<string>(TRAINING_ZONES[0].id);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  const activeZone = TRAINING_ZONES.find((z) => z.id === activeZoneId)!;
  const metrics = ZONE_METRICS[activeZoneId] || ZONE_METRICS.strength;

  return (
    <section id="zones" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] animate-ping" />
                <span>02 • Facility Masterplan & 3D Spatial Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                A Floor Designed Around <span className="text-gold-gradient">Peak Human Movement</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {/* View Switcher Button (3D Blueprint vs Photo) */}
              <div className="flex items-center p-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold shadow-md">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-lg'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Blueprint</span>
                </button>
                <button
                  onClick={() => setViewMode('photo')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-[var(--gold-primary)] text-black font-extrabold shadow-lg'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photo View</span>
                </button>
              </div>

              <button
                onClick={() => openModal('tour')}
                className="btn-outline self-start md:self-auto py-2.5 px-5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <span>Book Tour</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Zone Selector Pills */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex items-center sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {TRAINING_ZONES.map((zone) => {
              const isActive = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-lg scale-105'
                      : 'glass-panel text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className={`text-[10px] font-black ${isActive ? 'text-black/80' : 'text-[var(--gold-primary)]'}`}>
                    {zone.number}
                  </span>
                  <span>
                    {zone.name.split(' ')[0]} {zone.name.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Zone Detail Showcase Card */}
        <ScrollReveal direction="up" delay={250}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 border border-[var(--border-gold)] relative overflow-hidden shadow-2xl">
            {/* Visual Showcase (Left): Interactive 3D Model OR Photo */}
            <div className="lg:col-span-7 w-full min-w-0 flex flex-col justify-between">
              {viewMode === '3d' ? (
                <div className="relative w-full h-full flex flex-col">
                  <ThreeGymFloorplan
                    activeZoneId={activeZoneId}
                    onSelectZone={(id) => setActiveZoneId(id)}
                  />
                  {/* Active Zone Highlight Tag */}
                  <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-[var(--text-secondary)] px-1">
                    <span className="font-bold uppercase tracking-wider text-[var(--gold-primary)] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Focused: {activeZone.number} • {activeZone.name}</span>
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      360° Drag to Orbit • Click 3D Pins or HUD buttons
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] group border border-[var(--border-subtle)] shadow-xl">
                  <img
                    src={activeZone.image}
                    alt={activeZone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Zone Tag & Badge Overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--border-gold)] text-xs font-black text-gold-gradient uppercase">
                      Zone {activeZone.number}
                    </span>
                    {activeZone.luxuryAvailable && !activeZone.primeAvailable ? (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-black text-xs font-extrabold uppercase">
                        Luxury Exclusive
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase">
                        Prime & Luxury
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--gold-bright)]">
                      {activeZone.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase mt-1">
                      {activeZone.name}
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Details & Specs (Right) */}
            <div className="lg:col-span-5 w-full min-w-0 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--gold-primary)]/15 border border-[var(--border-gold)] text-[10px] font-black tracking-widest text-[var(--gold-primary)] uppercase">
                    Architectural Sector {activeZone.number}
                  </span>
                  <span className="text-xs font-bold text-[var(--text-muted)]">
                    {activeZone.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase mb-3 text-[var(--text-primary)]">
                  {activeZone.name}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeZone.description}
                </p>

                {/* Spatial Architectural Metrics Strip */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center gap-2.5">
                    <Ruler className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)]">Floor Area</span>
                      <span className="font-extrabold text-[var(--text-primary)]">{metrics.sqft}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[var(--text-muted)]">Athlete Capacity</span>
                      <span className="font-extrabold text-[var(--text-primary)]">{metrics.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Equipment Fleet List */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                    Signature Equipment Fleet
                  </span>
                  <div className="space-y-2.5">
                    {activeZone.featuredEquipment.map((item, i) => (
                      <TiltCard
                        key={i}
                        maxTilt={6}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-primary)]/70 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors text-xs sm:text-sm font-semibold text-[var(--text-primary)]"
                      >
                        <Zap className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                        <span>{item}</span>
                      </TiltCard>
                    ))}
                  </div>
                </div>

                {/* Environment / Sensory Details */}
                <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                  <span className="text-xs font-bold text-[var(--gold-primary)] uppercase block mb-1">
                    Sensory, Acoustic & Climate Engineering
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {activeZone.environment}
                  </p>
                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span>Acoustics: {metrics.acoustic.split(' ')[0]}</span>
                    <span>Airflow: {metrics.airflow.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => openModal('tour')}
                className="btn-gold w-full py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl cursor-pointer mt-4"
              >
                <span>Schedule VIP Walkthrough of {activeZone.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
