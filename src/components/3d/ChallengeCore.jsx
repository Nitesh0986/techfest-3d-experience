import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const PILLARS = [
  { label: 'BUILD', color: '#00f0ff', pos: [1.8, 1.2, 0] },
  { label: 'BREAK', color: '#ff007f', pos: [-1.8, 1.2, 0] },
  { label: 'RETHINK', color: '#8a2be2', pos: [-1.8, -1.2, 0] },
  { label: 'CREATE', color: '#00ffcc', pos: [1.8, -1.2, 0] },
];

function TesseractCore() {
  const outerBox = useRef();
  const innerBox = useRef();
  const corePoly = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerBox.current) {
      outerBox.current.rotation.x = t * 0.4;
      outerBox.current.rotation.y = t * 0.5;
    }
    if (innerBox.current) {
      innerBox.current.rotation.x = -t * 0.6;
      innerBox.current.rotation.z = t * 0.4;
    }
    if (corePoly.current) {
      corePoly.current.rotation.y += delta * 1.2;
      const s = 0.9 + Math.sin(t * 3) * 0.1;
      corePoly.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Outer Wireframe Box */}
      <mesh ref={outerBox}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          emissive="#00f0ff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Inner Rotating Translucent Box */}
      <mesh ref={innerBox}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color="#8a2be2"
          transmission={0.7}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
          emissive="#b026ff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Glowing Inner Energy Nucleus */}
      <mesh ref={corePoly}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          roughness={0.1}
        />
      </mesh>

      {/* Orbiting Pillar Badges */}
      {PILLARS.map((p, idx) => (
        <group key={idx} position={p.pos}>
          <Html center distanceFactor={8}>
            <div
              className="px-3 py-1 rounded-lg border text-center select-none shadow-lg"
              style={{
                borderColor: `${p.color}80`,
                backgroundColor: 'rgba(3, 7, 18, 0.85)',
                boxShadow: `0 0 15px ${p.color}50`
              }}
            >
              <span
                className="font-orbitron text-xs sm:text-sm font-black tracking-widest"
                style={{ color: p.color }}
              >
                {p.label}
              </span>
            </div>
          </Html>
        </group>
      ))}

      <pointLight color="#00f0ff" intensity={4} distance={6} />
      <pointLight color="#ff007f" intensity={3} distance={5} position={[0, -2, 0]} />
    </group>
  );
}

export default function ChallengeCore() {
  return (
    <div className="w-full h-[380px] sm:h-[460px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <TesseractCore />
      </Canvas>
    </div>
  );
}
