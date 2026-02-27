import { motion } from 'framer-motion';
import { useState } from 'react';
import CoolText from '../common/CoolText';

const BestMoment = ({ onNext }) => {
    const [answer, setAnswer] = useState('');

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full text-center px-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="relative z-10 max-w-2xl w-full">
                <CoolText
                    text="what is the best and unfogatable meoment between us ??"
                    className="text-3xl md:text-5xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-pastel-lavender to-pastel-peach"
                    delay={0.2}
                />

                <motion.div
                    className="relative"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer here..."
                        className="w-full h-40 p-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pastel-lavender/50 resize-none text-lg backdrop-blur-sm"
                    />
                </motion.div>

                <motion.button
                    onClick={onNext}
                    className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pastel-purple to-pastel-pink text-white font-bold text-xl shadow-lg hover:shadow-pastel-pink/30 transition-all active:scale-95"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                >
                    Next 💖
                </motion.button>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pastel-blue/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pastel-pink/10 rounded-full blur-3xl -z-10 animate-pulse [animation-delay:1s]" />
        </motion.div>
    );
};

export default BestMoment;
