import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Radio, Shield, Globe, Flame, Check } from 'lucide-react';
import FutureLabCanvas from './3d/FutureLabCanvas';
import { FUTURE_LAB_PROJECTS } from '../utils/constants';
import { soundManager } from '../utils/audio';

export default function FutureLab({ onOpenRegisterModal }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = FUTURE_LAB_PROJECTS[selectedIdx];

  const handleSelect = (idx) => {
    soundManager.playSelect();
    setSelectedIdx(idx);
  };

  return (
    <section id="future-lab" className="relative py-28 sm:py-36 bg-[#030712]/80 backdrop-blur-md border-t border-cyan-500/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 // R&D INCUBATOR</span>
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-tight">
            THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              FUTURE LAB
            </span>
          </h2>
          <p className="font-inter text-slate-400 text-sm sm:text-base mt-4 font-light">
            Interactive experimental sandbox. Select and manipulate live quantum and robotic prototypes engineered by festival fellows.
          </p>
        </div>

        {/* 5 Prototype Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {FUTURE_LAB_PROJECTS.map((proj, idx) => {
            const isActive = selectedIdx === idx;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-4 py-2 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'glass-panel-glow border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'glass-panel border-cyan-500/20 text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: proj.color }}
                  />
                  <span>{proj.name}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main 3D Canvas + Spec Sheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left 3D Viewport */}
          <div className="lg:col-span-7 rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden relative p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 px-2">
              <span className="font-mono text-[11px] text-cyan-400 tracking-wider">
                VIEWPORT // PROCEDURAL SIMULATION
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                ACTIVE SHADER: WEBGL_RTX
              </span>
            </div>

            <FutureLabCanvas activeProjectId={current.id} />

            <div className="text-center pt-2 border-t border-cyan-500/20">
              <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
                [ DRAG OR ROTATE VIEWPORT // AUTONOMOUS FLOAT ACTIVE ]
              </span>
            </div>
          </div>

          {/* Right Live Spec HUD */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl glass-panel-glow border border-cyan-400/40 shadow-2xl flex flex-col gap-5"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest border"
                      style={{
                        color: current.color,
                        borderColor: `${current.color}60`,
                        backgroundColor: `${current.color}15`
                      }}
                    >
                      {current.category}
                    </span>
                  </div>
                  <h3 className="font-orbitron text-2xl font-black text-white">
                    {current.name}
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px] uppercase mb-1">
                      CORE TECHNOLOGY:
                    </span>
                    <span className="text-cyan-300 font-semibold">{current.technology}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px] uppercase mb-1">
                      TELEMETRIC BENCHMARKS:
                    </span>
                    <span className="text-slate-200">{current.specs}</span>
                  </div>
                </div>

                <p className="font-inter text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  {current.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      soundManager.playWarp();
                      if (onOpenRegisterModal) onOpenRegisterModal();
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="w-full py-3.5 rounded-xl font-orbitron text-xs font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>EXPLORE →</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
