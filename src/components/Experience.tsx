import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer, staggerItem, staggerItemLeft, viewport, headingWord, headingContainer } from '../utils/animations';

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 28 });

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

const Experience = () => {
  const bulletPoints = [
    'Evaluated and reviewed AI-generated responses for accuracy, relevance, factual correctness, and policy compliance.',
    'Created and refined prompts to guide AI models for better outputs. Identified errors, inconsistencies, and bias in AI responses and provided detailed feedback.',
    'Identified hallucinations, logical inconsistencies, bias, and factual errors in AI outputs.',
    'Leveraged AI tools (ChatGPT, Claude, Gemini) and annotation platforms to streamline data review and prompt testing, accelerating workflows and improving example quality.',
    'Communicated with cross-functional teams & contributed to documentation.',
  ];

  return (
    <section
      className="py-32 relative z-10 min-h-screen flex flex-col justify-center transition-colors duration-500"
      id="experience"
      data-section="experience"
    >
      <div className="container mx-auto px-6 max-w-5xl">

        {/* 3D Heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20 overflow-hidden"
          style={{ perspective: '700px' }}
        >
          <div className="flex flex-wrap gap-x-4 items-baseline">
            {['Work', 'Experience'].map((word, i) => (
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
          <motion.div variants={fadeUp} className="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute left-4 md:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
            style={{ originY: 0 }}
          />

          <div className="ml-12 md:ml-10 relative">
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300, delay: 0.4 }}
              className="absolute -left-[52px] md:-left-[46px] top-4 z-10"
            >
              <div className="w-5 h-5 rounded-full border-2 border-primary bg-[var(--bg-primary)] relative">
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary"
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* 3D Experience Card */}
            <TiltCard className="w-full">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative group p-8 lg:p-10 rounded-[2rem] border backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_60px_rgba(0,240,255,0.07)]"
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--glass-border)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                {/* Corner marker */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.04]">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="80" cy="0" r="80" stroke="#00f0ff" strokeWidth="1" />
                    <circle cx="80" cy="0" r="50" stroke="#00f0ff" strokeWidth="0.5" />
                  </svg>
                </div>

                {/* Header */}
                <motion.div variants={staggerItem} className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                  <div>
                    <motion.h3
                      className="text-3xl lg:text-4xl font-black tracking-tight"
                      style={{ color: 'var(--text-primary)', transformStyle: 'preserve-3d' }}
                      whileHover={{ translateZ: 10, color: '#00f0ff' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      AI Trainer
                    </motion.h3>
                    <motion.h4 className="text-lg font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Telus Digital
                    </motion.h4>
                  </div>
                  <motion.div
                    variants={staggerItem}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 font-mono tracking-widest text-primary text-xs uppercase font-bold whitespace-nowrap"
                  >
                    02/2025 – Present · Remote
                  </motion.div>
                </motion.div>

                {/* Bullet list */}
                <motion.ul variants={staggerContainer} className="space-y-4">
                  {bulletPoints.map((point, i) => (
                    <motion.li
                      key={i}
                      variants={staggerItemLeft}
                      className="flex gap-4 group/item"
                    >
                      <motion.span
                        className="mt-2.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40"
                        whileInView={{ scale: [0, 1.5, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4, type: 'spring' }}
                      />
                      <p className="text-base leading-relaxed font-light group-hover/item:translate-x-1 transition-transform duration-300" style={{ color: 'var(--text-secondary)' }}>
                        {point}
                      </p>
                    </motion.li>
                  ))}

                  {/* Projects tag */}
                  <motion.li variants={staggerItemLeft} className="flex gap-4 mt-2 pt-4 border-t border-white/5">

                    <p className="text-base leading-relaxed font-light">
                      <span className="font-bold uppercase tracking-wider text-sm mr-2" style={{ color: 'var(--text-primary)' }}></span>

                    </p>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
