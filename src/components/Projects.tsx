import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem, viewport, headingWord, headingContainer, fadeUp } from '../utils/animations';

const projects = [
  {
    title: "AI Chatbot",
    description: "Self developed an AI-powered chatbot capable of answering user queries in natural language. Integrated AI APIs and prompt engineering techniques to generate relevant responses. Designed a user-friendly interface to enhance user interaction and engagement.",
    image: "/projects/ai_dashboard.png",
    tech: ['AI APIs', 'Prompt Engineering', 'JavaScript', 'UI Design'],
    label: "AI",
    accent: '#7000ff',
  },
  {
    title: "Personal 3D Portfolio Website",
    description: "Self Designed and developed a fully responsive 3D portfolio website using TypeScript, JavaScript, CSS, and JSON. Created interactive animations and modern UI components to improve user engagement.",
    image: "/projects/blockchain.png",
    tech: ['TypeScript', 'JavaScript', 'CSS', 'React'],
    label: "Web",
    accent: '#00f0ff',
  },
  {
    title: "Crime Reporting Portal",
    description: "Developed a web-based crime reporting system enabling citizens to submit complaints online. Implemented database integration for secure data management. The portal will reduce manual work by keeping records of crime digitally.",
    image: "/projects/crime_portal.png",
    tech: ['Java', 'MySQL', 'HTML', 'CSS'],
    label: "Portal",
    accent: '#ff003c',
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 26 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 26 });
  const imgX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const imgY = useTransform(y, [-0.5, 0.5], [-8, 8]);

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
      variants={staggerItem}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      className="group relative flex flex-col h-full"
    >
      <div
        className="relative overflow-hidden rounded-3xl border flex flex-col h-full transition-all duration-500"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--card-shadow)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{ boxShadow: `0 0 40px ${project.accent}20, inset 0 0 40px ${project.accent}08` }}
        />

        {/* Image section with parallax */}
        <div className="h-56 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ x: imgX, y: imgY, scale: 1.12 }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Label badge */}
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.12, type: 'spring', stiffness: 300 }}
          >
            <span
              className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-white/80 rounded-full border border-white/20 backdrop-blur-md"
              style={{ backgroundColor: `${project.accent}25`, borderColor: `${project.accent}40` }}
            >
              {project.label}
            </span>
          </motion.div>

          {/* Index number watermark */}
          <div className="absolute bottom-3 left-4 z-10 text-[80px] font-black leading-none opacity-10 text-white select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="p-7 relative z-20 flex-grow flex flex-col justify-between" style={{ backgroundColor: 'var(--glass-bg)', transformStyle: 'preserve-3d' }}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                className="h-px bg-gradient-to-r from-transparent"
                style={{ backgroundColor: project.accent }}
                initial={{ width: '12px' }}
                whileInView={{ width: '28px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              />
              <motion.h3
                className="text-xl font-bold tracking-tight transition-colors duration-300"
                style={{ color: 'var(--text-primary)', transformStyle: 'preserve-3d' }}
                whileHover={{ translateZ: 8, color: project.accent }}
              >
                {project.title}
              </motion.h3>
            </div>
            <p className="text-sm leading-relaxed font-light line-clamp-3 mb-6" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech, ti) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + ti * 0.06 }}
                whileHover={{ scale: 1.08, borderColor: project.accent, color: project.accent, translateZ: 6 }}
                className="px-3 py-1.5 border text-[9px] font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-lg cursor-default"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--glass-border)',
                  color: 'var(--text-secondary)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  return (
    <section
      className="py-32 relative z-10 min-h-screen flex flex-col justify-center transition-colors duration-500"
      id="projects"
      data-section="projects"
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* 3D Heading – right aligned */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-20 text-right overflow-hidden"
          style={{ perspective: '700px' }}
        >
          <div className="flex flex-wrap justify-end gap-x-4 items-baseline">
            {['Featured', 'Projects'].map((word, i) => (
              <motion.span
                key={word}
                variants={headingWord}
                className={`text-5xl lg:text-7xl font-black tracking-tighter inline-block ${
                  i === 1 ? 'text-secondary drop-shadow-[0_0_20px_rgba(112,0,255,0.4)]' : ''
                }`}
                style={{ color: i === 0 ? 'var(--text-primary)' : undefined }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.div variants={fadeUp} className="h-px w-24 bg-gradient-to-l from-secondary to-transparent mt-6 ml-auto" />
        </motion.div>

        {/* 3D Project Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
