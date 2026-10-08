import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
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

    const handleMouseMove = (e) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing ring loop
    let animId;
    let currX = -100;
    let currY = -100;

    const loop = () => {
      currX += (position.x - currX) * 0.15;
      currY += (position.y - currY) * 0.15;
      setTrailingPos({ x: currX, y: currY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${cursorType === 'hover' ? 1.5 : 1})`,
        }}
      />

      {/* Trailing Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-200 ease-out border ${
          cursorType === 'hover'
            ? 'w-14 h-14 -ml-7 -mt-7 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
            : cursorType === 'explore'
            ? 'w-16 h-16 -ml-8 -mt-8 border-purple-400/80 bg-purple-500/10 shadow-[0_0_20px_rgba(176,38,255,0.4)]'
            : 'w-8 h-8 -ml-4 -mt-4 border-cyan-500/40'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {cursorType === 'explore' && (
          <span className="font-orbitron text-[8px] font-bold tracking-widest text-cyan-300 uppercase">
            3D
          </span>
        )}
      </div>
    </div>
  );
}
