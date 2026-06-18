import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewport, fadeUp } from '../utils/animations';

const Footer = () => {
  const links = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/mahesh-sonawane-60bb33222' },
    { label: 'Email', href: 'mailto:maheshsonawane13501@gmail.com' },
    { label: 'Phone', href: 'tel:+919359612258' },
    { label: 'GitHub', href: 'https://github.com/Mahesh226' },
    { label: 'Instagram', href: 'https://www.instagram.com/maheshsonawane22?igsh=MTBxeG93ZHdkYXV4OQ==' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 px-6 mt-20 relative z-10 border-t transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--glass-border)' }}
    >
      {/* Glowing top-border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            © {new Date().getFullYear()}{' '}
            <motion.span
              className="font-black tracking-tighter inline-block"
              style={{ color: 'var(--text-primary)' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              MAHESH<span className="text-primary">.DEV</span>
            </motion.span>
          </motion.p>
          <p className="text-[10px] uppercase tracking-widest mt-1 font-mono opacity-40" style={{ color: 'var(--text-secondary)' }}>
            Designed for the Future
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex gap-10"
        >
          {links.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              variants={staggerItem}
              className="text-xs font-bold uppercase tracking-widest transition-colors relative group"
              style={{ color: 'var(--text-secondary)' }}
              whileHover={{ color: '#00f0ff', y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {label}
              {/* Underline reveal */}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
