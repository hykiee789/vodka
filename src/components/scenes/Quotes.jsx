import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoolText from '../common/CoolText';

const Quotes = ({ onNext }) => {
    const [index, setIndex] = useState(0);
    const quotes = ["not just a friend", "a whole era", "my constant"];

    const handleClick = () => {
        if (index < quotes.length - 1) {
            setIndex(index + 1);
        } else {
            onNext();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AnimatePresence mode="wait">
                <div key={index} className="flex justify-center w-full">
                    <CoolText
                        text={quotes[index]}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-slate-800 text-center px-4"
                        delay={0}
                    />
                </div>
            </AnimatePresence>
            <div className="absolute bottom-12 flex gap-2">
                {quotes.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-slate-800' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Quotes;
