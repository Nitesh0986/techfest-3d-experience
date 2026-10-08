import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Ticket, Sparkles, UserCheck, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function RegisterModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    dimension: 'AI & MACHINE LEARNING',
    role: 'Full-Stack / ML Engineer'
  });
  const [accessKey, setAccessKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playWarp();

    // Generate random futuristic pass key
    const randomHex = Array.from({ length: 4 }, () =>
      Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase()
    ).join('-');
    setAccessKey(`TF-2026-${randomHex}`);
    setStep('success');

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8a2be2', '#00ffff', '#ffffff']
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg p-8 rounded-3xl glass-panel-glow border border-cyan-400 shadow-2xl overflow-hidden"
      >
        <button
          onClick={() => {
            soundManager.playHover();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold">
                GATEWAY ADMISSION // 2026
              </span>
            </div>

            <h3 className="font-orbitron text-2xl font-black text-white">
              INITIALIZE BUILDER PASS
            </h3>
            <p className="font-inter text-xs text-slate-300 mt-1 font-light">
              Secure your credentials for Techfest. Full arena access, cloud clusters, and mentorship included.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-cyan-300 uppercase mb-1">
                  HACKER ALIAS / FULL NAME
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Satoshi_99"
                  value={formData.alias}
                  onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-cyan-300 uppercase mb-1">
                  NEURAL LINK / EMAIL ADDRESS
                </label>
                <input
                  required
                  type="email"
                  placeholder="builder@horizon.dev"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-cyan-300 uppercase mb-1">
                  PRIMARY TARGET DIMENSION
                </label>
                <select
                  value={formData.dimension}
                  onChange={(e) => setFormData({ ...formData, dimension: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option>AI & MACHINE LEARNING</option>
                  <option>ROBOTICS & AUTOMATION</option>
                  <option>SPACE & SCIENCE</option>
                  <option>CYBERSECURITY</option>
                  <option>WEB3 & BLOCKCHAIN</option>
                  <option>SUSTAINABILITY TECH</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full py-3.5 rounded-xl font-orbitron text-xs font-black tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>MINT ACCESS CREDENTIAL</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.5)]">
              <Ticket className="w-8 h-8 text-cyan-400" />
            </div>

            <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
              CREDENTIAL MINTED SUCCESSFULLY
            </span>

            <h3 className="font-orbitron text-2xl font-black text-white mt-1">
              WELCOME, {formData.alias.toUpperCase() || 'BUILDER'}
            </h3>

            <div className="my-6 p-4 rounded-2xl bg-slate-900/90 border border-cyan-400/50 font-mono text-center">
              <span className="text-[10px] text-slate-400 block mb-1">CRYPTOGRAPHIC PASS ID:</span>
              <span className="text-cyan-300 font-bold text-base sm:text-lg tracking-wider">
                {accessKey}
              </span>
              <div className="mt-2 text-[10px] text-slate-400">
                DIMENSION // {formData.dimension}
              </div>
            </div>

            <p className="font-inter text-xs text-slate-300 font-light leading-relaxed mb-6">
              Your access telemetry has been synchronized. A cryptographic confirmation packet will arrive at {formData.email}.
            </p>

            <button
              onClick={() => {
                soundManager.playSelect();
                onClose();
              }}
              className="w-full py-3 rounded-xl font-orbitron text-xs font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300"
            >
              CLOSE & EXPLORE 3D WORLDS
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
