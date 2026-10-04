'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { TRAINING_ZONES } from '../data/gymData';
import {
  Compass,
  Layers,
  Maximize2,
  Minimize2,
  RotateCw,
  Play,
  Pause,
  Scan,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ThreeGymFloorplanProps {
  activeZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

// 3D Spatial coordinates and camera vantage points for all 6 zones
interface ZoneCoordinates {
  x: number;
  z: number;
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  lookZ: number;
  name: string;
  number: string;
  sqft: string;
  capacity: string;
}

const ZONE_DATA: Record<string, ZoneCoordinates> = {
  strength: {
    x: -3.0,
    z: -1.7,
    camX: -2.4,
    camY: 4.2,
    camZ: 2.8,
    lookX: -3.0,
    lookY: 0.5,
    lookZ: -1.7,
    name: 'Biomechanical Strength Arena',
    number: '01',
    sqft: '2,400 SQ FT',
    capacity: '45 Athletes',
  },
  cardio: {
    x: 3.0,
    z: -1.7,
    camX: 2.4,
    camY: 4.2,
    camZ: 2.8,
    lookX: 3.0,
    lookY: 0.5,
    lookZ: -1.7,
    name: 'High-Altitude Cardio Deck',
    number: '02',
    sqft: '1,800 SQ FT',
    capacity: '30 Athletes',
  },
  functional: {
    x: 0,
    z: -1.0,
    camX: 0,
    camY: 5.2,
    camZ: 3.4,
    lookX: 0,
    lookY: 0.4,
    lookZ: -1.0,
    name: 'Functional Turf & Combat Bay',
    number: '03',
    sqft: '2,000 SQ FT',
    capacity: '35 Athletes',
  },
  recovery: {
    x: -3.0,
    z: 2.0,
    camX: -2.2,
    camY: 4.0,
    camZ: 4.6,
    lookX: -3.0,
    lookY: 0.5,
    lookZ: 2.0,
    name: 'Contrast Therapy & Cryo Suite',
    number: '04',
    sqft: '1,200 SQ FT',
    capacity: '16 Athletes',
  },
  lounge: {
    x: 3.0,
    z: 2.0,
    camX: 2.2,
    camY: 4.0,
    camZ: 4.6,
    lookX: 3.0,
    lookY: 0.5,
    lookZ: 2.0,
    name: 'Executive Lounge & RAW Fuel Bar',
    number: '05',
    sqft: '1,100 SQ FT',
    capacity: '24 Guests',
  },
  studio: {
    x: 0,
    z: 2.2,
    camX: 0,
    camY: 4.0,
    camZ: 4.8,
    lookX: 0,
    lookY: 0.6,
    lookZ: 2.2,
    name: '3D Optical Body Scan Studio',
    number: '06',
    sqft: '650 SQ FT',
    capacity: 'Private Suite',
  },
};

const ZONE_KEYS = ['strength', 'cardio', 'functional', 'recovery', 'lounge', 'studio'];

export default function ThreeGymFloorplan({ activeZoneId, onSelectZone }: ThreeGymFloorplanProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeZoneRef = useRef(activeZoneId);
  activeZoneRef.current = activeZoneId;

  const onSelectZoneRef = useRef(onSelectZone);
  onSelectZoneRef.current = onSelectZone;

  const [isOverview, setIsOverview] = useState(false);
  const isOverviewRef = useRef(false);
  isOverviewRef.current = isOverview;

  const [isTouring, setIsTouring] = useState(false);
  const isTouringRef = useRef(false);
  isTouringRef.current = isTouring;

  const [showLaserGrid, setShowLaserGrid] = useState(true);
  const showLaserGridRef = useRef(true);
  showLaserGridRef.current = showLaserGrid;

  // Toggle Overview View
  const handleToggleOverview = () => {
    setIsTouring(false);
    setIsOverview((prev) => !prev);
  };

  // Toggle Tour Mode
  const handleToggleTour = () => {
    setIsOverview(false);
    setIsTouring((prev) => !prev);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Camera - High-end isometric perspective
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);

    const initialTarget = ZONE_DATA[activeZoneRef.current] || ZONE_DATA.strength;
    camera.position.set(initialTarget.camX, initialTarget.camY, initialTarget.camZ);

    let currentLookAt = new THREE.Vector3(initialTarget.lookX, initialTarget.lookY, initialTarget.lookZ);
    let targetLookAt = new THREE.Vector3(initialTarget.lookX, initialTarget.lookY, initialTarget.lookZ);
    let targetCamPos = new THREE.Vector3(initialTarget.camX, initialTarget.camY, initialTarget.camZ);

    // 3. Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfff5dd, 3.2);
    mainSun.position.set(8, 14, 8);
    scene.add(mainSun);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.8);
    cyanRim.position.set(-8, -4, -6);
    scene.add(cyanRim);

    // Dynamic Focused Spotlight that targets active zone
    const zoneSpotlight = new THREE.SpotLight(0xd4af37, 6.0, 16, Math.PI / 4.5, 0.35);
    zoneSpotlight.position.set(0, 9, 0);
    scene.add(zoneSpotlight);

    // 5. Floor Platform & Architectural Foundation
    const blueprintGroup = new THREE.Group();

    // 5.1 Heavy Foundation Base
    const slabGeo = new THREE.BoxGeometry(10.6, 0.45, 8.2);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.8,
      metalness: 0.4,
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -0.225;
    blueprintGroup.add(slabMesh);

    // 5.2 Glowing Gold Perimeter Foundation Trim
    const neonGeo = new THREE.BoxGeometry(10.7, 0.08, 8.3);
    const neonMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.8,
    });
    const neonMesh = new THREE.Mesh(neonGeo, neonMat);
    neonMesh.position.y = 0.02;
    blueprintGroup.add(neonMesh);

    // 5.3 High-Precision Blueprint Floor Texture Canvas
    function createBlueprintTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 2048;
      const ctx = canvas.getContext('2d')!;

      // Deep obsidian floor
      ctx.fillStyle = '#0d0d10';
      ctx.fillRect(0, 0, 2048, 2048);

      // Fine millimeter grid
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 2048; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 2048);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(2048, i);
        ctx.stroke();
      }

      // Major structural grid lines (Every 256px)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i <= 2048; i += 256) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 2048);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(2048, i);
        ctx.stroke();
      }

      // Center compass / alignment circle
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(1024, 1024, 380, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(1024, 1024, 400, 0, Math.PI * 2);
      ctx.stroke();

      // Zone Boundary Demarcations & Typography Stamps in 2D Space
      const zoneStamps = [
        { x: 420, y: 520, num: 'ZONE 01', title: 'BIOMECHANICAL STRENGTH', spec: 'CALIBRATED POWER RACKS • 500 KG/M²' },
        { x: 1620, y: 520, num: 'ZONE 02', title: 'HIGH-ALTITUDE CARDIO', spec: 'WOODWAY CURVE FLEET • OXYGENATED' },
        { x: 1024, y: 640, num: 'ZONE 03', title: 'FUNCTIONAL SPRINT TURF', spec: '30M SPRINT RUNNER • POWER SLEDS' },
        { x: 420, y: 1540, num: 'ZONE 04', title: 'CONTRAST RECOVERY & CRYO', spec: '4°C SUB-ZERO PLUNGE • CEDAR SAUNA' },
        { x: 1620, y: 1540, num: 'ZONE 05', title: 'EXECUTIVE LOUNGE & FUEL', spec: 'RAW PROTEIN BAR • SLATE BILLIARDS' },
        { x: 1024, y: 1560, num: 'ZONE 06', title: '3D OPTICAL BODY SCAN', spec: 'STYKU 3D BIO-METRICS SUITE' },
      ];

      ctx.textAlign = 'center';
      zoneStamps.forEach((z) => {
        ctx.font = '900 36px monospace, sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(z.num, z.x, z.y - 28);

        ctx.font = 'bold 26px system-ui, sans-serif';
        ctx.fillStyle = '#f5f5f7';
        ctx.fillText(z.title, z.x, z.y + 12);

        ctx.font = '600 18px monospace, sans-serif';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.fillText(z.spec, z.x, z.y + 42);

        // Surrounding boundary box
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(z.x - 260, z.y - 65, 520, 130);

        // Corner tick marks
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        const bx = z.x - 260;
        const by = z.y - 65;
        const bw = 520;
        const bh = 130;
        const tick = 24;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(bx, by + tick);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + tick, by);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(bx + bw - tick, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + tick);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(bx, by + bh - tick);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + tick, by + bh);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(bx + bw - tick, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - tick);
        ctx.stroke();
      });

      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 8;
      return tex;
    }

    const floorTexture = createBlueprintTexture();
    const floorTileMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.35,
      metalness: 0.3,
    });
    const floorTileGeo = new THREE.PlaneGeometry(10.5, 8.1);
    floorTileGeo.rotateX(-Math.PI / 2);
    const floorTileMesh = new THREE.Mesh(floorTileGeo, floorTileMat);
    floorTileMesh.position.y = 0.056;
    blueprintGroup.add(floorTileMesh);

    // 5.4 Glass Architectural Partitions between major wings
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.28,
      metalness: 0.8,
      roughness: 0.1,
    });
    const glassCapMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });

    function createDividerWall(w: number, h: number, x: number, z: number, rotY = 0) {
      const g = new THREE.Group();
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.05), glassMat);
      wall.position.y = h / 2 + 0.06;
      g.add(wall);

      const cap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.05, 0.04, 0.08), glassCapMat);
      cap.position.y = h + 0.06;
      g.add(cap);

      g.position.set(x, 0, z);
      g.rotation.y = rotY;
      blueprintGroup.add(g);
    }

    // Partitions dividing back suites (Recovery & Lounge)
    createDividerWall(2.8, 0.75, -3.2, 0.8, 0);
    createDividerWall(2.8, 0.75, 3.2, 0.8, 0);
    createDividerWall(2.2, 0.75, -1.8, 2.1, Math.PI / 2);
    createDividerWall(2.2, 0.75, 1.8, 2.1, Math.PI / 2);

    // 6. ZONE EQUIPMENT ARCHITECTURAL MINIATURES (High-Fidelity)

    // ==========================================
    // ZONE 01: BIOMECHANICAL STRENGTH ARENA
    // ==========================================
    const ironRackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.25 });
    const goldPlateMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.18 });
    const barbellMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.98, roughness: 0.1 });

    // 3 Power Racks with Barbells & Plates
    for (let r = -1; r <= 1; r++) {
      const rx = -3.0 + r * 0.95;
      const rz = -2.1;

      // 4 Uprights
      for (let ux = -0.22; ux <= 0.22; ux += 0.44) {
        for (let uz = -0.22; uz <= 0.22; uz += 0.44) {
          const up = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.95, 0.05), ironRackMat);
          up.position.set(rx + ux, 0.52, rz + uz);
          blueprintGroup.add(up);
        }
      }

      // Top Crossbeams & Gold Pull-Up Bar
      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.5), ironRackMat);
      topBeam.position.set(rx, 1.0, rz);
      blueprintGroup.add(topBeam);

      const pullUpBar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 16), goldPlateMat);
      pullUpBar.rotateZ(Math.PI / 2);
      pullUpBar.position.set(rx, 1.02, rz + 0.2);
      blueprintGroup.add(pullUpBar);

      // Olympic Barbell
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.75, 16), barbellMat);
      bar.rotateZ(Math.PI / 2);
      bar.position.set(rx, 0.65, rz);
      blueprintGroup.add(bar);

      // Dual Bumper Plates on barbell
      for (const px of [-0.32, 0.32]) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 24), goldPlateMat);
        p.rotateZ(Math.PI / 2);
        p.position.set(rx + px, 0.65, rz);
        blueprintGroup.add(p);
      }

      // Bench under rack
      const bench = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.15, 0.55),
        new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 })
      );
      bench.position.set(rx, 0.14, rz + 0.08);
      blueprintGroup.add(bench);
    }

    // Heavy Dumbbell Saddle Rack in front of racks
    const dumbRack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.28, 0.3), ironRackMat);
    dumbRack.position.set(-3.0, 0.2, -1.0);
    blueprintGroup.add(dumbRack);

    for (let d = -4; d <= 4; d++) {
      const dm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.12, 12), goldPlateMat);
      dm.rotateZ(Math.PI / 2);
      dm.position.set(-3.0 + d * 0.14, 0.36, -1.0);
      blueprintGroup.add(dm);
    }

    // ==========================================
    // ZONE 02: HIGH-ALTITUDE CARDIO DECK
    // ==========================================
    const cardioBlack = new THREE.MeshStandardMaterial({ color: 0x1f2024, roughness: 0.35, metalness: 0.6 });
    const screenCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
    });

    // 4 Curved Woodway Treadmills with HUD Screens
    for (let t = -1.5; t <= 1.5; t++) {
      const tx = 3.0 + t * 0.72;
      const tz = -2.1;

      // Curved Running Deck
      const tmBase = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.78), cardioBlack);
      tmBase.position.set(tx, 0.14, tz);
      blueprintGroup.add(tmBase);

      // Side Handrails
      for (const hx of [-0.18, 0.18]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.45, 0.03), ironRackMat);
        rail.position.set(tx + hx, 0.38, tz - 0.18);
        blueprintGroup.add(rail);
      }

      // Telemetry Console Monitor
      const consoleScreen = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.03), screenCyan);
      consoleScreen.position.set(tx, 0.58, tz - 0.28);
      consoleScreen.rotateX(0.25);
      blueprintGroup.add(consoleScreen);
    }

    // 2 Concept2 Rowers behind treadmills
    for (const rx of [2.4, 3.6]) {
      const rowerRail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.9), cardioBlack);
      rowerRail.position.set(rx, 0.12, -1.1);
      blueprintGroup.add(rowerRail);

      // Flywheel cage
      const flywheel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.12, 24), goldPlateMat);
      flywheel.rotateZ(Math.PI / 2);
      flywheel.position.set(rx, 0.18, -1.6);
      blueprintGroup.add(flywheel);
    }

    // ==========================================
    // ZONE 03: FUNCTIONAL SPRINT TURF & COMBAT
    // ==========================================
    // Synthetic Green Turf Runner (30m scaled)
    const turfGeo = new THREE.PlaneGeometry(1.9, 4.8);
    turfGeo.rotateX(-Math.PI / 2);
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.85,
    });
    const turfMesh = new THREE.Mesh(turfGeo, turfMat);
    turfMesh.position.set(0, 0.068, -0.4);
    blueprintGroup.add(turfMesh);

    // Turf Track White Hashlines & Markers
    for (let l = -2.0; l <= 2.0; l += 0.8) {
      const lineMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.04),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      lineMesh.rotateX(-Math.PI / 2);
      lineMesh.position.set(0, 0.072, -0.4 + l);
      blueprintGroup.add(lineMesh);
    }

    // Center Dashed Sprint Line
    const centerLine = new THREE.Mesh(
      new THREE.PlaneGeometry(0.05, 4.6),
      new THREE.MeshBasicMaterial({ color: 0xffd700 })
    );
    centerLine.rotateX(-Math.PI / 2);
    centerLine.position.set(0, 0.073, -0.4);
    blueprintGroup.add(centerLine);

    // Heavy Tank Push Sled on turf
    const sledBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.45), ironRackMat);
    sledBase.position.set(0, 0.14, -1.8);
    blueprintGroup.add(sledBase);

    for (const px of [-0.22, 0.22]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 16), goldPlateMat);
      pole.position.set(px, 0.38, -1.8);
      blueprintGroup.add(pole);
    }

    // 2 Soft Plyo Vault Boxes
    const plyo1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.35, 0.38),
      new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: 0.6 })
    );
    plyo1.position.set(-0.6, 0.23, 0.8);
    blueprintGroup.add(plyo1);

    const plyo2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.45, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x222226, roughness: 0.6 })
    );
    plyo2.position.set(0.6, 0.28, 0.8);
    blueprintGroup.add(plyo2);

    // ==========================================
    // ZONE 04: CONTRAST THERAPY & CRYO SUITE
    // ==========================================
    // Nordic Cedarwood Sauna Room
    const saunaEnclosure = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.95, 1.5), glassMat);
    saunaEnclosure.position.set(-3.7, 0.54, 2.1);
    blueprintGroup.add(saunaEnclosure);

    // Cedarwood interior floor & bench
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 });
    const saunaBench = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.32, 0.4), cedarMat);
    saunaBench.position.set(-3.7, 0.22, 1.7);
    blueprintGroup.add(saunaBench);

    // Warm Amber Internal Thermal Light Glow
    const saunaGlow = new THREE.PointLight(0xffa500, 3.5, 4);
    saunaGlow.position.set(-3.7, 0.6, 2.1);
    blueprintGroup.add(saunaGlow);

    // Dual 4°C Cryo Cold Plunge Tubs
    const tubMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.85, roughness: 0.25 });
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.05,
      metalness: 0.9,
    });

    const plunge1 = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.38, 1.1), tubMat);
    plunge1.position.set(-2.2, 0.25, 2.1);
    blueprintGroup.add(plunge1);

    const waterMesh1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.05, 1.0), waterMat);
    waterMesh1.position.set(-2.2, 0.39, 2.1);
    blueprintGroup.add(waterMesh1);

    // Stainless steel plunge entrance rail
    const plungeRail = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.45, 16), barbellMat);
    plungeRail.position.set(-1.8, 0.48, 2.1);
    blueprintGroup.add(plungeRail);

    // ==========================================
    // ZONE 05: EXECUTIVE LOUNGE & RAW FUEL BAR
    // ==========================================
    // Marble Bar Counter with Gold Kickplate
    const barCounter = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.46, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x1e1e24, metalness: 0.8, roughness: 0.2 })
    );
    barCounter.position.set(3.0, 0.29, 2.8);
    blueprintGroup.add(barCounter);

    const barTop = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.58), goldPlateMat);
    barTop.position.set(3.0, 0.54, 2.8);
    blueprintGroup.add(barTop);

    // 3 Luxury Leather Barstools
    for (let s = -1; s <= 1; s++) {
      const stoolSeat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16),
        new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 })
      );
      stoolSeat.position.set(3.0 + s * 0.55, 0.35, 2.3);
      blueprintGroup.add(stoolSeat);

      const stoolLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.32, 12), goldPlateMat);
      stoolLeg.position.set(3.0 + s * 0.55, 0.16, 2.3);
      blueprintGroup.add(stoolLeg);
    }

    // Tournament Slate Billiards Table
    const poolFrame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.28, 0.75), cedarMat);
    poolFrame.position.set(3.0, 0.2, 1.2);
    blueprintGroup.add(poolFrame);

    const poolFelt = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 0.04, 0.62),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
    );
    poolFelt.position.set(3.0, 0.35, 1.2);
    blueprintGroup.add(poolFelt);

    // ==========================================
    // ZONE 06: 3D OPTICAL BODY SCAN STUDIO
    // ==========================================
    // Circular Turntable Platform
    const turntableGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.14, 36);
    const turntableMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, metalness: 0.9, roughness: 0.2 });
    const turntable = new THREE.Mesh(turntableGeo, turntableMat);
    turntable.position.set(0, 0.13, 2.2);
    blueprintGroup.add(turntable);

    // Concentric Calibration Gold Ring on Turntable
    const calibRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.02, 16, 36),
      new THREE.MeshBasicMaterial({ color: 0xd4af37 })
    );
    calibRing.rotateX(Math.PI / 2);
    calibRing.position.set(0, 0.21, 2.2);
    blueprintGroup.add(calibRing);

    // Twin Vertical Infrared Optical Scanning Columns
    for (const scX of [-0.62, 0.62]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 0.08), ironRackMat);
      col.position.set(scX, 0.66, 2.2);
      blueprintGroup.add(col);

      // Cyan Sensor Lenses on column
      for (let sl = 0.3; sl <= 1.1; sl += 0.25) {
        const lens = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.04, 0.04), screenCyan);
        lens.position.set(scX, sl, 2.2);
        blueprintGroup.add(lens);
      }
    }

    // Animated Optical Laser Scan Ring (Sweeps up/down in animate loop)
    const scanLaserRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.025, 16, 36),
      new THREE.MeshBasicMaterial({ color: 0xff6b35 })
    );
    scanLaserRing.rotateX(Math.PI / 2);
    scanLaserRing.position.set(0, 0.65, 2.2);
    blueprintGroup.add(scanLaserRing);

    // Translucent Hologram Wireframe Athlete Silhouette
    const holoGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.85, 16, 8, true);
    const holoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const holoAvatar = new THREE.Mesh(holoGeo, holoMat);
    holoAvatar.position.set(0, 0.7, 2.2);
    blueprintGroup.add(holoAvatar);

    // Add entire Blueprint Model to Scene
    scene.add(blueprintGroup);

    // 7. Interactive Floating 3D Zone Pins (Hotspots) with Laser Anchor Beams
    const pinsGroup = new THREE.Group();
    const pinObjectsMap = new Map<string, THREE.Mesh>();

    ZONE_KEYS.forEach((key) => {
      const zInfo = ZONE_DATA[key];
      if (!zInfo) return;

      const pSub = new THREE.Group();
      pSub.position.set(zInfo.x, 1.5, zInfo.z);

      // Vertical Laser Anchor Line to Ground
      const anchorGeo = new THREE.CylinderGeometry(0.01, 0.01, 1.45, 8);
      const anchorMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.55,
      });
      const anchorLine = new THREE.Mesh(anchorGeo, anchorMat);
      anchorLine.position.y = -0.72;
      pSub.add(anchorLine);

      // Glowing Badge Sphere Head (Clickable Raycast Target)
      const headGeo = new THREE.SphereGeometry(0.18, 24, 24);
      const headMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xd4af37,
        emissiveIntensity: 0.8,
        metalness: 0.95,
        roughness: 0.15,
      });
      const pinHead = new THREE.Mesh(headGeo, headMat);
      pinHead.userData = { zoneId: key };
      pSub.add(pinHead);
      pinObjectsMap.set(key, pinHead);

      // Expanding Radar Pulse Wave Ring
      const waveGeo = new THREE.RingGeometry(0.24, 0.36, 32);
      waveGeo.rotateX(-Math.PI / 2);
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const waveRing = new THREE.Mesh(waveGeo, waveMat);
      waveRing.position.y = -0.06;
      pSub.add(waveRing);

      pinsGroup.add(pSub);
    });

    scene.add(pinsGroup);

    // 8. Animated CAD Radar Scanning Plane (Traverses Floor in 3D)
    const scanPlaneGeo = new THREE.PlaneGeometry(10.5, 0.12);
    scanPlaneGeo.rotateX(-Math.PI / 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.y = 0.08;
    scene.add(scanPlane);

    // 9. Interactive Drag to Orbit & Tilt Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let baseOrbitY = 0;
    let targetOrbitY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      baseOrbitY += dx * 0.007;
      targetOrbitY = baseOrbitY;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Raycast Pin Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(pinObjectsMap.values()), false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const zId = hit.userData.zoneId;
        if (zId && onSelectZoneRef.current) {
          setIsOverview(false);
          setIsTouring(false);
          onSelectZoneRef.current(zId);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
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
      baseOrbitY += dx * 0.008;
      targetOrbitY = baseOrbitY;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 10. Master Animation Loop
    let animId: number;
    let tourTimer = 0;
    let tourIndex = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0018;

      // Handle Automatic Tour Mode (Cycles through all 6 zones)
      if (isTouringRef.current) {
        tourTimer += 0.016;
        if (tourTimer > 4.5) {
          tourTimer = 0;
          tourIndex = (tourIndex + 1) % ZONE_KEYS.length;
          const nextKey = ZONE_KEYS[tourIndex];
          if (onSelectZoneRef.current) {
            onSelectZoneRef.current(nextKey);
          }
        }
      }

      // Determine Target Camera Position and LookAt
      if (isOverviewRef.current) {
        // High-altitude wide isometric overview
        targetCamPos.set(0, 8.5, 7.8);
        targetLookAt.set(0, 0, 0);
        zoneSpotlight.position.set(0, 10, 0);
        zoneSpotlight.target.position.set(0, 0, 0);
      } else {
        const curZone = ZONE_DATA[activeZoneRef.current] || ZONE_DATA.strength;
        targetCamPos.set(curZone.camX, curZone.camY, curZone.camZ);
        targetLookAt.set(curZone.lookX, curZone.lookY, curZone.lookZ);

        // Move spotlight to hover right above active zone
        zoneSpotlight.position.set(curZone.x, 7.5, curZone.z);
        zoneSpotlight.target.position.set(curZone.x, 0, curZone.z);
      }
      zoneSpotlight.target.updateMatrixWorld();

      // Smooth camera motion interpolation
      camera.position.lerp(targetCamPos, 0.045);
      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      // Smooth orbit rotation dampening
      blueprintGroup.rotation.y += (targetOrbitY - blueprintGroup.rotation.y) * 0.08;
      pinsGroup.rotation.y = blueprintGroup.rotation.y;

      // Animated Floor Radar Laser Sweep
      if (showLaserGridRef.current) {
        scanPlane.visible = true;
        scanPlane.position.z = -3.8 + ((time * 1.6) % 7.6);
        scanPlane.rotation.y = blueprintGroup.rotation.y;
      } else {
        scanPlane.visible = false;
      }

      // Animated 3D Body Scan Studio Laser Ring & Avatar
      scanLaserRing.position.y = 0.35 + Math.sin(time * 2.5) * 0.45;
      holoAvatar.rotation.y = time * 1.5;

      // Animated Shimmer Water in Cold Plunge
      waterMesh1.position.y = 0.38 + Math.sin(time * 2.8) * 0.012;

      // Animated Floating 3D Zone Pins & Radar Ripples
      pinsGroup.children.forEach((pSub, idx) => {
        const pinKey = ZONE_KEYS[idx];
        const isCurrentZone = pinKey === activeZoneRef.current;

        pSub.position.y = 1.45 + Math.sin(time * 1.8 + idx) * 0.09;

        // Active pin glows brighter and pulses more vigorously
        const wave = pSub.children[2] as THREE.Mesh;
        if (wave) {
          const scale = 1.0 + (Math.sin(time * 3 + idx) + 1) * (isCurrentZone ? 0.45 : 0.2);
          wave.scale.set(scale, scale, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // 11. Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      slabGeo.dispose();
      slabMat.dispose();
      neonGeo.dispose();
      neonMat.dispose();
      floorTileGeo.dispose();
      floorTileMat.dispose();
      floorTexture.dispose();
      ironRackMat.dispose();
      goldPlateMat.dispose();
      barbellMat.dispose();
      cardioBlack.dispose();
      screenCyan.dispose();
      turfGeo.dispose();
      turfMat.dispose();
      cedarMat.dispose();
      tubMat.dispose();
      waterMat.dispose();
      glassMat.dispose();
      glassCapMat.dispose();
      turntableGeo.dispose();
      turntableMat.dispose();
      holoGeo.dispose();
      holoMat.dispose();
      scanPlaneGeo.dispose();
      scanPlaneMat.dispose();
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  const activeZoneSpecs = ZONE_DATA[activeZoneId] || ZONE_DATA.strength;

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden glass-panel border border-[var(--border-gold)] shadow-2xl select-none flex flex-col justify-between">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Click on pins or drag to rotate 3D floorplan"
      />

      {/* TOP HUD BAR: Blueprint Status, Mode Toggles, and Orbit Hints */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Badge: Live Architectural System */}
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-[var(--border-gold)] text-xs font-black uppercase text-gold-gradient shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-ping" />
            <span>Interactive 3D Architectural Blueprint</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-white/75 font-semibold pl-1">
            <Compass className="w-3 h-3 text-[var(--gold-primary)] animate-spin" style={{ animationDuration: '10s' }} />
            <span>Drag 360° to Orbit • Click 3D Pins to Fly-Through</span>
          </div>
        </div>

        {/* Right Blueprint Controls: Overview, Tour, Laser Grid */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Laser Grid Toggle */}
          <button
            onClick={() => setShowLaserGrid(!showLaserGrid)}
            className={`p-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              showLaserGrid
                ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-md'
                : 'glass-panel text-white/80 border-white/20 hover:border-[var(--border-gold)]'
            }`}
            title={showLaserGrid ? 'Disable Radar Scan Beam' : 'Enable Radar Scan Beam'}
          >
            <Scan className="w-3.5 h-3.5" />
          </button>

          {/* Cinematic Tour Toggle */}
          <button
            onClick={handleToggleTour}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all border cursor-pointer ${
              isTouring
                ? 'bg-[var(--flame-accent)] text-white border-[var(--flame-accent)] shadow-lg animate-pulse'
                : 'glass-panel text-white border-white/20 hover:border-[var(--border-gold)]'
            }`}
            title="Auto-Pilot Facility Tour"
          >
            {isTouring ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isTouring ? 'Pause Tour' : '3D Tour'}</span>
          </button>

          {/* Overview Aerial Zoom Toggle */}
          <button
            onClick={handleToggleOverview}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all border cursor-pointer ${
              isOverview
                ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-lg'
                : 'glass-panel text-white border-white/20 hover:border-[var(--border-gold)]'
            }`}
            title="Toggle Wide Overview / Zone Camera"
          >
            {isOverview ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{isOverview ? 'Close-Up' : 'Overview'}</span>
          </button>
        </div>
      </div>

      {/* BOTTOM HUD STRIP: Real-Time Zone Telemetry & Direct Jump Pills */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
        {/* Active Zone Telemetry Card */}
        <div className="p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-[var(--border-gold)] pointer-events-auto flex items-center gap-4 shadow-2xl max-w-sm">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffd700] via-[#cfa95c] to-[#9a7533] flex items-center justify-center font-black text-black text-base shrink-0 shadow-md">
            {activeZoneSpecs.number}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--gold-bright)]">
              Active Zone Telemetry
            </span>
            <span className="text-sm font-black uppercase text-white truncate max-w-[220px]">
              {activeZoneSpecs.name}
            </span>
            <div className="flex items-center gap-3 text-[10px] text-white/70 font-semibold mt-0.5">
              <span>{activeZoneSpecs.sqft}</span>
              <span>•</span>
              <span className="text-[var(--gold-primary)]">{activeZoneSpecs.capacity}</span>
            </div>
          </div>
        </div>

        {/* 6 Quick-Jump Mini Pills across bottom */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar pointer-events-auto">
          {ZONE_KEYS.map((key) => {
            const z = ZONE_DATA[key];
            const isCur = key === activeZoneId;
            return (
              <button
                key={key}
                onClick={() => {
                  setIsOverview(false);
                  setIsTouring(false);
                  onSelectZone(key);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                  isCur
                    ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)] shadow-md scale-105'
                    : 'bg-black/70 backdrop-blur-md text-white/80 border-white/15 hover:border-[var(--border-gold)] hover:text-white'
                }`}
              >
                <span>{z.number}</span>
                <span className="hidden md:inline ml-1 font-semibold">{z.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
