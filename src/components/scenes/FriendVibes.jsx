import { useState } from 'react';
import { motion } from 'framer-motion';

const FriendVibes = ({ onNext }) => {
    const [count, setCount] = useState(0);
    const words = ["best friend", "partner in chaos", "safe place"];

    const handleClick = () => {
        if (count < words.length) {
            setCount(count + 1);
        } else {
            onNext();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center w-full h-full cursor-pointer space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
        >
            {words.map((word, index) => (
                index < count && (
                    <motion.h2
                        key={index}
                        className="text-4xl md:text-6xl font-black tracking-tight text-slate-700"
                        initial={{
                            opacity: 0,
                            y: 50,
                            rotate: -10 + Math.random() * 20,
                            scale: 0.5
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            rotate: -5 + Math.random() * 10,
                            scale: 1
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
                        style={{
                            marginLeft: `${Math.random() * 100 - 50}px`
                        }}
                    >
                        {word}
                    </motion.h2>
                )
            ))}
            {count === words.length && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-sm text-slate-400 uppercase tracking-widest"
                >
                    (tap to continue)
                </motion.div>
            )}
        </motion.div>
    );
};

export default FriendVibes;
