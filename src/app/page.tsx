import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandPhilosophy from '../components/BrandPhilosophy';
import FormatComparison from '../components/FormatComparison';
import RoiCalculator from '../components/RoiCalculator';
import ZoneExplorer from '../components/ZoneExplorer';
import RevenueEngine from '../components/RevenueEngine';
import Roadmap from '../components/Roadmap';
import ClassSchedule from '../components/ClassSchedule';
import BmiCalculator from '../components/BmiCalculator';
import TransformationSlider from '../components/TransformationSlider';
import SiteCriteria from '../components/SiteCriteria';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import FranchiseModal from '../components/FranchiseModal';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400 relative">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Interactive 3D Plate Viewer */}
      <Hero />

      {/* Brand Ethos & Institutional Standards */}
      <BrandPhilosophy />

      {/* Prime (₹1.80 Cr) vs Luxury (₹3.20 Cr) Formats */}
      <FormatComparison />

      {/* Interactive Franchise ROI Simulator */}
      <RoiCalculator />

      {/* 6 Training Zones & Recovery Suite */}
      <ZoneExplorer />

      {/* 6 Diversified Revenue Streams */}
      <RevenueEngine />

      {/* 7-Step Turnkey Launch Roadmap */}
      <Roadmap />

      {/* Curated Masterclasses Timetable (Athlete View) */}
      <ClassSchedule />

      {/* Athletic Biometrics & Caloric Calculator */}
      <BmiCalculator />

      {/* Draggable Physical Transformation Slider */}
      <TransformationSlider />

      {/* Commercial Property Diligence & Criteria */}
      <SiteCriteria />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Lead Capture Modal */}
      <FranchiseModal />
    </main>
  );
}
