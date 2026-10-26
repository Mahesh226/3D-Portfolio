import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import SkillsGravity from './components/SkillsGravity';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Advertise from './components/Advertise';
import Footer from './components/Footer';
import ScrollAnimationManager from './components/ScrollAnimationManager';
import RobotCompanion from './components/RobotCompanion';
import FloatingParticles from './components/FloatingParticles';
import SectionTransition from './components/SectionTransition';
import CursorSpotlight from './components/CursorSpotlight';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Global cursor-following light for immediate feedback */}
      <CursorSpotlight />
      
      {/* Background ambient lights - adaptive to theme */}
      <div className={`fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/${theme === 'dark' ? '15' : '5'} blur-[150px] rounded-full pointer-events-none z-0 transition-all duration-1000`} />
      <div className={`fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/${theme === 'dark' ? '10' : '5'} blur-[150px] rounded-full pointer-events-none z-0 transition-all duration-1000`} />

      {/* Floating particles overlay */}
      <FloatingParticles theme={theme} />

      {/* Sticky robot companion */}
      <RobotCompanion />

      {/* GSAP scroll animation coordinator */}
      <ScrollAnimationManager />

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow z-10">
        <Hero theme={theme} />

        <div id="scroll-sections" className="relative z-20">
          <Experience />
          
          <SectionTransition variant="primary" />
          <SkillsGravity />
          
          <SectionTransition variant="accent" />
          <Projects />
          
          <SectionTransition variant="secondary" />
          <Education />
          
          <SectionTransition variant="primary" />
          <About />
          
          <SectionTransition variant="accent" />
          <Advertise />
          
          <SectionTransition variant="primary" />
          <Contact />
        </div>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
