import { motion } from 'react';
import { Sparkles, ArrowRight, Zap, Flame, ShieldCheck } from 'lucide-react';
import ChallengeCore from './3d/ChallengeCore';
import { soundManager } from '../utils/audio';

export default function Challenge({ onOpenRegisterModal }) {
  const handleStart = () => {
    soundManager.playWarp();
    if (onOpenRegisterModal) onOpenRegisterModal();
  };

  return (
    <section id="challenge" className="relative py-28 sm:py-36 bg-[#030712] border-t border-cyan-500/10 overflow-hidden">
      {/* Background cyber lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 w-fit">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>04 // THE GRAND ARENA</span>
            </div>

            <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
              READY TO BUILD THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
                IMPOSSIBLE?
              </span>
            </h2>

            <p className="font-inter text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Step into the high-octane engineering arena. Build revolutionary systems under relentless time pressure, break conventional assumptions, rethink architectures, and create solutions that redefine boundaries.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl glass-panel border border-cyan-500/20">
              <div>
                <span className="font-orbitron text-xl sm:text-2xl font-black text-cyan-400">$100K+</span>
                <p className="font-mono text-[10px] text-slate-400 uppercase mt-0.5">PRIZE PURSE</p>
              </div>
              <div>
                <span className="font-orbitron text-xl sm:text-2xl font-black text-purple-400">48 HRS</span>
                <p className="font-mono text-[10px] text-slate-400 uppercase mt-0.5">SPRINT LENGTH</p>
              </div>
              <div>
                <span className="font-orbitron text-xl sm:text-2xl font-black text-green-400">30+</span>
                <p className="font-mono text-[10px] text-slate-400 uppercase mt-0.5">JURY PARTNERS</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleStart}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full sm:w-auto px-9 py-4 rounded-full font-orbitron text-sm font-black tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] flex items-center justify-center gap-3 group"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right 3D Rotating Geometric Tesseract Construct */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full relative rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden p-2">
              <ChallengeCore />
              <div className="p-4 text-center border-t border-cyan-500/10">
                <span className="font-mono text-[10px] tracking-widest text-cyan-300/80 uppercase">
                  ROTATIONAL TESSERACT CONSTRUCT // QUANTUM COHESION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
