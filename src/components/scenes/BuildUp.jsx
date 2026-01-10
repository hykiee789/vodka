import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import CoolText from '../common/CoolText';

const BuildUp = ({ onNext }) => {
    const [step, setStep] = useState(0);
    const words = ["Today", "is", "all", "about"];

    const handleClick = () => {
        if (step < words.length) {
            setStep(prev => prev + 1);
        } else {
            onNext();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full p-4 gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
            <motion.div
                className="bg-white/5 w-full max-w-2xl min-h-[500px] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-12 text-center cursor-pointer border border-white/10 gpu"
                onClick={handleClick}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="flex flex-col items-center gap-6 relative z-10">
                    {step === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/20 font-hero text-3xl tracking-widest"
                        >
                            Tap to begin...
                        </motion.div>
                    )}

                    {words.map((word, i) => (
                        i < step && (
                            <motion.h2
                                key={i}
                                className={`text-4xl md:text-6xl tracking-widest ${i % 2 === 0 ? 'font-hero text-spiderman-red drop-shadow-[0_0_10px_rgba(226,54,54,0.3)]' : 'font-glam text-barbie-pink drop-shadow-[0_0_10px_rgba(224,33,138,0.3)]'}`}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                {word}
                            </motion.h2>
                        )
                    ))}

                    {step === words.length && (
                        <motion.div
                            className="mt-6 relative"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                        >
                            <h2 className="text-8xl md:text-9xl font-hero text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                YOU
                            </h2>
                            <motion.div
                                className="absolute -top-4 -right-4 text-barbie-pink"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles size={32} />
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Hint text */}
                <motion.p
                    className="absolute bottom-8 text-white/20 text-xs font-bold uppercase tracking-[0.2em]"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {step > 0 ? (step === words.length ? "Tap for the surprise!" : "Keep tapping") : "Tap the card"}
                </motion.p>

                {/* Minimalist Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-spiderman-red/5 to-transparent -z-10" />
            </motion.div>
        </motion.div>
    );
};

export default BuildUp;
