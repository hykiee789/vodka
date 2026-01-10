import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import CoolText from '../common/CoolText';

const BirthdayReveal = ({ onNext }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        >
            <motion.div
                className="bg-white w-full max-w-md aspect-[4/5] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Grid Pattern inside Card */}
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mb-8 relative z-10"
                >
                    <PartyPopper size={80} className="text-slate-800" />
                </motion.div>

                {/* Text */}
                <div className="space-y-4 mb-12 relative z-10">
                    <CoolText
                        text="This Birthday, something special for you"
                        className="text-4xl font-cursive text-slate-800 leading-tight"
                        delay={0.5}
                    />
                </div>

                {/* Button */}
                <motion.button
                    className="px-12 py-4 rounded-full font-bold text-lg text-slate-700 bg-white/30 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white/40 hover:scale-105 transition-all relative z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    onClick={onNext}
                >
                    Open it
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default BirthdayReveal;
