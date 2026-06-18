import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { staggerContainer, staggerItem, viewport, headingWord, headingContainer, fadeUp } from '../utils/animations';

// Animated counter hook
function useCounter(target: number, duration = 1.5) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(start * 100) / 100);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

// 3D tilt card
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 160, damping: 28 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// GPA card with animated counter
function GpaDisplay({ score, color }: { score: string; color: 'primary' | 'secondary' }) {
  const numericVal = parseFloat(score.replace(/[^0-9.]/g, ''));
  const { count, start } = useCounter(numericVal, 1.8);
  return (
    <motion.div onViewportEnter={start} viewport={{ once: true }}>
      <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-1 opacity-50" style={{ color: 'var(--text-primary)' }}>
        Performance Metric
      </p>
      <p className={`text-3xl font-bold ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
        CGPA: {count.toFixed(2)}
      </p>
    </motion.div>
  );
}

const Education = () => {
  const eduData = [
    {
      degree: "MCA", fullDegree: "Master Of Computer Application",
      institution: "Siddhant Institute of Business and Management, Pune (SPPU)",
      year: "2024", score: "CGPA: 7.75",
      description: "Specialized in advanced computing and software architecture."
    },
    {
      degree: "BCA", fullDegree: "Bachelor of Computer Application",
      institution: "Jai Hind Et's Zulal Bhilajirao Patil College, Dhule (NMU)",
      year: "2022", score: "CGPA: 9.46",
      description: "Foundational studies in computer applications and data structures."
    }
  ];

  const certs = [
    { title: "Software Testing", org: "QSpider Institute" },
    { title: "Tally ERP 9.0", org: "GST Specialist" }
  ];

  const highlights = [
    "AI Job Simulation (Cognizant)",
    "Tata Crucible Campus Quiz",
    "Mathematics Aptitude Prof."
  ];

  return (
    <section
      className="py-24 relative z-10 min-h-screen flex flex-col justify-center overflow-visible transition-colors duration-500"
      id="education"
      data-section="education"
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-20">

        {/* 3D Heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 overflow-hidden"
          style={{ perspective: '700px' }}
        >
          <div className="flex flex-wrap gap-x-4 items-baseline">
            {['Education', '&', 'Extra'].map((word, i) => (
              <motion.span
                key={i}
                variants={headingWord}
                className={`text-5xl lg:text-7xl font-black tracking-tighter inline-block ${
                  i === 2 ? 'text-secondary drop-shadow-[0_0_20px_rgba(112,0,255,0.4)]' :
                  i === 1 ? 'opacity-20 font-light' : ''
                }`}
                style={{ color: i !== 2 ? 'var(--text-primary)' : undefined }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div variants={fadeUp} className="h-1 w-24 bg-gradient-to-r from-secondary to-transparent mt-6" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:auto-rows-[minmax(160px,auto)]"
          style={{ perspective: '1200px' }}
        >
          {/* MCA – Large Card */}
          <motion.div variants={staggerItem} className="lg:col-span-8 lg:row-span-2">
            <TiltCard className="h-full">
              <motion.div
                className="group relative h-full p-6 lg:p-10 rounded-[2rem] border backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,240,255,0.1)]"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                  transformStyle: 'preserve-3d',
                  minHeight: '320px',
                }}
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

                {/* Decorative orb */}
                <motion.div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-primary/10 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-4 rounded-full border border-primary/10" />
                </motion.div>

                {/* Cap icon */}
                <div className="absolute top-6 right-6 opacity-8 group-hover:opacity-15 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="0.8">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <motion.span
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold border border-primary/20 tracking-widest uppercase"
                        whileHover={{ scale: 1.05, translateZ: 8 }}
                      >
                        Postgraduate
                      </motion.span>
                      <span className="text-primary font-mono text-xs font-bold">{eduData[0].year}</span>
                    </div>

                    <motion.h3
                      className="text-4xl lg:text-6xl font-black mb-3 leading-none tracking-tighter"
                      style={{ color: 'var(--text-primary)', transformStyle: 'preserve-3d' }}
                      whileHover={{ translateZ: 12 }}
                    >
                      {eduData[0].degree}
                    </motion.h3>
                    <p className="text-base lg:text-lg font-light max-w-xl opacity-80" style={{ color: 'var(--text-secondary)' }}>
                      {eduData[0].fullDegree} at{' '}
                      <span className="text-primary/80">{eduData[0].institution}</span>
                    </p>
                  </div>

                  <div className="mt-8">
                    <GpaDisplay score={eduData[0].score} color="primary" />
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* BCA – Side Card */}
          <motion.div variants={staggerItem} className="lg:col-span-4 lg:row-span-2">
            <TiltCard className="h-full">
              <motion.div
                className="group h-full p-6 rounded-[1.5rem] border backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-secondary/30 hover:shadow-[0_20px_60px_rgba(112,0,255,0.1)]"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                  transformStyle: 'preserve-3d',
                  minHeight: '280px',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]" />

                <div className="relative h-full flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
                  <div>
                    <div className="mb-4">
                      <span className="text-secondary font-mono text-xs font-bold">{eduData[1].year}</span>
                    </div>
                    <motion.h3
                      className="text-3xl font-black mb-3 tracking-tighter"
                      style={{ color: 'var(--text-primary)', transformStyle: 'preserve-3d' }}
                      whileHover={{ translateZ: 10, color: '#7000ff' }}
                    >
                      {eduData[1].degree}
                    </motion.h3>
                    <p className="text-xs font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {eduData[1].institution}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <GpaDisplay score={eduData[1].score} color="secondary" />
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={staggerItem} className="lg:col-span-6 lg:row-span-1">
            <motion.div
              className="group h-full p-6 rounded-[1.5rem] border backdrop-blur-sm transition-all duration-500 hover:border-secondary/20"
              style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', minHeight: '140px' }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(112,0,255,0.08)' }}
            >
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-mono text-secondary mb-5 flex items-center font-bold">
                <span className="w-5 h-px bg-secondary mr-3 inline-block" />
                Certifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {certs.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="group/cert"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <h5 className="font-bold text-sm leading-tight group-hover/cert:text-secondary transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h5>
                    <p className="text-xs opacity-50 mt-1" style={{ color: 'var(--text-secondary)' }}>{cert.org}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Extra-Curricular */}
          <motion.div variants={staggerItem} className="lg:col-span-6 lg:row-span-1">
            <motion.div
              className="group h-full p-6 rounded-[1.5rem] border backdrop-blur-sm transition-all duration-500 hover:border-primary/20"
              style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', minHeight: '140px' }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,240,255,0.06)' }}
            >
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-mono text-primary mb-5 flex items-center font-bold">
                <span className="w-5 h-px bg-primary mr-3 inline-block" />
                Highlights
              </h4>
              <div className="space-y-3">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 group/hl"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/hl:bg-primary flex-shrink-0 transition-colors"
                      whileInView={{ scale: [0, 1.4, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    />
                    <p className="text-xs font-light group-hover/hl:translate-x-1.5 transition-transform duration-300" style={{ color: 'var(--text-secondary)' }}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
