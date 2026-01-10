import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Heart, ArrowRight } from 'lucide-react';
import CoolText from '../common/CoolText';

const Quiz = ({ onNext }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const questions = [
        {
            question: "Who starts the chaos first?",
            options: ["You 😈", "Me 😇"],
            feedback: "Let's be real, it's definitely a team effort! 😂"
        },
        {
            question: "Best memory together?",
            options: ["Random laughs 🤣", "Late talks 🌙"],
            feedback: "Every moment is iconic with us! ✨"
        },
        {
            question: "One word for us?",
            options: ["Unbreakable 🔒", "Iconic 💅"],
            feedback: "Facts! No duo does it better. 💖"
        }
    ];

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            onNext();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full p-4 gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
            <motion.div
                className="bg-white/5 w-full max-w-lg min-h-[500px] rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center p-8 text-center border border-white/10 gpu"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Header */}
                <div className="mb-8 relative z-10 w-full">
                    <CoolText
                        text="How Well Do You Know Us?"
                        className="text-3xl md:text-4xl font-hero text-spiderman-red mb-4 tracking-widest drop-shadow-[0_0_10px_rgba(226,54,54,0.3)]"
                        delay={0.2}
                    />
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-barbie-pink"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Container */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        className="w-full flex-1 flex flex-col items-center justify-center relative z-10"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                            {questions[currentQuestion].question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {questions[currentQuestion].options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    className={`p-4 rounded-2xl font-medium text-lg transition-all border ${isAnswered && selectedOption === index
                                        ? 'bg-barbie-pink/20 border-barbie-pink text-white'
                                        : 'bg-white/5 border-white/10 text-white/70 hover:border-barbie-pink/30 hover:bg-white/10'
                                        }`}
                                    whileHover={!isAnswered ? { x: 5 } : {}}
                                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isAnswered}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {option}
                                        {isAnswered && selectedOption === index && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <Check size={20} className="text-barbie-pink" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Feedback Message */}
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div
                                    className="mt-8 p-4 bg-spiderman-red/10 rounded-2xl border border-spiderman-red/20 w-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
                                        <Sparkles size={18} className="text-barbie-pink" />
                                        {questions[currentQuestion].feedback}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.button
                            className="mt-8 px-10 py-4 rounded-full font-hero text-xl tracking-widest transition-all text-white bg-spiderman-red hover:bg-spiderman-red/80 shadow-[0_0_20px_rgba(226,54,54,0.3)] hover:scale-105 relative z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNextQuestion}
                        >
                            {currentQuestion < questions.length - 1 ? "NEXT QUESTION →" : "CONTINUE →"}
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Quiz;
