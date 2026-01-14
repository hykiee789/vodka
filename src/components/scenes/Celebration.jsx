import { motion } from 'framer-motion';
import CoolText from '../common/CoolText';

const Heart = ({ delay, x }) => (
    <motion.div
        className="absolute top-[-50px] text-3xl"
        style={{ left: `${x}%` }}
        initial={{ y: 0, opacity: 0.8 }}
        animate={{
            y: window.innerHeight + 100,
            x: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.8, 1, 0.8, 0]
        }}
        transition={{
            duration: 8 + Math.random() * 4,
            delay,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        ❤️
    </motion.div>
);

const VedikaText = ({ delay, x }) => (
    <motion.div
        className="absolute top-[-50px] text-3xl font-hero font-extrabold tracking-wider"
        style={{
            left: `${x}%`,
            color: ['#E0218A', '#E23636', '#FFB6C1', '#FF9999'][Math.floor(Math.random() * 4)],
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))'
        }}
        initial={{ y: 0, opacity: 0.9 }}
        animate={{
            y: window.innerHeight + 100,
            rotate: [0, 360],
            opacity: [0.9, 1, 0.9, 0]
        }}
        transition={{
            duration: 7 + Math.random() * 3,
            delay,
            repeat: Infinity,
            ease: "linear"
        }}
    >
        VEDIKA
    </motion.div>
);

const Balloon = ({ color, delay, x }) => (
    <motion.div
        className="absolute bottom-[-100px] w-12 h-16 rounded-t-full rounded-b-3xl opacity-80"
        style={{ backgroundColor: color, left: `${x}%` }}
        initial={{ y: 0 }}
        animate={{
            y: -1200,
            x: [0, 20, -20, 0],
        }}
        transition={{
            y: { duration: 6, delay, repeat: Infinity, ease: "linear" },
            x: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[2px] h-10 bg-slate-400/30" />
    </motion.div>
);

const Celebration = ({ onNext }) => {
    const balloons = [
        { color: '#FF9999', x: 10, delay: 0 },
        { color: '#FFB6C1', x: 25, delay: 1 },
        { color: '#99CCFF', x: 40, delay: 0.5 },
        { color: '#FFC0CB', x: 55, delay: 2 },
        { color: '#FFE4E1', x: 70, delay: 1.5 },
        { color: '#333333', x: 85, delay: 0.2 },
        { color: '#FF9999', x: 15, delay: 2.5 },
        { color: '#FFB6C1', x: 45, delay: 1.2 },
    ];

    // Generate hearts rain
    const hearts = [...Array(15)].map((_, i) => ({
        x: (i * 7) % 100,
        delay: i * 0.5
    }));

    // Generate VEDIKA text rain
    const vedikaTexts = [...Array(6)].map((_, i) => ({
        x: (i * 15 + 5) % 100,
        delay: i * 1.2
    }));

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden cursor-pointer gpu"
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
            {/* Hearts Rain */}
            <div className="absolute inset-0 pointer-events-none">
                {hearts.map((h, i) => (
                    <Heart key={`heart-${i}`} {...h} />
                ))}
            </div>

            {/* VEDIKA Text Rain */}
            <div className="absolute inset-0 pointer-events-none">
                {vedikaTexts.map((v, i) => (
                    <VedikaText key={`vedika-${i}`} {...v} />
                ))}
            </div>

            {/* Balloons Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                {balloons.map((b, i) => (
                    <Balloon key={i} {...b} />
                ))}
            </div>

            <motion.div
                className="relative z-10 text-center px-8 py-16 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl max-w-2xl mx-4 gpu"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
            >
                <CoolText
                    text="HAPPY BIRTHDAY"
                    className="text-5xl md:text-7xl font-hero text-spiderman-red tracking-widest mb-2 drop-shadow-[0_0_20px_rgba(226,54,54,0.3)]"
                    delay={0.5}
                />
                <CoolText
                    text="VEDIKA"
                    className="text-6xl md:text-8xl font-glam text-barbie-pink mb-8 drop-shadow-[0_0_20px_rgba(224,33,138,0.3)]"
                    delay={1}
                />

                <motion.p
                    className="text-white/20 text-lg md:text-xl font-hero tracking-[0.2em] uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                >
                    (tap to continue)
                </motion.p>

                {/* Minimalist Background */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-spiderman-red/[0.02] -z-10" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-barbie-pink/[0.02] -z-10" />
            </motion.div>
        </motion.div>
    );
};

export default Celebration;
