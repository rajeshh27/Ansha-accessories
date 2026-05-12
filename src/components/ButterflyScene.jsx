import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Butterfly({ position, scale = 1, speed = 1, color = '#B45D3D' }) {
  const groupRef = useRef();
  const leftWing = useRef();
  const rightWing = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const flap = Math.sin(t * 8 * speed + phase) * 0.7;
    if (leftWing.current) leftWing.current.rotation.y = -0.3 + flap;
    if (rightWing.current) rightWing.current.rotation.y = 0.3 - flap;
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8 * speed + phase) * 0.3;
      groupRef.current.position.x = position[0] + Math.sin(t * 0.5 * speed + phase) * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 0.6 + phase) * 0.15;
    }
  });

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.6, 1.2, 0.7, 1.1, 0.1);
    shape.bezierCurveTo(1.2, -0.3, 0.6, -0.5, 0, -0.1);
    shape.bezierCurveTo(0.1, -0.4, 0.4, -0.7, 0.2, -0.9);
    shape.bezierCurveTo(0, -0.8, -0.05, -0.3, 0, 0);
    return shape;
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={leftWing} position={[-0.05, 0, 0]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.85} roughness={0.6} />
      </mesh>
      <mesh ref={rightWing} position={[0.05, 0, 0]} rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[wingShape]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.85} roughness={0.6} />
      </mesh>
      <mesh>
        <capsuleGeometry args={[0.04, 0.4, 4, 8]} />
        <meshStandardMaterial color="#5C3A24" />
      </mesh>
    </group>
  );
}

function Petal({ position, color, speed = 1 }) {
  const ref = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.3 * speed + phase;
      ref.current.rotation.y = t * 0.4 * speed;
      ref.current.position.y = position[1] - ((t * 0.3 * speed + phase) % 6) + 3;
      ref.current.position.x = position[0] + Math.sin(t * 0.5 + phase) * 0.5;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

export default function ButterflyScene() {
  const butterflies = [
    { position: [-3, 1, 0], scale: 0.9, speed: 1.0, color: '#B45D3D' },
    { position: [2.5, 1.5, -1], scale: 0.7, speed: 1.3, color: '#C97847' },
    { position: [0, -0.5, 1], scale: 0.8, speed: 0.9, color: '#8B4A30' },
    { position: [3.5, -1, 0], scale: 0.6, speed: 1.2, color: '#D89876' },
    { position: [-2.5, -1.5, 0.5], scale: 0.75, speed: 1.1, color: '#B45D3D' },
  ];
  const petals = Array.from({ length: 14 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 8, Math.random() * 4 - 1, (Math.random() - 0.5) * 2],
    color: ['#D89876', '#E8C9A8', '#C97847'][i % 3],
    speed: 0.6 + Math.random() * 0.6,
  }));
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 3, 5]} intensity={0.8} color="#FFE7CE" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#B45D3D" />
      {butterflies.map((b, i) => (<Butterfly key={i} {...b} />))}
      {petals.map((p, i) => (<Petal key={i} {...p} />))}
    </Canvas>
  );
}
