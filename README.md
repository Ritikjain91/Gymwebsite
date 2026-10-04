# RAW FIT GYM — Ultra-Luxury Fitness & Franchise Web Platform

A Next.js 16 + TypeScript web application paired with an Express.js & PostgreSQL backend. Engineered to provide an exceptional UI/UX, surpassing the original StoreBox site with interactive 3D physics, real-time financial modeling, and dual-mode user journeys.

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
- Directly connects to `/api/calculate` backend route to store leads.

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

### 8. ⚡ Fullstack Backend (Node.js + Express + PostgreSQL)
- Dedicated Express server (`server/server.ts`) with PostgreSQL connection pool (`server/db.ts`)
- Pre-built `server/schema.sql` database schema for:
  - `franchise_inquiries`
  - `tour_bookings`
  - `calculator_leads`
  - `member_trial_bookings`
- **Zero-Crash Resilient Architecture**: Automatically detects PostgreSQL availability. If a local database is not yet initialized, it gracefully activates an in-memory repository fallback.

---

## 🚀 Running Locally

Both the Next.js frontend and Express backend boot concurrently with a single command:

```bash
# Start both Backend (Port 5000) and Next.js Frontend (Port 3000)
npm run dev
```

### URLs
- **Web Application**: [http://localhost:3000](http://localhost:3000)
- **Express Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
