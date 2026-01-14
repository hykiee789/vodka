import { motion } from 'framer-motion';
import { useState } from 'react';

const CakeCutting = ({ onNext }) => {
    const [isSliced, setIsSliced] = useState(false);

    const handleCakeClick = () => {
        if (!isSliced) {
            setIsSliced(true);
            // Auto advance after animation
            setTimeout(() => {
                onNext();
            }, 2500);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Title */}
            <motion.h1
                className="text-4xl md:text-6xl font-hero text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] tracking-wider mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                🎂 Cut the Cake 🎂
            </motion.h1>

            {/* Cake Container */}
            <motion.div
                className="relative cursor-pointer"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                onClick={handleCakeClick}
            >
                {/* Cake Plate */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[350px] h-5 bg-gradient-to-b from-slate-300 to-slate-400 rounded-[50%] shadow-xl" />

                {/* Main Cake Body */}
                <motion.div
                    className="relative w-80 h-32 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-[2rem] shadow-2xl overflow-hidden"
                    animate={isSliced ? {
                        clipPath: "polygon(0 0, 70% 0, 70% 100%, 0 100%)"
                    } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Pink Frosting Top */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600 rounded-t-[2rem]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-[2rem]" />
                    </div>

                    {/* Decorative cream dots on top */}
                    {[...Array(7)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-2 w-3 h-3 bg-white rounded-full shadow-sm"
                            style={{ left: `${15 + i * 12}%` }}
                        />
                    ))}

                    {/* Cake layers texture */}
                    <div className="absolute top-10 left-0 right-0 h-[2px] bg-yellow-200/30" />
                    <div className="absolute top-16 left-0 right-0 h-[2px] bg-yellow-200/30" />
                    <div className="absolute top-24 left-0 right-0 h-[2px] bg-yellow-200/30" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2rem]" />
                </motion.div>

                {/* Sliced Piece */}
                {isSliced && (
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-[2rem] shadow-2xl overflow-hidden"
                        initial={{
                            clipPath: "polygon(70% 0, 100% 0, 100% 100%, 70% 100%)",
                            x: 0,
                            y: 0,
                            rotate: 0
                        }}
                        animate={{
                            x: 100,
                            y: 30,
                            rotate: 15
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Pink Frosting on slice */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600 rounded-t-[2rem]">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-[2rem]" />
                        </div>

                        {/* Inner cake texture - exposed side */}
                        <div className="absolute left-0 top-10 bottom-0 w-1 bg-gradient-to-r from-yellow-300 to-yellow-400" />

                        {/* Cream dots */}
                        {[...Array(7)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-2 w-3 h-3 bg-white rounded-full shadow-sm"
                                style={{ left: `${15 + i * 12}%` }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* Candles */}
                {!isSliced && (
                    <>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute top-[-40px]"
                                style={{ left: `${35 + i * 15}%` }}
                                initial={{ scale: 0, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                            >
                                {/* Flame */}
                                <motion.div
                                    className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-4 h-6"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [1, 0.9, 1],
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-sm" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-yellow-300 to-yellow-100 rounded-full" />
                                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-t from-yellow-200 to-white rounded-full" />
                                </motion.div>
                                {/* Candle stick */}
                                <div className="w-3 h-10 bg-gradient-to-b from-red-500 via-red-600 to-red-800 rounded-sm shadow-md">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-sm" />
                                </div>
                            </motion.div>
                        ))}
                    </>
                )}
            </motion.div>

            {/* Confetti when sliced */}
            {isSliced && (
                <>
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: ['#E23636', '#E0218A', '#FF9999', '#FFB6C1', '#FFD700'][i % 5],
                                left: '50%',
                                top: '50%',
                            }}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{
                                x: (Math.random() - 0.5) * 600,
                                y: [0, -100, window.innerHeight],
                                opacity: [1, 1, 0],
                                scale: [1, 1.5, 0],
                                rotate: Math.random() * 360,
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </>
            )}

            {/* Instructions */}
            {!isSliced && (
                <motion.p
                    className="absolute bottom-12 text-white/60 text-lg font-hero tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                >
                    ✨ Click the cake to slice ✨
                </motion.p>
            )}
        </motion.div>
    );
};

export default CakeCutting;
