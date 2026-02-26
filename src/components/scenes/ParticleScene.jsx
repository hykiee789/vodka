import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import ParticleSystem from '../interactive/ParticleSystem';
import { Sparkles, Heart, Flower, RefreshCw, Globe } from 'lucide-react';

const ParticleScene = ({ onNext }) => {
    const [shape, setShape] = useState('sphere');

    const shapes = [
        { id: 'sphere', icon: <Globe size={20} />, label: 'Galaxy' },
        { id: 'heart', icon: <Heart size={20} />, label: 'Love' },
        { id: 'flower', icon: <Flower size={20} />, label: 'Bloom' },
        { id: 'saturn', icon: <RefreshCw size={20} />, label: 'Ring' },
        { id: 'fireworks', icon: <Sparkles size={20} />, label: 'Burst' },
    ];

    return (
        <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
                    <color attach="background" args={['#020617']} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <ParticleSystem shapeType={shape} />
                </Canvas>
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 p-6 md:p-10 pointer-events-none flex flex-col justify-between">
                {/* Top Left: Title */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-1"
                >
                    <div className="flex items-center gap-2 text-barbie-pink">
                        <Sparkles size={18} className="animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Visual Symphony</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-2xl">
                        MASSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbie-pink to-violet-400">PARTICLES</span>
                    </h1>
                </motion.div>

                {/* Center/Bottom: Controls */}
                <div className="flex flex-col items-center gap-6 mb-10 w-full">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 pointer-events-auto shadow-2xl"
                    >
                        {shapes.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setShape(s.id)}
                                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-500 ${shape === s.id
                                    ? 'bg-barbie-pink text-white shadow-[0_0_20px_rgba(255,105,180,0.4)] scale-105'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                {s.icon}
                                <span className="text-sm font-bold tracking-wide">{s.label}</span>
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Right Bottom: Navigation */}
                <div className="absolute bottom-10 right-10 pointer-events-auto">
                    <button
                        onClick={onNext}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-xl border border-white/5 transition-all backdrop-blur-md text-sm font-medium"
                    >
                        Next Chapter →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParticleScene;
