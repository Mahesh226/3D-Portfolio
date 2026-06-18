import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    // Track mouse with GSAP for smooth but high-performance movement
    // quickTo is much faster than gsap.to for frequent updates like mousemove
    const xTo = gsap.quickTo(spotlight, "x", { duration: 0.2, ease: "power2.out" });
    const yTo = gsap.quickTo(spotlight, "y", { duration: 0.2, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the spotlight
      xTo(e.clientX - 150);
      yTo(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-30 opacity-40 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0) 70%)',
        filter: 'blur(30px)',
        willChange: 'transform',
      }}
    />
  );
};

export default CursorSpotlight;
