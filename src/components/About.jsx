import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Terminal, Activity, Layers } from 'lucide-react';
import { FESTIVAL_STATS } from '../utils/constants';
import ErrorBoundary from './ErrorBoundary';

function QuantumGyroscope() {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.8;
      mesh1.current.rotation.y += delta * 0.5;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y -= delta * 0.7;
      mesh2.current.rotation.z += delta * 0.4;
    }
    if (mesh3.current) {
      mesh3.current.rotation.x -= delta * 0.5;
      mesh3.current.rotation.z -= delta * 0.9;
    }
    if (core.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      core.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          wireframe={false}
        />
      </mesh>
      <mesh ref={mesh1}>
        <torusGeometry args={[1.1, 0.02, 16, 64]} />
        <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={mesh2}>
        <torusGeometry args={[1.35, 0.02, 16, 64]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={mesh3}>
        <torusGeometry args={[1.6, 0.02, 16, 64]} />
        <meshStandardMaterial color="#b026ff" emissive="#b026ff" emissiveIntensity={1.2} />
      </mesh>
      <pointLight color="#00f0ff" intensity={3} distance={5} />
    </group>
  );
}

function StatCounter({ stat, isInView }) {
  const [displayValue, setDisplayValue] = useState(typeof stat.value === 'number' ? 0 : stat.value);

  useEffect(() => {
    if (!isInView || typeof stat.value !== 'number') return;

    let start = 0;
    const end = stat.value;
    const duration = 1600; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(end);
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, stat.value]);

  return (
    <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 relative group hover:border-cyan-400/50 transition-all duration-300">
      <div className="absolute -top-3 left-6 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-[#030712] border border-cyan-500/40 text-cyan-400 uppercase">
        TELEMETRY METRIC
      </div>

      <div className="flex items-baseline gap-1 mt-2">
        <span className="font-orbitron text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400">
          {displayValue}
        </span>
        <span className="font-orbitron text-2xl sm:text-3xl font-bold text-cyan-400">
          {stat.suffix}
        </span>
      </div>

      <h4 className="font-orbitron text-xs sm:text-sm font-bold tracking-widest text-slate-100 uppercase mt-2">
        {stat.label}
      </h4>
      <p className="font-inter text-xs text-slate-400 mt-1 font-light">
        {stat.desc}
      </p>

      <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-[10px] font-mono text-cyan-400/70">
        <span>STATUS // VERIFIED</span>
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-28 sm:py-36 bg-[#030712]/80 backdrop-blur-md border-t border-cyan-500/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase font-semibold">
            01 // ARCHITECTURE & VISION
          </span>
        </div>

        {/* 2-Column Content: Left Text, Right 3D Rotating Gyroscope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              &ldquo;THE FUTURE NEEDS{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                BUILDERS.
              </span>&rdquo;
            </h2>

            <div className="p-6 rounded-2xl glass-panel-glow border-l-4 border-l-cyan-400">
              <p className="font-space text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
                Techfest is a playground for curious minds — a place where engineering, creativity and bold ideas collide.
              </p>
            </div>

            <p className="font-inter text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              We stand at the precipice of humanity&apos;s greatest technical leap. From autonomous cognitive systems and zero-gravity manufacturing to post-quantum cryptography, Techfest provides the forge where dreamers become architects and theoretical formulas transform into tactile reality.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 font-mono text-xs text-slate-300">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>MULTIDISCIPLINARY COLLISION</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 font-mono text-xs text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>OPEN INNOVATION LABS</span>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Interactive Rotating Gyroscope */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 h-[340px] sm:h-[400px] w-full rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden relative"
          >
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1 rounded bg-[#030712]/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>LIVE 3D QUANTUM GYROSCOPE</span>
            </div>

            <ErrorBoundary>
              <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
                <Suspense fallback={null}>
                  <QuantumGyroscope />
                </Suspense>
              </Canvas>
            </ErrorBoundary>

            <div className="absolute bottom-3 inset-x-3 text-center">
              <p className="font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                PROCEDURAL THREE.JS ROTATIONAL FLUX
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3 Animated Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {FESTIVAL_STATS.map((stat, idx) => (
            <StatCounter key={idx} stat={stat} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
