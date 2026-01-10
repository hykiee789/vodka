import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, MousePointer2 } from 'lucide-react';
import CoolText from '../common/CoolText';

const Intro = ({ onNext }) => {
    const [fallingEmojis, setFallingEmojis] = useState([]);
    const emojis = ['🎂', '🎉', '💖', '✨', '🎈', '🎁'];

    const triggerEmojiFall = (emoji) => {
        const newEmojis = Array.from({ length: 15 }).map(() => ({
            id: Math.random(),
            emoji,
            left: Math.random() * 100,
            duration: Math.random() * (4 - 2) + 2,
            delay: Math.random() * 0.5,
            size: Math.random() * (40 - 20) + 20
        }));
        setFallingEmojis(prev => [...prev, ...newEmojis]);
    };

    // Clean up falling emojis
    useEffect(() => {
        if (fallingEmojis.length > 100) {
            setFallingEmojis(prev => prev.slice(-50));
        }
    }, [fallingEmojis]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center w-full h-full relative gpu overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Falling Emojis Container */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <AnimatePresence>
                    {fallingEmojis.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ y: -50, opacity: 0, x: `${item.left}%` }}
                            animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
                            transition={{ duration: item.duration, delay: item.delay, ease: "linear" }}
                            className="absolute"
                            style={{ fontSize: item.size }}
                        >
                            {item.emoji}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Floating Dock on the Left */}
            <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl z-20"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                    <MousePointer2 size={20} className="text-white/40 animate-bounce" />
                    <div className="w-8 h-[1px] bg-white/10" />
                </div>

                {emojis.map((emoji, idx) => (
                    <motion.button
                        key={idx}
                        className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-white/10 rounded-xl transition-colors relative group"
                        whileHover={{ scale: 1.2, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            triggerEmojiFall(emoji);
                        }}
                    >
                        {emoji}
                        <div className="absolute left-full ml-4 px-2 py-1 bg-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none border border-white/10">
                            Click me!
                        </div>
                    </motion.button>
                ))}
            </motion.div>

            <div className="flex flex-col items-center gap-12 relative group z-10" onClick={onNext}>
                {/* Re-added Text with Vibrant Color */}
                <CoolText
                    text="For someone special"
                    className="text-5xl md:text-7xl font-glam text-barbie-pink drop-shadow-[0_0_15px_rgba(224,33,138,0.3)]"
                    delay={0.5}
                />

                <div className="relative">
                    {/* Minimalist "Tap me!" Hint */}
                    <motion.div
                        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 px-6 py-2 rounded-full shadow-lg border border-white/10 whitespace-nowrap z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <span className="text-white font-hero text-xl tracking-widest uppercase">Open the gift</span>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 rotate-45 border-b border-r border-white/10"></div>
                    </motion.div>

                    {/* Vibrant Gift Icon */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/20 group-hover:border-barbie-pink/50 transition-colors">
                            {/* Vibrant Ribbons */}
                            <div className="absolute w-full h-8 bg-barbie-pink/20 top-1/2 -translate-y-1/2 shadow-sm" />
                            <div className="absolute h-full w-8 bg-barbie-pink/20 left-1/2 -translate-x-1/2 shadow-sm" />

                            <Gift size={64} className="text-spiderman-red drop-shadow-[0_0_20px_rgba(226,54,54,0.4)] relative z-10" />

                            {/* Subtle Glow */}
                            <div className="absolute inset-0 bg-spiderman-red/5 rounded-full" />
                        </div>

                        {/* Vibrant Bow Top */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-12 flex justify-center">
                            <div className="w-10 h-10 border border-white/20 rounded-full bg-barbie-pink/30 -mr-2 rotate-12 shadow-md" />
                            <div className="w-10 h-10 border border-white/20 rounded-full bg-barbie-pink/30 -ml-2 -rotate-12 shadow-md" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Intro;
