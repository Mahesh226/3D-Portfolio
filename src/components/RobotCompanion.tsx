import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RobotCompanion = () => {
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const robot = robotRef.current;
    if (!robot) return;

    // Fade in after hero
    gsap.set(robot, { opacity: 0, scale: 0.6, x: 40 });

    const fadeInTrigger = ScrollTrigger.create({
      trigger: '#scroll-sections',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(robot, { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' });
      },
      onLeaveBack: () => {
        gsap.to(robot, { opacity: 0, scale: 0.6, x: 40, duration: 0.6, ease: 'power2.in' });
      },
    });

    // Floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(robot, { y: -15, duration: 3, ease: 'sine.inOut' });
    floatTl.to(robot, { y: 10, duration: 2.5, ease: 'sine.inOut' });

    // Rotate based on scroll progress
    gsap.to(robot, {
      scrollTrigger: {
        trigger: '#scroll-sections',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
      rotation: 15,
      ease: 'none',
    });

    // Glow intensity changes per section
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const colors = [
            'drop-shadow(0 0 20px rgba(0,240,255,0.6)) drop-shadow(0 0 40px rgba(0,240,255,0.3))',
            'drop-shadow(0 0 20px rgba(112,0,255,0.6)) drop-shadow(0 0 40px rgba(112,0,255,0.3))',
            'drop-shadow(0 0 20px rgba(0,240,255,0.8)) drop-shadow(0 0 50px rgba(0,240,255,0.4))',
            'drop-shadow(0 0 20px rgba(112,0,255,0.5)) drop-shadow(0 0 40px rgba(112,0,255,0.3))',
            'drop-shadow(0 0 20px rgba(0,240,255,0.6)) drop-shadow(0 0 40px rgba(0,240,255,0.3))',
            'drop-shadow(0 0 15px rgba(112,0,255,0.4)) drop-shadow(0 0 30px rgba(112,0,255,0.2))',
          ];
          gsap.to(robot, {
            filter: colors[index % colors.length],
            duration: 0.8,
          });
        },
        onEnterBack: () => {
          const colors = [
            'drop-shadow(0 0 20px rgba(0,240,255,0.6)) drop-shadow(0 0 40px rgba(0,240,255,0.3))',
            'drop-shadow(0 0 20px rgba(112,0,255,0.6)) drop-shadow(0 0 40px rgba(112,0,255,0.3))',
            'drop-shadow(0 0 20px rgba(0,240,255,0.8)) drop-shadow(0 0 50px rgba(0,240,255,0.4))',
            'drop-shadow(0 0 20px rgba(112,0,255,0.5)) drop-shadow(0 0 40px rgba(112,0,255,0.3))',
            'drop-shadow(0 0 20px rgba(0,240,255,0.6)) drop-shadow(0 0 40px rgba(0,240,255,0.3))',
            'drop-shadow(0 0 15px rgba(112,0,255,0.4)) drop-shadow(0 0 30px rgba(112,0,255,0.2))',
          ];
          gsap.to(robot, {
            filter: colors[index % colors.length],
            duration: 0.8,
          });
        },
      });
    });

    // Fade out at contact
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 40%',
      onEnter: () => {
        gsap.to(robot, { opacity: 0, scale: 0.5, duration: 0.8, ease: 'power2.in' });
      },
      onLeaveBack: () => {
        gsap.to(robot, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' });
      },
    });

    return () => {
      floatTl.kill();
      fadeInTrigger.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={robotRef}
      className="robot-companion"
      aria-hidden="true"
    >
      {/* Robot Head SVG — inspired by the Spline robot aesthetic */}
      <svg
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Antenna */}
        <line x1="60" y1="8" x2="60" y2="28" stroke="url(#antenna-grad)" strokeWidth="2" />
        <circle cx="60" cy="6" r="4" fill="#00f0ff" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect x="20" y="28" width="80" height="65" rx="16" 
          fill="url(#head-fill)" stroke="url(#head-stroke)" strokeWidth="1.5" />
        
        {/* Face plate */}
        <rect x="30" y="38" width="60" height="40" rx="10" 
          fill="rgba(0,0,0,0.4)" stroke="rgba(0,240,255,0.15)" strokeWidth="0.5" />

        {/* Eyes */}
        <ellipse cx="43" cy="55" rx="8" ry="7" fill="#00f0ff" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="77" cy="55" rx="8" ry="7" fill="#00f0ff" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </ellipse>
        
        {/* Eye inner glow */}
        <ellipse cx="43" cy="55" rx="4" ry="3.5" fill="white" opacity="0.8" />
        <ellipse cx="77" cy="55" rx="4" ry="3.5" fill="white" opacity="0.8" />

        {/* Mouth */}
        <rect x="45" y="68" width="30" height="3" rx="1.5" fill="#00f0ff" opacity="0.4" />

        {/* Neck */}
        <rect x="45" y="93" width="30" height="12" rx="4"
          fill="url(#neck-fill)" stroke="rgba(0,240,255,0.1)" strokeWidth="0.5" />

        {/* Shoulder line */}
        <path d="M25 105 Q60 115 95 105" stroke="url(#shoulder-grad)" strokeWidth="2" fill="none" />

        {/* Body top hint */}
        <rect x="30" y="108" width="60" height="28" rx="8"
          fill="url(#body-fill)" stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
        
        {/* Chest light */}
        <circle cx="60" cy="122" r="5" fill="#00f0ff" opacity="0.3">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="122" r="2" fill="#00f0ff" opacity="0.8" />

        {/* Gradients */}
        <defs>
          <linearGradient id="antenna-grad" x1="60" y1="8" x2="60" y2="28">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="head-fill" x1="20" y1="28" x2="100" y2="93">
            <stop offset="0%" stopColor="rgba(20,20,35,0.9)" />
            <stop offset="100%" stopColor="rgba(10,10,20,0.95)" />
          </linearGradient>
          <linearGradient id="head-stroke" x1="20" y1="28" x2="100" y2="93">
            <stop offset="0%" stopColor="rgba(0,240,255,0.3)" />
            <stop offset="50%" stopColor="rgba(112,0,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,240,255,0.1)" />
          </linearGradient>
          <linearGradient id="neck-fill" x1="45" y1="93" x2="75" y2="105">
            <stop offset="0%" stopColor="rgba(15,15,30,0.8)" />
            <stop offset="100%" stopColor="rgba(10,10,20,0.9)" />
          </linearGradient>
          <linearGradient id="shoulder-grad" x1="25" y1="105" x2="95" y2="105">
            <stop offset="0%" stopColor="rgba(0,240,255,0)" />
            <stop offset="50%" stopColor="rgba(0,240,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,240,255,0)" />
          </linearGradient>
          <linearGradient id="body-fill" x1="30" y1="108" x2="90" y2="136">
            <stop offset="0%" stopColor="rgba(15,15,30,0.7)" />
            <stop offset="100%" stopColor="rgba(8,8,18,0.8)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default RobotCompanion;
