'use client';

import React, { useState, useMemo } from 'react';
import { useTheme } from './ThemeContext';
import { Activity, Dumbbell, Zap, Flame, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function BmiCalculator() {
  const { openModal } = useTheme();

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(26);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(78);
  const [goal, setGoal] = useState<'hypertrophy' | 'fatloss' | 'endurance'>('hypertrophy');

  const assessment = useMemo(() => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let category = 'Healthy Athletic';
    let categoryColor = 'text-[var(--gold-primary)]';

    if (bmi < 18.5) {
      category = 'Lean / Surplus Needed';
      categoryColor = 'text-blue-400';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Optimal Body Mass';
      categoryColor = 'text-emerald-400';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Athletic / Hypertrophy Range';
      categoryColor = 'text-[var(--gold-primary)]';
    } else {
      category = 'Shredding Target';
      categoryColor = 'text-[var(--flame-accent)]';
    }

    // Basal Metabolic Rate (Mifflin-St Jeor)
    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    // TDEE with moderate-high athletic factor
    const tdee = Math.round(bmr * 1.55);

    let targetCalories = tdee;
    let proteinGrams = Math.round(weightKg * 2.0); // 2g per kg
    let recommendedSplit = 'Push / Pull / Legs (5-Day Hypertrophy)';

    if (goal === 'hypertrophy') {
      targetCalories = tdee + 350; // lean surplus
      proteinGrams = Math.round(weightKg * 2.2);
      recommendedSplit = 'Heavy Iron Biomechanical Split (5 Days) + Contrast Therapy';
    } else if (goal === 'fatloss') {
      targetCalories = tdee - 450; // controlled deficit
      proteinGrams = Math.round(weightKg * 2.4);
      recommendedSplit = 'Metabolic Turf Conditioning + Heavy Compounds (4 Days) + Cold Plunge';
    } else {
      targetCalories = tdee;
      proteinGrams = Math.round(weightKg * 1.8);
      recommendedSplit = 'Hybrid Athletic Conditioning & Woodway Sprints (4 Days)';
    }

    return {
      bmi: bmi.toFixed(1),
      category,
      categoryColor,
      targetCalories,
      proteinGrams,
      recommendedSplit,
    };
  }, [gender, age, heightCm, weightKg, goal]);

  return (
    <section id="bmi" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Athletic Biometrics Tool</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Calculate Your <span className="text-gold-gradient">Physique Blueprint</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 text-sm sm:text-base">
              Input your biological metrics to receive customized daily calorie targets, protein requirements, and recommended RawFit training protocols.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Inputs Column */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] flex flex-col gap-5 h-full">
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--gold-primary)] border-b border-[var(--border-subtle)] pb-3">
                Biometric Inputs
              </h3>

              {/* Gender Switch */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Biological Gender
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      gender === 'male'
                        ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/15 text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      gender === 'female'
                        ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/15 text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Height & Weight Sliders */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">Height</span>
                  <span className="font-black text-sm text-[var(--text-primary)]">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min={140}
                  max={215}
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--gold-primary)]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">Weight</span>
                  <span className="font-black text-sm text-[var(--text-primary)]">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={150}
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseInt(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--gold-primary)]"
                />
              </div>

              {/* Primary Goal */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                  Primary Athletic Target
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hypertrophy', label: 'Hypertrophy', desc: 'Muscle Build' },
                    { id: 'fatloss', label: 'Shredding', desc: 'Fat Loss' },
                    { id: 'endurance', label: 'Conditioning', desc: 'Stamina & Agility' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        goal === g.id
                          ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/15 text-[var(--text-primary)]'
                          : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <span className="block font-bold text-xs">{g.label}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{g.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results Column */}
          <ScrollReveal direction="left" delay={200} className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-gold)] relative overflow-hidden shadow-2xl flex flex-col justify-between gap-6 h-full">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--gold-primary)]">
                      Assessment Summary
                    </span>
                    <h4 className="text-2xl font-black uppercase text-[var(--text-primary)]">
                      Target Output
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="block text-3xl font-black text-gold-gradient">
                      BMI {assessment.bmi}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${assessment.categoryColor}`}>
                      {assessment.category}
                    </span>
                  </div>
                </div>

                {/* Nutrition Targets with TiltCard */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <TiltCard maxTilt={8} className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)]">
                    <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">
                      Target Daily Energy
                    </span>
                    <span className="text-2xl font-black text-[var(--flame-accent)]">
                      {assessment.targetCalories.toLocaleString()} kcal
                    </span>
                  </TiltCard>
                  <TiltCard maxTilt={8} className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)]">
                    <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">
                      Daily Protein Minimum
                    </span>
                    <span className="text-2xl font-black text-gold-gradient">
                      {assessment.proteinGrams} g / day
                    </span>
                  </TiltCard>
                </div>

                {/* Protocol Recommendation */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)] mb-6">
                  <span className="block text-xs uppercase font-bold text-[var(--gold-primary)] mb-1">
                    Prescribed RawFit Training Split
                  </span>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {assessment.recommendedSplit}
                  </p>
                </div>
              </div>

              {/* CTA to test in 3D Body Scan Room */}
              <button
                onClick={() => openModal('tour')}
                className="btn-gold w-full py-4 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <span>Book In-Club 3D Body Scan & Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
