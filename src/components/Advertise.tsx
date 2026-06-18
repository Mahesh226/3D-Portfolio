import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Cpu, Layers, Smartphone, Paintbrush, ArrowRight, Zap } from 'lucide-react';
import { staggerContainer, staggerItem, viewport, headingWord, headingContainer, fadeUp, scaleUp } from '../utils/animations';

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 26 });

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

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "3D Dynamics & Physics",
    desc: "Interactive Spline integrations, custom WebGL particles, and physical simulations that keep visitors mesmerised.",
    span: "md:col-span-2",
    accent: '#00f0ff',
    gradient: 'from-primary/15',
  },
  {
    icon: <Paintbrush className="w-6 h-6 text-secondary" />,
    title: "Cyberpunk Aesthetics",
    desc: "Immersive glassmorphism, neon glow fields, and premium dark-mode typography crafted pixel by pixel.",
    span: "md:col-span-1",
    accent: '#7000ff',
    gradient: 'from-secondary/15',
  },
  {
    icon: <Layers className="w-6 h-6 text-accent" />,
    title: "Fluid Orchestration",
    desc: "GSAP scroll triggers and Framer Motion state transitions that make the whole page feel alive.",
    span: "md:col-span-1",
    accent: '#ff003c',
    gradient: 'from-accent/15',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: "Performance & SEO",
    desc: "Ultra-fast Vite bundles, optimised React state, and structured microdata so you rank on page one.",
    span: "md:col-span-2",
    accent: '#00f0ff',
    gradient: 'from-primary/15',
  },
];

export default function Advertise() {
  const handleCTAClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('prefill-contact', {
      detail: { message: "Hey Mahesh! I saw your portfolio and loved the design. I want to build a premium, highly-interactive website just like this one. Let's chat!" }
    }));
  };

  return (
    <section
      id="services"
      className="py-32 relative z-10 min-h-screen flex flex-col justify-center transition-colors duration-500"
      data-section="services"
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* 3D Heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-20 overflow-hidden"
          style={{ perspective: '800px' }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <motion.span
              className="px-4 py-1.5 text-[9px] font-mono tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 rounded-full inline-flex items-center gap-2"
              animate={{ boxShadow: ['0 0 0px rgba(0,240,255,0)', '0 0 20px rgba(0,240,255,0.3)', '0 0 0px rgba(0,240,255,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" /> Custom Web Creation
            </motion.span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-4 items-baseline">
            {['Want', 'a', 'Portfolio', 'Like', 'This?'].map((word, i) => (
              <motion.span
                key={i}
                variants={headingWord}
                className={`text-4xl lg:text-6xl font-black tracking-tighter inline-block ${
                  i === 4 ? 'text-primary drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'text-white'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div variants={fadeUp} className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
          <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg font-light max-w-xl mx-auto text-slate-400">
            I design and build premium, interactive websites tailored to display your skills and capture user attention.
          </motion.p>
        </motion.div>

        {/* 3D Bento Feature Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          style={{ perspective: '1100px' }}
        >
          {features.map((feat, idx) => (
            <motion.div key={idx} variants={staggerItem} className={feat.span}>
              <TiltCard className="h-full">
                <div
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 h-full transition-all duration-500 hover:border-white/15`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  {/* Corner orb */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700"
                    style={{ backgroundColor: feat.accent }} />

                  <div className="relative z-10 flex flex-col h-full justify-between" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 transition-transform"
                      whileHover={{ translateZ: 16, scale: 1.15, borderColor: feat.accent }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {feat.icon}
                    </motion.div>
                    <div>
                      <motion.h3
                        className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-primary"
                        whileHover={{ translateZ: 8 }}
                        style={{ transformStyle: 'preserve-3d', color: 'white' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = feat.accent)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                      >
                        {feat.title}
                      </motion.h3>
                      <p className="text-sm font-light text-slate-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <motion.button
            onClick={handleCTAClick}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-sm tracking-wider uppercase overflow-hidden cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(0,240,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Zap className="w-4 h-4 text-primary group-hover:animate-bounce" />
            <span className="relative z-10">Let's Build Your Dream Site</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
