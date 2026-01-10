import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const Character = ({ className = "" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the tilt
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
    const brightness = useSpring(useTransform(mouseY, [-300, 300], [1.2, 0.8]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX - window.innerWidth / 2;
            const y = e.clientY - window.innerHeight / 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className={`relative ${className}`}
            style={{
                rotateX,
                rotateY,
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{
                y: [0, -15, 0], // Breathing/Swaying
                opacity: 1
            }}
            transition={{
                y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                },
                opacity: {
                    duration: 0.5
                }
            }}
            whileTap={{ scale: 0.95, rotate: [0, -2, 2, 0] }}
        >
            {/* 3D Shadow Layer */}
            <motion.div
                className="absolute inset-x-0 bottom-[-20px] h-10 bg-black/40 blur-2xl rounded-full -z-20 scale-x-75"
                style={{
                    translateZ: -50,
                    scale: useTransform(mouseY, [-300, 300], [0.8, 1.2])
                }}
            />

            {/* Mascot Image with 3D depth */}
            <motion.img
                src="/mascot_3d.png"
                alt="3D Mascot"
                className="w-56 md:w-72 h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                style={{
                    translateZ: 100,
                    filter: useTransform(brightness, b => `brightness(${b})`)
                }}
            />

            {/* Dynamic Rim Light Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-barbie-pink/20 to-spiderman-red/20 blur-2xl rounded-full -z-10"
                style={{
                    translateZ: 20,
                    x: useTransform(mouseX, [-300, 300], [30, -30]),
                    y: useTransform(mouseY, [-300, 300], [30, -30])
                }}
            />

            {/* Floating 3D Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full opacity-40 blur-[1px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        translateZ: Math.random() * 200 - 50
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </motion.div>
    );
};

export default Character;
