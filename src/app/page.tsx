import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ProgramsSection from '../components/ProgramsSection';
import TransformationSlider from '../components/TransformationSlider';
import VisualStorytellingSection from '../components/VisualStorytellingSection';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutSection from '../components/AboutSection';
import ClassSchedule from '../components/ClassSchedule';
import BmiCalculator from '../components/BmiCalculator';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FaqSection from '../components/FaqSection';
import CtaBanner from '../components/CtaBanner';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FranchiseModal from '../components/FranchiseModal';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import MobileActionBar from '../components/MobileActionBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400 relative pb-16 sm:pb-0">
      {/* 01. Sticky Minimal Luxury Navigation */}
      <Navbar />

      {/* 02. Section 1: Full-Screen Cinematic Hero */}
      <Hero />

      {/* 03. Section 2: Large Statistics Editorial Strip */}
      <StatsSection />

      {/* 04. Section 3: Programs Using Large Editorial Cards */}
      <ProgramsSection />

      {/* 05. Section 4: Interactive Draggable Transformation Section */}
      <TransformationSlider />

      {/* 06. Section 5: 3D / Visual Storytelling Section */}
      <VisualStorytellingSection />

      {/* 07. Section 6: Why Choose Us (Editorial Layout 01–04) */}
      <WhyChooseUs />

      {/* 08. About & 30,000 SQ FT Facility Sanctuary */}
      <AboutSection />

      {/* 09. Interactive Masterclasses Timetable */}
      <ClassSchedule />

      {/* 10. Athletic Biometrics & Caloric Target Calculator */}
      <BmiCalculator />

      {/* 11. Section 7: Realistic Testimonials */}
      <TestimonialsSection />

      {/* 12. Section 8: Premium Membership / Pricing */}
      <PricingSection />

      {/* 13. Frequently Asked Questions */}
      <FaqSection />

      {/* 14. Section 9: Strong Final CTA Banner */}
      <CtaBanner />

      {/* 15. Contact / Instant VIP Trial Booking & Location Map */}
      <ContactSection />

      {/* 16. Section 10: Premium Agency Footer */}
      <Footer />

      {/* Interactive Global VIP Booking & Franchise Modal */}
      <FranchiseModal />

      {/* Floating Action Triggers */}
      <FloatingWhatsApp />
      <MobileActionBar />
    </main>
  );
}
