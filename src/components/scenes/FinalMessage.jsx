import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CoolText from '../common/CoolText';

const FinalMessage = ({ onNext }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const messageLines = [
        "I’ve seen your growth. I’ve seen your silent battles.",
        "And I’m glad to have you in ways I don’t always say out loud.",
        "",
        "I hope this year gives you everything you’ve been working for.",
        "I hope the people around you treat you with the respect you deserve.",
        "",
        "And whoever stands beside you in life —",
        "I hope they understand u , treat u nicely.",
        "",
        "But no matter where life takes you,",
        "no matter who comes and goes,",
        "I’ll always be on your team.",
        "",
        "From chaos to success — all the best. Enjoy your life"
    ];

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full min-h-screen py-20 bg-black text-white relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-spiderman-red/5 via-transparent to-transparent opacity-30" />
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-4xl w-full px-8 text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <CoolText
                        text="Happy Birthday, once again"
                        className="text-4xl md:text-6xl font-hero text-barbie-pink mb-12 drop-shadow-[0_0_15px_rgba(224,33,138,0.4)]"
                        delay={1.5}
                    />
                </motion.div>

                <div className="space-y-6">
                    {messageLines.map((line, index) => (
                        <motion.p
                            key={index}
                            className={`text-lg md:text-2xl font-medium tracking-wide ${line === "" ? "h-4" : "text-white/80"}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2 + index * 0.3, duration: 0.8 }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                <motion.div
                    className="mt-20 pt-10 border-t border-white/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 + messageLines.length * 0.3 + 1 }}
                >
                    <p className="text-xl md:text-3xl font-glam text-spiderman-red mb-2">FROM YOUR BEST FRIEND</p>
                    <p className="text-4xl md:text-6xl font-black tracking-widest text-white shadow-text">HYDER</p>
                </motion.div>

                <motion.button
                    onClick={onNext}
                    className="mt-16 px-10 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white/40 hover:text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 10 }}
                >
                    Back to Start 🔄
                </motion.button>
            </div>
        </motion.div>
    );
};

export default FinalMessage;
