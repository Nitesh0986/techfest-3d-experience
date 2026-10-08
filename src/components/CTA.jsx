import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Rocket, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function CTA({ onOpenRegisterModal }) {
  const [isActivating, setIsActivating] = useState(false);

  const handleEnter = () => {
    soundManager.playWarp();
    setIsActivating(true);

    // Confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#8a2be2', '#00ffff', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsActivating(false);
      if (onOpenRegisterModal) {
        onOpenRegisterModal();
      }
    }, 700);
  };

  return (
    <section id="cta" className="relative py-32 sm:py-44 bg-[#030712] border-t border-cyan-500/10 overflow-hidden text-center">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Screen flash on activation */}
      {isActivating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cyan-400/20 backdrop-blur-sm pointer-events-none"
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Top telemetry tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-400/40 text-xs font-mono text-cyan-400 mb-8">
          <Terminal className="w-3.5 h-3.5" />
          <span>PORTAL READY // TRANSMISSION LOCKED</span>
        </div>

        {/* Cinematic Text Block */}
        <h3 className="font-space text-xl sm:text-2xl font-light tracking-[0.25em] text-cyan-400 uppercase">
          THE FUTURE IS WAITING.
        </h3>

        <h2 className="font-orbitron text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mt-4 mb-6 leading-tight">
          ARE YOU READY TO{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 text-glow-cyan">
            BUILD IT?
          </span>
        </h2>

        <p className="font-inter text-slate-300 text-sm sm:text-base max-w-xl font-light leading-relaxed mb-10">
          Join thousands of developers, roboticists, AI researchers, and visionaries shaping the next frontier. Limited spots available for the global edition.
        </p>

        {/* Giant Enter Button */}
        <div className="relative group">
          {/* Animated glow aura behind button */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 opacity-70 blur-xl group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />

          <button
            onClick={handleEnter}
            onMouseEnter={() => soundManager.playHover()}
            disabled={isActivating}
            className={`relative px-12 py-5 rounded-full font-orbitron text-base sm:text-lg font-black tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-300 hover:from-cyan-300 hover:to-purple-200 transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.8)] hover:shadow-[0_0_50px_rgba(0,240,255,1)] flex items-center gap-3 transform group-hover:scale-105 active:scale-95 ${
              isActivating ? 'scale-110 brightness-150' : ''
            }`}
          >
            <Rocket className="w-5 h-5 text-black" />
            <span>ENTER TECHFEST</span>
          </button>
        </div>

        {/* Status footnote */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>NO CHARGE TO COMPETE</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span>WORLDWIDE PARTICIPATION</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>INSTANT ADMISSION REVIEW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
