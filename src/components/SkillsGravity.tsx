import { useState, useEffect, useRef } from "react";
import NeuralNetBackground from "./NeuralNetBackground";

/* ── Colors ─────────────────────────────────────────────────────────── */
const PB = "#7000ff";   // purple bright (mapped to secondary)
const PU = "#7000ff";   // purple
const CYAN = "#00f0ff"; // primary cyan (mapped to primary)
const PK = "#ff003c";   // accent (mapped to accent)

/* ── Skills ─────────────────────────────────────────────────────────── */
interface Skill { name: string; icon: string; color: string }

const ROW1: Skill[] = [
  { name: "Figma",      icon: "🎨", color: "#f24e1e" },
  { name: "React",      icon: "⚛",  color: "#61dafb" },
  { name: "TypeScript", icon: "TS", color: "#3178c6" },
  { name: "Node.js",    icon: "⬡",  color: "#8cc84b" },
  { name: "Tailwind",   icon: "✿",  color: "#38bdf8" },
  { name: "JavaScript", icon: "JS", color: "#facc15" },
  { name: "CSS3",       icon: "✦",  color: "#1572b6" },
];

const ROW2: Skill[] = [
  { name: "Prompt Eng.",  icon: "🤖", color: "#00f0ff" },
  { name: "Next.js",      icon: "▲",  color: "#ffffff" },
  { name: "Data Annot.",  icon: "📝", color: "#ff003c" },
  { name: "QA Testing",   icon: "✅", color: "#7000ff" },
  { name: "Manual Test",  icon: "🧪", color: "#facc15" },
  { name: "Three.js",     icon: "△",  color: "#ffffff" },
];

interface RingSkill extends Skill { base: number }
const RING1: RingSkill[] = [
  { name: "Git",    icon: "◎", color: "#f05032", base: 20  },
  { name: "Docker", icon: "▣", color: "#2496ed", base: 80  },
  { name: "MySQL",  icon: "⬡", color: "#00aff0", base: 150 },
  { name: "Java",   icon: "☕", color: "#007396", base: 200 },
  { name: "Python", icon: "🐍", color: "#ffd343", base: 270 },
  { name: "Redux",  icon: "◈", color: "#764abc", base: 330 },
];
const RING2: RingSkill[] = [
  { name: "AI/ML",    icon: "✦", color: "#a855f7", base: 45  },
  { name: "Firebase", icon: "🔥", color: "#ffca28", base: 110 },
  { name: "REST",     icon: "⚙", color: "#34d399", base: 175 },
  { name: "MongoDB",  icon: "⬡", color: "#47a248", base: 235 },
  { name: "Vite",     icon: "⚡", color: "#bd34fe", base: 295 },
  { name: "Jest",     icon: "◉", color: "#c21325", base: 350 },
];

const DEFINED_LOGOS = [
  "Figma", "React", "TypeScript", "Nodejs", "Tailwind", "JavaScript", "CSS3",
  "AdobeXD", "Nextjs", "Gatsby", "Illustrator", "GraphQL", "Threejs", "MongoDB",
  "Git", "Docker", "Redux", "Firebase", "Python", "Vite", "Java", "CPP"
];

/* ── Sigma Logo Component for central orb ── */
function SigmaLogo({ color = "#ffffff", size = 46 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${color}aa)`, transition: "all 0.5s" }}>
      <path d="M10 9h20L17 20l13 11H10" />
    </svg>
  );
}

/* ── Skill Bubble Component ── */
function Bubble({ skill, active, size, onEnter, onLeave }: {
  skill: Skill; active: boolean; size: number;
  onEnter(): void; onLeave(): void;
}) {
  const normalized = skill.name.replace(/[^a-zA-Z0-9]/g, "");
  const hasLogo = DEFINED_LOGOS.includes(normalized);

  return (
    <div
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      title={skill.name}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: active
          ? `radial-gradient(135deg,${skill.color}2a,${skill.color}06)`
          : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${active ? skill.color : "rgba(255,255,255,0.1)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: active ? `0 0 20px ${skill.color}44, 0 0 40px ${skill.color}15` : "none",
        transform: active ? "scale(1.22)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "pointer", backdropFilter: "blur(8px)",
        flexShrink: 0, position: "relative",
      }}
    >
      {hasLogo ? (
        <svg style={{ width: "55%", height: "55%", pointerEvents: "none" }}>
          <use href={`#logo-${normalized}`} />
        </svg>
      ) : (
        <span style={{
          fontSize: skill.icon.length > 2 ? "10px" : "18px",
          fontFamily: '"Space Mono",monospace',
          fontWeight: 700,
          color: active ? skill.color : "rgba(255,255,255,0.4)",
          pointerEvents: "none",
        }}>
          {skill.icon}
        </span>
      )}
      {active && (
        <div style={{
          position: "absolute", inset: -5, borderRadius: "50%",
          border: `1px solid ${skill.color}33`,
          animation: "sgRingPop 1.4s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

/* ── Main SkillsGravity Component ── */
export default function SkillsGravity() {
  const [hovered, setHovered] = useState<Skill | null>(null);
  const [mounted, setMounted] = useState(false);
  const [secW, setSecW] = useState(1200);
  const [secH, setSecH] = useState(900);
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(180);

  /* Points: icon source positions & orb center */
  const [linePts, setLinePts] = useState<
    { x: number; y: number; color: string; name: string }[]
  >([]);
  const [orbPos, setOrbPos] = useState({ x: 600, y: 580 });

  const secRef  = useRef<HTMLDivElement>(null);
  const orbRef  = useRef<HTMLDivElement>(null);
  const r1Refs  = useRef<(HTMLDivElement | null)[]>([]);
  const r2Refs  = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef  = useRef(0);
  const lastRef = useRef<number | null>(null);

  // Initialize arrays of refs
  if (r1Refs.current.length !== ROW1.length) {
    r1Refs.current = Array(ROW1.length).fill(null);
  }
  if (r2Refs.current.length !== ROW2.length) {
    r2Refs.current = Array(ROW2.length).fill(null);
  }

  /* Measure section */
  useEffect(() => {
    const obs = new ResizeObserver(ents => {
      const e = ents[0];
      if (e) { setSecW(e.contentRect.width); setSecH(e.contentRect.height); }
    });
    if (secRef.current) obs.observe(secRef.current);
    return () => obs.disconnect();
  }, []);

  /* Mount */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* Animate rings */
  useEffect(() => {
    const tick = (ts: number) => {
      if (lastRef.current !== null) {
        const dt = ts - lastRef.current;
        setAngle1(a => (a + dt * 0.012) % 360);
        setAngle2(a => (a - dt * 0.016 + 720) % 360);
      }
      lastRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Compute element positions */
  useEffect(() => {
    const compute = () => {
      const sec = secRef.current;
      const orb = orbRef.current;
      if (!sec || !orb) return;
      const sr = sec.getBoundingClientRect();
      const or = orb.getBoundingClientRect();
      setOrbPos({
        x: or.left - sr.left + or.width / 2,
        y: or.top  - sr.top  + or.height / 2,
      });
      const allRefs = [...r1Refs.current, ...r2Refs.current];
      const allSk   = [...ROW1, ...ROW2];
      setLinePts(allRefs.map((el, i) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - sr.left + r.width / 2,
          y: r.top  - sr.top  + r.height,
          color: allSk[i]?.color ?? PB,
          name:  allSk[i]?.name  ?? "",
        };
      }).filter(Boolean) as typeof linePts);
    };
    const t = setTimeout(compute, 250);
    window.addEventListener("resize", compute);
    return () => { clearTimeout(t); window.removeEventListener("resize", compute); };
  }, [mounted, secW, secH]);

  /* Ring geometry — WIDE 3D-perspective ellipses */
  const W = secW;
  const OX = orbPos.x || W / 2;
  const OY = orbPos.y || secH * 0.62;

  const isMobile = W < 640;
  const isTablet = W >= 640 && W < 1024;
  const activeW = Math.min(W, 1200);

  const r1RX   = activeW * (isMobile ? 0.36 : isTablet ? 0.40 : 0.44);
  const r1RY   = r1RX * (isMobile ? 0.44 : 0.34);
  const r1Tilt = 12;

  const r2RX   = activeW * (isMobile ? 0.24 : isTablet ? 0.28 : 0.32);
  const r2RY   = r2RX * (isMobile ? 0.40 : 0.28);
  const r2Tilt = -9;

  const bubbleSize1 = isMobile ? 38 : isTablet ? 46 : 52;
  const bubbleSize2 = isMobile ? 34 : isTablet ? 42 : 48;
  const gap1 = isMobile ? "8px" : isTablet ? "14px" : "clamp(10px, 1.8vw, 22px)";
  const gap2 = isMobile ? "8px" : isTablet ? "14px" : "clamp(10px, 1.8vw, 22px)";

  const ring1Radius = isMobile ? 12 : 16;
  const ring2Radius = isMobile ? 10.5 : 14;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes sgPulse {
          0%,100%{box-shadow:0 0 40px \${PB}55,0 0 100px \${PB}28,inset 0 0 30px \${PB}18}
          50%    {box-shadow:0 0 70px \${PB}80,0 0 160px \${PB}45,inset 0 0 55px \${PB}28}
        }
        @keyframes sgRingPop{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes sgDash   {to{stroke-dashoffset:-24}}
        @keyframes sgFloat  {0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-9px);opacity:.9}}
        @keyframes sgFadeUp {from{opacity:0;transform:scale(.55) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes sgGlow   {0%,100%{opacity:.7}50%{opacity:1}}
        @keyframes sgSpin   {to{transform:rotate(360deg)}}
      `}</style>

      <section
        ref={secRef}
        id="skills"
        style={{
          minHeight: "100vh",
          background: "transparent",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          position: "relative", overflow: "hidden",
          padding: "80px 0 50px",
          fontFamily: '"Syne",sans-serif',
          width: "100%",
        }}
      >
        {/* Ambient radial glows */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 100% 65% at 50% 68%,${PU}18 0%,transparent 60%),
            radial-gradient(ellipse 35% 30% at  8% 18%,${CYAN}0b 0%,transparent 55%),
            radial-gradient(ellipse 30% 28% at 92% 78%,${PK}09 0%,transparent 55%)
          `,
        }} />

        {/* Floating background dots */}
        {[
          { t:"7%",  l:"3%",  c: PB,   d:"0s"   },
          { t:"13%", l:"93%", c: CYAN, d:"1.3s"  },
          { t:"62%", l:"2%",  c: PB,   d:"0.7s"  },
          { t:"78%", l:"95%", c: PK,   d:"2.1s"  },
          { t:"88%", l:"7%",  c: CYAN, d:"2.6s"  },
          { t:"40%", l:"97%", c: PB,   d:"1.5s"  },
        ].map((d, i) => (
          <div key={i} style={{
            position:"absolute", top:d.t, left:d.l,
            width:"3px", height:"3px", borderRadius:"50%",
            background:d.c, boxShadow:`0 0 8px ${d.c}`,
            animation:`sgFloat 3.6s ease-in-out ${d.d} infinite`,
            pointerEvents:"none",
          }} />
        ))}

        {/* ── Neural Net background canvas ── */}
        <NeuralNetBackground
          nodeCount={65}
          connectionDist={115}
          mouseRadius={105}
          colorBase="#7000ff"
          colorHot="#00f0ff"
          lineColorBase="#7000ff"
          lineColorHot="#00f0ff"
          opacity={0.9}
        />

        {/* ── Background SVG layer (for rings, lines, and defs) ── */}
        <svg
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            overflow:"visible", pointerEvents:"none", zIndex:2,
          }}
        >
          <defs>
            {/* SVG Symbols for Tech Logos */}
            <symbol id="logo-Figma" viewBox="0 0 38 57">
              <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5c0 5.25 4.25 9.5 9.5 9.5H19V0z" fill="#F24E1E"/>
              <path d="M28.5 0H19v19h9.5c5.25 0 9.5-4.25 9.5-9.5S33.75 0 28.5 0z" fill="#FF7262"/>
              <path d="M19 19H9.5C4.25 19 0 23.25 0 28.5S4.25 38 9.5 38H19V19z" fill="#A259FF"/>
              <path d="M19 38H9.5c-5.25 0-9.5 4.25-9.5 9.5C0 52.75 4.25 57 9.5 57S19 52.75 19 47.5V38z" fill="#1ABC9C"/>
              <path d="M28.5 19c-5.25 0-9.5 4.25-9.5 9.5v9.5h9.5c5.25 0 9.5-4.25 9.5-9.5s-4.25-9.5-9.5-9.5z" fill="#18A0FB"/>
            </symbol>

            <symbol id="logo-React" viewBox="-11.5 -10.23 23 20.46">
              <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
              <g stroke="#61dafb" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </symbol>

            <symbol id="logo-TypeScript" viewBox="0 0 100 100">
              <path fill="#3178C6" d="M0 0h100v100H0z"/>
              <path fill="#FFF" d="M70.3 70c0-2.2-.1-4.3-.2-6.5h-8.8c.1 2 .1 3.9.1 5.8 0 3-.9 4.3-3.7 4.3-2.1 0-3.3-1-3.3-3.2v-34H44v34.4c0 7.8 4.7 10.7 11.8 10.7 8.3.1 14.5-3.8 14.5-11.5zm22.4-7c0-9.2-5.7-14.2-15-14.2-8.3 0-14.3 4.2-14.3 12.3 0 7.6 5 10.7 12 12.5 5 1.2 7.2 2.3 7.2 4.9 0 2.4-2.1 3.8-5.6 3.8-4.2 0-7.3-2-7.8-6.5h-9c.6 9.4 7.6 13.5 16.7 13.5 9.7 0 15.6-4.5 15.6-14 0-7-4.2-10-11-12-5.2-1.5-8.2-2.2-8.2-5.2 0-2.2 1.9-3.4 4.8-3.4 3.7 0 6 1.8 6.5 5.3h8.1z"/>
            </symbol>

            <symbol id="logo-Nodejs" viewBox="0 0 32 32">
              <path d="M16 1L3 8.5v15L16 31l13-7.5v-15L16 1zm11.3 7.1L16 14.8v13.5l11.3-6.5V8.1z" fill="#8CC84B"/>
              <path d="M16 1L3 8.5v15L16 31V1z" fill="#689F63"/>
            </symbol>

            <symbol id="logo-Tailwind" viewBox="0 0 24 24">
              <path d="M12 6C12 6 7.2 6 4.8 8.4c-2.4 2.4-2.4 6-2.4 6 0 0 4.8 0 7.2-2.4C12 9.6 12 6 12 6z" fill="#38bdf8"/>
              <path d="M19.2 9.6c0 0-4.8 0-7.2 2.4-2.4 2.4-2.4 6-2.4 6 0 0 4.8 0 7.2-2.4 2.4-2.4 2.4-6 2.4-6z" fill="#38bdf8" opacity="0.8"/>
            </symbol>

            <symbol id="logo-JavaScript" viewBox="0 0 32 32">
              <rect width="32" height="32" fill="#F7DF1E"/>
              <path d="M18.8 24.2c.4.8.8 1.4 1.7 1.4.8 0 1.3-.4 1.3-1v-5.2h2v5.2c0 2-1.5 3-3.3 3-1.8 0-3-1-3.6-2.4l1.9-1zm7.3 0c.4.7 1 1.2 1.8 1.2.7 0 1.2-.3 1.2-.8s-.4-.7-1.4-1.1c-1.6-.7-2.7-1.2-2.7-2.8 0-1.5 1.2-2.6 2.9-2.6 1.5 0 2.5.7 3.1 1.8l-1.6 1c-.3-.6-.7-.9-1.4-.9-.6 0-1 .3-1 .7s.3.5 1.1.8c1.7.7 3 1.3 3 2.9 0 1.7-1.3 2.8-3.2 2.8-2 0-3.3-1-3.9-2.7l1.9-1.2z" fill="#000"/>
            </symbol>

            <symbol id="logo-CSS3" viewBox="0 0 256 280">
              <path d="M22.9 0l21 235.6 84 23.3 84.1-23.3 21.1-235.6H22.9z" fill="#1572B6"/>
              <path d="M128 238l69.5-19.2 17.5-195H128v214.2z" fill="#33A9FF"/>
              <path d="M128 75.3H61.6l4 44.9H128v-44.9zm0 63.8H79.8l4 44.9h44.2v-44.9z" fill="#EAEAEA"/>
              <path d="M128 75.3v44.9h41.4l-4 44.9H128v44.9l41.6-11.5 5.5-62.1h.4V75.3H128z" fill="#FFF"/>
              <path d="M128 165.1h-44.2l-3 33.6 47.2 13.1v-46.7z" fill="#EAEAEA"/>
            </symbol>

            <symbol id="logo-AdobeXD" viewBox="0 0 100 100">
              <rect width="100%" height="100%" fill="#470137" rx="15"/>
              <rect x="2" y="2" width="96" height="96" fill="none" stroke="#FF61F6" strokeWidth="4" rx="13"/>
              <text x="22" y="65" fill="#FF61F6" fontSize="42" fontWeight="bold" fontFamily="system-ui">Xd</text>
            </symbol>

            <symbol id="logo-Nextjs" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="90" fill="#000"/>
              <path d="M149.5 141.6L79.4 52.4H68v75.1h10.9V71.4l61.2 78.4c3.6-2.5 6.8-5.3 9.4-8.2z" fill="#FFF"/>
              <path d="M115 52.4h11v75.2h-11z" fill="#FFF"/>
            </symbol>

            <symbol id="logo-Gatsby" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="14" fill="#663399"/>
              <path d="M14 3a11 11 0 0 0-7.8 18.8l1.3-1.3A9.2 9.2 0 0 1 14 4.8a9.2 9.2 0 0 1 8.7 6.2h-4.8l-1.8 1.8h6.6c.1.4.1.8.1 1.2a9.2 9.2 0 0 1-9.2 9.2c-2.3 0-4.3-.8-5.9-2.2l-1.4 1.4A11 11 0 1 0 14 3z" fill="#FFF"/>
            </symbol>

            <symbol id="logo-Illustrator" viewBox="0 0 100 100">
              <rect width="100%" height="100%" fill="#330000" rx="15"/>
              <rect x="2" y="2" width="96" height="96" fill="none" stroke="#FF9A00" strokeWidth="4" rx="13"/>
              <text x="25" y="65" fill="#FF9A00" fontSize="42" fontWeight="bold" fontFamily="system-ui">Ai</text>
            </symbol>

            <symbol id="logo-GraphQL" viewBox="0 0 100 100">
              <g fill="none" stroke="#E10098" strokeWidth="4">
                <ellipse cx="50" cy="50" rx="42" ry="15"/>
                <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(60 50 50)"/>
                <ellipse cx="50" cy="50" rx="42" ry="15" transform="rotate(120 50 50)"/>
              </g>
              <g fill="#E10098">
                <circle cx="50" cy="50" r="8"/>
                <circle cx="92" cy="50" r="5"/>
                <circle cx="8" cy="50" r="5"/>
                <circle cx="71" cy="86.3" r="5"/>
                <circle cx="29" cy="13.7" r="5"/>
                <circle cx="71" cy="13.7" r="5"/>
                <circle cx="29" cy="86.3" r="5"/>
              </g>
            </symbol>

            <symbol id="logo-Threejs" viewBox="0 0 120 120">
              <path d="M60 10L110 95H10L60 10z" fill="none" stroke="#fff" strokeWidth="6"/>
              <path d="M60 10v45L10 95" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 2"/>
              <path d="M60 55l50 40" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 2"/>
              <circle cx="60" cy="55" r="4" fill="#fff"/>
            </symbol>

            <symbol id="logo-MongoDB" viewBox="0 0 32 32">
              <path d="M16 2C16 2 9 8.2 9 14.5c0 5 3 8.5 7 11.5v4c0 .6.4 1 1 1s1-.4 1-1v-4c4-3 7-6.5 7-11.5C25 8.2 16 2 16 2zm1 22v-6.5c0-.6-.4-1-1-1s-1 .4-1 1V24c-2.5-2.2-4.5-4.8-4.5-8.5C11.5 10.8 16 6 16 6s4.5 4.8 4.5 9.5c0 3.7-2 6.3-4.5 8.5z" fill="#47A248"/>
              <path d="M16 6c0 0-4.5 4.8-4.5 9.5 0 3.7 2 6.3 4.5 8.5v-6.5c0-.6.4-1 1-1s1 .4 1 1V24c2.5-2.2 4.5-4.8 4.5-8.5C20.5 10.8 16 6 16 6z" fill="#589636"/>
            </symbol>

            <symbol id="logo-Git" viewBox="0 0 100 100">
              <path d="M92.7 44.8L55.2 7.3a7.4 7.4 0 0 0-10.4 0L37.3 14.8l7.8 7.8c2.9-1 6.3-.1 8.5 2.1 2.2 2.2 3.1 5.5 2.2 8.5l8 8c3-.9 6.4 0 8.6 2.2a7.4 7.4 0 0 1 0 10.4 7.4 7.4 0 0 1-10.4 0 7.4 7.4 0 0 1-2.1-5.7l-7.7-7.7v24a7.4 7.4 0 0 1-5.7 7.4 7.4 0 0 1-8-5.3 7.4 7.4 0 0 1 3.5-8.7c2-.9 4.1-.9 6 .1v-23.7a7.4 7.4 0 0 1-4-6.3c0-2.4 1-4.7 2.7-6.3L32 19.8 7.3 44.5a7.4 7.4 0 0 0 0 10.4l37.5 37.5c2.9 2.9 7.6 2.9 10.4 0l37.5-37.5c2.9-2.9 2.9-7.6 0-10.4z" fill="#F05032"/>
            </symbol>

            <symbol id="logo-Docker" viewBox="0 0 24 24">
              <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.188V8.92a.186.186 0 0 0-.186-.187h-2.119c-.104 0-.187.083-.187.188v1.97c0 .104.083.188.187.188m-2.937 0h2.119c.103 0 .186-.083.186-.188V8.92a.186.186 0 0 0-.186-.187h-2.119c-.103 0-.186.083-.186.188v1.97c0 .104.083.188.186.188m-2.937 0h2.12c.102 0 .186-.083.186-.188V8.92a.186.186 0 0 0-.186-.187h-2.12a.186.186 0 0 0-.186.188v1.97c0 .104.084.188.186.188m-2.937 0h2.119c.103 0 .187-.083.187-.188V8.92a.186.186 0 0 0-.187-.187H5.172c-.103 0-.187.083-.187.188v1.97c0 .104.084.188.187.188m-2.937 0h2.119c.103 0 .187-.083.187-.188V8.92a.186.186 0 0 0-.187-.187H2.235c-.103 0-.187.083-.187.188v1.97c0 .104.084.188.187.188m5.874-2.836h2.119c.103 0 .186-.083.186-.188V6.084a.186.186 0 0 0-.186-.188h-2.119c-.103 0-.186.084-.186.188v1.97c0 .104.083.188.186.188m-2.937 0h2.12c.102 0 .186-.083.186-.188V6.084a.186.186 0 0 0-.186-.188h-2.12a.186.186 0 0 0-.186.188v1.97c0 .104.084.188.186.188m5.874-2.836h2.119c.103 0 .186-.083.186-.188V3.248a.186.186 0 0 0-.186-.188h-2.119c-.103 0-.186.084-.186.188v1.97c0 .104.083.188.186.188m-5.874 5.672h2.119c.103 0 .186-.083.186-.188V8.92a.186.186 0 0 0-.186-.187h-2.119c-.103 0-.186.083-.186.188v1.97c0 .104.083.188.186.188M23.99 11.57c-.086-.027-.37-.087-.803-.133-.655-.07-1.745-.04-2.87.525-.79.395-1.393 1.01-1.79 1.83-.242.498-.363 1.054-.363 1.666 0 2.22 1.808 4.02 4.04 4.02 2.233 0 4.042-1.8 4.042-4.02 0-1.89-1.298-3.52-3.186-3.876c.386.67.348 1.488-.13 1.942-.424.4-.925.32-.94-.084zm-3.856 7.424c0 .324-.263.587-.587.587h-.587c-.324 0-.587-.263-.587-.587v-.587c0-.324.263-.587.587-.587h.587c.324 0 .587.263.587.587v.587zm-1.173-2.35c0 .323-.263.586-.587.586h-.587c-.324 0-.587-.263-.587-.586v-.587c0-.324.263-.587.587-.587h.587c.324 0 .587.263.587.587v.587zM2.235 12.834c.324 0 .587.263.587.587v.587c0 .324-.263.587-.587.587h-.587A.587.587 0 0 1 1.06 14v-.587c0-.324.263-.587.587-.587h.588zm21.602 1.258c.01.203.015.405.015.606 0 5.06-4.114 9.172-9.17 9.172-3.076 0-5.787-1.516-7.464-3.84a6.2 6.2 0 0 1-2.224-4.832c0-2.23 1.182-4.223 2.97-5.364V8.587c0-.18.147-.327.327-.327H11.58c.18 0 .327.147.327.327v1.312h4.526V8.587c0-.18.146-.327.326-.327h3.197c.18 0 .327.147.327.327v1.86a9.5 9.5 0 0 1 3.553 2.645z" fill="#2496ed"/>
            </symbol>

            <symbol id="logo-Redux" viewBox="0 0 32 32">
              <g fill="none" stroke="#764abc" strokeWidth="2.5">
                <path d="M16 3c-1.3 2.7-2 6-2 9.5s.7 6.8 2 9.5c1.3-2.7 2-6 2-9.5S17.3 5.7 16 3z" />
                <path d="M16 3c-1.3 2.7-2 6-2 9.5s.7 6.8 2 9.5c1.3-2.7 2-6 2-9.5S17.3 5.7 16 3z" transform="rotate(60 16 12.5)" />
                <path d="M16 3c-1.3 2.7-2 6-2 9.5s.7 6.8 2 9.5c1.3-2.7 2-6 2-9.5S17.3 5.7 16 3z" transform="rotate(-60 16 12.5)" />
              </g>
            </symbol>

            <symbol id="logo-Firebase" viewBox="0 0 32 32">
              <path d="M5.1 24.3l9.6-18.4c.3-.6 1.2-.6 1.5 0l2.4 4.6-13.5 13.8z" fill="#FFC229"/>
              <path d="M26.9 24.3L17.2 5.9c-.3-.6-1.2-.6-1.5 0L13.3 10.5l13.6 13.8z" fill="#FFA712"/>
              <path d="M5.1 24.3l10.4 6.2c.4.2.9.2 1.3 0L27 24.3l-11.4-23c-.3-.6-1.2-.6-1.5 0L5.1 24.3z" fill="#F44336" opacity="0.95"/>
            </symbol>

            <symbol id="logo-Python" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 6 2.5 6 6v3h6v1H5c-3.3 0-3 1.7-3 5v3c0 3.3.3 3 5 3h3v-3c0-3.3.7-3 4-3h3c3.3 0 3-.3 3-5V9c0-3.3-.3-3-5-3h-3V2c0-.5-.5-2-6-2z" fill="#3572A5"/>
              <path d="M12 22c5.5 0 6-.5 6-4v-3h-6v-1h7c3.3 0 3-1.7 3-5V6c0-3.3-.3-3-5-3h-3v3c0 3.3-.7 3-4 3H7c-3.3 0-3 .3-3 5v3c0 3.3.3 3 5 3h3v2c0 .5.5 2 6 2z" fill="#FFD43B"/>
              <circle cx="9" cy="4" r="0.75" fill="#fff"/>
              <circle cx="15" cy="20" r="0.75" fill="#111"/>
            </symbol>

            <symbol id="logo-Vite" viewBox="0 0 32 32">
              <path d="M29 6L16 29 3 6h26z" fill="url(#viteGradient)"/>
              <path d="M19 2L9 16h8l-3 12 13-16h-9l5-10z" fill="#FFC517"/>
            </symbol>

            <symbol id="logo-Java" viewBox="0 0 24 24">
              <path d="M2 18.5a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V13H2v5.5zm18-5.5h-1v5.5c0 1.2-.5 2.2-1.3 3h.8c1.9 0 3.5-1.6 3.5-3.5V15a2 2 0 0 0-2-2z" fill="#007396"/>
              <path d="M11 0c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm-4 3c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1zm8 0c-.5 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1z" fill="#EA2D42"/>
            </symbol>

            <symbol id="logo-CPP" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="#00599C"/>
              <text x="38" y="62" fill="white" fontSize="46" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">C</text>
              <text x="68" y="48" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">+</text>
              <text x="82" y="48" fill="white" fontSize="28" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">+</text>
            </symbol>

            {/* Line gradients */}
            {[...ROW1,...ROW2].map(s => (
              <linearGradient key={`lg-${s.name}`} id={`lg-${s.name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor={s.color} stopOpacity=".7" />
                <stop offset="100%" stopColor={PB}       stopOpacity=".15"/>
              </linearGradient>
            ))}
            <filter id="blur4">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="blur8">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            
            {/* Linear gradients for Vite logo */}
            <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BD34FE"/>
              <stop offset="100%" stopColor="#41B883"/>
            </linearGradient>
          </defs>

          {/* ── Ring 1 (outer) — 3D perspective ellipse ── */}
          <g transform={`translate(${OX},${OY}) rotate(${r1Tilt})`}>
            {/* Soft glow behind ring */}
            <ellipse cx={0} cy={0} rx={r1RX} ry={r1RY}
              fill="none" stroke={PB} strokeWidth="6" strokeOpacity=".06"
              filter="url(#blur8)" />
            {/* Main ring line */}
            <ellipse cx={0} cy={0} rx={r1RX} ry={r1RY}
              fill="none" stroke={PB} strokeWidth="1" strokeOpacity=".28" />
            {/* Dashed inner highlight */}
            <ellipse cx={0} cy={0} rx={r1RX * 0.98} ry={r1RY * 0.92}
              fill="none" stroke={PB} strokeWidth=".4"
              strokeDasharray="3 30" strokeOpacity=".18" />

            {/* Icons on ring 1 */}
            {RING1.map(rs => {
              const a = (rs.base + angle1) % 360;
              const rad = a * Math.PI / 180;
              const x = r1RX * Math.cos(rad);
              const y = r1RY * Math.sin(rad);
              const normalized = rs.name.replace(/[^a-zA-Z0-9]/g, "");
              const hasLogo = DEFINED_LOGOS.includes(normalized);
              const hot = hovered?.name === rs.name;

              return (
                <g key={rs.name} transform={`translate(${x},${y}) rotate(${-r1Tilt})`}>
                  <circle r={ring1Radius} fill={hot ? `${rs.color}2e` : `${rs.color}18`} stroke={hot ? rs.color : `${rs.color}55`} strokeWidth={hot ? 1.6 : 1.2} style={{ transition: "all 0.3s" }} />
                  <circle r={ring1Radius} fill="none" stroke={`${rs.color}25`} strokeWidth="4" filter="url(#blur4)"/>
                  
                  {hasLogo ? (
                    <g transform={`translate(${-ring1Radius * 0.625}, ${-ring1Radius * 0.625})`}>
                      <svg width={ring1Radius * 1.25} height={ring1Radius * 1.25}>
                        <use href={`#logo-${normalized}`} />
                      </svg>
                    </g>
                  ) : (
                    <text textAnchor="middle" dominantBaseline="central"
                      fontSize={isMobile ? 9 : 12} fill={rs.color}
                      style={{fontFamily:"system-ui,sans-serif"}}>
                      {rs.icon}
                    </text>
                  )}

                  {hovered?.name === rs.name && (
                    <text textAnchor="middle" y={ring1Radius + 10} fontSize="8" fill={rs.color}
                      style={{fontFamily:'"Space Mono",monospace',letterSpacing:"0.05em",textTransform:"uppercase",fontWeight:700}}>
                      {rs.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* ── Ring 2 (inner) — 3D perspective ellipse ── */}
          <g transform={`translate(${OX},${OY}) rotate(${r2Tilt})`}>
            <ellipse cx={0} cy={0} rx={r2RX} ry={r2RY}
              fill="none" stroke={CYAN} strokeWidth=".9" strokeOpacity=".22" />
            <ellipse cx={0} cy={0} rx={r2RX * 0.97} ry={r2RY * 0.90}
              fill="none" stroke={CYAN} strokeWidth=".35"
              strokeDasharray="2 24" strokeOpacity=".14" />

            {/* Icons on ring 2 */}
            {RING2.map(rs => {
              const a = (rs.base + angle2 + 720) % 360;
              const rad = a * Math.PI / 180;
              const x = r2RX * Math.cos(rad);
              const y = r2RY * Math.sin(rad);
              const normalized = rs.name.replace(/[^a-zA-Z0-9]/g, "");
              const hasLogo = DEFINED_LOGOS.includes(normalized);
              const hot = hovered?.name === rs.name;

              return (
                <g key={rs.name} transform={`translate(${x},${y}) rotate(${-r2Tilt})`}>
                  <circle r={ring2Radius} fill={hot ? `${rs.color}25` : `${rs.color}12`} stroke={hot ? rs.color : `${rs.color}45`} strokeWidth={hot ? 1.5 : 1} style={{ transition: "all 0.3s" }} />
                  <circle r={ring2Radius} fill="none" stroke={`${rs.color}20`} strokeWidth="4" filter="url(#blur4)"/>
                  
                  {hasLogo ? (
                    <g transform={`translate(${-ring2Radius * 0.643}, ${-ring2Radius * 0.643})`}>
                      <svg width={ring2Radius * 1.286} height={ring2Radius * 1.286}>
                        <use href={`#logo-${normalized}`} />
                      </svg>
                    </g>
                  ) : (
                    <text textAnchor="middle" dominantBaseline="central"
                      fontSize={isMobile ? 8.5 : 11} fill={rs.color}
                      style={{fontFamily:"system-ui,sans-serif"}}>
                      {rs.icon}
                    </text>
                  )}

                  {hovered?.name === rs.name && (
                    <text textAnchor="middle" y={ring2Radius + 10} fontSize="8" fill={rs.color}
                      style={{fontFamily:'"Space Mono",monospace',letterSpacing:"0.05em",textTransform:"uppercase",fontWeight:700}}>
                      {rs.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* ── Connector curved lines from top fan icons to central orb ── */}
          {linePts.map(lp => {
            const tx = orbPos.x || W / 2;
            const ty = orbPos.y || secH * 0.62;
            const hot = hovered?.name === lp.name;
            const cp1y = lp.y + (ty - lp.y) * 0.3 + 50;
            const cp2y = ty - 65;
            const orbRadius = isMobile ? 44 : 56;
            const targetY = ty - (orbRadius - 4);
            const d = `M ${lp.x} ${lp.y} C ${lp.x} ${cp1y}, ${tx} ${cp2y}, ${tx} ${targetY}`;
            return (
              <g key={lp.name}>
                {/* Solid base line */}
                <path d={d} fill="none"
                  stroke={lp.color}
                  strokeWidth={hot ? 2.2 : 0.8}
                  strokeOpacity={hot ? 0.85 : 0.14}
                  style={{ transition:"all 0.35s ease" }}
                />
                {/* Animated dashed glow */}
                <path d={d} fill="none"
                  stroke={`url(#lg-${lp.name})`}
                  strokeWidth={hot ? 2.8 : 1.2}
                  strokeDasharray="7 20"
                  strokeOpacity={hot ? 1 : 0.28}
                  style={{ animation:"sgDash 2.2s linear infinite", transition:"all 0.35s ease" }}
                />
              </g>
            );
          })}

          {/* Orb ambient glow ring in SVG */}
          <circle
            cx={OX} cy={OY}
            r={80}
            fill="none" stroke={hovered?.color ?? PB}
            strokeWidth="60" strokeOpacity=".04"
            filter="url(#blur8)"
            style={{ transition:"stroke 0.5s ease" }}
          />
        </svg>

        {/* ── Content (relative layer, above SVG) ── */}
        <div style={{ position:"relative", zIndex:10, width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>

          {/* Header */}
          <div style={{
            textAlign:"center", marginBottom:"60px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(26px)",
            transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)",
            padding:"0 20px",
            maxWidth: "900px",
          }}>
            {/* Badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"6px 18px",
              background:`linear-gradient(90deg,${PB}18,${CYAN}18)`,
              border:`1px solid ${PB}40`,
              borderRadius:"100px",
              marginBottom:"20px",
            }}>
              <span style={{
                width:"6px", height:"6px", borderRadius:"50%",
                background:CYAN,
                boxShadow:`0 0 8px ${CYAN}`,
                display:"inline-block",
                animation:"sgGlow 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily:'"Space Mono",monospace',
                fontSize:"9px", letterSpacing:"0.2em",
                textTransform:"uppercase", color:CYAN,
                fontWeight:700,
              }}>Tech Stack &amp; Capabilities</span>
            </div>

            {/* "My Skills" heading */}
            <h2 style={{
              fontSize:"clamp(40px,7vw,72px)",
              fontWeight:800,
              lineHeight:1.05,
              color:"#ffffff",
              margin:"0 0 16px",
              fontFamily:'"Syne",sans-serif',
              letterSpacing:"-0.03em",
            }}>
              My{" "}
              <span style={{
                background:`linear-gradient(90deg,${CYAN},${PB})`,
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                textShadow:"none",
              }}>Skills</span>
            </h2>

            {/* Tagline */}
            <p style={{
              fontSize:"clamp(15px, 2.4vw, 20px)",
              fontWeight:400,
              lineHeight:1.55,
              color:"rgba(255,255,255,0.72)",
              margin:"0 auto",
              fontFamily:'"Syne",sans-serif',
              letterSpacing:"-0.01em",
              maxWidth:"700px",
            }}>
              From{" "}
              <span style={{
                background:`linear-gradient(90deg,${PB},${CYAN})`,
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",
                fontWeight:700,
              }}>
                AI training &amp; prompt engineering
              </span>
              {" "}to full-stack web development — I bring a versatile skill set built for the modern tech landscape.
            </p>

            <div style={{
              width:"54px", height:"3px", borderRadius:"2px",
              background:`linear-gradient(90deg,${PU},${CYAN})`,
              margin:"22px auto 0", boxShadow:`0 0 14px ${PU}65`,
            }} />
            <p style={{
              marginTop:"14px", fontFamily:'"Space Mono",monospace',
              fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.22)",
            }}>
              {hovered
                ? `Highlighting · ${hovered.name}`
                : `${ROW1.length + ROW2.length + RING1.length + RING2.length} technologies in orbit`}
            </p>
          </div>

          {/* ── Fan Icon Row 1 ── */}
          <div style={{
            display:"flex", justifyContent:"center",
            gap: gap1, flexWrap:"nowrap",
            width:"100%", padding: isMobile ? "0 10px" : "0 clamp(12px,4vw,60px)",
            opacity: mounted ? 1 : 0, transition:"opacity 0.7s ease 0.2s",
          }}>
            {ROW1.map((sk, i) => (
              <div
                key={sk.name}
                ref={el => { r1Refs.current[i] = el; }}
                style={{ animation: mounted ? `sgFadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s both` : "none" }}
              >
                <Bubble skill={sk} size={bubbleSize1} active={hovered?.name === sk.name}
                  onEnter={() => setHovered(sk)} onLeave={() => setHovered(null)} />
              </div>
            ))}
          </div>

          {/* ── Fan Icon Row 2 ── */}
          <div style={{
            display:"flex", justifyContent:"center",
            gap: gap2, flexWrap:"nowrap",
            width:"100%", padding: isMobile ? "0 10px" : "0 clamp(30px,7vw,120px)",
            marginTop: isMobile ? "10px" : "14px",
            opacity: mounted ? 1 : 0, transition:"opacity 0.7s ease 0.3s",
          }}>
            {ROW2.map((sk, i) => (
              <div
                key={sk.name}
                ref={el => { r2Refs.current[i] = el; }}
                style={{ animation: mounted ? `sgFadeUp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${(ROW1.length + i) * 0.07}s both` : "none" }}
              >
                <Bubble skill={sk} size={bubbleSize2} active={hovered?.name === sk.name}
                  onEnter={() => setHovered(sk)} onLeave={() => setHovered(null)} />
              </div>
            ))}
          </div>

          {/* ── Central Glowing Orb Area ── */}
          <div style={{
            position:"relative", width:"100%",
            display:"flex", alignItems:"center", justifyContent:"center",
            minHeight: isMobile ? "360px" : "520px", marginTop:"20px",
          }}>
            <div
              ref={orbRef}
              style={{
                position:"relative",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.6)",
                transition:"opacity 0.9s ease 0.4s, transform 0.9s cubic-bezier(0.34,1.56,0.64,1) 0.4s",
              }}
            >
              {/* Outer animated ring */}
              <div style={{
                position:"absolute", inset: isMobile ? "-40px" : "-55px", borderRadius:"50%",
                border:`1px solid ${hovered?.color ?? PB}20`,
                animation:"sgSpin 20s linear infinite",
                transition:"border-color 0.5s",
              }} />
              {/* Mid ring */}
              <div style={{
                position:"absolute", inset: isMobile ? "-25px" : "-35px", borderRadius:"50%",
                border:`1px dashed ${hovered?.color ?? PB}18`,
                animation:"sgSpin 14s linear infinite reverse",
                transition:"border-color 0.5s",
              }} />
              {/* Glow bloom */}
              <div style={{
                position:"absolute", inset: isMobile ? "-20px" : "-30px", borderRadius:"50%",
                background:`radial-gradient(circle,${hovered?.color ?? PB}35,transparent 70%)`,
                filter:"blur(18px)", transition:"background 0.5s ease", pointerEvents:"none",
              }} />
              {/* Core orb */}
              <div style={{
                width: isMobile ? "88px" : "112px",
                height: isMobile ? "88px" : "112px",
                borderRadius: "50%",
                background:`radial-gradient(135deg,${hovered?.color ?? PB}30 0%,${PU}1a 55%,rgba(7,4,22,0.93) 100%)`,
                border:`2px solid ${hovered?.color ?? PB}70`,
                boxShadow:`0 0 ${isMobile ? 25 : 40}px ${hovered?.color ?? PB}55,0 0 ${isMobile ? 60 : 100}px ${hovered?.color ?? PB}25,inset 0 0 ${isMobile ? 22 : 35}px ${hovered?.color ?? PB}15`,
                display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:"5px",
                backdropFilter:"blur(22px)",
                transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                animation:"sgPulse 3s ease-in-out infinite",
                position:"relative", zIndex:2,
              }}>
                {hovered ? (
                  <>
                    <div style={{ width: isMobile ? "32px" : "42px", height: isMobile ? "32px" : "42px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
                      {DEFINED_LOGOS.includes(hovered.name.replace(/[^a-zA-Z0-9]/g, "")) ? (
                        <svg style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
                          <use href={`#logo-${hovered.name.replace(/[^a-zA-Z0-9]/g, "")}`} />
                        </svg>
                      ) : (
                        <span style={{ fontSize: isMobile ? "24px" : "32px", lineHeight: 1 }}>{hovered.icon}</span>
                      )}
                    </div>
                    <div style={{
                      fontFamily:'"Space Mono",monospace', fontSize: isMobile ? "8px" : "9px",
                      color:hovered.color, letterSpacing:"0.07em",
                      textTransform:"uppercase", textAlign:"center",
                      padding:"0 8px", lineHeight:1.3,
                      fontWeight: 700,
                      textShadow: `0 0 8px ${hovered.color}44`,
                    }}>{hovered.name}</div>
                  </>
                ) : (
                  <SigmaLogo color={PB} size={isMobile ? 36 : 46} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p style={{
          position:"relative", zIndex:10, marginTop:"8px",
          fontFamily:'"Space Mono",monospace', fontSize:"9px",
          letterSpacing:"0.18em", textTransform:"uppercase",
          color:"rgba(255,255,255,0.13)", textAlign:"center",
          opacity: mounted ? 1 : 0, transition:"opacity 1s ease 1s",
        }}>
          ↑ hover any skill to illuminate its connection
        </p>
      </section>
    </>
  );
}