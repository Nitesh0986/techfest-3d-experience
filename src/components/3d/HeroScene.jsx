import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import OrbitalCore from './OrbitalCore';
import ParticleField from './ParticleField';
import InteractivePillars from './InteractivePillars';

function CameraRig({ scrollProgress, mouse, focusTarget }) {
  const currentPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let targetX = mouse.x * 1.2;
    let targetY = mouse.y * 0.8;
    let targetZ = 7.5;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;

    if (focusTarget) {
      // Zoom into selected object
      targetX = focusTarget.coords[0] * 0.85;
      targetY = focusTarget.coords[1] * 0.85 + 0.3;
      targetZ = focusTarget.coords[2] + 2.5;
      lookX = focusTarget.coords[0];
      lookY = focusTarget.coords[1];
      lookZ = focusTarget.coords[2];
    } else {
      // Cinematic scroll trajectory
      // SECTION 1: Camera starts far away (z=7.5)
      // SECTION 2: Camera slowly approaches the object (z=4.5)
      // SECTION 3: Object transforms/rotates
      // SECTION 4: Camera moves through/around the object (z=1.8, y=1.2)
      // SECTION 5: Particle field expands
      if (scrollProgress < 0.25) {
        const factor = scrollProgress / 0.25;
        targetZ = THREE.MathUtils.lerp(7.5, 4.8, factor);
        targetY += THREE.MathUtils.lerp(0, 0.4, factor);
      } else if (scrollProgress < 0.55) {
        const factor = (scrollProgress - 0.25) / 0.3;
        targetZ = THREE.MathUtils.lerp(4.8, 2.2, factor);
        targetY += THREE.MathUtils.lerp(0.4, 1.2, factor);
        targetX += THREE.MathUtils.lerp(0, 2.0, factor);
        lookY = THREE.MathUtils.lerp(0, 0.5, factor);
      } else {
        const factor = Math.min((scrollProgress - 0.55) / 0.45, 1);
        targetZ = THREE.MathUtils.lerp(2.2, 0.8, factor);
        targetY += THREE.MathUtils.lerp(1.2, -1.0, factor);
        targetX += THREE.MathUtils.lerp(2.0, -1.5, factor);
        lookZ = THREE.MathUtils.lerp(0, -3.0, factor);
      }
    }

    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    currentLookAt.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.05);
  });

  return (
    <RigUpdater currentPos={currentPos} currentLookAt={currentLookAt} />
  );
}

function RigUpdater({ currentPos, currentLookAt }) {
  useFrame(({ camera }) => {
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });
  return null;
}

function HolographicGrid() {
  const gridRef = useRef();

  useFrame((state, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.3) % 2 - 1;
    }
  });

  return (
    <group position={[0, -4.2, 0]} rotation={[0, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#00f0ff', '#1e293b']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export default function HeroScene({ scrollProgress, mouse, onSelectObject, focusTarget }) {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 10, 32]} />

        {/* Ambient & Cinematic Directional Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#00f0ff"
        />
        <directionalLight
          position={[-6, -4, -4]}
          intensity={0.8}
          color="#8a2be2"
        />

        <Suspense fallback={null}>
          <CameraRig
            scrollProgress={scrollProgress}
            mouse={mouse}
            focusTarget={focusTarget}
          />
          <OrbitalCore scrollProgress={scrollProgress} mouse={mouse} />
          <InteractivePillars onSelectObject={onSelectObject} />
          <ParticleField scrollProgress={scrollProgress} mouse={mouse} count={1100} />
          <HolographicGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}
