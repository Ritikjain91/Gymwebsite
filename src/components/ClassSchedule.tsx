'use client';

import React, { useState } from 'react';
import { GYM_CLASSES } from '../data/gymData';
import { useTheme } from './ThemeContext';
import { Calendar, Clock, Flame, User, ArrowRight, Check } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export default function ClassSchedule() {
  const { openModal } = useTheme();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredClasses = GYM_CLASSES.filter((c) => {
    const matchDay = c.day === selectedDay;
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchDay && matchCat;
  });

  return (
    <section id="schedule" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Elite Training Timetable</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Curated <span className="text-gold-gradient">Masterclasses</span>
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base">
            From Olympic lifting mechanics to cold plunge breathwork and metabolic HIIT, every session is coached by nationally certified masters.
          </p>
        </div>

        {/* Days of Week Tab Bar */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {days.map((day) => {
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 border cursor-pointer shrink-0 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-md'
                    : 'glass-panel text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-gold)]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-bold no-scrollbar">
          {['All', 'Strength', 'HIIT', 'Combat', 'Mobility', 'Hypertrophy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-extrabold'
                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] text-xs font-black uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-[var(--flame-accent)] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {item.intensity}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-[var(--text-primary)] mb-2 group-hover:text-gold-gradient transition-colors">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                      <span>{item.time} ({item.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                      <span>Coach: {item.coach}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                      <span>Burn Estimate: {item.caloriesBurned}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    {item.spotsLeft} Spots Available
                  </span>
                  <button
                    onClick={() => openModal('tour')}
                    className="btn-gold text-xs py-2 px-4 font-bold flex items-center gap-1.5"
                  >
                    <span>Reserve Pass</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl glass-panel border border-[var(--border-subtle)]">
            <p className="text-base text-[var(--text-secondary)]">
              No classes currently scheduled under this filter for {selectedDay}. Please select another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
