# RAW FIT GYM — Ultra-Luxury Fitness & Franchise Web Platform

A Next.js 16 (App Router) + TypeScript + Tailwind CSS web application engineered for state-of-the-art UI/UX, surpassing the original StoreBox site with interactive 3D physics, real-time financial modeling, and dual-mode user journeys.

---

## 🌟 Key Highlights & Architectural Features

### 1. 🎨 Ultra-Luxury Visual Design & Theme System
- **Dark Mode (Onyx & Gold)**: Deep obsidian `#070708` background with polished midas gold `#d4af37` and flame accents.
- **Light Mode (Ivory & Champagne)**: Elegant `#f8f6f0` luxury ivory background with warm bronze accents.
- **Glassmorphic Depth**: Frosted backdrop filters, glowing gold borders, and subtle noise/grid textures.
- **Dual Perspective Switcher**:
  - **Investor Mode**: Focuses on CAPEX, Unit Economics, ROI Pro-Forma, 6 Revenue Engines, and Turnkey Roadmap.
  - **Athlete Mode**: Focuses on Training Zones, Biomechanical Racks, 4°C Cryo Plunge & Saunas, Class Timetables, and BMI Planning.

### 2. 🪐 Interactive 3D Three.js Olympic Weight Plate
- Real-time 3D rendered Olympic weight plate powered by Three.js.
- Full 360° mouse drag and touch swipe orbit controls with inertia damping.
- Live edition switcher: **Prime 25KG (Brushed Gold)** vs **Luxury 50KG (Black Onyx)**.

### 3. 📊 Real-Time Franchise ROI & Feasibility Simulator
- Interactive parameter sliders:
  - Format (Raw Fit Prime ₹1.80 Cr vs Raw Fit Luxury ₹3.20 Cr)
  - City Demographics (Tier 1 Metro, Tier 2 Hub, Tier 3 Growth)
  - Carpet Area (2,800 to 9,000 SQ FT)
  - Active Subscribed Members (300 to 1,400)
  - Personal Training Uptake % (10% to 45%)
- Instant dynamic recalculation of:
  - Monthly Gross Turnover
  - Net Monthly EBITDA & Margin %
  - Projected Annual Profit
  - Estimated Payback Horizon in Months
  - Annual Return on Capital (ROI %)
- Client-side persistence and scenario saving with celebratory confetti feedback.

### 4. 🏋️ Facility Masterplan (6 Training Zones)
- Interactive tabbed explorer for all 6 zones:
  - 01 Biomechanical Strength Arena (Eleiko & Hammer Strength)
  - 02 High-Altitude Cardio Deck (Woodway & StairMaster)
  - 03 Functional Turf & Combat Bay (Tank M1 Sleds & Boxing Rigs)
  - 04 Contrast Therapy Suite (4°C Cryo Plunge & Nordic Cedar Sauna)
  - 05 Executive Members Lounge & RAW Fuel Bar (Billiards & Organic Shakes)
  - 06 3D Body Composition & Media Studio (Styku Medical Scanners)

### 5. 🥊 Curated Masterclasses & Timetable
- Filter by Day of Week (Monday through Sunday)
- Filter by Category (Hypertrophy, HIIT, Strength, Combat, Mobility)
- 1-click VIP Trial Pass reservation modal

### 6. 📐 Athletic Physique & Calorie Blueprint
- Interactive BMI, BMR, and TDEE calculator
- Custom daily caloric energy targets, protein requirements, and workout split recommendations.

### 7. 🔄 Draggable Physical Transformation Slider
- Interactive before/after split slider showing real 16-week member results.

### 8. 📱 Seamless Franchise & VIP Day Pass Lead Funnel
- Interactive modal with instant local state persistence.
- Zero external backend required — pure client-side Next.js performance.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
