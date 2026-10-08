import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField({ count = 1200, scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff'); // Cyan
    const color2 = new THREE.Color('#8a2be2'); // Violet
    const color3 = new THREE.Color('#00ffff'); // Bright cyan

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical cloud spread
      const radius = 5 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) + (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);

      // Randomly interpolate colors
      const r = Math.random();
      const mixedColor = r < 0.4 ? color1 : r < 0.75 ? color2 : color3;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += delta * 0.05 + mouse.x * 0.001;
    pointsRef.current.rotation.x += delta * 0.02 - mouse.y * 0.001;

    // Scroll expansion effect
    const expansion = 1 + scrollProgress * 1.5;
    pointsRef.current.scale.set(expansion, expansion, expansion);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
