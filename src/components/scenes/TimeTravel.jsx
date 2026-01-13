import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import CoolText from '../common/CoolText';

const TimeTravel = ({ onNext }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden cursor-pointer"
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        >
            {/* Animated Clock Background */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-10"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                <Clock size={400} className="text-white" />
            </motion.div>

            {/* Time Rewind Effect - Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-barbie-pink rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-8 py-16 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl max-w-3xl mx-4"
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 20, delay: 0.3 }}
            >
                {/* Clock Icon */}
                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", damping: 15, delay: 0.5 }}
                >
                    <div className="relative">
                        <Clock size={80} className="text-spiderman-red drop-shadow-[0_0_20px_rgba(226,54,54,0.5)]" />
                        <motion.div
                            className="absolute inset-0 bg-spiderman-red rounded-full blur-xl opacity-30"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Text */}
                <CoolText
                    text="Let's go a couple of hours back"
                    className="text-4xl md:text-6xl font-hero text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    delay={1}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <CoolText
                        text="at 12 AM"
                        className="text-5xl md:text-7xl font-glam text-barbie-pink drop-shadow-[0_0_30px_rgba(224,33,138,0.5)]"
                        delay={2.5}
                    />
                </motion.div>

                {/* Tap to continue */}
                <motion.p
                    className="text-white/20 text-lg md:text-xl font-hero tracking-[0.2em] uppercase mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                >
                    (tap to continue)
                </motion.p>
            </motion.div>

            {/* Corner Accents */}
            <motion.div
                className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-spiderman-red/30 rounded-tl-3xl"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5 }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-barbie-pink/30 rounded-br-3xl"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.5 }}
            />
        </motion.div>
    );
};

export default TimeTravel;
