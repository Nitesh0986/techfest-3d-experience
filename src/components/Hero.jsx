import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, X, ChevronRight, Compass } from 'lucide-react';
import HeroScene from './3d/HeroScene';
import { soundManager } from '../utils/audio';

export default function Hero({
  scrollProgress,
  mouse,
  selectedObject,
  setSelectedObject,
  onOpenRegisterModal
}) {
  const handleScrollDown = () => {
    soundManager.playSelect();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] overflow-hidden flex flex-col justify-between">
      {/* 3D Background Scene */}
      <HeroScene
        scrollProgress={scrollProgress}
        mouse={mouse}
        onSelectObject={(obj) => setSelectedObject(obj)}
        focusTarget={selectedObject}
      />

      {/* Top spacing to offset fixed navbar */}
      <div className="pt-24" />

      {/* Hero Typography & CTAs */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col items-center text-center pointer-events-none">
        {/* Subtle Cyber Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-cyan-300 font-semibold uppercase">
            FLAGSHIP TECH CARNIVAL // 2026
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none select-none"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
            TECHFEST
          </span>
          <span className="block font-space text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.25em] text-cyan-400 mt-2 sm:mt-4 text-glow-cyan">
            BEYOND THE HORIZON
          </span>
        </motion.h1>

        {/* Subtitle & Supporting Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mt-4 sm:mt-6"
        >
          <p className="font-orbitron text-lg sm:text-xl font-medium text-slate-200 tracking-wide">
            &ldquo;Where Ideas Become Reality&rdquo;
          </p>
          <p className="font-inter text-sm sm:text-base text-slate-400 mt-2 font-light leading-relaxed">
            Explore technology, innovation and imagination through an interactive journey into the future.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10"
        >
          <button
            onClick={handleScrollDown}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-orbitron text-xs font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] flex items-center justify-center gap-2 group"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
            <span>EXPLORE THE FUTURE</span>
          </button>

          <button
            onClick={() => {
              soundManager.playWarp();
              if (onOpenRegisterModal) onOpenRegisterModal();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-orbitron text-xs font-bold tracking-widest text-white border border-cyan-400/40 glass-panel hover:border-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>ENTER THE EXPERIENCE</span>
          </button>
        </motion.div>

        {/* Helper prompt for 3D interactions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 font-mono text-[11px] text-cyan-400/70 tracking-widest uppercase hidden sm:block"
        >
          [ CLICK 3D NODES IN SCENE TO INSPECT DIMENSIONS ]
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center pointer-events-none select-none">
        <button
          onClick={handleScrollDown}
          className="pointer-events-auto group flex flex-col items-center gap-1.5 focus:outline-none"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400/80 uppercase group-hover:text-cyan-300 transition-colors">
            SCROLL TO EXPLORE ↓
          </span>
          <div className="w-5 h-8 rounded-full border border-cyan-500/40 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
            />
          </div>
        </button>
      </div>

      {/* Selected 3D Pillar Inspection HUD Modal */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-6 sm:right-10 z-40 max-w-sm w-full p-6 glass-panel-glow rounded-2xl border border-cyan-400/50 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                <span className="font-mono text-xs tracking-widest text-cyan-400 font-bold">
                  OBJECT {selectedObject.number} // {selectedObject.title}
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager.playHover();
                  setSelectedObject(null);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                aria-label="Close Inspection HUD"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-orbitron text-base font-bold text-white">
                {selectedObject.subtitle}
              </h4>
              <p className="font-inter text-xs text-slate-300 mt-2 leading-relaxed font-light">
                {selectedObject.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
              <span className="font-mono text-[10px] text-cyan-400/70">STATUS: ACTIVE TELEMETRY</span>
              <button
                onClick={() => {
                  soundManager.playSelect();
                  const target = document.getElementById('domains');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                  setSelectedObject(null);
                }}
                className="flex items-center gap-1 font-orbitron text-[10px] text-cyan-300 hover:text-cyan-100 font-bold tracking-wider"
              >
                <span>EXPLORE TRACKS</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
