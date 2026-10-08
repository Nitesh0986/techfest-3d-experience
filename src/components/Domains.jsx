import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Bot,
  Rocket,
  ShieldAlert,
  Boxes,
  Leaf,
  Sparkles,
  ArrowRight,
  X,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { DOMAINS } from '../utils/constants';
import { soundManager } from '../utils/audio';

const iconMap = {
  Cpu,
  Bot,
  Rocket,
  ShieldAlert,
  Boxes,
  Leaf
};

function DomainCard({ domain, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[domain.iconName] || Cpu;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundManager.playHover();
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundManager.playSelect();
        onSelect(domain);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 20 : 0}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`relative cursor-pointer rounded-2xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 border ${
        isHovered
          ? 'glass-panel-glow border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.35)]'
          : 'glass-panel border-cyan-500/20 hover:border-cyan-400/40'
      }`}
    >
      {/* Background cyber radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${domain.accentColor}25, transparent 70%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
            style={{
              backgroundColor: `${domain.accentColor}15`,
              borderColor: `${domain.accentColor}60`,
              boxShadow: isHovered ? `0 0 20px ${domain.accentColor}50` : 'none'
            }}
          >
            <IconComponent
              className={`w-6 h-6 transition-transform duration-300 ${
                isHovered ? 'scale-110 rotate-6' : ''
              }`}
              style={{ color: domain.accentColor }}
            />
          </div>

          <span
            className="font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border uppercase"
            style={{
              borderColor: `${domain.accentColor}40`,
              color: domain.accentColor,
              backgroundColor: `${domain.accentColor}10`
            }}
          >
            {domain.badge}
          </span>
        </div>

        <h3 className="font-orbitron text-xl font-bold text-white tracking-wide">
          {domain.title}
        </h3>

        <p className="font-inter text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-light line-clamp-3">
          {domain.description}
        </p>
      </div>

      {/* Bottom Track Tags & Prize */}
      <div className="mt-6 pt-4 border-t border-cyan-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">{domain.prize}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-orbitron font-semibold text-cyan-400 group-hover:text-cyan-300">
            <span>INSPECT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Domains() {
  const [activeModalDomain, setActiveModalDomain] = useState(null);

  return (
    <section id="domains" className="relative py-28 sm:py-36 bg-[#030712] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>02 // DOMAINS OF ENGAGEMENT</span>
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-tight">
            CHOOSE YOUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              DIMENSION
            </span>
          </h2>

          <p className="font-inter text-slate-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Six high-impact technological frontiers. Step into specialized tracks curated by industry luminaries and forge competitive supremacy.
          </p>
        </div>

        {/* 6 Dimension Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOMAINS.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              onSelect={setActiveModalDomain}
            />
          ))}
        </div>
      </div>

      {/* Domain Detail Modal */}
      <AnimatePresence>
        {activeModalDomain && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl p-8 rounded-2xl glass-panel-glow border border-cyan-400 shadow-2xl"
            >
              <button
                onClick={() => {
                  soundManager.playHover();
                  setActiveModalDomain(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full font-mono text-xs tracking-wider border border-cyan-400 text-cyan-300 bg-cyan-950/60 uppercase">
                  {activeModalDomain.badge}
                </span>
                <span className="font-mono text-xs text-amber-400 font-bold">
                  {activeModalDomain.prize}
                </span>
              </div>

              <h3 className="font-orbitron text-2xl font-black text-white">
                {activeModalDomain.title}
              </h3>

              <p className="font-inter text-slate-300 text-sm mt-3 leading-relaxed">
                {activeModalDomain.description}
              </p>

              <div className="mt-6">
                <h4 className="font-orbitron text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
                  SPECIFIC CHALLENGE TRACKS:
                </h4>
                <div className="space-y-2.5">
                  {activeModalDomain.tracks.map((track, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 font-mono text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{track}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => {
                    soundManager.playWarp();
                    setActiveModalDomain(null);
                    const challengeEl = document.getElementById('challenge');
                    if (challengeEl) challengeEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 rounded-xl font-orbitron text-xs font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all"
                >
                  ENROLL IN THIS TRACK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
