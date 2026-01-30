import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const TweetHelper = ({ name, handle, content, time, pp, verified = true }) => (
    <motion.div
        className="border-b border-gray-800 p-8 hover:bg-white/5 transition-colors w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="flex gap-5">
            <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-3xl font-bold text-white relative border-2 border-black">
                    {/* Fallback PP if no image provided */}
                    {pp ? <img src={pp} alt={name} className="w-full h-full object-cover" /> : name[0]}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white text-2xl truncate">{name}</span>
                    {verified && (
                        <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-7 h-7 text-blue-400 fill-current">
                            <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.435.716 2.69 1.77 3.46-.252.545-.414 1.135-.414 1.79 0 2.21 1.71 4 3.818 4 .47 0 .92-.086 1.336-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.866.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.654-.162-1.245-.414-1.79 1.054-.77 1.77-2.024 1.77-3.46zM12 14.5c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"></path></g>
                        </svg>
                    )}
                    <span className="text-gray-500 text-lg truncate">@{handle}</span>
                    <span className="text-gray-500 text-lg flex-shrink-0">· {time}</span>
                </div>
                <p className="text-white mt-2 text-2xl leading-relaxed whitespace-pre-wrap font-medium">
                    {content}
                </p>

                {/* Tweet Actions (Visual only) */}
                <div className="flex justify-between items-center mt-6 text-gray-500 max-w-xl">
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:bg-blue-400/10 rounded-full p-1"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.25c-4.42 0-8.004-3.58-8.004-8z"></path></g></svg>
                        <span className="text-lg">24K</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-green-500 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:bg-green-500/10 rounded-full p-1"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                        <span className="text-lg">12K</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-pink-600 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:bg-pink-600/10 rounded-full p-1"><g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.505.3-.505-.3c-4.378-2.55-7.028-5.19-8.379-7.67-1.06-1.94-1.464-4.13-1.105-5.9.625-3.08 3.246-5.3 6.335-5.3 2.113 0 4.09 1.03 5.349 2.76 1.258-1.73 3.235-2.76 5.348-2.76 3.089 0 5.71 2.22 6.335 5.3.359 1.77-.044 3.96-1.105 5.9z"></path></g></svg>
                        <span className="text-lg">145K</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current group-hover:bg-blue-400/10 rounded-full p-1"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                        <span className="text-lg">1.2M</span>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const TweetsScene = ({ onNext }) => {
    const [step, setStep] = useState('intro'); // intro | feed

    useEffect(() => {
        if (step === 'intro') {
            const timer = setTimeout(() => {
                setStep('feed');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <motion.div
            className="w-full h-full bg-black text-white overflow-y-auto flex flex-col relative font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AnimatePresence mode="wait">
                {step === 'intro' ? (
                    <motion.div
                        key="intro"
                        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                        >
                            Wait... u got some tweets in X
                        </motion.h2>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="text-6xl"
                        >
                            ⌛
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="feed"
                        className="flex-1 flex flex-col items-center pt-4 md:pt-10 pb-20 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Header Mock */}
                        <div className="w-full max-w-4xl sticky top-0 bg-black/80 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-800 flex justify-between items-center mb-4">
                            <div className="font-bold text-3xl">Home</div>
                            <div className="text-4xl">X</div>
                        </div>

                        {/* Tweets */}
                        <TweetHelper
                            name="Hyder"
                            handle="Hyder"
                            time="1m"
                            verified={false}
                            content="Happy Birthday @Vedika VB!!! ur my bestfriend i can never forget , grateful for every moment with you , enjoy ur year ❤️"
                            pp="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2574&auto=format&fit=crop" // Cool black car
                        />
                        <TweetHelper
                            name="Rohit Sharma"
                            handle="ImRo45"
                            time="2h"
                            content="Happy Birthday @Vedika VB! Have a smashing year ahead like a pull shot! 🏏 Wishing you a century of happiness and joy!"
                            pp="/assets/rohit.png"
                        />
                        <TweetHelper
                            name="Abhishek Sharma"
                            handle="AbhishekSharma_1"
                            time="4h"
                            content="Happy Birthday @Vedika VB! Keep shining! ✨ I'm jealous of u having a friend like Hyder!"
                            pp="/assets/abhishek.png"
                        />
                        <TweetHelper
                            name="Virat Kohli"
                            handle="imVkohli"
                            time="5h"
                            content="Happy Birthday @Vedika VB! Wishing you strength and happiness everywhere. Stay blessed and keep chasing your dreams. 👑"
                            pp="/assets/virat.png"
                        />

                        {/* Navigation */}
                        <motion.button
                            className="mt-12 px-12 py-5 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-bold text-2xl transition-colors shadow-lg shadow-blue-500/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                        >
                            End Journey ➜
                        </motion.button>

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TweetsScene;
