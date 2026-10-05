'use client';

import React from 'react';
import { useTheme } from './ThemeContext';

export default function MobileActionBar() {
  const { openModal } = useTheme();

  const whatsappUrl =
    'https://wa.me/919000000000?text=Hi%20RAW%20FIT%20GYM%2C%20I%20would%20like%20to%20book%20a%20VIP%20Trial%20Pass%20and%20consultation.';

  return (
    <aside
      aria-label="Mobile quick action bar"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-[var(--bg-surface)]/95 backdrop-blur-2xl border-t border-[var(--border-subtle)] p-2.5 flex items-center gap-2 shadow-2xl safe-area-pb"
    >
      {/* Pricing / Memberships Link */}
      <a
        href="#pricing"
        className="flex-1 py-2.5 px-3 rounded-full glass-panel border border-[var(--border-subtle)] text-center text-xs font-black uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--border-gold)] transition-colors"
      >
        Plans
      </a>

      {/* Primary Free Trial Pass Button */}
      <button
        onClick={() => openModal('tour')}
        className="flex-1 py-2.5 px-3 rounded-full btn-volt text-center text-xs font-black uppercase tracking-wider shadow-lg cursor-pointer"
      >
        Free Trial Pass
      </button>

      {/* WhatsApp Quick Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.88 9.88 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
      </a>
    </aside>
  );
}
