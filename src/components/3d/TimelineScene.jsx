import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlowingTimelineSpline({ activeIndex }) {
  const lineRef = useRef();
  const sphereRefs = useRef([]);

  // Generate 5 3D points forming an undulating futuristic cyber path
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-4, 2, 0),
      new THREE.Vector3(-2, -1, 1),
      new THREE.Vector3(0, 1.5, -1),
      new THREE.Vector3(2, -1, 1),
      new THREE.Vector3(4, 2, 0)
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
  }, [curve]);

  const nodePositions = useMemo(() => {
    return [0, 0.25, 0.5, 0.75, 1.0].map((t) => curve.getPointAt(t));
  }, [curve]);

  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.15;
    }
  });

  return (
    <group ref={lineRef}>
      {/* 3D Spline Tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00b4d8"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>

      {/* 5 Chrono Waypoint Spheres */}
      {nodePositions.map((pos, idx) => {
        const isActive = idx === activeIndex;
        return (
          <group key={idx} position={pos}>
            <mesh>
              <sphereGeometry args={[isActive ? 0.22 : 0.14, 24, 24]} />
              <meshStandardMaterial
                color={isActive ? '#00ffff' : '#8a2be2'}
                emissive={isActive ? '#00ffff' : '#8a2be2'}
                emissiveIntensity={isActive ? 3.5 : 1.2}
              />
            </mesh>
            {isActive && (
              <mesh>
                <ringGeometry args={[0.3, 0.38, 32]} />
                <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function TimelineScene({ activeIndex }) {
  return (
    <div className="w-full h-[220px] sm:h-[260px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 4, 3]} intensity={2} color="#00f0ff" />
        <GlowingTimelineSpline activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
