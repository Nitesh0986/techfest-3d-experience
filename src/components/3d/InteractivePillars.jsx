import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_PILLARS } from '../../utils/constants';
import { soundManager } from '../../utils/audio';

function PillarObject({ data, onSelect }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = hovered ? 1.25 : 1.0;
  const currentScale = useRef(1.0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smooth hover scale lerp
    currentScale.current += (targetScale - currentScale.current) * 0.12;
    meshRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current);

    // Idle rotation (rotates faster on hover)
    const rotSpeed = hovered ? 1.4 : 0.4;
    meshRef.current.rotation.y += delta * rotSpeed;
    meshRef.current.rotation.x += delta * (rotSpeed * 0.5);

    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * rotSpeed * 1.2;
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    soundManager.playHover();
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    soundManager.playSelect();
    onSelect(data);
  };

  return (
    <group position={data.coords}>
      <group
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Render distinct shapes according to object id */}
        {data.id === 'innovation' && (
          <>
            <mesh>
              <dodecahedronGeometry args={[0.55, 0]} />
              <meshStandardMaterial
                color={hovered ? '#ffffff' : data.color}
                emissive={data.color}
                emissiveIntensity={hovered ? 2.5 : 1.1}
                wireframe={false}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <mesh ref={innerRef}>
              <icosahedronGeometry args={[0.7, 1]} />
              <meshStandardMaterial
                color={data.color}
                wireframe
                transparent
                opacity={hovered ? 0.9 : 0.4}
              />
            </mesh>
          </>
        )}

        {data.id === 'competition' && (
          <>
            <mesh>
              <octahedronGeometry args={[0.6, 0]} />
              <meshStandardMaterial
                color={hovered ? '#ffffff' : data.color}
                emissive={data.color}
                emissiveIntensity={hovered ? 2.6 : 1.2}
                roughness={0.15}
                metalness={0.9}
              />
            </mesh>
            <mesh ref={innerRef} rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.75, 0.03, 16, 32]} />
              <meshStandardMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={hovered ? 2.0 : 0.8}
              />
            </mesh>
          </>
        )}

        {data.id === 'collaboration' && (
          <>
            <mesh>
              <torusKnotGeometry args={[0.38, 0.12, 64, 16]} />
              <meshStandardMaterial
                color={hovered ? '#ffffff' : data.color}
                emissive={data.color}
                emissiveIntensity={hovered ? 2.4 : 1.0}
                roughness={0.25}
                metalness={0.7}
              />
            </mesh>
            <mesh ref={innerRef}>
              <ringGeometry args={[0.65, 0.72, 32]} />
              <meshBasicMaterial
                color={data.color}
                side={THREE.DoubleSide}
                transparent
                opacity={hovered ? 0.8 : 0.3}
              />
            </mesh>
          </>
        )}

        {/* Emissive glow halo on hover */}
        {hovered && (
          <pointLight color={data.color} intensity={5} distance={4} />
        )}
      </group>

      {/* Floating 3D Tooltip Tag */}
      <Html
        position={[0, 0.9, 0]}
        center
        distanceFactor={10}
        style={{
          transition: 'all 0.25s ease-out',
          opacity: hovered ? 1 : 0.75,
          transform: hovered ? 'scale(1.1)' : 'scale(0.95)',
          pointerEvents: 'none',
        }}
      >
        <div
          onClick={handleClick}
          className={`pointer-events-auto cursor-pointer select-none px-2.5 py-1 rounded-md border text-center whitespace-nowrap transition-all ${
            hovered
              ? 'glass-panel-glow border-cyan-400 bg-cyan-950/90 shadow-[0_0_15px_rgba(0,240,255,0.6)]'
              : 'glass-panel border-cyan-500/30 bg-slate-950/70'
          }`}
        >
          <div className="font-orbitron text-[9px] font-bold tracking-widest text-cyan-300">
            {data.number} // {data.title}
          </div>
          {hovered && (
            <div className="font-mono text-[8px] text-cyan-200/80 tracking-tight mt-0.5 animate-pulse">
              [CLICK TO INSPECT]
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

export default function InteractivePillars({ onSelectObject }) {
  return (
    <group>
      {HERO_PILLARS.map((pillar) => (
        <PillarObject key={pillar.id} data={pillar} onSelect={onSelectObject} />
      ))}
    </group>
  );
}
