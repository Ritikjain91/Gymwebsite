'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers, Sparkles, Check, Info, Activity } from 'lucide-react';

interface ThreeDumbbellViewerProps {
  initialWeight?: number; // e.g. 32
  compact?: boolean;
}

type MaterialTheme = 'gold' | 'titanium' | 'stealth';

export default function ThreeDumbbellViewer({ initialWeight = 32, compact = false }: ThreeDumbbellViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<MaterialTheme>('gold');
  const [isExploded, setIsExploded] = useState(false);
  const [weight, setWeight] = useState(initialWeight);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isRepMotion, setIsRepMotion] = useState(compact ? true : false);

  // References to animate parts between standard and exploded positions
  const explodedRef = useRef(false);
  explodedRef.current = isExploded;

  const autoRotateRef = useRef(true);
  autoRotateRef.current = isAutoRotate;

  const repMotionRef = useRef(compact ? true : false);
  repMotionRef.current = isRepMotion;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || (compact ? 200 : 400);
    const height = container.clientHeight || (compact ? 160 : 380);
    const aspect = width / height;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera - dynamically adjusted distance so dumbbell never clips
    const baseDist = compact ? 6.2 : 5.2;
    const camZ = aspect < 1.2 ? baseDist * (1.2 / Math.max(aspect, 0.45)) : baseDist;
    const camera = new THREE.PerspectiveCamera(compact ? 36 : 38, aspect, 0.1, 100);
    camera.position.set(0, 0.15, camZ);
    camera.lookAt(0, 0.15, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffe29a, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const blueSoftLight = new THREE.DirectionalLight(0x70aaff, 1.0);
    blueSoftLight.position.set(0, -4, 2);
    scene.add(blueSoftLight);

    // Dynamic texture generator for the hex face
    function createHexFaceTexture(theme: MaterialTheme, kg: number) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Background color based on theme
      if (theme === 'gold') {
        const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
        grad.addColorStop(0, '#2a2720');
        grad.addColorStop(0.7, '#151412');
        grad.addColorStop(1, '#0c0b0a');
        ctx.fillStyle = grad;
      } else if (theme === 'titanium') {
        const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 250);
        grad.addColorStop(0, '#555860');
        grad.addColorStop(0.7, '#282a30');
        grad.addColorStop(1, '#18191c');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = '#121214';
      }
      ctx.fillRect(0, 0, 512, 512);

      // Gold or chrome border ring
      ctx.strokeStyle = theme === 'gold' ? '#a3e635' : theme === 'titanium' ? '#b0c4de' : '#444';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(256, 256, 220, 0, Math.PI * 2);
      ctx.stroke();

      // Brand text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = theme === 'gold' ? '#bef264' : theme === 'titanium' ? '#f0f4f8' : '#888890';
      ctx.font = '900 48px system-ui, sans-serif';
      ctx.fillText('FIT&FAB', 256, 175);

      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillStyle = theme === 'gold' ? '#d9f99d' : '#9aa0a6';
      ctx.fillText('OLYMPIC CALIBRATED', 256, 225);

      // Weight in KG
      ctx.font = '900 86px system-ui, sans-serif';
      ctx.fillStyle = theme === 'gold' ? '#a3e635' : theme === 'titanium' ? '#e2e8f0' : '#ffffff';
      ctx.fillText(`${kg} KG`, 256, 310);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      texture.center.set(0.5, 0.5);
      texture.rotation = -Math.PI / 2;
      return texture;
    }

    // Knurling texture for the handle
    function createKnurlTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;

      // Diagonal cross-hatch diamond knurling
      const step = 8;
      for (let i = -256; i < 512; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 256, 256);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, 256);
        ctx.lineTo(i + 256, 0);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 16);
      return texture;
    }

    // 5. Materials
    const hexFaceTex = createHexFaceTexture(materialTheme, weight);
    const knurlTex = createKnurlTexture();

    const headMatColor =
      materialTheme === 'gold' ? 0x18181b : materialTheme === 'titanium' ? 0x2b2d35 : 0x0f0f10;
    const headRoughness = materialTheme === 'gold' ? 0.3 : 0.25;
    const headMetalness = materialTheme === 'gold' ? 0.8 : 0.9;

    const hexSideMaterial = new THREE.MeshStandardMaterial({
      color: headMatColor,
      roughness: headRoughness,
      metalness: headMetalness,
    });

    const hexFaceMaterial = new THREE.MeshStandardMaterial({
      map: hexFaceTex,
      roughness: 0.25,
      metalness: 0.7,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: materialTheme === 'gold' ? 0xd4af37 : materialTheme === 'titanium' ? 0x94a3b8 : 0x52525b,
      metalness: 0.95,
      roughness: 0.18,
    });

    const handleMaterial = new THREE.MeshStandardMaterial({
      color: materialTheme === 'gold' ? 0xd4af37 : materialTheme === 'titanium' ? 0xcccccc : 0x71717a,
      roughness: 0.35,
      metalness: 0.9,
      bumpMap: knurlTex,
      bumpScale: 0.05,
    });

    // 6. Build Dumbbell Geometry Group
    const dumbbellRoot = new THREE.Group();

    // Central Grip Bar (Oriented along X axis)
    const handleGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.8, 32);
    handleGeo.rotateZ(Math.PI / 2);
    const handleMesh = new THREE.Mesh(handleGeo, handleMaterial);
    dumbbellRoot.add(handleMesh);

    // Left & Right Subgroups for Exploded view
    const leftHeadGroup = new THREE.Group();
    const rightHeadGroup = new THREE.Group();

    // Hexagonal Head Geometry (Cylinder with 6 sides)
    const headRadius = 0.82;
    const headDepth = 0.75;
    const hexGeo = new THREE.CylinderGeometry(headRadius, headRadius, headDepth, 6);
    hexGeo.rotateZ(Math.PI / 2);

    // Material array for the hex cylinder: side, top face, bottom face
    const hexMaterials = [hexSideMaterial, hexFaceMaterial, hexFaceMaterial];

    // Left Hex Head
    const leftHex = new THREE.Mesh(hexGeo, hexMaterials);
    leftHeadGroup.add(leftHex);

    // Left Collar Stop & Rings
    const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    collarGeo.rotateZ(Math.PI / 2);
    const leftCollar = new THREE.Mesh(collarGeo, goldAccentMaterial);
    leftCollar.position.x = headDepth / 2 + 0.06;
    leftHeadGroup.add(leftCollar);

    const leftGoldRim = new THREE.TorusGeometry(headRadius - 0.02, 0.025, 16, 6);
    leftGoldRim.rotateY(Math.PI / 2);
    const leftGoldRimMesh = new THREE.Mesh(leftGoldRim, goldAccentMaterial);
    leftGoldRimMesh.position.x = -headDepth / 2;
    leftHeadGroup.add(leftGoldRimMesh);

    // Right Hex Head
    const rightHex = new THREE.Mesh(hexGeo, hexMaterials);
    rightHeadGroup.add(rightHex);

    const rightCollar = new THREE.Mesh(collarGeo, goldAccentMaterial);
    rightCollar.position.x = -headDepth / 2 - 0.06;
    rightHeadGroup.add(rightCollar);

    const rightGoldRim = new THREE.TorusGeometry(headRadius - 0.02, 0.025, 16, 6);
    rightGoldRim.rotateY(Math.PI / 2);
    const rightGoldRimMesh = new THREE.Mesh(rightGoldRim, goldAccentMaterial);
    rightGoldRimMesh.position.x = headDepth / 2;
    rightHeadGroup.add(rightGoldRimMesh);

    // Standard initial non-exploded offsets along X
    const baseOffsetX = 0.9 + headDepth / 2;
    leftHeadGroup.position.x = -baseOffsetX;
    rightHeadGroup.position.x = baseOffsetX;

    dumbbellRoot.add(leftHeadGroup);
    dumbbellRoot.add(rightHeadGroup);

    // Ambient floating particles around the equipment
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: materialTheme === 'gold' ? 0xd4af37 : 0x93c5fd,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial angled display showcase with scale factor to prevent any clipping
    const rootScale = compact ? 0.78 : 1.0;
    dumbbellRoot.scale.set(rootScale, rootScale, rootScale);
    dumbbellRoot.rotation.x = 0.25;
    dumbbellRoot.rotation.y = -0.55;
    dumbbellRoot.rotation.z = 0.15;
    scene.add(dumbbellRoot);

    // 7. Mouse and Touch Rotation Handlers
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = dumbbellRoot.rotation.y;
    let targetRotX = dumbbellRoot.rotation.x;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      targetRotY += dx * 0.009;
      targetRotX += dy * 0.009;
      targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;

      targetRotY += dx * 0.009;
      targetRotX += dy * 0.009;
      targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));

      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 8. Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0015;

      // Auto rotation when enabled and not dragging
      if (autoRotateRef.current && !isDragging) {
        targetRotY += repMotionRef.current ? 0.003 : 0.006;
      }

      // Smooth dampening towards target rotation
      dumbbellRoot.rotation.y += (targetRotY - dumbbellRoot.rotation.y) * 0.08;
      dumbbellRoot.rotation.x += (targetRotX - dumbbellRoot.rotation.x) * 0.08;

      // Dynamic exercise rep lifting motion vs gentle idle floating
      if (repMotionRef.current && !explodedRef.current) {
        // Biomechanical dumbbell curl tempo: 2.2s rep period
        const cycle = (Math.sin(time * 2.2) + 1) / 2; // 0 to 1
        const liftY = Math.pow(cycle, 1.35) * (compact ? 0.28 : 0.44);
        const tiltZ = 0.15 + Math.sin(time * 2.2) * 0.22;
        const tiltX = 0.25 + Math.sin(time * 2.2) * 0.12;

        dumbbellRoot.position.set(0, (compact ? 0.05 : 0.15) + liftY, 0);
        dumbbellRoot.rotation.z = tiltZ;
        dumbbellRoot.rotation.x = tiltX;
      } else {
        dumbbellRoot.position.set(0, (compact ? 0.1 : 0.2) + Math.sin(time) * 0.04, 0);
        dumbbellRoot.rotation.z = 0.15;
      }

      // Exploded View smooth spring translation along X
      const targetLeftX = explodedRef.current ? -(baseOffsetX + 0.9) : -baseOffsetX;
      const targetRightX = explodedRef.current ? baseOffsetX + 0.9 : baseOffsetX;

      leftHeadGroup.position.x += (targetLeftX - leftHeadGroup.position.x) * 0.12;
      rightHeadGroup.position.x += (targetRightX - rightHeadGroup.position.x) * 0.12;

      // Rotate particle cloud gently
      particles.rotation.y = time * 0.08;

      camera.lookAt(0, 0.2, 0);
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          const asp = w / h;
          camera.aspect = asp;
          const z = asp < 1.2 ? baseDist * (1.2 / Math.max(asp, 0.45)) : baseDist;
          camera.position.z = z;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          camera.lookAt(0, 0.15, 0);
        }
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      handleGeo.dispose();
      hexGeo.dispose();
      collarGeo.dispose();
      leftGoldRim.dispose();
      rightGoldRim.dispose();
      particleGeo.dispose();
      handleMaterial.dispose();
      hexSideMaterial.dispose();
      hexFaceMaterial.dispose();
      goldAccentMaterial.dispose();
      particleMat.dispose();
      hexFaceTex.dispose();
      knurlTex.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [materialTheme, weight, compact]);

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full select-none">
      {/* 3D Canvas Stage */}
      <div
        ref={mountRef}
        className={`relative w-full ${compact ? 'h-[160px] sm:h-[180px]' : 'h-[320px] sm:h-[380px]'} cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden rounded-2xl`}
        title="Click and drag to rotate 3D equipment"
      >
        {/* Radial Ambient Backlight */}
        <div
          className="absolute inset-4 rounded-full pointer-events-none blur-3xl opacity-35"
          style={{
            background:
              materialTheme === 'gold'
                ? 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(255,107,53,0.15) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(147,197,253,0.3) 0%, rgba(212,175,55,0.1) 60%, transparent 80%)',
          }}
        />

        {/* Exploded View Labels Overlay */}
        {isExploded && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 z-10 animate-in fade-in duration-300">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-[10px] font-black uppercase text-gold-gradient">
                ◄ Shock-Dampening Urethane Hex Head
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[var(--border-gold)] text-[10px] font-black uppercase text-gold-gradient">
                Cold-Forged Locking Pin ►
              </span>
            </div>
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase text-white">
                ● 1.2mm Diamond Knurling Biomechanical Grip
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar (Material Finish, Exploded View, Weight Preset) - hidden in compact mode */}
      {!compact && (
        <div className="w-full flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[var(--border-subtle)] text-xs z-10">
          {/* Finish Selector */}
          <div className="flex items-center gap-1 p-1 rounded-full glass-panel border border-[var(--border-subtle)]">
            <button
              onClick={() => setMaterialTheme('gold')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                materialTheme === 'gold'
                  ? 'bg-[var(--volt-primary)] text-black shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Volt Edition
            </button>
            <button
              onClick={() => setMaterialTheme('titanium')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                materialTheme === 'titanium'
                  ? 'bg-[var(--volt-primary)] text-black shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Titanium Pro
            </button>
            <button
              onClick={() => setMaterialTheme('stealth')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                materialTheme === 'stealth'
                  ? 'bg-[var(--volt-primary)] text-black shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Stealth Onyx
            </button>
          </div>

          {/* Action Buttons: Explode, Rep Motion & Auto-Rotate */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRepMotion(!isRepMotion)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
                isRepMotion
                  ? 'bg-[var(--volt-bright)] text-black border-[var(--volt-bright)] shadow-[0_0_12px_rgba(190,242,100,0.5)] font-black'
                  : 'glass-panel text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-volt)]'
              }`}
              title="Toggle Dynamic Workout Reps Motion"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isRepMotion ? 'Rep Motion ON' : 'Lift Reps'}</span>
            </button>

            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
                isExploded
                  ? 'bg-[var(--volt-primary)] text-black border-[var(--volt-primary)] shadow-md font-black'
                  : 'glass-panel text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-volt)]'
              }`}
              title="Toggle CAD Exploded View"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Collapse' : 'Explode View'}</span>
            </button>

            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`p-1.5 rounded-full glass-panel border border-[var(--border-subtle)] hover:border-[var(--border-volt)] transition-colors cursor-pointer text-[var(--text-secondary)] ${
                isAutoRotate ? 'text-[var(--volt-primary)]' : ''
              }`}
              title={isAutoRotate ? 'Pause 360° rotation' : 'Resume 360° rotation'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            </button>
          </div>
        </div>
      )}

      {compact && (
        <div className="w-full flex items-center justify-center gap-2 pt-1.5 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--volt-bright)] animate-ping" />
          <span className="text-[var(--volt-bright)] font-mono">CALIBRATED REP LIFT</span>
          <span className="text-gray-500">•</span>
          <span>360° IRON</span>
        </div>
      )}
    </div>
  );
}
