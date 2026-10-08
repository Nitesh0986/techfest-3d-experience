import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Terminal } from 'lucide-react';
import AudioToggle from './AudioToggle';
import { soundManager } from '../utils/audio';

export default function Navbar({ activeSection, onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'EXPERIENCES', href: '#domains', id: 'domains' },
    { name: 'JOURNEY', href: '#timeline', id: 'timeline' },
    { name: 'CHALLENGES', href: '#challenge', id: 'challenge' },
    { name: 'FUTURE LAB', href: '#future-lab', id: 'future-lab' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    soundManager.playSelect();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#040711]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => soundManager.playHover()}
        >
          <div className="relative w-9 h-9 rounded-lg border border-cyan-400/50 bg-[#070b19] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <span className="font-orbitron font-black text-cyan-400 text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
              TF
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-orbitron font-extrabold tracking-widest text-lg text-white group-hover:text-cyan-400 transition-colors">
                TECHFEST
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/70 -mt-1 uppercase">
              BEYOND THE HORIZON
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/20">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.3)] -z-10" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Audio + Enter CTA */}
        <div className="flex items-center gap-3">
          <AudioToggle />

          <button
            onClick={() => {
              soundManager.playWarp();
              if (onOpenModal) onOpenModal();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:flex relative items-center gap-2 px-5 py-2 rounded-full overflow-hidden font-orbitron text-xs font-bold tracking-widest text-white border border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-purple-600/30 hover:from-cyan-500/40 hover:to-purple-600/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>ENTER</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] p-4 glass-panel border-b border-cyan-500/30 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-4 py-2.5 rounded-lg font-mono text-sm tracking-wider flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span>{link.name}</span>
                <Terminal className="w-4 h-4 text-cyan-400 opacity-60" />
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                soundManager.playWarp();
                if (onOpenModal) onOpenModal();
              }}
              className="mt-3 w-full py-3 rounded-lg font-orbitron text-xs font-bold tracking-widest text-center text-white bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              ENTER TECHFEST
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
