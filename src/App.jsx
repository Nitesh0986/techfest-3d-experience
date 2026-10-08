import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Domains from './components/Domains';
import Timeline from './components/Timeline';
import Challenge from './components/Challenge';
import FutureLab from './components/FutureLab';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMouseParallax } from './hooks/useMouseParallax';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHeroObject, setSelectedHeroObject] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const { scrollProgress, activeSection } = useScrollProgress();
  const mouse = useMouseParallax();

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Loading Experience */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Futuristic Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Cyber Grid & Scanlines subtle background overlays */}
      <div className="fixed inset-0 cyber-grid opacity-25 pointer-events-none -z-20" />
      <div className="fixed inset-0 scanlines opacity-30 pointer-events-none -z-10" />

      {/* Fixed Sci-Fi Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenModal={() => setIsRegisterOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative flex flex-col">
        {/* 1. HERO SECTION WITH 3D CANVAS */}
        <Hero
          scrollProgress={scrollProgress}
          mouse={mouse}
          selectedObject={selectedHeroObject}
          setSelectedObject={setSelectedHeroObject}
          onOpenRegisterModal={() => setIsRegisterOpen(true)}
        />

        {/* 2. ABOUT THE FESTIVAL */}
        <About />

        {/* 3. DOMAINS / EXPERIENCES */}
        <Domains />

        {/* 4. 3D EVENT TIMELINE */}
        <Timeline />

        {/* 5. CHALLENGE / PARTICIPATION */}
        <Challenge onOpenRegisterModal={() => setIsRegisterOpen(true)} />

        {/* 6. FUTURE LAB (INTERACTIVE 3D ARTIFACTS) */}
        <FutureLab onOpenRegisterModal={() => setIsRegisterOpen(true)} />

        {/* 7. CALL TO ACTION */}
        <CTA onOpenRegisterModal={() => setIsRegisterOpen(true)} />
      </main>

      {/* 8. FOOTER */}
      <Footer />

      {/* Admission / Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
