'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { Check, Sparkles, Flame, Shield, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function PricingSection() {
  const { openModal } = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'basic',
      name: 'BASIC',
      badge: 'ATHLETIC ACCESS',
      monthlyPrice: 3499,
      annualMonthlyPrice: 2499,
      description: 'Full uncrowded access to the world-class strength floor and cardio deck.',
      features: [
        'Unlimited access to all 6 Strength & Cardio Zones',
        'Biometric contactless RFID keyless entry',
        'Nordic Cedarwood Finnish Dry Sauna access',
        'Complimentary baseline movement screening',
        'Luxury rainfall shower suites & locker bays',
      ],
      cta: 'JOIN BASIC',
      isPopular: false,
    },
    {
      id: 'pro',
      name: 'PRO',
      badge: 'MOST POPULAR • 82% OF ATHLETES',
      monthlyPrice: 6499,
      annualMonthlyPrice: 4799,
      description: 'The complete transformation protocol with cold contrast therapy and coaching.',
      features: [
        'EVERYTHING in Basic plan',
        'UNLIMITED 4°C Cryo Cold Plunge & Infrared Sauna Suite',
        '2 Complimentary 1-on-1 Personal Training sessions / month',
        'Unlimited access to all High-Octane Group Masterclasses',
        'Monthly Styku 3D Body Composition & Posture Scan',
        'Customized macronutrient blueprint & diet plan updates',
        '2 Guest VIP Day Passes per month',
      ],
      cta: 'GET PRO MEMBERSHIP',
      isPopular: true,
    },
    {
      id: 'elite',
      name: 'ELITE',
      badge: 'STRICTLY CAPPED AT 75 MEMBERS',
      monthlyPrice: 12999,
      annualMonthlyPrice: 9999,
      description: 'Private executive membership with white-glove personalization and daily concierge.',
      features: [
        'EVERYTHING in Pro plan',
        'Dedicated Senior Master Coach with weekly 1-on-1 sessions',
        'Private VIP recovery suite reservation privileges',
        'Executive Lounge access with billiards & co-working',
        'Daily complimentary protein shake at RAW Fuel Bar',
        'Permanent reserved luxury locker & valet parking',
        'Direct 24/7 WhatsApp hotline to head coach & dietitian',
      ],
      cta: 'APPLY FOR ELITE',
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Ambient Dark Sapphire Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none blur-3xl animate-pulse-blue" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-blue)] text-xs font-bold uppercase tracking-wider text-[var(--blue-bright)] mb-4 shadow-lg shadow-[rgba(37,99,235,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT MEMBERSHIP TIERS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              INVEST IN YOUR <br />
              <span className="text-blue-gradient">PHYSICAL EXCELLENCE</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              No hidden initiation fees. No cancellation penalties. Just an uncompromised standard 
              of equipment, coaching, and contrast recovery.
            </p>
          </ScrollReveal>

          {/* Billing Switcher Toggle */}
          <ScrollReveal direction="up" delay={300}>
            <div className="inline-flex items-center p-1.5 rounded-full glass-panel border border-[var(--border-blue)] mt-8 shadow-xl">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  !isAnnual
                    ? 'bg-[var(--blue-primary)] text-white shadow-lg font-black'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2.5 ${
                  isAnnual
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg font-black'
                    : 'text-[var(--text-muted)] hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-400 text-[10px] font-black border border-emerald-500/40 animate-pulse">
                  SAVE 25% + 2 MO FREE
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;
            return (
              <ScrollReveal key={plan.id} direction="up" delay={100 * (idx + 1)}>
                <TiltCard
                  maxTilt={plan.isPopular ? 6 : 4}
                  className={`h-full p-8 sm:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    plan.isPopular
                      ? 'glass-panel border-2 border-glow-animated shadow-2xl shadow-[rgba(37,99,235,0.35)] bg-gradient-to-b from-[#0e172c] via-[#09101f] to-[#05070c] scale-100 lg:-translate-y-3'
                      : 'glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-blue)]/60 bg-gradient-to-b from-[var(--bg-card)] to-[#070911]'
                  }`}
                >
                  {/* Glowing Top Radial for Popular */}
                  {plan.isPopular && (
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-[radial-gradient(circle,rgba(56,189,248,0.4),transparent_70%)] pointer-events-none blur-2xl" />
                  )}

                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-700 text-white border-sky-300 shadow-md'
                          : 'bg-black/50 text-[var(--blue-bright)] border-[var(--border-subtle)]'
                      }`}>
                        {plan.badge}
                      </span>

                      {plan.isPopular && (
                        <div className="flex items-center gap-1 text-[var(--blue-bright)] text-xs font-black animate-pulse">
                          <Zap className="w-4 h-4 fill-[var(--blue-bright)]" />
                          <span>RECOMMENDED</span>
                        </div>
                      )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-3xl sm:text-4xl font-black uppercase text-[var(--text-primary)] font-display tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price Block */}
                    <div className="mb-8 pb-6 border-b border-[var(--border-subtle)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[var(--blue-bright)]">₹</span>
                        <span className="text-5xl sm:text-6xl font-black text-[var(--text-primary)] font-display tracking-tight">
                          {price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          / month
                        </span>
                      </div>
                      <span className="text-[11px] text-[var(--text-muted)] mt-1.5 block">
                        {isAnnual ? 'Billed annually (Includes 2 Months Free & zero joining fee)' : 'Billed monthly with zero lock-in'}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3.5 mb-8">
                      <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] block">
                        Included Privileges:
                      </span>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.isPopular ? 'text-[var(--blue-bright)]' : 'text-emerald-400'
                          }`} />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button with Sapphire Sheen */}
                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <button
                      onClick={() => openModal('tour')}
                      className={`w-full py-4 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-xl ${
                        plan.isPopular
                          ? 'btn-violet shadow-[rgba(37,99,235,0.5)]'
                          : 'btn-outline hover:border-[var(--blue-bright)] hover:text-[var(--blue-bright)]'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[10px] text-center text-[var(--text-muted)] mt-2.5">
                      Complimentary 1-day pass included before payment
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
