'use client';

import React, { useState, useMemo } from 'react';
import { useTheme } from './ThemeContext';
import { Calculator, TrendingUp, DollarSign, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

export default function RoiCalculator() {
  const { openModal } = useTheme();

  // Inputs
  const [format, setFormat] = useState<'Prime' | 'Luxury'>('Prime');
  const [cityTier, setCityTier] = useState<'Tier1' | 'Tier2' | 'Tier3'>('Tier1');
  const [carpetArea, setCarpetArea] = useState<number>(3500);
  const [activeMembers, setActiveMembers] = useState<number>(550);
  const [ptConversionRate, setPtConversionRate] = useState<number>(25); // % of members taking PT
  const [isSaved, setIsSaved] = useState(false);

  // Financial model computations
  const financialModel = useMemo(() => {
    const isPrime = format === 'Prime';
    const initialCapex = isPrime ? 18000000 : 32000000; // in INR

    // Average monthly membership fee based on tier
    const avgMonthlyMembershipFee = isPrime
      ? cityTier === 'Tier1' ? 3800 : cityTier === 'Tier2' ? 3200 : 2800
      : cityTier === 'Tier1' ? 6200 : cityTier === 'Tier2' ? 5200 : 4400;

    // Monthly Membership Gross Revenue
    const monthlyMembershipRev = activeMembers * avgMonthlyMembershipFee;

    // Monthly PT Revenue (avg 12 sessions @ fee per session)
    const ptMembers = Math.round((activeMembers * ptConversionRate) / 100);
    const avgPtMonthlySpend = isPrime ? 8500 : 14000;
    const monthlyPtRev = ptMembers * avgPtMonthlySpend;

    // Monthly Retail, Fuel Bar & Supplements
    const avgRetailPerMember = isPrime ? 650 : 1100;
    const monthlyRetailRev = activeMembers * avgRetailPerMember;

    // Total Monthly Turnover
    const totalMonthlyTurnover = monthlyMembershipRev + monthlyPtRev + monthlyRetailRev;

    // Operating Expenses
    // Rent per sqft by city tier
    const rentPerSqFt = cityTier === 'Tier1' ? 110 : cityTier === 'Tier2' ? 75 : 55;
    const monthlyRent = carpetArea * rentPerSqFt;

    // Staff Payroll (Trainers, Ops, Management)
    const trainerCommission = monthlyPtRev * 0.4;
    const fixedStaffPayroll = isPrime ? 320000 : 650000;
    const totalPayroll = fixedStaffPayroll + trainerCommission;

    // Power, HVAC, Water & Chiller electricity
    const monthlyUtilities = isPrime ? 140000 : 260000;

    // Central Brand Royalty & Software (6%)
    const brandRoyalty = totalMonthlyTurnover * 0.06;

    // Marketing & Miscellaneous
    const monthlyMarketing = 80000;

    // Total OPEX
    const totalMonthlyOpex = monthlyRent + totalPayroll + monthlyUtilities + brandRoyalty + monthlyMarketing;

    // Net Monthly EBITDA
    const monthlyEbitda = Math.max(0, totalMonthlyTurnover - totalMonthlyOpex);
    const annualEbitda = monthlyEbitda * 12;

    // Payback & ROI
    const paybackMonths = annualEbitda > 0 ? Math.round((initialCapex / annualEbitda) * 12) : 99;
    const roiPercentage = annualEbitda > 0 ? ((annualEbitda / initialCapex) * 100).toFixed(1) : '0';
    const ebitdaMargin = totalMonthlyTurnover > 0 ? ((monthlyEbitda / totalMonthlyTurnover) * 100).toFixed(1) : '0';

    return {
      initialCapex,
      monthlyMembershipRev,
      monthlyPtRev,
      monthlyRetailRev,
      totalMonthlyTurnover,
      monthlyRent,
      totalPayroll,
      monthlyUtilities,
      totalMonthlyOpex,
      monthlyEbitda,
      annualEbitda,
      paybackMonths,
      roiPercentage,
      ebitdaMargin,
    };
  }, [format, cityTier, carpetArea, activeMembers, ptConversionRate]);

  const handleSaveModel = () => {
    try {
      const savedScenario = {
        id: `ROI-${Date.now()}`,
        formatType: format,
        cityTier,
        carpetArea,
        projectedMembers: activeMembers,
        ptConversionPct: ptConversionRate,
        estMonthlyRevenue: financialModel.totalMonthlyTurnover,
        estMonthlyEbitda: financialModel.monthlyEbitda,
        estAnnualProfit: financialModel.annualEbitda,
        estPaybackMonths: financialModel.paybackMonths,
        estRoiPct: parseFloat(financialModel.roiPercentage),
        savedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        const scenarios = JSON.parse(localStorage.getItem('rf_saved_roi_scenarios') || '[]');
        localStorage.setItem('rf_saved_roi_scenarios', JSON.stringify([savedScenario, ...scenarios]));
      }

      setIsSaved(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#ffd700', '#ff6b35'],
      });
      setTimeout(() => setIsSaved(false), 4000);
    } catch {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 4000);
    }
  };

  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Financial Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Estimate Your <span className="text-gold-gradient">Franchise Returns</span>
            </h2>
            <p className="text-[var(--text-secondary)] mt-3 text-sm sm:text-base">
              Adjust location demographics, floor square footage, and membership targets to simulate monthly gross turnover, operating margins, and payback horizon.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <ScrollReveal direction="right" delay={150} className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] flex flex-col gap-6 h-full">
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--gold-primary)] border-b border-[var(--border-subtle)] pb-3">
                1. Commercial & Catchment Parameters
              </h3>

            {/* Format Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Franchise Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setFormat('Prime');
                    setCarpetArea(3500);
                    setActiveMembers(550);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    format === 'Prime'
                      ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--text-primary)] shadow-sm'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-light)]'
                  }`}
                >
                  <span className="block font-black text-sm uppercase">Raw Fit Prime</span>
                  <span className="text-xs text-[var(--gold-primary)] font-bold">₹1.80 Cr Turnkey</span>
                </button>
                <button
                  onClick={() => {
                    setFormat('Luxury');
                    setCarpetArea(6500);
                    setActiveMembers(850);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    format === 'Luxury'
                      ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--text-primary)] shadow-sm'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-light)]'
                  }`}
                >
                  <span className="block font-black text-sm uppercase">Raw Fit Luxury</span>
                  <span className="text-xs text-[var(--gold-primary)] font-bold">₹3.20 Cr Flagship</span>
                </button>
              </div>
            </div>

            {/* City Tier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                Target Market Demographics
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'Tier1', label: 'Tier 1 Metro', desc: 'Mumbai, Delhi, BLR' },
                  { id: 'Tier2', label: 'Tier 2 Hub', desc: 'Pune, Chd, Hyd' },
                  { id: 'Tier3', label: 'Tier 3 Growth', desc: 'Emerging Cities' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setCityTier(tier.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      cityTier === tier.id
                        ? 'border-[var(--gold-primary)] bg-[var(--gold-primary)]/10 text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span className="block font-bold text-xs">{tier.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Carpet Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Carpet Area (Square Feet)
                </span>
                <span className="font-black text-sm text-gold-gradient">
                  {carpetArea.toLocaleString()} SQ FT
                </span>
              </div>
              <input
                type="range"
                min={format === 'Prime' ? 2800 : 5500}
                max={format === 'Prime' ? 4500 : 9000}
                step={100}
                value={carpetArea}
                onChange={(e) => setCarpetArea(parseInt(e.target.value))}
                className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--gold-primary)]"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                <span>{format === 'Prime' ? '2,800 SQ FT' : '5,500 SQ FT'}</span>
                <span>{format === 'Prime' ? '4,500 SQ FT' : '9,000 SQ FT'}</span>
              </div>
            </div>

            {/* Active Members Target */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Active Subscribed Members
                </span>
                <span className="font-black text-sm text-[var(--text-primary)]">
                  {activeMembers} Members
                </span>
              </div>
              <input
                type="range"
                min={300}
                max={format === 'Prime' ? 800 : 1400}
                step={25}
                value={activeMembers}
                onChange={(e) => setActiveMembers(parseInt(e.target.value))}
                className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--gold-primary)]"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
                <span>300 Members</span>
                <span>{format === 'Prime' ? '800 Max' : '1,400 Max'}</span>
              </div>
            </div>

            {/* PT Conversion % */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Personal Training & Coaching Uptake
                </span>
                <span className="font-black text-sm text-[var(--flame-accent)]">
                  {ptConversionRate}% ({Math.round((activeMembers * ptConversionRate) / 100)} Clients)
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={45}
                step={1}
                value={ptConversionRate}
                onChange={(e) => setPtConversionRate(parseInt(e.target.value))}
                className="w-full h-2 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--flame-accent)]"
              />
            </div>
          </div>
        </ScrollReveal>

          {/* Results Summary Column */}
          <ScrollReveal direction="left" delay={200} className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-gold)] relative overflow-hidden shadow-2xl h-full flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-6">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[var(--gold-primary)]">
                    Projected Financial Pro-Forma
                  </span>
                  <h4 className="text-2xl font-black uppercase text-[var(--text-primary)]">
                    Unit Economics
                  </h4>
                </div>
                <div className="p-2.5 rounded-full bg-[var(--gold-primary)]/15 text-[var(--gold-primary)]">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Big KPI Numbers */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)]">
                  <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">
                    Monthly Gross Turnover
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-gold-gradient">
                    {formatINR(financialModel.totalMonthlyTurnover)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)]">
                  <span className="block text-xs uppercase font-bold text-[var(--text-muted)]">
                    Monthly Net EBITDA
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[var(--flame-accent)]">
                    {formatINR(financialModel.monthlyEbitda)}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    ({financialModel.ebitdaMargin}% margin)
                  </span>
                </div>
              </div>

              {/* Annualized Matrix */}
              <div className="space-y-3 py-3 border-y border-[var(--border-subtle)] text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Projected Annual EBITDA</span>
                  <span className="font-extrabold text-[var(--text-primary)]">
                    {formatINR(financialModel.annualEbitda)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Total Initial Turnkey Capex</span>
                  <span className="font-extrabold text-[var(--text-primary)]">
                    {formatINR(financialModel.initialCapex)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Estimated Payback Horizon</span>
                  <span className="font-black text-gold-gradient text-base">
                    {financialModel.paybackMonths} Months
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Annual Return on Capital (ROI)</span>
                  <span className="font-black text-[var(--flame-accent)] text-base">
                    {financialModel.roiPercentage}% / Year
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-auto pt-6">
                <button
                  onClick={handleSaveModel}
                  className="btn-gold w-full py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-900" />
                      <span>Estimate Saved to Database!</span>
                    </>
                  ) : (
                    <>
                      <span>Save Estimate & Connect With Director</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => openModal('franchise', format)}
                  className="btn-outline w-full py-3 text-xs uppercase tracking-wider font-bold"
                >
                  Request Official Pro-Forma PDF
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] text-center leading-relaxed">
              *Projections are computed based on operational historical averages across Tier 1 & 2 club locations. Final commercials are confirmed following property diligence.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
