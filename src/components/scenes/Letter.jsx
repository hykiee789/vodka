import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Mail, Sparkles } from 'lucide-react';
import CoolText from '../common/CoolText';

const Letter = ({ onNext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const message = "Dear Vedika,\n\nHappy Birthday! You're the light in every room and the spark in every conversation. Wishing you a year as beautiful and magical as your soul! ✨\n\nLove always.";

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full p-6 gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="closed"
                        className="bg-white/5 p-12 rounded-[2rem] shadow-2xl border border-white/10 text-center cursor-pointer group relative overflow-hidden"
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ y: -10 }}
                    >
                        {/* Subtle Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-barbie-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <motion.div
                            className="mb-8 flex justify-center"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Mail size={80} className="text-barbie-pink drop-shadow-[0_0_20px_rgba(224,33,138,0.3)]" />
                        </motion.div>

                        <CoolText
                            text="You've got mail!"
                            className="text-4xl md:text-5xl font-glam text-white mb-4"
                            delay={0.2}
                        />
                        <p className="text-white/20 font-hero text-lg tracking-widest">TAP TO OPEN</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/10 max-w-2xl w-full relative overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        {/* Letter Content */}
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <CoolText
                                    text="A Special Message"
                                    className="text-3xl md:text-4xl font-glam text-barbie-pink drop-shadow-[0_0_10px_rgba(224,33,138,0.3)]"
                                    delay={0.2}
                                />
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Heart size={32} className="text-spiderman-red" fill="currentColor" />
                                </motion.div>
                            </div>

                            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8">
                                <p className="text-white/80 text-xl font-medium leading-relaxed whitespace-pre-wrap font-sans italic">
                                    {message}
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onNext}
                                    className="px-12 py-4 bg-spiderman-red text-white rounded-full font-hero text-xl tracking-widest shadow-[0_0_20px_rgba(226,54,54,0.3)] hover:bg-spiderman-red/80 transition-all"
                                >
                                    CONTINUE →
                                </motion.button>
                            </div>
                        </div>

                        {/* Minimalist Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-barbie-pink/[0.02] -z-10" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-spiderman-red/[0.02] -z-10" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Letter;
