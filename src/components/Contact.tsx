import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Cpu, CheckCircle, Phone } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focusState, setFocusState] = useState({ name: false, email: false, message: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prefill handler
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string }>;
      if (customEvent.detail && customEvent.detail.message) {
        setFormState(prev => ({
          ...prev,
          message: customEvent.detail.message
        }));
        // Scroll to message textarea if it exists
        const textarea = document.getElementsByName('message')[0];
        if (textarea) {
          textarea.focus();
        }
      }
    };
    window.addEventListener("prefill-contact", handlePrefill);
    return () => window.removeEventListener("prefill-contact", handlePrefill);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Card mouse-tilt effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation angle
    setRotateX(-y / 12);
    setRotateY(x / 12);
  };
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    window.location.href = `mailto:maheshsonawane13501@gmail.com?subject=Portfolio Contact from ${formState.name}&body=${formState.message}`;
  };

  return (
    <section 
      className="py-32 relative z-10 min-h-screen flex flex-col justify-center transition-colors duration-500" 
      id="contact" 
      data-section="contact"
    >
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .laser-line {
          animation: scanLaser 4s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-4 tracking-tighter text-white">
              Get In <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">Touch</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6"></div>
            <p className="mt-6 text-base md:text-lg font-light max-w-lg mx-auto text-slate-400">
              Have a project in mind, want to collaborate, or need a premium website built? Let's write the future.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Cybernetic Profile Card */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease',
              }}
              className="relative group w-full h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl flex flex-col justify-between p-6 cursor-pointer hover:border-primary/30"
            >
              {/* Glowing Ambient Light */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Photo Frame */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/5 bg-slate-950">
                <img 
                  src="/assets/profile.png" 
                  alt="Mahesh Sonawane" 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                
                {/* Cyber Laser Scanner Line */}
                <div className="laser-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--color-primary)] pointer-events-none" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>

              {/* HUD / Status Info Overlay */}
              <div className="relative z-10 border-l-2 border-primary/50 pl-4 py-2 font-mono bg-white/[0.01] rounded-r-xl border-r border-t border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1 uppercase tracking-widest">
                  <Cpu className="w-3.5 h-3.5 animate-spin" /> Identity Verification
                </div>
                <div className="space-y-0.5 text-[10px] text-slate-400">
                  <p>STATUS: <span className="text-green-400 font-bold animate-pulse">ONLINE</span></p>
                  <p>LOCATION: INDIA (IST)</p>
                  <p>PORTFOLIO CORE v3.1</p>
                </div>
              </div>

              {/* Top-Right and Bottom-Left corners */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/30 rounded-bl-lg" />
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden"
            >
              {isSubmitted ? (
                <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Client Dispatched</h3>
                  <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                    Setting up mail protocol. If your mail client does not open, email me directly at:
                  </p>
                  <a href="mailto:maheshsonawane13501@gmail.com" className="text-primary font-mono text-sm underline hover:text-white transition-colors">
                    maheshsonawane13501@gmail.com
                  </a>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onFocus={() => setFocusState(prev => ({ ...prev, name: true }))}
                      onBlur={() => setFocusState(prev => ({ ...prev, name: false }))}
                      onChange={handleChange}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none transition-all duration-300 focus:border-primary/50 focus:bg-slate-900/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    />
                    <label 
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono tracking-wide ${
                        focusState.name || formState.name
                          ? "-top-2.5 text-[10px] text-primary bg-slate-950 px-2.5 rounded-full border border-white/5"
                          : "top-4 text-xs text-slate-500"
                      }`}
                    >
                      YOUR NAME
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onFocus={() => setFocusState(prev => ({ ...prev, email: true }))}
                      onBlur={() => setFocusState(prev => ({ ...prev, email: false }))}
                      onChange={handleChange}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none transition-all duration-300 focus:border-primary/50 focus:bg-slate-900/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    />
                    <label 
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono tracking-wide ${
                        focusState.email || formState.email
                          ? "-top-2.5 text-[10px] text-primary bg-slate-950 px-2.5 rounded-full border border-white/5"
                          : "top-4 text-xs text-slate-500"
                      }`}
                    >
                      YOUR EMAIL
                    </label>
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onFocus={() => setFocusState(prev => ({ ...prev, message: true }))}
                      onBlur={() => setFocusState(prev => ({ ...prev, message: false }))}
                      onChange={handleChange}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white outline-none transition-all duration-300 resize-none focus:border-primary/50 focus:bg-slate-900/60 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                    />
                    <label 
                      className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono tracking-wide ${
                        focusState.message || formState.message
                          ? "-top-2.5 text-[10px] text-primary bg-slate-950 px-2.5 rounded-full border border-white/5"
                          : "top-4 text-xs text-slate-500"
                      }`}
                    >
                      YOUR MESSAGE
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group relative w-full py-4 rounded-2xl bg-slate-900 border border-white/10 text-white font-bold text-xs tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Social Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            {[
              {
                label: 'Email Protocol',
                value: 'maheshsonawane13501@gmail.com',
                href: 'mailto:maheshsonawane13501@gmail.com',
                icon: <Mail className="w-5 h-5 text-primary" />,
                glow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-primary/30'
              },
              {
                label: 'LinkedIn Node',
                value: 'Mahesh Sonawane',
                href: 'https://linkedin.com/in/mahesh-sonawane-60bb33222',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-secondary">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                ),
                glow: 'hover:shadow-[0_0_30px_rgba(112,0,255,0.15)] hover:border-secondary/30'
              },
              {
                label: 'Phone Link',
                value: '+91 9359612258',
                href: 'tel:+919359612258',
                icon: <Phone className="w-5 h-5 text-white" />,
                glow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/30'
              },
              {
                label: 'Geolocation',
                value: 'Pune, Maharashtra',
                href: null,
                icon: <MapPin className="w-5 h-5 text-accent" />,
                glow: 'hover:shadow-[0_0_30px_rgba(255,0,60,0.15)] hover:border-accent/30'
              }
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex-1 p-6 rounded-[1.8rem] border border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center justify-between transition-all duration-500 group ${info.glow}`}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    {info.icon}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-1 text-slate-500 font-bold">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs text-white hover:text-primary transition-colors truncate block font-sans"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-xs text-white truncate font-sans">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
