import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer, staggerItem, viewport, headingWord, headingContainer } from '../utils/animations';

// 3D mouse-tilt card hook
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

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
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const About = () => {
  const stats = [
    { value: '2+', label: 'Years Experience', color: 'primary' },
    { value: 'AI', label: 'Specialist', color: 'secondary' },
    { value: '3+', label: 'Projects Delivered', color: 'primary' },
    { value: 'MCA', label: 'Postgraduate', color: 'secondary' },
  ];

  return (
    <section
      className="py-32 relative z-10 min-h-screen flex flex-col justify-center transition-colors duration-500"
      id="about"
      data-section="about"
      style={{ perspective: '1200px' }}
    >
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Heading with 3D word reveal */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-16 overflow-hidden"
          style={{ perspective: '600px' }}
        >
          <div className="flex flex-wrap gap-x-4 items-baseline">
            {['About', 'Me'].map((word, i) => (
              <motion.span
                key={word}
                variants={headingWord}
                className={`text-5xl lg:text-7xl font-black tracking-tighter inline-block ${i === 1 ? 'text-primary drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]' : ''
                  }`}
                style={{ color: i === 0 ? 'var(--text-primary)' : undefined }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div
            variants={fadeUp}
            className="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-6"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Bio paragraphs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-3 space-y-7"
          >
            {[
              <>I'm a passionate <span className="text-primary font-bold">AI Trainer</span> and{' '}
                <span className="text-secondary font-bold">Software Engineer</span> based in India,
                with a Master's in Computer Application from SPPU, Pune. I specialize in shaping AI model
                behavior through meticulous prompt engineering, data evaluation, and quality-driven feedback.</>,
              <>With experience at <span className="text-primary/80 font-semibold">Telus Digital</span>{' '}
                <span className="text-primary/80 font-semibold"></span>, I've worked on projects like Genesis ITT
                and Diamond — evaluating and refining AI-generated responses for accuracy,
                relevance, and clarity. I bring a meticulous eye to every interaction between humans and machines.</>,
              <>Beyond AI, I build modern web applications with{' '}
                <span className="text-secondary font-semibold">React, TypeScript</span>, and{' '}
                <span className="text-secondary font-semibold">Node.js</span> — combining clean code
                architecture with cutting-edge design. I believe technology should feel as good as it works.</>
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="text-base lg:text-lg leading-relaxed font-light transition-colors duration-500"
                style={{ color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', opacity: i === 0 ? 0.9 : 1 }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* 3D Stat Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-2 grid grid-cols-2 gap-5"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <TiltCard className="w-full">
                  <motion.div
                    whileHover={{ translateZ: 20 }}
                    className="relative group cursor-default backdrop-blur-md border p-6 text-center overflow-hidden rounded-2xl transition-all duration-500"
                    style={{
                      backgroundColor: 'var(--glass-bg)',
                      borderColor: 'var(--glass-border)',
                      boxShadow: 'var(--card-shadow)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Ambient glow on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${stat.color === 'primary' ? 'bg-primary/8' : 'bg-secondary/8'
                      }`} />
                    {/* Corner accent */}
                    <div className={`absolute top-0 left-0 w-12 h-12 rounded-br-2xl opacity-20 ${stat.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                      }`} style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />

                    <div className="relative z-10">
                      <motion.div
                        className={`text-4xl font-black mb-2 ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'
                          }`}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3 + idx * 0.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold" style={{ color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
