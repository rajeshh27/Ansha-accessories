import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Ring({ color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.1, 0.32, 32, 100]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
    </mesh>
  );
}

function Gem({ color, position }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.8;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.15} transparent opacity={0.85} />
    </mesh>
  );
}

export default function ProductShowcase3D({ color = '#B45D3D' }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 5]} intensity={1.1} color="#FFE7CE" />
      <pointLight position={[-3, -2, 3]} intensity={0.6} color="#FFFFFF" />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.7}>
        <Ring color={color} />
      </Float>
      <Gem color="#E8C9A8" position={[1.7, 0.8, 0.5]} />
      <Gem color="#C97847" position={[-1.7, -0.6, 0.5]} />
      <Gem color="#D89876" position={[0, 1.5, -0.5]} />
    </Canvas>
  );
}
