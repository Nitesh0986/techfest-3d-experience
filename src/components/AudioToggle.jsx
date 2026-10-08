import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const state = soundManager.toggle();
    setIsPlaying(state);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isPlaying
          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
          : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-500'
      }`}
      aria-label={isPlaying ? 'Mute sound effects' : 'Enable futuristic sound effects'}
      title={isPlaying ? 'Mute Sound' : 'Enable Cyber Audio FX'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider font-semibold hidden sm:inline">AUDIO ON</span>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="text-[11px] font-mono tracking-wider hidden sm:inline">AUDIO OFF</span>
        </>
      )}
    </button>
  );
}
