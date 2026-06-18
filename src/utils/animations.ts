import type { Variants } from 'framer-motion';

// Framer Motion v12 requires a named easing string or EasingFunction.
// Using 'circOut' / 'backOut' gives the same feel as [0.16,1,0.3,1].
const E = 'circOut' as const;

// ── Entrance Variants ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 60,  filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)',  transition: { duration: 0.8, ease: E } }
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)', transition: { duration: 0.7, ease: E } }
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -70, rotateY: 15 },
  visible: { opacity: 1, x: 0,   rotateY: 0,  transition: { duration: 0.8, ease: E } }
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 70,  rotateY: -15 },
  visible: { opacity: 1, x: 0,   rotateY: 0,  transition: { duration: 0.8, ease: E } }
};

export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.7, rotateX: 20, y: 30 },
  visible: { opacity: 1, scale: 1,   rotateX: 0,  y: 0,  transition: { duration: 0.7, ease: E } }
};

export const flipIn: Variants = {
  hidden:  { opacity: 0, rotateX: -90, y: 40 },
  visible: { opacity: 1, rotateX: 0,   y: 0,  transition: { duration: 0.8, ease: E } }
};

// ── Container / Stagger ──────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

export const staggerContainerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.02 } }
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 28,   rotateX: -8, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,    rotateX: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: E } }
};

export const staggerItemLeft: Variants = {
  hidden:  { opacity: 0, x: -40, rotateY: 10 },
  visible: { opacity: 1, x: 0,   rotateY: 0,  transition: { duration: 0.6, ease: E } }
};

// ── Section Heading ──────────────────────────────────────────────────────────

export const headingContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const headingWord: Variants = {
  hidden:  { opacity: 0, y: 80, rotateX: -40, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0,  rotateX: 0,   filter: 'blur(0px)',  transition: { duration: 0.9, ease: E } }
};

// ── Hover Springs ────────────────────────────────────────────────────────────

export const springTap   = { scale: 0.96, transition: { type: 'spring' as const, stiffness: 400, damping: 17 } };
export const springHover = { scale: 1.04, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } };

// ── Shared viewport config ───────────────────────────────────────────────────

export const viewport = { once: true, margin: '-80px' } as const;
