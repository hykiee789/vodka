import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CakeCutting = ({ onNext }) => {
    const [sliceProgress, setSliceProgress] = useState(0);
    const [isSlicing, setIsSlicing] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
    const [confetti, setConfetti] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (sliceProgress >= 100 && !showSuccess) {
            setShowSuccess(true);
            // Generate confetti
            const newConfetti = [...Array(80)].map((_, i) => ({
                id: i,
                x: 50 + (Math.random() - 0.5) * 30,
                y: 55,
                color: ['#E23636', '#E0218A', '#FF9999', '#FFB6C1', '#99CCFF', '#FFC0CB', '#FFD700'][Math.floor(Math.random() * 7)],
                rotation: Math.random() * 360,
            }));
            setConfetti(newConfetti);

            // Auto advance after 3 seconds
            setTimeout(() => {
                onNext();
            }, 3000);
        }
    }, [sliceProgress, showSuccess, onNext]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPos({ x, y });

        // Check if cursor is in cake area
        if (isSlicing && y > 35 && y < 75 && x > 25 && x < 75) {
            setSliceProgress((prev) => Math.min(prev + 1.5, 100));
        }
    };

    const handleMouseDown = () => setIsSlicing(true);
    const handleMouseUp = () => setIsSlicing(false);

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden cursor-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {/* Custom Cursor - Knife */}
            <motion.div
                className="absolute pointer-events-none z-50"
                style={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    className="relative"
                    animate={{
                        scale: isSlicing ? 1.1 : 1,
                        rotate: isSlicing ? -50 : -45,
                    }}
                    transition={{ type: "spring", damping: 10 }}
                >
                    {/* Knife blade */}
                    <div className="relative w-16 h-3 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-full shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
                        {/* Blade tip */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-slate-200" />
                    </div>
                    {/* Knife handle */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-4 bg-gradient-to-r from-amber-800 to-amber-900 rounded-l-lg shadow-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-700/40 to-transparent rounded-l-lg" />
                    </div>
                    {/* Glow effect when slicing */}
                    {isSlicing && (
                        <motion.div
                            className="absolute inset-0 bg-white rounded-full blur-md opacity-50"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        />
                    )}
                </motion.div>
            </motion.div>

            {/* Title */}
            {!showSuccess && (
                <motion.div
                    className="absolute top-12 md:top-20 z-10 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-hero text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] tracking-wider"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🎂 CUT THE CAKE 🎂
                    </motion.h1>
                </motion.div>
            )}

            {/* Cake Container */}
            <motion.div
                className="relative"
                initial={{ scale: 0.7, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 12, delay: 0.8 }}
            >
                {/* Cake Plate */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[420px] h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-[50%] shadow-2xl" />

                {/* Cake Base Layer - Bottom Tier */}
                <motion.div
                    className="relative w-96 h-40 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    style={{
                        clipPath: sliceProgress > 0
                            ? `polygon(0 0, ${100 - sliceProgress}% 0, ${100 - sliceProgress}% 100%, 0 100%)`
                            : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                >
                    {/* Strawberry Frosting */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600 rounded-t-[2.5rem]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-[2.5rem]" />
                    </div>

                    {/* Cake texture - layers */}
                    <div className="absolute top-12 left-0 right-0 h-[2px] bg-yellow-200/40" />
                    <div className="absolute top-20 left-0 right-0 h-[2px] bg-yellow-200/40" />
                    <div className="absolute top-28 left-0 right-0 h-[2px] bg-yellow-200/40" />

                    {/* Decorative cream dots */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-3 w-4 h-4 bg-white rounded-full shadow-sm"
                            style={{ left: `${12 + i * 11}%` }}
                        />
                    ))}

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem]" />
                </motion.div>

                {/* Cake Sliced Part */}
                {sliceProgress > 0 && (
                    <motion.div
                        className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        style={{
                            clipPath: `polygon(${100 - sliceProgress}% 0, 100% 0, 100% 100%, ${100 - sliceProgress}% 100%)`,
                            transformOrigin: 'left center',
                        }}
                        animate={{
                            x: sliceProgress >= 100 ? 120 : sliceProgress * 0.8,
                            rotate: sliceProgress >= 100 ? 20 : sliceProgress * 0.15,
                            y: sliceProgress >= 100 ? 20 : 0,
                        }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        {/* Frosting on sliced part */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600 rounded-t-[2.5rem]">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-[2.5rem]" />
                        </div>

                        {/* Inner cake texture - exposed layers */}
                        <div className="absolute left-0 top-12 bottom-0 w-2 bg-gradient-to-r from-yellow-300 to-yellow-400" />
                        <div className="absolute left-2 top-14 bottom-2 w-[2px] bg-amber-900/30" />

                        {/* Decorative cream dots */}
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-3 w-4 h-4 bg-white rounded-full shadow-sm"
                                style={{ left: `${12 + i * 11}%` }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* Candles */}
                {sliceProgress < 100 && (
                    <>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute top-[-50px]"
                                style={{ left: `${35 + i * 15}%` }}
                                initial={{ scale: 0, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                            >
                                {/* Flame */}
                                <motion.div
                                    className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-5 h-8"
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [1, 0.85, 1],
                                    }}
                                    transition={{ duration: 0.4 + i * 0.1, repeat: Infinity }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[2px]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-yellow-300 to-yellow-100 rounded-full" />
                                    {/* Inner flame */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-yellow-200 to-white rounded-full" />
                                </motion.div>
                                {/* Candle stick */}
                                <div className="w-4 h-12 bg-gradient-to-b from-spiderman-red via-red-600 to-red-800 rounded-sm shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-sm" />
                                    {/* Wax drip */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-red-300 rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                    </>
                )}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 w-80 md:w-96"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-spiderman-red via-barbie-pink to-spiderman-red rounded-full relative"
                        style={{ width: `${sliceProgress}%` }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                </div>
                <motion.p
                    className="text-center text-white/60 text-sm mt-2 font-hero tracking-wider"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {Math.round(sliceProgress)}% Complete
                </motion.p>
            </motion.div>

            {/* Instructions */}
            {sliceProgress < 100 && (
                <motion.p
                    className="absolute bottom-8 text-white/50 text-base md:text-lg font-hero tracking-wider uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity }}
                >
                    ✨ Click and drag across the cake to slice ✨
                </motion.p>
            )}

            {/* Confetti Particles */}
            {confetti.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-3 h-3 md:w-4 md:h-4"
                    style={{
                        backgroundColor: particle.color,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                    }}
                    initial={{ opacity: 1, scale: 1, rotate: particle.rotation }}
                    animate={{
                        y: [0, window.innerHeight + 100],
                        x: [(Math.random() - 0.5) * 300],
                        rotate: [particle.rotation, particle.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
                        opacity: [1, 1, 0.8, 0],
                        scale: [1, 1.2, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 2.5 + Math.random() * 1.5,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* Sparkles during slicing */}
            {isSlicing && sliceProgress < 100 && (
                <motion.div
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                    style={{
                        left: `${cursorPos.x}%`,
                        top: `${cursorPos.y}%`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 0.5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
};

export default CakeCutting;
