import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import ayodhyaClearImg from '../../assets/ayodhya_clear.png';

const Diya = ({ position }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    emissive="#ff9d00"
                    emissiveIntensity={10}
                    color="#ff5e00"
                />
                <pointLight color="#ff9d00" intensity={0.5} distance={2} />
            </mesh>
        </Float>
    );
};

const Diyas = ({ count = 40 }) => {
    const positions = useMemo(() => {
        const pos = [];
        for (let i = 0; i < count; i++) {
            pos.push([
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 2,
                (Math.random() - 0.5) * 10
            ]);
        }
        return pos;
    }, [count]);

    return (
        <>
            {positions.map((pos, i) => (
                <Diya key={i} position={pos} />
            ))}
        </>
    );
};

const AyodhyaScene = ({ onNext }) => {
    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden font-sans">
            {/* Photorealistic Background Layer */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={ayodhyaClearImg}
                    alt="Ayodhya Ram Mandir"
                    className="w-full h-full object-cover contrast-[1.1] brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </motion.div>

            {/* 3D Atmosphere Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />

                    {/* Divine Lighting */}
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffdfba" />

                    <Diyas />

                    <Sparkles
                        count={150}
                        scale={20}
                        size={3}
                        speed={0.4}
                        opacity={0.4}
                        color="#ffd700"
                    />

                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-10 py-16 pointer-events-none">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-center"
                >
                    <span className="text-gold-200 text-xs font-black uppercase tracking-[0.5em] mb-3 block drop-shadow-md">
                        VIRTUAL DARSHAN
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.3)] tracking-tighter">
                        AYODHYA <span className="text-gold-200">DHAM</span>
                    </h1>
                </motion.div>

                <div className="flex flex-col items-center gap-6 pointer-events-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-lg text-center shadow-2xl"
                    >
                        <p className="text-white/90 text-lg font-medium leading-relaxed italic drop-shadow-sm">
                            "May the divine blessings of **Shri Ram** and **Lord Hanuman** be with you today and always, Vedika."
                        </p>
                    </motion.div>

                    <button
                        onClick={onNext}
                        className="px-12 py-4 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2 group"
                    >
                        <span>Jai Shri Ram</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>

            {/* Divine Light Rays (CSS Overlay) */}
            <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,rgba(255,215,0,0.15),transparent_70%)] opacity-60" />
        </div>
    );
};

export default AyodhyaScene;
