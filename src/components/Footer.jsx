import { useState, useEffect } from 'react';
import { Terminal, Github, Twitter, Disc as Discord, Linkedin, ArrowUp, Activity } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050e] border-t border-cyan-500/20 text-slate-400 py-16 overflow-hidden">
      {/* Background sci-fi grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cyan-500/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-cyan-400 bg-[#070b19] flex items-center justify-center font-orbitron font-black text-cyan-400 text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                TF
              </div>
              <span className="font-orbitron font-black text-xl text-white tracking-widest">
                TECHFEST
              </span>
            </div>

            <p className="font-inter text-xs sm:text-sm text-slate-400 font-light max-w-sm leading-relaxed">
              BEYOND THE HORIZON — The premiere global interactive 3D festival celebrating vanguard engineering, artificial cognition, and creative computation.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 font-mono text-[11px] text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                <span>SYSTEMS OPERATIONAL // ALL GRIDS ONLINE</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <h4 className="font-orbitron text-xs font-bold tracking-widest text-slate-200 uppercase mb-2">
              EXPEDITION
            </h4>
            <a href="#hero" className="hover:text-cyan-400 transition-colors">00 // HORIZON OVERVIEW</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">01 // PHILOSOPHY & METRICS</a>
            <a href="#domains" className="hover:text-cyan-400 transition-colors">02 // TECHNICAL TRACKS</a>
            <a href="#timeline" className="hover:text-cyan-400 transition-colors">03 // EVENT TIMELINE</a>
            <a href="#challenge" className="hover:text-cyan-400 transition-colors">04 // HACKATHON ARENA</a>
            <a href="#future-lab" className="hover:text-cyan-400 transition-colors">05 // FUTURE R&D LAB</a>
          </div>

          {/* Telemetry & UTC Time */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-orbitron text-xs font-bold tracking-widest text-slate-200 uppercase">
              CHRONO METRICS
            </h4>

            <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>LOCAL TIME (UTC):</span>
              </div>
              <div className="text-cyan-300 font-semibold truncate">
                {time || 'SYNCHRONIZING CLOCKS...'}
              </div>
              <div className="pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>FPS ENGINE: THREE_R3F</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Nitesh0986/techfest-3d-experience"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                aria-label="Discord Community"
              >
                <Discord className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Return to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            Created as a creative 3D web development submission. All 3D assets synthesized procedurally in WebGL.
          </p>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
