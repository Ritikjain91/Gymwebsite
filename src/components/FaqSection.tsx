'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/gymData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<'franchise' | 'membership'>('franchise');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filtered = FAQ_ITEMS.filter((item) => {
    if (activeCategory === 'franchise') return item.category === 'franchise';
    return item.category === 'membership' || item.category === 'facility';
  });

  return (
    <section id="faq" className="py-20 lg:py-28 relative border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[var(--border-gold)] text-xs font-bold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Frequently <span className="text-gold-gradient">Answered</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Category Toggle */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-full glass-panel border border-[var(--border-gold)]">
              <button
                onClick={() => setActiveCategory('franchise')}
                className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === 'franchise'
                    ? 'bg-[var(--gold-primary)] text-black shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Franchise & Investment
              </button>
              <button
                onClick={() => setActiveCategory('membership')}
                className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === 'membership'
                    ? 'bg-[var(--gold-primary)] text-black shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Membership & Experience
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion List with ScrollReveal */}
        <div className="space-y-4">
          {filtered.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <ScrollReveal key={faq.id} direction="up" delay={idx * 60}>
                <div className="rounded-2xl glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-gold)]/40 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--gold-primary)] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] mt-1 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
