import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Sky, PerspectiveCamera, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Plane3D = () => {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Subtle banking animation
        groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
        groupRef.current.position.y = Math.sin(time * 0.8) * 0.2;
    });

    return (
        <group ref={groupRef}>
            {/* Simple Stylized Plane */}
            <mesh castShadow>
                <boxGeometry args={[0.2, 0.1, 1.2]} />
                <meshStandardMaterial color="white" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 0.02, 0.4]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.15, -0.5]} castShadow>
                <boxGeometry args={[0.02, 0.3, 0.2]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Cockpit */}
            <mesh position={[0, 0.05, 0.4]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#22d3ee" transparent opacity={0.6} />
            </mesh>
        </group>
    );
};

const FlightScene = ({ onNext }) => {
    useEffect(() => {
        // Auto-transition to Ayodhya after 5 seconds
        const timer = setTimeout(() => {
            onNext();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative w-full h-full bg-sky-400 overflow-hidden font-sans">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Environment */}
                <Sky
                    distance={450000}
                    sunPosition={[10, 20, 10]}
                    exposure={0.5}
                    azimuth={0.25}
                    turbidity={0.2}
                    rayleigh={0.5}
                />
                <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />

                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Plane3D />
                </Float>

                {/* Cloud layer moving past the plane */}
                <group position={[0, -2, -10]}>
                    <Cloud position={[-10, 0, 0]} args={[3, 2]} opacity={0.4} speed={0.4} />
                    <Cloud position={[10, 0, -5]} args={[3, 2]} opacity={0.6} speed={0.2} />
                    <Cloud position={[0, -1, 5]} args={[3, 2]} opacity={0.5} speed={0.5} />
                    <Cloud position={[-5, 2, -15]} args={[3, 2]} opacity={0.3} speed={0.1} />
                </group>
            </Canvas>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-white text-lg font-black uppercase tracking-[0.8em] drop-shadow-lg opacity-80 mb-2">
                        In Flight
                    </h2>
                    <div className="w-48 h-[1px] bg-white/30 mx-auto" />
                    <p className="mt-4 text-white/60 text-xs font-bold uppercase tracking-widest">
                        Approaching Uttar Pradesh
                    </p>
                </motion.div>
            </div>

            {/* Landing Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
    );
};

export default FlightScene;
