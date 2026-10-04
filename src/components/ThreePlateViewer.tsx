'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw } from 'lucide-react';

interface ThreePlateViewerProps {
  initialEdition?: 'prime' | 'luxury';
}

export default function ThreePlateViewer({ initialEdition = 'prime' }: ThreePlateViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [edition, setEdition] = useState<'prime' | 'luxury'>(initialEdition);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Use square dimension to guarantee non-distorted aspect ratio
    const size = Math.min(container.clientWidth || 420, 460);

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - perfect 1:1 square aspect ratio
    const camera = new THREE.PerspectiveCamera(40, 1.0, 0.1, 100);
    camera.position.set(0, 0, 5.2);

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

    // Direct absolute fill styles to avoid layout shift
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xffe6a3, 3.6);
    goldKeyLight.position.set(3, 4, 3);
    scene.add(goldKeyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.6);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const blueBackLight = new THREE.DirectionalLight(0x60a5fa, 0.9);
    blueBackLight.position.set(0, -4, 2);
    scene.add(blueBackLight);

    // 5. Generate Texture for the Plate Face (Knurling, Text & Logos)
    function createPlateTexture(isLuxury: boolean) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Background base
      ctx.fillStyle = isLuxury ? '#111113' : '#a88428';
      ctx.fillRect(0, 0, 1024, 1024);

      // Radial gradient sheen
      const radGrad = ctx.createRadialGradient(512, 512, 100, 512, 512, 500);
      if (isLuxury) {
        radGrad.addColorStop(0, '#222226');
        radGrad.addColorStop(0.65, '#121214');
        radGrad.addColorStop(0.85, '#2b2a24');
        radGrad.addColorStop(1, '#0e0e10');
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
      ctx.strokeStyle = isLuxury ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 2;
      for (let r = 160; r < 480; r += 20) {
        ctx.beginPath();
        ctx.arc(512, 512, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Hub outer rim ring
      ctx.strokeStyle = isLuxury ? '#d4af37' : '#fff3c4';
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
      ctx.fillStyle = isLuxury ? '#ecd396' : '#141416';
      ctx.font = 'bold 46px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const topText = isLuxury ? 'RAW FIT LUXURY • FLAGSHIP CLUB' : 'RAW FIT PRIME • PERFORMANCE GYM';
      const bottomText = isLuxury ? 'OLYMPIC CALIBRATED • 50 KG' : 'OLYMPIC CALIBRATED • 25 KG';

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
      ctx.fillStyle = isLuxury ? '#d4af37' : '#0a0a0a';
      ctx.fillText('RAW FIT', 0, -50);
      ctx.font = 'bold 30px system-ui, sans-serif';
      ctx.fillStyle = isLuxury ? '#f5f5f7' : '#222';
      ctx.fillText('LIFE IN PROGRESS', 0, 0);
      ctx.font = '800 52px system-ui, sans-serif';
      ctx.fillStyle = isLuxury ? '#ff7844' : '#991b1b';
      ctx.fillText(isLuxury ? '50 KG' : '25 KG', 0, 56);

      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    }

    // 6. 3D Model Construction (Procedural Olympic Plate with 3 Hand Grips)
    const plateGroup = new THREE.Group();

    const outerRadius = 1.6;
    const innerHoleRadius = 0.22;
    const plateThickness = 0.16;

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

    const isLux = edition === 'luxury';
    const plateTexture = createPlateTexture(isLux);

    const plateMaterial = new THREE.MeshStandardMaterial({
      map: plateTexture,
      metalness: isLux ? 0.85 : 0.95,
      roughness: isLux ? 0.28 : 0.22,
      envMapIntensity: 2.0,
    });

    const plateMesh = new THREE.Mesh(geometry, plateMaterial);
    plateGroup.add(plateMesh);

    // Center stainless steel insert ring
    const ringGeo = new THREE.CylinderGeometry(0.32, 0.32, plateThickness + 0.1, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.98,
      roughness: 0.1,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    plateGroup.add(ringMesh);

    // Outer edge protective rubber bumper
    const bumperGeo = new THREE.TorusGeometry(outerRadius + 0.02, 0.035, 16, 64);
    const bumperMat = new THREE.MeshStandardMaterial({
      color: isLux ? 0xd4af37 : 0x111111,
      metalness: isLux ? 0.8 : 0.2,
      roughness: 0.4,
    });
    const bumperMesh = new THREE.Mesh(bumperGeo, bumperMat);
    plateGroup.add(bumperMesh);

    // Initial slight tilt
    plateGroup.rotation.x = 0.22;
    plateGroup.rotation.y = -0.32;
    scene.add(plateGroup);

    // 7. Interactive Drag & Inertia Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0.22;
    let targetRotationY = -0.32;
    let velocityY = 0.005;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      velocityY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-1.0, Math.min(1.0, targetRotationX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
      velocityY = 0.004;
    };

    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
        velocityY = 0;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;
      targetRotationX = Math.max(-1.0, Math.min(1.0, targetRotationX));

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

    // 8. Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotationY += velocityY;
      }

      plateGroup.rotation.y += (targetRotationY - plateGroup.rotation.y) * 0.08;
      plateGroup.rotation.x += (targetRotationX - plateGroup.rotation.x) * 0.08;
      plateGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 9. ResizeObserver to keep canvas strictly square and aligned
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newSize = Math.min(entry.contentRect.width || 420, 460);
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
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [edition]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none">
      {/* 3D Stage Canvas Container */}
      <div
        ref={mountRef}
        className="relative w-full aspect-square max-w-[420px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        title="Click and drag to rotate 3D plate"
      >
        {/* Ambient Glow behind plate */}
        <div
          className="absolute inset-8 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background: edition === 'luxury'
              ? 'radial-gradient(circle, rgba(212,175,55,0.45) 0%, rgba(255,107,53,0.15) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(236,211,150,0.5) 0%, rgba(212,175,55,0.2) 60%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating Interactive Badge & Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 z-10 w-full">
        <div className="flex items-center gap-1 p-1 rounded-full glass-panel border border-[var(--border-gold)]">
          <button
            onClick={() => setEdition('prime')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
              edition === 'prime'
                ? 'bg-[var(--gold-primary)] text-black shadow-md font-extrabold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Prime 25KG (Gold)
          </button>
          <button
            onClick={() => setEdition('luxury')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
              edition === 'luxury'
                ? 'bg-[var(--gold-primary)] text-black shadow-md font-extrabold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Luxury 50KG (Onyx)
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium whitespace-nowrap">
          <RotateCw className="w-3.5 h-3.5 animate-spin text-[var(--gold-primary)]" style={{ animationDuration: '6s' }} />
          <span>Drag 360°</span>
        </div>
      </div>
    </div>
  );
}
