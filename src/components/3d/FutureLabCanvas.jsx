import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';

// 1. AI Neural Network
function NeuralCoreMesh({ isSelected }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isSelected ? 1.2 : 0.4);
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <octahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          emissive="#00f0ff"
          emissiveIntensity={isSelected ? 2.5 : 1.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00e5ff"
          emissiveIntensity={isSelected ? 3 : 1.5}
        />
      </mesh>
    </group>
  );
}

// 2. Quantum Satellite
function SatelliteMesh({ isSelected }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isSelected ? 0.9 : 0.3);
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main Body */}
      <mesh>
        <boxGeometry args={[0.8, 1.4, 0.8]} />
        <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={0.9} metalness={0.8} />
      </mesh>
      {/* Left Solar Panel */}
      <mesh position={[-1.6, 0, 0]}>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00b4d8" emissiveIntensity={1.2} />
      </mesh>
      {/* Right Solar Panel */}
      <mesh position={[1.6, 0, 0]}>
        <boxGeometry args={[1.8, 0.7, 0.05]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00b4d8" emissiveIntensity={1.2} />
      </mesh>
      {/* Antenna Dish */}
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.5, 0.3, 16, 1, true]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  );
}

// 3. Cybernetic Robotic Arm Concept
function RoboticArmMesh({ isSelected }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isSelected ? 1.0 : 0.3);
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base turret */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.5, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Lower Arm */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.22, 0.22, 1.3, 16]} />
        <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={1.1} />
      </mesh>
      {/* Elbow Joint */}
      <mesh position={[0.2, 0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.5} />
      </mesh>
      {/* Forearm */}
      <mesh position={[0.2, 0.9, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.18, 0.18, 1.1, 16]} />
        <meshStandardMaterial color="#8a2be2" emissive="#8a2be2" emissiveIntensity={0.8} />
      </mesh>
      {/* End Effector Gripper */}
      <mesh position={[0.35, 1.5, 0]}>
        <torusGeometry args={[0.28, 0.06, 12, 24]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

// 4. Digital Holographic Planet
function DigitalPlanetMesh({ isSelected }) {
  const meshRef = useRef();
  const ringRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.7;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#030712"
          wireframe
          emissive="#00ffcc"
          emissiveIntensity={isSelected ? 2.2 : 1.2}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 48]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// 5. Toroidal Fusion Core
function FusionCoreMesh({ isSelected }) {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.rotation.y += delta * 1.1;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <torusKnotGeometry args={[0.85, 0.24, 80, 16]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={isSelected ? 3 : 1.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <pointLight color="#ffaa00" intensity={4} distance={5} />
    </group>
  );
}

export default function FutureLabCanvas({ activeProjectId }) {
  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[440px]">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
          <pointLight position={[-5, -5, -5]} intensity={1.5} color="#8a2be2" />

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 3}
          />

          <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
            {activeProjectId === 'neural-network' && <NeuralCoreMesh isSelected={true} />}
            {activeProjectId === 'quantum-satellite' && <SatelliteMesh isSelected={true} />}
            {activeProjectId === 'cyber-arm' && <RoboticArmMesh isSelected={true} />}
            {activeProjectId === 'digital-planet' && <DigitalPlanetMesh isSelected={true} />}
            {activeProjectId === 'fusion-core' && <FusionCoreMesh isSelected={true} />}
          </Float>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
