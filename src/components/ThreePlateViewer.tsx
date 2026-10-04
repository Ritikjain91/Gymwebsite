'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers, Sparkles } from 'lucide-react';

interface ThreePlateViewerProps {
  initialEdition?: 'prime' | 'luxury' | 'titanium';
}

export default function ThreePlateViewer({ initialEdition = 'prime' }: ThreePlateViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [edition, setEdition] = useState<'prime' | 'luxury' | 'titanium'>(initialEdition);
  const [isExploded, setIsExploded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const explodedRef = useRef(false);
  explodedRef.current = isExploded;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const size = Math.min(container.clientWidth || 420, 460);

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - perfect 1:1 square aspect ratio
    const camera = new THREE.PerspectiveCamera(40, 1.0, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xffe6a3, 3.8);
    goldKeyLight.position.set(3, 4, 3);
    scene.add(goldKeyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const blueBackLight = new THREE.DirectionalLight(0x60a5fa, 1.1);
    blueBackLight.position.set(0, -4, 2);
    scene.add(blueBackLight);

    // 5. Generate Texture for the Plate Face (Knurling, Text & Logos)
    function createPlateTexture(mode: 'prime' | 'luxury' | 'titanium') {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Background base
      if (mode === 'luxury') {
        ctx.fillStyle = '#111113';
      } else if (mode === 'titanium') {
        ctx.fillStyle = '#2d3139';
      } else {
        ctx.fillStyle = '#a88428';
      }
      ctx.fillRect(0, 0, 1024, 1024);

      // Radial gradient sheen
      const radGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 500);
      if (mode === 'luxury') {
        radGrad.addColorStop(0, '#222226');
        radGrad.addColorStop(0.65, '#121214');
        radGrad.addColorStop(0.85, '#2b2a24');
        radGrad.addColorStop(1, '#0e0e10');
      } else if (mode === 'titanium') {
        radGrad.addColorStop(0, '#64748b');
        radGrad.addColorStop(0.5, '#334155');
        radGrad.addColorStop(0.85, '#1e293b');
        radGrad.addColorStop(1, '#0f172a');
      } else {
        radGrad.addColorStop(0, '#f5deb3');
        radGrad.addColorStop(0.3, '#d4af37');
        radGrad.addColorStop(0.7, '#a67c1e');
        radGrad.addColorStop(0.88, '#ffd700');
        radGrad.addColorStop(1, '#664d12');
      }
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Concentric machine lathe grooves
      ctx.strokeStyle =
        mode === 'luxury'
          ? 'rgba(212, 175, 55, 0.18)'
          : mode === 'titanium'
          ? 'rgba(255, 255, 255, 0.16)'
          : 'rgba(255, 255, 255, 0.24)';
      ctx.lineWidth = 2;
      for (let r = 160; r < 480; r += 20) {
        ctx.beginPath();
        ctx.arc(512, 512, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Hub outer rim ring
      ctx.strokeStyle = mode === 'luxury' ? '#d4af37' : mode === 'titanium' ? '#94a3b8' : '#fff3c4';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(512, 512, 455, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(512, 512, 220, 0, Math.PI * 2);
      ctx.stroke();

      // Curved Text Around Plate Rim
      ctx.save();
      ctx.translate(512, 512);
      ctx.fillStyle = mode === 'luxury' ? '#ecd396' : mode === 'titanium' ? '#f1f5f9' : '#141416';
      ctx.font = 'bold 46px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const topText =
        mode === 'luxury'
          ? 'RAW FIT LUXURY • FLAGSHIP CLUB'
          : mode === 'titanium'
          ? 'RAW FIT TITANIUM • PRECISION POD'
          : 'RAW FIT PRIME • PERFORMANCE GYM';
      const bottomText =
        mode === 'luxury'
          ? 'OLYMPIC CALIBRATED • 50 KG'
          : mode === 'titanium'
          ? 'OLYMPIC CALIBRATED • 10 KG'
          : 'OLYMPIC CALIBRATED • 25 KG';

      // Draw top arc text
      const topChars = topText.split('');
      const topArc = Math.PI * 0.65;
      const topStart = -Math.PI / 2 - topArc / 2;
      topChars.forEach((char, i) => {
        const angle = topStart + (i / (topChars.length - 1)) * topArc;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(0, -400);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });

      // Draw bottom arc text
      const bottomChars = bottomText.split('');
      const btmArc = Math.PI * 0.55;
      const btmStart = Math.PI / 2 - btmArc / 2;
      bottomChars.forEach((char, i) => {
        const angle = btmStart + (i / (bottomChars.length - 1)) * btmArc;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(0, 400);
        ctx.rotate(Math.PI);
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });

      // Center Ring Stamp
      ctx.font = '900 68px system-ui, sans-serif';
      ctx.fillStyle = mode === 'luxury' ? '#d4af37' : mode === 'titanium' ? '#38bdf8' : '#0a0a0a';
      ctx.fillText('RAW FIT', 0, -50);
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.fillStyle = mode === 'luxury' ? '#f5f5f7' : mode === 'titanium' ? '#cbd5e1' : '#222';
      ctx.fillText('LIFE IN PROGRESS', 0, 0);
      ctx.font = '800 52px system-ui, sans-serif';
      ctx.fillStyle = mode === 'luxury' ? '#ff7844' : mode === 'titanium' ? '#38bdf8' : '#991b1b';
      ctx.fillText(mode === 'luxury' ? '50 KG' : mode === 'titanium' ? '10 KG' : '25 KG', 0, 56);

      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    }

    // 6. 3D Model Construction (Procedural Olympic Plate with 3 Hand Grips)
    const plateGroup = new THREE.Group();

    const outerRadius = 1.6;
    const innerHoleRadius = 0.22;
    const plateThickness = edition === 'luxury' ? 0.2 : 0.16;

    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    // Center Bar Hole
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, innerHoleRadius, 0, Math.PI * 2, true);
    shape.holes.push(centerHole);

    // 3 Ergonomic Grip Slots (120 deg apart)
    const gripRadiusInner = 0.85;
    const gripRadiusOuter = 1.25;
    const slotAngleSpan = 0.55;

    for (let i = 0; i < 3; i++) {
      const centerAngle = (i * (Math.PI * 2)) / 3 + Math.PI / 2;
      const a0 = centerAngle - slotAngleSpan / 2;
      const a1 = centerAngle + slotAngleSpan / 2;

      const slot = new THREE.Path();
      slot.absarc(0, 0, gripRadiusOuter, a0, a1, false);
      slot.absarc(0, 0, gripRadiusInner, a1, a0, true);
      shape.holes.push(slot);
    }

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: plateThickness,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 48,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Map UVs for circular planar projection
    const pos = geometry.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      uvs[i * 2] = x / (outerRadius * 2) + 0.5;
      uvs[i * 2 + 1] = y / (outerRadius * 2) + 0.5;
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const plateTexture = createPlateTexture(edition);

    const plateMaterial = new THREE.MeshStandardMaterial({
      map: plateTexture,
      metalness: edition === 'luxury' ? 0.85 : edition === 'titanium' ? 0.95 : 0.95,
      roughness: edition === 'luxury' ? 0.28 : edition === 'titanium' ? 0.2 : 0.22,
      envMapIntensity: 2.0,
    });

    const plateMesh = new THREE.Mesh(geometry, plateMaterial);
    plateGroup.add(plateMesh);

    // Center stainless steel insert ring
    const ringGeo = new THREE.CylinderGeometry(0.32, 0.32, plateThickness + 0.12, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.98,
      roughness: 0.1,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    plateGroup.add(ringMesh);

    // Outer edge protective rubber bumper
    const bumperGeo = new THREE.TorusGeometry(outerRadius + 0.02, 0.038, 16, 64);
    const bumperMat = new THREE.MeshStandardMaterial({
      color: edition === 'luxury' ? 0xd4af37 : edition === 'titanium' ? 0x64748b : 0x111111,
      metalness: edition === 'luxury' ? 0.8 : 0.4,
      roughness: 0.35,
    });
    const bumperMesh = new THREE.Mesh(bumperGeo, bumperMat);
    plateGroup.add(bumperMesh);

    // Floating micro-embers particle ring around the plate
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.8 + Math.random() * 0.9;
      particlePositions[i] = Math.cos(angle) * dist;
      particlePositions[i + 1] = Math.sin(angle) * dist;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: edition === 'luxury' ? 0xd4af37 : edition === 'titanium' ? 0x38bdf8 : 0xffd700,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const embers = new THREE.Points(particleGeo, particleMat);
    scene.add(embers);

    // Initial slight showcase tilt (faces user, slight 3D perspective)
    plateGroup.rotation.x = 0.08;
    plateGroup.rotation.y = -0.22;
    scene.add(plateGroup);

    // 7. Interactive Drag & Inertia Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let baseRotationX = 0.08;
    let baseRotationY = -0.22;
    let targetRotationX = 0.08;
    let targetRotationY = -0.22;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      baseRotationY += deltaX * 0.008;
      baseRotationX += deltaY * 0.008;
      baseRotationX = Math.max(-0.8, Math.min(0.8, baseRotationX));

      targetRotationY = baseRotationY;
      targetRotationX = baseRotationX;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      baseRotationY += deltaX * 0.009;
      baseRotationX += deltaY * 0.009;
      baseRotationX = Math.max(-0.8, Math.min(0.8, baseRotationX));

      targetRotationY = baseRotationY;
      targetRotationX = baseRotationX;

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 8. Animation loop with smooth explode animation
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0016;

      // Gentle floating suspension bobbing
      plateGroup.position.y = Math.sin(time) * 0.06;

      if (!isDragging) {
        // Natural breathing sway around base orientation
        const swayY = Math.sin(time * 0.7) * 0.06;
        const swayX = Math.cos(time * 0.5) * 0.03;
        targetRotationY = baseRotationY + swayY;
        targetRotationX = baseRotationX + swayX;
      }

      plateGroup.rotation.y += (targetRotationY - plateGroup.rotation.y) * 0.08;
      plateGroup.rotation.x += (targetRotationX - plateGroup.rotation.x) * 0.08;

      // Exploded View smooth translation along Z axis
      const targetBumperZ = explodedRef.current ? 0.75 : 0;
      const targetRingZ = explodedRef.current ? -0.85 : 0;
      bumperMesh.position.z += (targetBumperZ - bumperMesh.position.z) * 0.1;
      ringMesh.position.z += (targetRingZ - ringMesh.position.z) * 0.1;

      // Orbit particles around plate
      embers.rotation.z = time * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // 9. ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newSize = Math.min(entry.contentRect.width || 380, 400);
        camera.aspect = 1.0;
        camera.updateProjectionMatrix();
        renderer.setSize(newSize, newSize);
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      geometry.dispose();
      plateMaterial.dispose();
      plateTexture.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      bumperGeo.dispose();
      bumperMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [edition]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none mx-auto">
      {/* 3D Stage Canvas Container */}
      <div
        ref={mountRef}
        className="relative w-full aspect-square max-w-[360px] sm:max-w-[380px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden mx-auto"
        title="Click and drag to rotate 3D plate"
      >
        {/* Ambient Glow behind plate */}
        <div
          className="absolute inset-8 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background:
              edition === 'luxury'
                ? 'radial-gradient(circle, rgba(212,175,55,0.45) 0%, rgba(255,107,53,0.15) 50%, transparent 70%)'
                : edition === 'titanium'
                ? 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(30,58,138,0.2) 60%, transparent 70%)'
                : 'radial-gradient(circle, rgba(236,211,150,0.5) 0%, rgba(212,175,55,0.2) 60%, transparent 70%)',
          }}
        />

        {/* Exploded View Labels Overlay */}
        {isExploded && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 z-10 animate-in fade-in duration-300">
            <span className="self-end px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-[10px] font-black uppercase text-gold-gradient">
              ▲ Polyurethane Protective Bumper
            </span>
            <span className="self-start px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-[10px] font-black uppercase text-gold-gradient">
              ▼ CNC Stainless Hub Sleeve (50.4mm)
            </span>
          </div>
        )}
      </div>

      {/* Floating Interactive Badge, Explode & Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-4 z-10 w-full mx-auto">
        <div className="flex items-center gap-1 p-1 rounded-full glass-panel border border-[var(--border-gold)]">
          <button
            onClick={() => setEdition('prime')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
              edition === 'prime'
                ? 'bg-[var(--gold-primary)] text-black shadow-md font-extrabold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Prime 25KG
          </button>
          <button
            onClick={() => setEdition('luxury')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
              edition === 'luxury'
                ? 'bg-[var(--gold-primary)] text-black shadow-md font-extrabold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Luxury 50KG
          </button>
          <button
            onClick={() => setEdition('titanium')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
              edition === 'titanium'
                ? 'bg-[var(--gold-primary)] text-black shadow-md font-extrabold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Titanium 10KG
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Explode View Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              isExploded
                ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-md'
                : 'glass-panel text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-gold)]'
            }`}
            title="Toggle 3D Exploded View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Joined' : 'Deconstruct'}</span>
          </button>

          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-medium whitespace-nowrap">
            <RotateCw className="w-3 h-3 animate-spin text-[var(--gold-primary)]" style={{ animationDuration: '6s' }} />
            <span>Drag 360°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
