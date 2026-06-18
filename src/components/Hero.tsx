import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SplineScene } from './SplineScene';

interface HeroProps {
  theme: 'dark' | 'light';
}

const Hero = ({ theme }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentY     = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.88]);
  const opacity      = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500"
      id="hero"
      style={{ backgroundColor: 'var(--bg-primary)', perspective: '1000px' }}
    >
      {/* Spline Background */}
      <div className="absolute inset-0 z-0 spline-container">
        <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-black/20 via-transparent to-black/40 opacity-100'
            : 'bg-gradient-to-b from-white/10 via-transparent to-white/30 opacity-60'
        }`} />
        <SplineScene
          scene="https://prod.spline.design/t3aTtf3EeEYRjFiK/scene.splinecode"
          className="w-full h-full relative z-10"
        />
      </div>

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity }}
        className="w-full px-4 lg:px-8 z-20 relative pointer-events-none h-screen flex items-center"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center pt-20 lg:pt-0">

          {/* LEFT — 3D Name Reveal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
            }}
            className="pointer-events-auto flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
            style={{ perspective: '700px' }}
          >
            <motion.h1
              className={`text-4xl sm:text-5xl lg:text-5xl font-black mb-4 lg:mb-6 leading-none tracking-tighter transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* "Hi, I'm" */}
              <motion.span
                variants={{
                  hidden:  { opacity: 0, y: 80, rotateX: -50, filter: 'blur(16px)' },
                  visible: { opacity: 1, y: 0,  rotateX: 0,   filter: 'blur(0px)',
                    transition: { duration: 1.1, ease: 'circOut' } }
                }}
                className="block"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateY: -5, translateZ: 20, transition: { type: 'spring', stiffness: 300 } }}
              >
                Hi, I'm
              </motion.span>

              {/* "Mahesh" – gradient + floating */}
              <motion.span
                variants={{
                  hidden:  { opacity: 0, y: 80, rotateX: -50, filter: 'blur(16px)' },
                  visible: { opacity: 1, y: 0,  rotateX: 0,   filter: 'blur(0px)',
                    transition: { duration: 1.1, ease: 'circOut' } }
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_30px_rgba(0,240,255,0.5)] inline-block"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                whileHover={{ scale: 1.06, rotateY: 4, translateZ: 30,
                  transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              >
                Mahesh
              </motion.span>

              {/* "Sonawane" */}
              <motion.span
                variants={{
                  hidden:  { opacity: 0, y: 80, rotateX: -50, filter: 'blur(16px)' },
                  visible: { opacity: 1, y: 0,  rotateX: 0,   filter: 'blur(0px)',
                    transition: { duration: 1.1, ease: 'circOut' } }
                }}
                className="block"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateY: 5, translateZ: 20, transition: { type: 'spring', stiffness: 300 } }}
              >
                Sonawane
              </motion.span>
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              className="h-px bg-gradient-to-r from-primary to-transparent mb-4 lg:mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: 'circOut' }}
              style={{ width: '180px' }}
            />
          </motion.div>

          {/* RIGHT — Role, tagline, socials */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } }
            }}
            className="pointer-events-auto flex flex-col justify-center items-center text-center lg:items-end lg:text-right"
          >
            {/* Role */}
            <motion.h3
              variants={{
                hidden:  { opacity: 0, x: 60, filter: 'blur(12px)' },
                visible: { opacity: 1, x: 0,  filter: 'blur(0px)',
                  transition: { duration: 0.9, ease: 'circOut' } }
              }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-[0_0_20px_rgba(0,240,255,0.35)] tracking-tight mb-2"
              animate={{
                textShadow: [
                  '0 0 20px rgba(0,240,255,0.2)',
                  '0 0 40px rgba(0,240,255,0.5)',
                  '0 0 20px rgba(0,240,255,0.2)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              AI Trainer
            </motion.h3>

            <motion.p
              variants={{
                hidden:  { opacity: 0, x: 60, filter: 'blur(12px)' },
                visible: { opacity: 1, x: 0,  filter: 'blur(0px)',
                  transition: { duration: 0.9, ease: 'circOut' } }
              }}
              className="text-slate-400 text-xs lg:text-sm font-bold tracking-[0.3em] uppercase mt-1 mb-6 lg:mb-10 opacity-80"
            >
              Based in India
            </motion.p>

            {/* Social icons */}
            <div className="flex gap-5 lg:gap-6 justify-center lg:justify-end">
              {[
                {
                  href: 'https://linkedin.com/in/mahesh-sonawane-60bb33222',
                  color: '#00f0ff', shadow: 'rgba(0,240,255,0.8)',
                  icon: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </>
                  )
                },
                {
                  href: 'https://github.com/Mahesh226', color: '#ffffff', shadow: 'rgba(255,255,255,0.8)',
                  icon: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
                },
                {
                  href: 'https://www.instagram.com/maheshsonawane22?igsh=MTBxeG93ZHdkYXV4OQ==', color: '#ff003c', shadow: 'rgba(255,0,60,0.8)',
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  )
                },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 0.5, ease: 'circOut' }}
                  whileHover={{
                    scale: 1.25, color: s.color, y: -4,
                    filter: `drop-shadow(0 0 12px ${s.shadow})`,
                    transition: { type: 'spring', stiffness: 400, damping: 14 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-3"
      >
        <span className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-mono">Scroll</span>
        <motion.div
          className="w-px h-14 bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
