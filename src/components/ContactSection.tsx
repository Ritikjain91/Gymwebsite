'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import confetti from 'canvas-confetti';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('Rapid Fat Loss & Shred');
  const [timeSlot, setTimeSlot] = useState('Morning (06:00 AM – 09:00 AM)');
  const [date, setDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#c084fc', '#ffffff', '#7928ca'],
      });
    } catch (_) {}
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-violet)] text-xs font-bold uppercase tracking-wider text-[var(--violet-bright)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VISIT THE SANCTUARY</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)]">
              BOOK YOUR VIP TRIAL <br />
              <span className="text-violet-gradient">& FACILITY TOUR</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Step onto the training floor. Meet your dedicated master coach, experience the 4°C cold plunge, 
              and receive your complimentary InBody 770 composition scan.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-violet)] shadow-2xl bg-gradient-to-b from-[#140c1a] via-[var(--bg-card)] to-[#0c0910] relative">
                {isSubmitted ? (
                  <div className="text-center py-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--violet-primary)] flex items-center justify-center text-white mb-6 shadow-xl shadow-[rgba(168,85,247,0.4)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--violet-bright)] mb-2">
                      VIP PASS CONFIRMED
                    </span>
                    <h3 className="text-3xl font-black uppercase text-[var(--text-primary)] mb-3 font-display">
                      Welcome To Raw Fit, {name || 'Athlete'}!
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed mb-6">
                      Your VIP trial pass has been issued. Our concierge has reserved your slot for <strong>{timeSlot}</strong>. 
                      A confirmation SMS and WhatsApp pass have been dispatched to your mobile.
                    </p>
                    <div className="p-4 rounded-2xl bg-black/60 border border-[var(--border-violet)] text-xs text-[var(--text-primary)] w-full max-w-sm mb-6">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase block">VIP PASS ID</span>
                      <strong className="text-base text-violet-gradient font-display">RF-VIP-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-outline text-xs py-3 px-6 cursor-pointer"
                    >
                      Book Another Pass
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-black uppercase text-[var(--text-primary)] mb-1 font-display">
                        Claim Complimentary 1-Day Pass
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        No credit card required. Includes full floor & sauna access.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="athlete@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                          Primary Fitness Goal
                        </label>
                        <select
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#140e1a] border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none cursor-pointer"
                        >
                          <option value="Rapid Fat Loss & Shred">Rapid Fat Loss & Shred</option>
                          <option value="Muscle Hypertrophy & Size">Muscle Hypertrophy & Size</option>
                          <option value="Raw Strength & Powerlifting">Raw Strength & Powerlifting</option>
                          <option value="Athletic Conditioning & Combat">Athletic Conditioning & Combat</option>
                          <option value="1-on-1 Personal Coaching">1-on-1 Personal Coaching</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                          Preferred Time Slot
                        </label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#140e1a] border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none cursor-pointer"
                        >
                          <option value="Morning (06:00 AM – 09:00 AM)">Morning (06:00 AM – 09:00 AM)</option>
                          <option value="Midday (11:00 AM – 03:00 PM)">Midday (11:00 AM – 03:00 PM)</option>
                          <option value="Evening (05:00 PM – 09:00 PM)">Evening (05:00 PM – 09:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)] block mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-[var(--border-subtle)] focus:border-[var(--violet-primary)] text-sm text-[var(--text-primary)] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-violet text-xs py-3.5 sm:py-4 px-4 sm:px-8 w-full font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl mt-4"
                    >
                      {isSubmitting ? (
                        <span>PROCESSING VIP PASS...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>CONFIRM MY FREE VIP TRIAL PASS</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)] pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Your contact details are strictly confidential. Zero spam policy.</span>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Details, Hours & Interactive Location Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick Contact & WhatsApp Action */}
            <ScrollReveal direction="left" delay={100}>
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-5">
                <h4 className="text-lg font-black uppercase text-[var(--text-primary)] font-display">
                  Direct Concierge & Support
                </h4>

                <div className="space-y-4">
                  <a
                    href="tel:+919000000000"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-[var(--border-subtle)] hover:border-[var(--violet-bright)] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--violet-glow)] flex items-center justify-center text-[var(--violet-bright)] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                        Direct Phone Line
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--violet-bright)] transition-colors break-words">
                        +91 90000 00000 / 011-4567-8900
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919000000000?text=Hi%20RAW%20FIT%20GYM%2C%20I%20would%20like%20to%20book%20a%20VIP%20Trial%20Pass."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-[#25D366]/30 hover:border-[#25D366] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                        Instant WhatsApp VIP Concierge
                      </span>
                      <span className="text-sm font-bold text-[#25D366]">
                        Chat Live With Our Team →
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-black/40 border border-[var(--border-subtle)]">
                    <div className="w-10 h-10 rounded-xl bg-[var(--violet-glow)] flex items-center justify-center text-[var(--violet-bright)] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                        Email Inquiries
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] break-all sm:break-normal">
                        concierge@rawfitgym.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Operating Hours Card */}
            <ScrollReveal direction="left" delay={200}>
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--violet-glow)] flex items-center justify-center text-[var(--violet-bright)] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase text-[var(--text-primary)]">
                      Club Operating Hours
                    </h4>
                    <span className="text-xs text-emerald-400 font-bold">Open 7 Days A Week</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] font-semibold">Monday – Saturday:</span>
                    <span className="font-bold text-[var(--text-primary)]">05:30 AM – 11:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)] font-semibold">Sunday & Public Holidays:</span>
                    <span className="font-bold text-[var(--text-primary)]">07:00 AM – 08:00 PM</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Location & Map Preview Card */}
            <ScrollReveal direction="left" delay={300}>
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-[var(--border-subtle)] flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--violet-glow)] flex items-center justify-center text-[var(--violet-bright)] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase text-[var(--text-primary)]">
                      Flagship Club Location
                    </h4>
                    <span className="text-xs text-[var(--text-muted)]">Plot 42, Executive Sector, Main Ring Road</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Dedicated 3-story private building with complimentary member valet parking, 
                  private elevator access, and RFID security turnstiles.
                </p>

                {/* Styled Map Graphic / Mockup Card */}
                <div className="rounded-2xl overflow-hidden border border-[var(--border-violet)] relative h-36 bg-gradient-to-br from-[#1c1224] to-[#0c0910] flex items-center justify-center text-center p-4">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--violet-primary)_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--violet-primary)] flex items-center justify-center text-white mb-2 shadow-lg shadow-[rgba(168,85,247,0.5)] animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black uppercase text-[var(--text-primary)]">
                      RAW FIT GYM FLAGSHIP ARENA
                    </span>
                    <span className="text-[10px] text-[var(--violet-bright)] font-semibold mt-0.5">
                      Tap to open in Google Maps →
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
