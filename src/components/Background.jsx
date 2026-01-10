import { motion } from 'framer-motion';

const Background = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {/* Minimalist Monochrome Gradients (High Performance) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent" />
            </div>

            {/* Heart Rain Effect (High Performance CSS) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-barbie-pink/20 animate-heart-fall"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-5%`,
                            fontSize: `${Math.random() * (24 - 12) + 12}px`,
                            animationDuration: `${Math.random() * (15 - 8) + 8}s`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            {/* Subtle Grain Overlay for Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Floating Soft Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                            opacity: Math.random() * 0.2
                        }}
                        animate={{
                            y: [null, Math.random() * -50 - 20 + "vh"],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: Math.random() * 15 + 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Background;
