import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TempleScene = ({ onNext }) => {
    const [isPraying, setIsPraying] = useState(false);
    const [showBlessing, setShowBlessing] = useState(false);

    const handlePray = () => {
        if (isPraying) return;
        setIsPraying(true);
        setTimeout(() => {
            setShowBlessing(true);
        }, 1000);

        setTimeout(() => {
            setIsPraying(false);
        }, 4000);
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-gradient-to-b from-orange-950/40 via-orange-900/20 to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Serene Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-orange-900/30 to-transparent" />
            </div>

            {/* Ancient Temple Structure - Orange Theme */}
            <motion.div
                className="relative z-10 flex flex-col items-center cursor-pointer"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                onClick={handlePray}
            >
                <div className="relative w-72 h-96 md:w-96 md:h-[450px]">
                    <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                        {/* Ancient Orange Stone Base */}
                        <rect x="10" y="210" width="180" height="30" fill="#7c2d12" rx="2" />
                        <rect x="20" y="190" width="160" height="20" fill="#9a3412" rx="2" />

                        {/* Weathered Orange Pillars */}
                        <rect x="40" y="110" width="12" height="80" fill="#c2410c" />
                        <rect x="75" y="110" width="12" height="80" fill="#c2410c" />
                        <rect x="113" y="110" width="12" height="80" fill="#c2410c" />
                        <rect x="148" y="110" width="12" height="80" fill="#c2410c" />

                        {/* Pillar Caps */}
                        <rect x="38" y="105" width="16" height="5" fill="#ea580c" />
                        <rect x="73" y="105" width="16" height="5" fill="#ea580c" />
                        <rect x="111" y="105" width="16" height="5" fill="#ea580c" />
                        <rect x="146" y="105" width="16" height="5" fill="#ea580c" />

                        {/* Main Ancient Body */}
                        <rect x="55" y="110" width="90" height="80" fill="#9a3412" />

                        {/* Ancient Roof (Shikhara style) */}
                        <path d="M30 110 L170 110 L150 80 L50 80 Z" fill="#7c2d12" />
                        <path d="M50 80 L150 80 L135 50 L65 50 Z" fill="#9a3412" />
                        <path d="M65 50 L135 50 L120 25 L80 25 Z" fill="#c2410c" />
                        <path d="M80 25 L120 25 L100 5 Z" fill="#ea580c" />

                        {/* Entrance with Arch */}
                        <path d="M80 190 L80 140 Q100 120 120 140 L120 190 Z" fill="#431407" />

                        {/* Golden Kalash on top */}
                        <circle cx="100" cy="5" r="4" fill="#fbbf24" />

                        {/* Stone Textures (cracks/weathering) */}
                        <line x1="60" y1="120" x2="70" y2="125" stroke="#431407" strokeWidth="0.5" opacity="0.5" />
                        <line x1="130" y1="150" x2="140" y2="145" stroke="#431407" strokeWidth="0.5" opacity="0.5" />
                        <line x1="45" y1="180" x2="55" y2="175" stroke="#431407" strokeWidth="0.5" opacity="0.5" />
                    </svg>

                    <AnimatePresence>
                        {isPraying && (
                            <motion.div
                                className="absolute inset-0 bg-orange-500/30 rounded-full blur-3xl"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 2, opacity: 1 }}
                                exit={{ scale: 3, opacity: 0 }}
                                transition={{ duration: 2 }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <motion.div className="mt-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-hero text-orange-200 tracking-[0.5em] mb-2 drop-shadow-lg">
                        ANCIENT TEMPLE
                    </h2>
                    <p className="text-orange-400 font-hero text-sm uppercase tracking-[0.3em]">
                        Tap to seek divine blessings
                    </p>
                </motion.div>
            </motion.div>

            {/* Blessing Popup */}
            <AnimatePresence>
                {showBlessing && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowBlessing(false)}
                    >
                        <motion.div
                            className="relative bg-gradient-to-br from-orange-950 to-orange-900 p-12 rounded-[4rem] border border-orange-500/30 shadow-[0_0_100px_rgba(249,115,22,0.2)] text-center max-w-2xl"
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 12 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="text-7xl mb-8 opacity-40"
                            >
                                ☸️
                            </motion.div>

                            <h1 className="text-2xl md:text-3xl font-hero text-orange-100 mb-8 leading-relaxed tracking-wide px-4">
                                To the child born on 28th Feb 2010 [Vedika] day:<br /><br />
                                I grant you a life of purpose and peace. May your health be your greatest wealth,
                                your education a light that never dims, and your pockets always find the abundance you need.
                                I bless you with friendships as steady as the earth and a love that warms your soul like the sun.
                                Walk in grace, for you are never alone.
                            </h1>

                            <motion.div
                                className="text-orange-400/60 font-hero text-sm uppercase tracking-widest"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Tap anywhere to close
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.button
                className="absolute bottom-10 right-10 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/40 font-hero tracking-widest uppercase text-sm transition-colors z-20"
                whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
            >
                Finish Journey →
            </motion.button>

            {/* Divine Orange Particles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -200],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.2, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 7,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </motion.div>
    );
};

export default TempleScene;
