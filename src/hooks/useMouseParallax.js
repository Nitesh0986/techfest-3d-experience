import { useEffect, useRef, useState } from 'react';

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to [-1, 1]
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const updateLerp = () => {
      // Smooth interpolation
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;

      setMouse({
        x: current.current.x,
        y: current.current.y
      });

      animationFrameId = requestAnimationFrame(updateLerp);
    };

    animationFrameId = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mouse;
}
