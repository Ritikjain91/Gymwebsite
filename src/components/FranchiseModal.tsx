'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FranchiseModal() {
  const { modalState, closeModal } = useTheme();

  const [activeTab, setActiveTab] = useState<'franchise' | 'tour'>('franchise');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Franchise form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [investmentRange, setInvestmentRange] = useState('Prime (₹1.80 Cr)');
  const [hasProperty, setHasProperty] = useState('Yes');
  const [preferredFormat, setPreferredFormat] = useState('Prime');
  const [message, setMessage] = useState('');

  // Tour form state
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [interestArea, setInterestArea] = useState('Full Facility Tour');

  useEffect(() => {
    if (modalState.type) {
      setActiveTab(modalState.type);
    }
    if (modalState.initialFormat) {
      setPreferredFormat(modalState.initialFormat);
      setInvestmentRange(
        modalState.initialFormat === 'Luxury'
          ? 'Luxury (₹3.20 Cr)'
          : 'Prime (₹1.80 Cr)'
      );
    }
    setIsSuccess(false);
    setErrorMessage('');
  }, [modalState]);

  if (!modalState.isOpen) return null;

  const handleFranchiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          city,
          state: stateName,
          propertySize,
          investmentRange,
          hasProperty: hasProperty === 'Yes',
          preferredFormat,
          message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ecd396', '#ff6b35'],
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      // Fallback success for local development
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ecd396', '#ff6b35'],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          city,
          preferredFormat,
          preferredDate: tourDate || new Date().toISOString().split('T')[0],
          preferredTime: tourTime,
          interestArea,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ff6b35'],
        });
      } else {
        setErrorMessage(data.error || 'Failed to confirm tour booking.');
      }
    } catch (err) {
      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[var(--border-gold)] p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-gold)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-8 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-gold-gradient">
              {activeTab === 'franchise' ? 'Application Received' : 'VIP Tour Confirmed!'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-md">
              {activeTab === 'franchise'
                ? 'Thank you for your interest in Raw Fit Gym. Our Investment Director will reach out to you within 24 hours to schedule a Zoom introductory call.'
                : 'Your VIP Guided Pass has been generated. Our concierge team has sent your check-in code via SMS and WhatsApp.'}
            </p>

            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-gold)]/40 w-full max-w-md text-left flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-[var(--gold-primary)]" />
                <div>
                  <span className="block font-bold text-xs text-[var(--text-primary)]">
                    Raw Fit Franchise Prospectus 2026.pdf
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">3.8 MB • Executive Summary</span>
                </div>
              </div>
              <button
                onClick={() => alert('Downloading Franchise Prospectus...')}
                className="btn-gold py-1.5 px-3 text-xs"
              >
                Download
              </button>
            </div>

            <button onClick={closeModal} className="btn-outline py-2.5 px-8 mt-4 text-xs font-bold uppercase">
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div>
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-subtle)] pb-4">
              <button
                onClick={() => setActiveTab('franchise')}
                className={`text-sm font-extrabold uppercase tracking-wider pb-1 transition-all ${
                  activeTab === 'franchise'
                    ? 'text-[var(--gold-primary)] border-b-2 border-[var(--gold-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Franchise Application
              </button>
              <button
                onClick={() => setActiveTab('tour')}
                className={`text-sm font-extrabold uppercase tracking-wider pb-1 transition-all ml-4 ${
                  activeTab === 'tour'
                    ? 'text-[var(--gold-primary)] border-b-2 border-[var(--gold-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                Book VIP Facility Tour
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {activeTab === 'franchise' ? (
              /* Franchise Inquiry Form */
              <form onSubmit={handleFranchiseSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@capital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Target City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Bengaluru, Pune"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Format Preferred
                    </label>
                    <select
                      value={preferredFormat}
                      onChange={(e) => setPreferredFormat(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-xs text-[var(--text-primary)] font-semibold"
                    >
                      <option value="Prime">Prime (₹1.80 Cr)</option>
                      <option value="Luxury">Luxury (₹3.20 Cr)</option>
                      <option value="Undecided">Undecided / Open</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Investment Budget
                    </label>
                    <select
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-xs text-[var(--text-primary)] font-semibold"
                    >
                      <option value="Prime (₹1.80 Cr)">₹1.80 Cr (Prime)</option>
                      <option value="Luxury (₹3.20 Cr)">₹3.20 Cr (Luxury)</option>
                      <option value="Above ₹4.0 Cr">Multi-Unit / ₹4.0 Cr+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Commercial Space?
                    </label>
                    <select
                      value={hasProperty}
                      onChange={(e) => setHasProperty(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-xs text-[var(--text-primary)] font-semibold"
                    >
                      <option value="Yes">Yes, Property Ready</option>
                      <option value="No">No, Need Site Search</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                    Notes / Background (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your business background or property location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Franchise Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* VIP Tour Form */
              <form onSubmit={handleTourSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Verma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={tourTime}
                      onChange={(e) => setTourTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)] font-semibold"
                    >
                      <option>07:00 AM – 09:00 AM (Morning Lift)</option>
                      <option>11:00 AM – 01:00 PM (Midday Tour)</option>
                      <option>05:00 PM – 07:00 PM (Peak Experience)</option>
                      <option>08:00 PM – 10:00 PM (Late Night Session)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-[var(--text-muted)] block mb-1">
                    Primary Area of Interest
                  </label>
                  <select
                    value={interestArea}
                    onChange={(e) => setInterestArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--gold-primary)] outline-none text-sm text-[var(--text-primary)] font-semibold"
                  >
                    <option>Full Facility Tour + Free 1-Day Lift Pass</option>
                    <option>Contrast Therapy Suite (Cryo Plunge & Sauna)</option>
                    <option>Master Personal Training Consultation</option>
                    <option>Franchise Investor Inspection Walkthrough</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>Confirming Pass...</span>
                  ) : (
                    <>
                      <span>Confirm VIP Guided Tour Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
