import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [subsystemIndex, setSubsystemIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const subsystems = [
    'CONNECTING TO QUANTUM GRID...',
    'COMPILING WEBGL SHADER PIPELINES...',
    'SYNTHESIZING PROCEDURAL 3D MESHES...',
    'INITIALIZING PARTICLE DYNAMICS...',
    'TECHFEST // READY FOR ENGAGEMENT'
  ];

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch {
      setWebGlSupported(false);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onLoaded, 600);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(prev + increment, 100);
        const subIndex = Math.min(
          Math.floor((next / 100) * subsystems.length),
          subsystems.length - 1
        );
        setSubsystemIndex(subIndex);
        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded, subsystems.length]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white px-6"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none translate-x-32 translate-y-32" />

          {/* Hologram Box */}
          <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-cyan-500/30 text-center">
            {/* Hexagon icon */}
            <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/20 animate-ping opacity-50" />
              <div className="relative w-14 h-14 rounded-xl border border-cyan-400/60 bg-[#070b19] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <span className="font-orbitron font-black text-cyan-400 text-xl tracking-tighter">TF</span>
              </div>
            </div>

            <h1 className="font-orbitron text-2xl md:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400">
              TECHFEST
            </h1>
            <p className="font-space text-xs md:text-sm tracking-widest text-cyan-300/80 uppercase mt-1">
              BEYOND THE HORIZON
            </p>

            <div className="mt-8">
              <div className="flex justify-between items-center text-xs font-mono text-cyan-400/80 mb-2">
                <span className="tracking-widest">INITIALIZING EXPERIENCE...</span>
                <span className="font-bold">{progress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-cyan-500/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_#00f0ff]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Status log */}
              <p className="mt-4 font-mono text-[11px] text-slate-400 tracking-wider truncate">
                {subsystems[subsystemIndex]}
              </p>
            </div>

            {!webGlSupported && (
              <div className="mt-4 p-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono">
                NOTICE: WebGL acceleration limited. Rendering in adaptive mode.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
