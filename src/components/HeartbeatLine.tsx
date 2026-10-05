'use client';

import React from 'react';

interface HeartbeatLineProps {
  className?: string;
  peakPosition?: 'left' | 'center' | 'right';
}

export default function HeartbeatLine({
  className = '',
  peakPosition = 'center',
}: HeartbeatLineProps) {
  // Peak position percentage
  const peakX = peakPosition === 'left' ? 220 : peakPosition === 'right' ? 780 : 500;

  // Generate SVG path with single crisp ECG QRS spike
  const d = `M0 24 L${peakX - 45} 24 L${peakX - 35} 21.8 L${peakX - 25} 24 L${peakX - 12} 24 L${peakX - 7} 27.4 L${peakX} 5 L${peakX + 6.5} 36.5 L${peakX + 12} 24 L${peakX + 22} 24 L${peakX + 31} 19.9 L${peakX + 40} 24 L1000 24`;

  return (
    <div className={`relative w-full overflow-hidden pointer-events-none py-1.5 ${className}`}>
      <svg
        viewBox="0 0 1000 48"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-10 text-[var(--gold-primary)]"
      >
        {/* Faint base line */}
        <path
          d={d}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.2"
        />
        {/* Glowing animated pulse line */}
        <path
          d={d}
          fill="none"
          stroke="url(#ecgGradient)"
          strokeWidth="2"
          className="ecg-beat-line"
        />
        {/* Glow tracer */}
        <path
          d={d}
          fill="none"
          stroke="#bef264"
          strokeWidth="3"
          className="ecg-beat-glow"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4d7c0f" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#a3e635" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#bef264" stopOpacity="1" />
            <stop offset="60%" stopColor="#a3e635" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
