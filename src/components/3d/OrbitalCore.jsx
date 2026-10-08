import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OrbitalCore({ scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  const groupRef = useRef();
  const innerSphereRef = useRef();
  const outerSphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const cubesGroupRef = useRef();

  // Procedural floating cubes
  const floatingCubes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.5;
      const height = (Math.sin(i * 1.5) * 1.2);
      const size = 0.08 + (i % 4) * 0.04;
      return { angle, radius, height, size, speed: 0.4 + (i % 5) * 0.2 };
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse sway & scroll-induced rotation
      const scrollRotation = scrollProgress * Math.PI * 3;
      groupRef.current.rotation.y = t * 0.18 + mouse.x * 0.4 + scrollRotation;
      groupRef.current.rotation.x = mouse.y * 0.25 + Math.sin(t * 0.25) * 0.1 + scrollProgress * 0.8;
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.08 + scrollProgress * 0.5;

      // Dynamic scale transformation with scroll
      const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.35;
      groupRef.current.scale.set(scale, scale, scale);
    }

    if (innerSphereRef.current) {
      // Pulsing nucleus - intensifies with scroll
      const pulseSpeed = 2.5 + scrollProgress * 4;
      const pulse = 1 + Math.sin(t * pulseSpeed) * (0.08 + scrollProgress * 0.08);
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
      innerSphereRef.current.rotation.y += delta * (0.4 + scrollProgress * 0.8);
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * (0.2 + scrollProgress * 0.6);
      outerSphereRef.current.rotation.z += delta * 0.2;
    }

    // Rings expand like an interstellar gate as camera approaches
    const ringExpansion = 1 + Math.sin(Math.min(scrollProgress * Math.PI, Math.PI)) * 0.6;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * (0.6 + scrollProgress * 1.2);
      ring1Ref.current.rotation.y += delta * 0.3;
      ring1Ref.current.scale.set(ringExpansion, ringExpansion, ringExpansion);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * (0.5 + scrollProgress * 1.0);
      ring2Ref.current.rotation.z += delta * 0.4;
      ring2Ref.current.scale.set(ringExpansion * 1.05, ringExpansion * 1.05, ringExpansion * 1.05);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * (0.4 + scrollProgress * 0.9);
      ring3Ref.current.rotation.z -= delta * 0.5;
      ring3Ref.current.scale.set(ringExpansion * 1.1, ringExpansion * 1.1, ringExpansion * 1.1);
    }

    if (cubesGroupRef.current) {
      cubesGroupRef.current.rotation.y += delta * (0.25 + scrollProgress * 1.5);
      const cubeDispersal = 1 + scrollProgress * 0.8;
      cubesGroupRef.current.scale.set(cubeDispersal, cubeDispersal, cubeDispersal);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Glowing Nucleus */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00b4d8"
          emissiveIntensity={2.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Point light emitted by inner nucleus */}
      <pointLight color="#00f0ff" intensity={4} distance={6} />
      <pointLight color="#b026ff" intensity={3} distance={5} position={[0, -0.5, 0]} />

      {/* Outer Faceted Geometric Wireframe Icosahedron */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#8a2be2"
          wireframe
          transparent
          opacity={0.65}
          emissive="#8a2be2"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Translucent glassy shell */}
      <mesh>
        <icosahedronGeometry args={[1.24, 2]} />
        <meshPhysicalMaterial
          color="#030c22"
          roughness={0.15}
          metalness={0.8}
          transmission={0.6}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Triple Orbital Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00f0ff"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.05, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#b026ff"
          emissive="#8a2be2"
          emissiveIntensity={1.6}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0, Math.PI / 3]}>
        <torusGeometry args={[2.35, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#00ffcc"
          emissive="#00ffcc"
          emissiveIntensity={1.4}
          roughness={0.3}
        />
      </mesh>

      {/* Orbiting Floating Cubes & Nodes */}
      <group ref={cubesGroupRef}>
        {floatingCubes.map((cube, idx) => {
          const x = Math.cos(cube.angle) * cube.radius;
          const z = Math.sin(cube.angle) * cube.radius;
          return (
            <mesh key={idx} position={[x, cube.height, z]} rotation={[idx, idx * 0.5, 0]}>
              <boxGeometry args={[cube.size, cube.size, cube.size]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#00f0ff' : '#b026ff'}
                emissive={idx % 2 === 0 ? '#00f0ff' : '#b026ff'}
                emissiveIntensity={1.2}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
