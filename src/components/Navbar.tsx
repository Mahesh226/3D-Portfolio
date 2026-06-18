import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Services', id: 'services' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-5 lg:px-12 py-4 flex justify-between items-center backdrop-blur-xl border-b transition-colors duration-500 ${
          theme === 'dark' ? 'bg-slate-900/90 border-white/5' : 'bg-white/80 border-slate-200'
        }`}
      >
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl sm:text-2xl font-black tracking-tighter cursor-pointer flex-shrink-0"
        >
          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>MAHESH</span>
          <span className="text-primary drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">.DEV</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className={`flex space-x-8 text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all duration-500 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-yellow-400'
                : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </motion.button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 rounded-full bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-slate-900 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] text-xs font-black uppercase tracking-widest cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme Toggle mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all duration-500 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-yellow-400'
                : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </motion.button>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className={`p-2 rounded-xl border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-800/80 border-white/10 text-white'
                : 'bg-slate-100 border-slate-200 text-slate-900'
            }`}
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={menuOpen ? "open" : "closed"}
              className="w-5 h-5 flex flex-col justify-center gap-1.5"
            >
              <motion.span
                variants={{ open: { rotate: 45, y: 7 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-full bg-current origin-center"
              />
              <motion.span
                variants={{ open: { opacity: 0, x: -8 }, closed: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-full bg-current"
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -7 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-full bg-current origin-center"
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed top-[68px] left-4 right-4 z-40 rounded-2xl border backdrop-blur-2xl shadow-2xl overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/95 border-white/10'
                : 'bg-white/95 border-slate-200'
            }`}
          >
            <ul className="flex flex-col p-4 gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 hover:text-primary ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:bg-white/5'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.06, duration: 0.25 }}
                className="mt-2"
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-3 rounded-xl bg-primary/10 border border-primary/50 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-slate-900 transition-all duration-300 cursor-pointer"
                >
                  Contact Me
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
