interface SectionTransitionProps {
  variant?: 'primary' | 'secondary' | 'accent';
}

const SectionTransition = ({ variant = 'primary' }: SectionTransitionProps) => {
  const gradientMap = {
    primary: 'from-transparent via-[#00f0ff]/40 to-transparent',
    secondary: 'from-transparent via-[#7000ff]/40 to-transparent',
    accent: 'from-transparent via-[#ff003c]/30 to-transparent',
  };

  const glowMap = {
    primary: 'shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    secondary: 'shadow-[0_0_15px_rgba(112,0,255,0.3)]',
    accent: 'shadow-[0_0_15px_rgba(255,0,60,0.2)]',
  };

  return (
    <div className="relative py-8 flex items-center justify-center overflow-hidden">
      {/* Main line */}
      <div
        className={`section-transition-line h-px w-full max-w-4xl bg-gradient-to-r ${gradientMap[variant]} ${glowMap[variant]}`}
      />
      {/* Center diamond */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div
          className={`w-2 h-2 rotate-45 border ${
            variant === 'primary'
              ? 'border-[#00f0ff]/50 bg-[#00f0ff]/10'
              : variant === 'secondary'
              ? 'border-[#7000ff]/50 bg-[#7000ff]/10'
              : 'border-[#ff003c]/40 bg-[#ff003c]/10'
          } transition-all duration-300`}
          style={{
            animation: 'neon-pulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
};

export default SectionTransition;
