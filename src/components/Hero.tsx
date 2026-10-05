'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
import ThreePlateViewer from './ThreePlateViewer';
import ThreeDumbbellViewer from './ThreeDumbbellViewer';
import ThreeBackgroundMesh from './ThreeBackgroundMesh';
import {
  ArrowRight,
  Flame,
  Star,
  ShieldCheck,
  Sparkles,
  Trophy,
  Dumbbell,
  Disc,
  Zap,
  Activity,
  Heart,
  Play,
  Pause,
  Repeat,
  Gauge,
  SlidersHorizontal,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const { openModal } = useTheme();
  const [activeModel, setActiveModel] = useState<'dumbbell' | 'plate'>('plate');
  const [heroMode, setHeroMode] = useState<'athlete' | 'lab'>('athlete');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Exercise & Rep Engine State
  const [isAutoExercise, setIsAutoExercise] = useState(true);
  const [curlProgress, setCurlProgress] = useState(0); // 0 = down, 1 = curled up
  const [exercisePhase, setExercisePhase] = useState<'ECCENTRIC' | 'CONCENTRIC' | 'PEAK SQUEEZE'>('ECCENTRIC');
  const [repCount, setRepCount] = useState(8);
  const [powerWatts, setPowerWatts] = useState(380);
  const [heartRate, setHeartRate] = useState(148);
  const [manualDrag, setManualDrag] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth multi-plane mouse parallax
  useEffect(() => {
    let animFrame: number;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 28;
      targetY = (e.clientY / innerHeight - 0.5) * 28;
    };

    const updateParallax = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.08,
        y: prev.y + (targetY - prev.y) * 0.08,
      }));
      animFrame = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrame = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Exercise Animation Rep Loop (Bicep Dumbbell Curl)
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    let repCounted = false;

    const repDuration = 3400; // 3.4 seconds per repetition (1.4s up, 0.4s hold, 1.6s down)

    const loop = (now: number) => {
      if (isAutoExercise && !manualDrag) {
        const elapsed = (now - startTime) % repDuration;
        const ratio = elapsed / repDuration;

        let progress = 0;
        let phase: 'ECCENTRIC' | 'CONCENTRIC' | 'PEAK SQUEEZE' = 'ECCENTRIC';

        if (ratio < 0.42) {
          // Concentric lifting phase (dumbbells rising up)
          const t = ratio / 0.42;
          progress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          phase = 'CONCENTRIC';
          repCounted = false;
        } else if (ratio < 0.56) {
          // Peak bicep contraction squeeze at top
          progress = 1;
          phase = 'PEAK SQUEEZE';
          if (!repCounted) {
            setRepCount((r) => r + 1);
            repCounted = true;
          }
        } else {
          // Controlled eccentric lowering phase (dumbbells lowering down)
          const t = (ratio - 0.56) / 0.44;
          const easeDown = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          progress = 1 - easeDown;
          phase = 'ECCENTRIC';
        }

        setCurlProgress(progress);
        setExercisePhase(phase);
        setPowerWatts(Math.round(310 + progress * 145));
        setHeartRate(Math.round(144 + progress * 16));
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoExercise, manualDrag]);

  // Trigger a single heavy rep on demand
  const triggerManualRep = () => {
    setIsAutoExercise(false);
    setManualDrag(true);
    let start = performance.now();
    const duration = 1600;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.sin((elapsed / duration) * Math.PI);
      if (elapsed < duration) {
        setCurlProgress(progress);
        setExercisePhase(progress > 0.85 ? 'PEAK SQUEEZE' : progress > 0.3 ? 'CONCENTRIC' : 'ECCENTRIC');
        setPowerWatts(Math.round(340 + progress * 160));
        requestAnimationFrame(step);
      } else {
        setCurlProgress(0);
        setRepCount((r) => r + 1);
        setManualDrag(false);
        setIsAutoExercise(true);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex flex-col justify-between pt-8 sm:pt-14 pb-0 overflow-hidden border-b border-[var(--border-subtle)] bg-[#050608] select-none"
    >
      {/* 01. Dynamic Multi-Layer Animated Athlete & Spotlights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* ATHLETE EXERCISE LAYER 1: Starting Pose (Dumbbells Down) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_20%] sm:bg-[58%_20%] lg:bg-[64%_25%] filter contrast-125 saturate-110 brightness-105 will-change-transform transition-opacity duration-150 ease-out"
          style={{
            backgroundImage: `url('/fitfab-hero-athlete.jpg')`,
            opacity: 0.88 * (1 - curlProgress * 0.95),
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 + curlProgress * 12}px, 0) scale(${1.02 + curlProgress * 0.015})`,
          }}
        />

        {/* ATHLETE EXERCISE LAYER 2: Concentric Curled Pose (Dumbbells Lifted Up, Biceps Flexed) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_20%] sm:bg-[58%_20%] lg:bg-[64%_25%] filter contrast-125 saturate-110 brightness-105 will-change-transform transition-opacity duration-150 ease-out"
          style={{
            backgroundImage: `url('/fitfab-athlete-curled.jpg')`,
            opacity: 0.92 * curlProgress,
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 - (1 - curlProgress) * 8}px, 0) scale(${1.03 - (1 - curlProgress) * 0.015})`,
          }}
        />

        {/* Peak Contraction Lime Flash Halo on the Bicep Contraction */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_64%_38%,rgba(190,242,100,0.35)_0%,rgba(163,230,53,0.15)_35%,transparent_70%)] transition-opacity duration-200 z-1 pointer-events-none"
          style={{ opacity: exercisePhase === 'PEAK SQUEEZE' ? 0.95 : curlProgress * 0.5 }}
        />

        {/* Cinematic Vignette & Deep Black Left Mask to make heading 100% pop while keeping athlete vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/75 via-42% to-transparent z-1 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-[#050608]/60 z-1 lg:hidden" />
        
        {/* Ambient Film Grain Noise */}
        <div className="absolute inset-0 noise-overlay pointer-events-none z-1" />

        {/* High-Voltage Volt Lime Floating Ambient Orbs */}
        <div
          className="absolute -top-36 -left-36 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(163,230,53,0.22),transparent_70%)] pointer-events-none blur-3xl animate-pulse-volt z-1"
          style={{ transform: `translate3d(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px, 0)` }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(190,242,100,0.16),transparent_70%)] pointer-events-none blur-3xl z-1"
          style={{ transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)` }}
        />

        {/* Subtle Precision Calibrated Gym Energy Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] z-1"
          style={{
            backgroundImage: `radial-gradient(var(--volt-bright) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Interactive 3D Background Wave Mesh */}
        <div className="relative z-1">
          <ThreeBackgroundMesh />
        </div>
      </div>

      {/* 02. Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-6 lg:py-7 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & High-Contrast Ultra-Premium Typography */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5">
            
            {/* Top Live Status Pill with Electric Glow & Pulse */}
            <ScrollReveal direction="down" delay={50}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-[var(--border-volt)] text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(163,230,53,0.2)] animate-float">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--volt-primary)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--volt-bright)]" />
                </span>
                <span className="flex items-center gap-1.5 font-extrabold text-[var(--volt-bright)]">
                  <Zap className="w-3.5 h-3.5 fill-[var(--volt-primary)] text-[var(--volt-primary)] animate-pulse" />
                  FIT&amp;FAB • HUMAN PERFORMANCE SANCTUARY
                </span>
                <span className="text-[10px] text-gray-400 font-mono hidden sm:inline border-l border-white/20 pl-2">
                  ATHLETIC FORCE ACTIVE
                </span>
              </div>
            </ScrollReveal>

            {/* ULTRA-PREMIUM ANIMATED HEADING */}
            <ScrollReveal direction="up" delay={120}>
              <div className="group relative cursor-default">
                
                {/* High-Tech Athletic Corner Frame Coordinates */}
                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-[var(--volt-bright)] tracking-widest uppercase mb-1">
                  <span>// 01_HUMAN_FORCE</span>
                  <span className="h-px w-10 bg-[var(--volt-primary)]/40 inline-block" />
                  <span className="text-gray-400">OLYMPIC SANCTUARY</span>
                </div>

                {/* The Headline using Montserrat 900 Ultra-Bold with Kinetic Word Hover */}
                <h1
                  className="text-4xl min-[420px]:text-5xl sm:text-7xl lg:text-7.5xl xl:text-8.5xl font-black uppercase text-white font-['Montserrat',sans-serif] tracking-[-0.035em] leading-[0.98] drop-shadow-[0_10px_35px_rgba(0,0,0,1)] transition-all duration-300"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6">
                    <span
                      onMouseEnter={() => setHoveredWord('FEELING')}
                      onMouseLeave={() => setHoveredWord(null)}
                      className={`inline-block transition-all duration-300 transform cursor-pointer ${
                        hoveredWord === 'FEELING'
                          ? 'text-[var(--volt-bright)] scale-[1.03] translate-x-1 -translate-y-1 drop-shadow-[0_0_25px_rgba(163,230,53,0.8)]'
                          : 'hover:text-gray-100'
                      }`}
                    >
                      FEELING
                    </span>
                    <span
                      onMouseEnter={() => setHoveredWord('GOOD')}
                      onMouseLeave={() => setHoveredWord(null)}
                      className={`inline-block transition-all duration-300 transform cursor-pointer ${
                        hoveredWord === 'GOOD'
                          ? 'text-[var(--volt-bright)] scale-[1.03] translate-x-1 -translate-y-1 drop-shadow-[0_0_25px_rgba(163,230,53,0.8)]'
                          : 'hover:text-gray-100'
                      }`}
                    >
                      GOOD
                    </span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-6 mt-1 sm:mt-2.5">
                    <span
                      onMouseEnter={() => setHoveredWord('BEING')}
                      onMouseLeave={() => setHoveredWord(null)}
                      className={`inline-block transition-all duration-300 transform cursor-pointer ${
                        hoveredWord === 'BEING'
                          ? 'text-[var(--volt-bright)] scale-[1.03] translate-x-1 -translate-y-1 drop-shadow-[0_0_25px_rgba(163,230,53,0.8)]'
                          : 'hover:text-gray-100'
                      }`}
                    >
                      BEING
                    </span>
                    <span
                      onMouseEnter={() => setHoveredWord('FIT')}
                      onMouseLeave={() => setHoveredWord(null)}
                      className={`inline-block transition-all duration-300 transform cursor-pointer ${
                        hoveredWord === 'FIT'
                          ? 'text-[var(--volt-bright)] scale-[1.04] translate-x-1 -translate-y-1 drop-shadow-[0_0_35px_rgba(190,242,100,0.95)]'
                          : 'text-white hover:text-[var(--volt-bright)]'
                      }`}
                    >
                      FIT
                    </span>
                  </div>
                </h1>

                {/* Animated Lime Biometric Energy Beam & Underline */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-24 sm:w-36 h-1.5 rounded-full bg-gradient-to-r from-[var(--volt-bright)] via-[var(--volt-primary)] to-transparent shadow-[0_0_20px_rgba(163,230,53,0.9)] animate-pulse-volt" />
                  <div className="w-2 h-2 rounded-full bg-[var(--volt-bright)] animate-ping" />
                  <span className="text-[10px] font-mono text-[var(--volt-bright)] uppercase tracking-widest font-black hidden sm:inline">
                    100% PEAK INTENSITY
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Tagline matching reference image with highlighted lime accent */}
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-extrabold max-w-2xl leading-relaxed tracking-wide uppercase font-['IBM_Plex_Sans',sans-serif]">
                BEING FIT IS{' '}
                <span className="text-[var(--volt-bright)] font-black underline decoration-[var(--volt-primary)]/70 underline-offset-4 drop-shadow-[0_0_12px_rgba(163,230,53,0.4)]">
                  THE NEW SEXY IN THIS CENTURY
                </span>
                , AT FIT&amp;FAB, WE OFFER YOU THE BEST &amp; EXPERIENCED TRAINERS.
              </p>
            </ScrollReveal>

            {/* High-Converting Action CTAs: Signature Neon Lime Pill Button "JOIN THE FORCE" */}
            <ScrollReveal direction="up" delay={280} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
                {/* The Signature "JOIN THE FORCE" Pill Button */}
                <button
                  onClick={() => openModal('tour')}
                  className="btn-volt text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-10 shadow-[0_0_30px_rgba(163,230,53,0.55)] flex items-center justify-center gap-3 cursor-pointer font-black group tracking-wider hover:shadow-[0_0_45px_rgba(190,242,100,0.85)] active:scale-95 transition-all duration-300 w-full sm:w-auto"
                >
                  <Flame className="w-5 h-5 text-black group-hover:scale-125 transition-transform" />
                  <span>JOIN THE FORCE</span>
                  <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-2 transition-transform" />
                </button>

                {/* 3D Equipment Lab Button */}
                <a
                  href="#3d-showroom"
                  className="btn-outline text-xs sm:text-sm py-3 sm:py-3.5 px-6 flex items-center justify-center gap-2.5 cursor-pointer font-extrabold hover:border-[var(--volt-bright)] hover:text-[var(--volt-bright)] hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all w-full sm:w-auto"
                >
                  <Activity className="w-4 h-4 text-[var(--volt-bright)] animate-pulse" />
                  <span>INTERACTIVE 3D LAB</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Proof Indicators & Biometrics */}
            <ScrollReveal direction="up" delay={360}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[var(--volt-bright)]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[var(--volt-primary)] text-[var(--volt-primary)]" />
                    ))}
                  </div>
                  <span className="font-black text-white">4.9/5</span>
                  <span className="text-gray-400 font-semibold">(1,850+ Verified Athletes)</span>
                </div>
                <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--volt-bright)]" />
                  <span className="text-gray-300 font-semibold">Zero Joining Fee</span>
                </div>
                <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--volt-primary)] animate-ping" />
                  <span className="text-gray-300 font-semibold">Free Coach Session</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Movable Athlete Exercise Command Console & 3D Gym Stage */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative w-full">
            
            {/* View Mode Toggle: Movable Athlete Exercise vs 3D Calibrated Lab */}
            <div className="w-full max-w-[440px] mb-3 flex items-center justify-between p-1.5 rounded-full bg-black/85 backdrop-blur-2xl border border-[var(--border-volt)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-30">
              <div className="flex items-center gap-1.5 w-full">
                <button
                  onClick={() => setHeroMode('athlete')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                    heroMode === 'athlete'
                      ? 'bg-[var(--volt-bright)] text-black shadow-[0_0_18px_rgba(190,242,100,0.6)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Dumbbell className="w-3.5 h-3.5" />
                  <span>🏋️ Movable Athlete</span>
                </button>
                <button
                  onClick={() => setHeroMode('lab')}
                  className={`flex-1 py-2 px-2.5 sm:px-3 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                    heroMode === 'lab'
                      ? 'bg-[var(--volt-bright)] text-black shadow-[0_0_18px_rgba(190,242,100,0.6)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>⚡ 3D Lab</span>
                </button>
              </div>
            </div>

            {/* MODE 1: MOVABLE ATHLETE EXERCISE CONTROLLER */}
            {heroMode === 'athlete' && (
              <ScrollReveal direction="left" delay={150} className="w-full">
                <div
                  className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0 flex flex-col p-3.5 sm:p-5 rounded-3xl bg-[#090b10]/85 backdrop-blur-2xl border border-[var(--border-volt)] shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-300 z-20"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x * 0.1}deg) rotateX(${-mousePos.y * 0.1}deg)`,
                  }}
                >
                  {/* Subtle High-Voltage Lime Ambient Glow */}
                  <div className="absolute -inset-2 rounded-3xl bg-[var(--volt-primary)]/10 blur-xl pointer-events-none -z-1" />

                  {/* Header: Exercise Status & Target Muscle */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--volt-primary)] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[var(--volt-bright)]" />
                      </span>
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase font-mono font-bold tracking-wider block">
                          REAL-TIME BIOMECHANICS
                        </span>
                        <span className="text-[11px] sm:text-xs font-black text-white uppercase tracking-wider">
                          Dumbbell Bicep Curls
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-wider border transition-all ${
                        exercisePhase === 'PEAK SQUEEZE'
                          ? 'bg-[var(--volt-bright)] text-black border-[var(--volt-bright)] shadow-[0_0_12px_rgba(190,242,100,0.6)] animate-pulse'
                          : exercisePhase === 'CONCENTRIC'
                          ? 'bg-black/60 text-[var(--volt-bright)] border-[var(--volt-primary)]'
                          : 'bg-black/60 text-gray-300 border-white/20'
                      }`}
                    >
                      [{exercisePhase}]
                    </span>
                  </div>

                  {/* Rep Metrics & Telemetry Grid */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-1.5 mb-2.5 bg-black/50 rounded-2xl p-2 sm:p-2.5 border border-white/5">
                    <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl bg-white/[0.02]">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-mono">Total Reps</span>
                      <div className="flex items-baseline gap-0.5 sm:gap-1 mt-0.5">
                        <span className="text-xl sm:text-2xl font-black text-[var(--volt-bright)] font-mono leading-none">
                          {repCount}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">/15</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl bg-white/[0.02]">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-mono">Bicep Flex</span>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                          {Math.round(curlProgress * 100)}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[var(--volt-bright)] font-bold">%</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl bg-white/[0.02]">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-mono">Power</span>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                          {powerWatts}
                        </span>
                        <span className="text-[9px] text-[var(--volt-primary)] font-bold">W</span>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE DRAGGABLE MOTION SLIDER */}
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-black/70 border border-[var(--border-volt)] mb-2.5">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                      <span className="flex items-center gap-1 text-gray-300">
                        <SlidersHorizontal className="w-3 h-3 text-[var(--volt-bright)]" />
                        <span>Move Dumbbell:</span>
                      </span>
                      <span className="text-[var(--volt-bright)] font-bold">
                        {curlProgress > 0.85 ? 'Peak Squeeze' : curlProgress > 0.2 ? 'Lifting' : 'Extended Down'}
                      </span>
                    </div>

                    {/* Range Track */}
                    <div className="relative flex items-center py-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={Math.round(curlProgress * 100)}
                        onChange={(e) => {
                          setIsAutoExercise(false);
                          setManualDrag(true);
                          const val = Number(e.target.value) / 100;
                          setCurlProgress(val);
                          setExercisePhase(val > 0.85 ? 'PEAK SQUEEZE' : val > 0.25 ? 'CONCENTRIC' : 'ECCENTRIC');
                          setPowerWatts(Math.round(310 + val * 155));
                          setHeartRate(Math.round(144 + val * 18));
                        }}
                        onMouseUp={() => {
                          if (curlProgress >= 0.85) {
                            setRepCount((r) => r + 1);
                          }
                          setManualDrag(false);
                        }}
                        onTouchEnd={() => {
                          if (curlProgress >= 0.85) {
                            setRepCount((r) => r + 1);
                          }
                          setManualDrag(false);
                        }}
                        className="w-full h-2 rounded-lg bg-gray-800 appearance-none cursor-pointer accent-[var(--volt-bright)] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono uppercase text-gray-500 mt-0.5">
                      <span>◄ Down (0%)</span>
                      <span className="text-[var(--volt-primary)] font-bold">Active Motion</span>
                      <span>Curled (100%) ►</span>
                    </div>
                  </div>

                  {/* Action Buttons: 1-Click Power Rep & Auto Pump Toggle */}
                  <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5">
                    <button
                      onClick={triggerManualRep}
                      className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-full bg-[var(--volt-primary)] text-black font-black text-[11px] sm:text-xs uppercase tracking-wider hover:bg-[var(--volt-bright)] active:scale-95 transition-all shadow-[0_0_15px_rgba(163,230,53,0.5)] cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      <span>⚡ Power Rep</span>
                    </button>

                    <button
                      onClick={() => setIsAutoExercise(!isAutoExercise)}
                      className={`py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-full border text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                        isAutoExercise
                          ? 'bg-black/60 border-[var(--border-volt)] text-[var(--volt-bright)] shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                          : 'glass-panel border-white/20 text-gray-400 hover:text-white'
                      }`}
                      title={isAutoExercise ? 'Pause Auto Exercise' : 'Resume Auto Exercise'}
                    >
                      {isAutoExercise ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isAutoExercise ? 'Auto' : 'Paused'}</span>
                    </button>

                    <button
                      onClick={() => setRepCount(0)}
                      className="p-2 sm:p-2.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                      title="Reset Rep Counter"
                    >
                      <Repeat className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Muscle Engagement Tags */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-[var(--volt-bright)]" />
                      <span className="font-bold text-gray-300">Target:</span>
                      <span>Biceps Brachii, Brachialis</span>
                    </div>
                    <span className="font-mono text-[var(--volt-bright)] font-bold">100% Tension</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* MODE 2: 3D HARDWARE LAB (PLATE & DUMBBELL VIEWER) */}
            {heroMode === 'lab' && (
              <ScrollReveal direction="left" delay={150}>
                <div
                  className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0 flex flex-col items-center justify-center p-3.5 rounded-3xl bg-[#090b10]/85 backdrop-blur-2xl border border-[var(--border-volt)] shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-transform duration-500 z-20"
                  style={{
                    transform: `perspective(1000px) rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg)`,
                  }}
                >
                  {/* 3D Model Quick Switcher Tab (Plate vs Dumbbell) */}
                  <div className="w-full flex items-center justify-between mb-2 pb-2 sm:mb-2.5 sm:pb-2.5 border-b border-[var(--border-subtle)] text-xs">
                    <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-black/60 border border-white/10">
                      <button
                        onClick={() => setActiveModel('plate')}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                          activeModel === 'plate'
                            ? 'bg-[var(--volt-primary)] text-black shadow-[0_0_15px_rgba(163,230,53,0.5)]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Disc className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>45LB Plate</span>
                      </button>
                      <button
                        onClick={() => setActiveModel('dumbbell')}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                          activeModel === 'dumbbell'
                            ? 'bg-[var(--volt-primary)] text-black shadow-[0_0_15px_rgba(163,230,53,0.5)]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Dumbbell className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>32KG Hex</span>
                      </button>
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-mono text-[var(--volt-bright)] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--volt-primary)] animate-ping" />
                      3D ACTIVE
                    </span>
                  </div>

                  {/* High-Voltage Lime Halo with Breathing Pulse */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[var(--volt-primary)]/25 via-transparent to-[var(--volt-bright)]/15 blur-3xl pointer-events-none scale-105 animate-pulse-volt" />

                  {/* 3D Model Component */}
                  <div className="relative z-10 w-full min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
                    {activeModel === 'plate' ? (
                      <ThreePlateViewer initialEdition="luxury" />
                    ) : (
                      <ThreeDumbbellViewer initialWeight={32} />
                    )}
                  </div>

                  {/* Movable hint */}
                  <div className="mt-2 text-center text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-bold flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--volt-primary)] animate-pulse shrink-0" />
                    <span>Drag 360° • Click Explode &amp; Rep Lift</span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Movable Gym Parallax Floating Badges with Live Micro-Animations */}
            <div
              className="absolute -bottom-5 -left-8 z-30 pointer-events-none hidden xl:flex flex-col gap-2 transition-transform duration-200"
              style={{
                transform: `translate3d(${-mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px, 0)`,
              }}
            >
              <div className="px-4 py-2 rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/20 text-[11px] font-black uppercase text-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                <span>HEART RATE {heartRate} BPM</span>
                <span className="text-[10px] font-mono text-[var(--volt-bright)]">PEAK</span>
              </div>
            </div>

            {/* Floating Caloric Shred Badge */}
            <div
              className="absolute -bottom-6 -right-2 z-30 pointer-events-none hidden xl:flex flex-col gap-2 transition-transform duration-200"
              style={{
                transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
              }}
            >
              <div className="px-4 py-2 rounded-2xl bg-black/85 backdrop-blur-2xl border border-[var(--border-volt)] text-[11px] font-black uppercase text-[var(--volt-bright)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[var(--volt-bright)] animate-bounce" />
                <span>{powerWatts}W POWER OUTPUT</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 03. Infinite Graphic Marquee Strip with FIT&FAB Volt Highlights */}
      <div className="relative z-10 w-full overflow-hidden border-t border-[var(--border-subtle)] bg-[#07090d] py-3.5">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-4 text-xs sm:text-sm font-black uppercase tracking-widest text-gray-300">
              <span className="text-white">FIT&amp;FAB HUMAN PERFORMANCE</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span className="text-[var(--volt-bright)]">FEELING GOOD BEING FIT</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span>1-ON-1 BESPOKE COACHING</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span>BIOMECHANICAL ELEIKO IRON</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span className="text-[var(--volt-bright)]">4°C CRYO CONTRAST SUITE</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span>RAPID METABOLIC FAT SHRED</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span>HYPERTROPHY ARCHITECTURE</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
              <span>OLYMPIC CALIBRATED WEIGHTS</span>
              <span className="text-[var(--volt-primary)] font-black">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
