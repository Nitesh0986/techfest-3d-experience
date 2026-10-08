import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'explore'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Check what element is under the cursor
      const target = e.target;
      if (!target || typeof target.closest !== 'function') {
        setCursorType('default');
        return;
      }

      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-cursor="hover"]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      ) {
        setCursorType('hover');
      } else if (target.closest('[data-cursor="explore"]') || target.closest('canvas')) {
        setCursorType('explore');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing ring lerp loop
    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-200 ease-out border will-change-transform ${
          cursorType === 'hover'
            ? 'w-14 h-14 -ml-7 -mt-7 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-110'
            : cursorType === 'explore'
            ? 'w-16 h-16 -ml-8 -mt-8 border-purple-400/80 bg-purple-500/10 shadow-[0_0_20px_rgba(176,38,255,0.4)] scale-110'
            : 'w-8 h-8 -ml-4 -mt-4 border-cyan-500/40'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {cursorType === 'explore' && (
          <span className="font-orbitron text-[8px] font-bold tracking-widest text-cyan-300 uppercase animate-pulse">
            3D
          </span>
        )}
      </div>
    </div>
  );
}
