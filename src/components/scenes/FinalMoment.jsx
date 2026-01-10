import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CoolText from '../common/CoolText';

const FinalMoment = ({ onNext }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        // Auto transition to fireworks after 5 seconds
        const timer = setTimeout(onNext, 5000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full text-center overflow-hidden cursor-pointer"
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="relative z-10">
                <CoolText
                    text="HAPPY BIRTHDAY 💖"
                    className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-pastel-lavender to-pastel-peach mb-8 drop-shadow-sm"
                    delay={0.5}
                />
            </div>

            {/* Simple CSS Confetti / Floating Elements */}
            {showConfetti && [...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: ['#A7C7E7', '#C3B1E1', '#B5EAD7', '#FFDAC1'][i % 4],
                        left: `${Math.random() * 100}%`,
                        top: '100%',
                    }}
                    animate={{
                        y: -1000,
                        x: Math.random() * 200 - 100,
                        rotate: 360,
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </motion.div>
    );
};

export default FinalMoment;
