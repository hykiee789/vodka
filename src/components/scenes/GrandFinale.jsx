import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import CoolText from '../common/CoolText';

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
            y: { duration: 8, delay, repeat: Infinity, ease: "linear" },
            x: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[2px] h-10 bg-slate-400/30" />
    </motion.div>
);

const FireworkParticle = ({ color, angle, distance }) => {
    return (
        <motion.div
            className="absolute w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        />
    );
};

const Firework = ({ x, y }) => {
    const colors = ['#FF9999', '#FFB6C1', '#99CCFF', '#FFC0CB', '#FFE4E1'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return (
        <div className="absolute" style={{ left: x, top: y }}>
            {[...Array(16)].map((_, i) => (
                <FireworkParticle
                    key={i}
                    color={color}
                    angle={(i * 22.5) * (Math.PI / 180)}
                    distance={150 + Math.random() * 50}
                />
            ))}
        </div>
    );
};

const GrandFinale = ({ onNext }) => {
    const [explosions, setExplosions] = useState([]);

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

    useEffect(() => {
        const launchRocket = () => {
            const id = Date.now();
            const x = Math.random() * 80 + 10 + "%";

            setTimeout(() => {
                setExplosions(prev => [...prev, { id, x, y: "30%" }]);
                setTimeout(() => {
                    setExplosions(prev => prev.filter(ex => ex.id !== id));
                }, 2000);
            }, 1200);
        };

        const interval = setInterval(launchRocket, 1500);
        launchRocket();
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden cursor-pointer gpu"
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background Balloons */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                {balloons.map((b, i) => (
                    <Balloon key={i} {...b} />
                ))}
            </div>

            {/* Background Fireworks */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                {explosions.map(ex => (
                    <Firework key={ex.id} x={ex.x} y={ex.y} />
                ))}
            </div>

            <motion.div
                className="relative z-10 text-center px-8 py-16 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl max-w-3xl mx-4 gpu"
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
                    className="text-7xl md:text-9xl font-glam text-barbie-pink mb-8 drop-shadow-[0_0_20px_rgba(224,33,138,0.3)]"
                    delay={1}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <p className="text-white/60 text-xl md:text-2xl font-medium tracking-wide">
                        Wishing you a year as bright as these fireworks! ✨
                    </p>
                </motion.div>

                {/* Minimalist Background */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-spiderman-red/[0.02] -z-10" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-barbie-pink/[0.02] -z-10" />
            </motion.div>
        </motion.div>
    );
};

export default GrandFinale;
