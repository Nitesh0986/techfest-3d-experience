import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, ChevronRight, Activity } from 'lucide-react';
import TimelineScene from './3d/TimelineScene';
import { TIMELINE_STEPS } from '../utils/constants';
import { soundManager } from '../utils/audio';

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepSelect = (idx) => {
    soundManager.playSelect();
    setActiveStep(idx);
  };

  const current = TIMELINE_STEPS[activeStep];

  return (
    <section id="timeline" className="relative py-28 sm:py-36 bg-[#030712] border-t border-cyan-500/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>03 // CHRONOLOGICAL SEQUENCE</span>
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-tight">
            THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              JOURNEY
            </span>
          </h2>
          <p className="font-inter text-slate-400 text-sm sm:text-base mt-4 font-light">
            A 5-phase crucible taking you from speculative conceptualization to live arena deployment.
          </p>
        </div>

        {/* 3D Glowing Spline Path Canvas */}
        <div className="relative mb-8">
          <TimelineScene activeIndex={activeStep} />
          <div className="text-center -mt-4">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400/60 uppercase">
              // 3D WAYPOINT TELEMETRY PATH //
            </span>
          </div>
        </div>

        {/* Waypoint Phase Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
          {TIMELINE_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => handleStepSelect(idx)}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? 'glass-panel-glow border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                    : 'glass-panel border-cyan-500/20 hover:border-cyan-500/40 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  >
                    PHASE {step.step}
                  </span>
                  {isActive && <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                </div>
                <div
                  className={`font-orbitron text-sm font-bold tracking-wider mt-1 ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {step.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-2xl glass-panel-glow border border-cyan-500/40 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
                <div>
                  <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold">
                    PHASE {current.step} — {current.phase}
                  </span>
                  <h3 className="font-orbitron text-2xl sm:text-3xl font-black text-white mt-1">
                    {current.headline}
                  </h3>
                </div>

                <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{current.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{current.location}</span>
                  </div>
                </div>
              </div>

              <p className="font-inter text-slate-300 text-sm sm:text-base mt-6 leading-relaxed font-light">
                {current.summary}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <button
                  disabled={activeStep === 0}
                  onClick={() => handleStepSelect(activeStep - 1)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs border ${
                    activeStep === 0
                      ? 'opacity-30 border-slate-700 text-slate-500 cursor-not-allowed'
                      : 'border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-white'
                  }`}
                >
                  ← PREV PHASE
                </button>

                <button
                  disabled={activeStep === TIMELINE_STEPS.length - 1}
                  onClick={() => handleStepSelect(activeStep + 1)}
                  className={`flex items-center gap-1 px-5 py-2 rounded-lg font-orbitron text-xs font-bold tracking-wider ${
                    activeStep === TIMELINE_STEPS.length - 1
                      ? 'opacity-30 border border-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30'
                  }`}
                >
                  <span>NEXT PHASE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
