'use client';

import React, { useState } from 'react';
import { TRAINING_ZONES } from '../data/gymData';
import { useTheme } from './ThemeContext';
import { CheckCircle, Eye, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ZoneExplorer() {
  const { openModal } = useTheme();
  const [activeZoneId, setActiveZoneId] = useState<string>(TRAINING_ZONES[0].id);

  const activeZone = TRAINING_ZONES.find((z) => z.id === activeZoneId)!;

  return (
    <section id="zones" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <span>02 • Facility Masterplan</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              A Floor Designed Around <span className="text-gold-gradient">Peak Human Movement</span>
            </h2>
          </div>
          <button
            onClick={() => openModal('tour')}
            className="btn-outline self-start md:self-auto py-2.5 px-5 text-xs font-bold uppercase tracking-wider"
          >
            <span>Book Private Tour</span>
          </button>
        </div>

        {/* Horizontal Zone Selector Pills */}
        <div className="flex items-center sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TRAINING_ZONES.map((zone) => {
            const isActive = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZoneId(zone.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-lg scale-105'
                    : 'glass-panel text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-gold)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className={`text-[10px] font-black ${isActive ? 'text-black/80' : 'text-[var(--gold-primary)]'}`}>
                  {zone.number}
                </span>
                <span>{zone.name.split(' ')[0]} {zone.name.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Zone Detail Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl glass-panel p-6 sm:p-10 border border-[var(--border-gold)] relative overflow-hidden shadow-2xl">
          {/* Visual Showcase (Left) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] group">
            <img
              src={activeZone.image}
              alt={activeZone.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Zone Tag & Badge Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[var(--border-gold)] text-xs font-black text-gold-gradient uppercase">
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

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--gold-bright)]">
                {activeZone.subtitle}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase mt-1">
                {activeZone.name}
              </h3>
            </div>
          </div>

          {/* Details & Specs (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                {activeZone.description}
              </p>

              {/* Equipment Fleet List */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  Signature Equipment Fleet
                </span>
                <div className="space-y-2.5">
                  {activeZone.featuredEquipment.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-primary)]/70 border border-[var(--border-subtle)] text-xs sm:text-sm font-semibold text-[var(--text-primary)]"
                    >
                      <Zap className="w-4 h-4 text-[var(--gold-primary)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environment / Sensory Details */}
              <div className="p-4 rounded-xl glass-panel border border-[var(--border-subtle)]">
                <span className="text-xs font-bold text-[var(--gold-primary)] uppercase block mb-1">
                  Sensory & Acoustic Engineering
                </span>
                <p className="text-xs text-[var(--text-secondary)]">
                  {activeZone.environment}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => openModal('tour')}
              className="btn-gold w-full py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg mt-auto"
            >
              <span>Schedule VIP Visit to {activeZone.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
