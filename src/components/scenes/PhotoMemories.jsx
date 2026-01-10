import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import CoolText from '../common/CoolText';
import photo1 from '../../assets/photo1.png';
import photo2 from '../../assets/photo2.png';
import photo3 from '../../assets/photo3.png';

const photos = [photo1, photo2, photo3];

const PhotoCard = ({ index, isRevealed, onReveal, imageSrc }) => {
    return (
        <motion.div
            className="relative cursor-pointer"
            initial={{ scale: 0, rotate: Math.random() * 10 - 5 }}
            animate={{ scale: 1, rotate: Math.random() * 6 - 3 }}
            whileHover={isRevealed ? { scale: 1.5, rotate: 0, zIndex: 50 } : { scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={onReveal}
        >
            <div className="w-24 h-32 md:w-32 md:h-40 bg-white/10 p-2 pb-8 shadow-xl rounded-xl border border-white/20 transform transition-transform duration-300">
                <div className="w-full h-full bg-white/5 overflow-hidden relative rounded-lg">
                    <AnimatePresence mode="wait">
                        {!isRevealed ? (
                            <motion.div
                                key="placeholder"
                                className="absolute inset-0 flex items-center justify-center bg-white/5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {index % 2 === 0 ? (
                                    <span className="font-hero text-barbie-pink/40 text-xl tracking-widest">BARBIE</span>
                                ) : (
                                    <Heart className="text-barbie-pink/40" fill="currentColor" size={24} />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="photo"
                                className="absolute inset-0 bg-slate-200"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <img
                                    src={imageSrc}
                                    alt="Memory"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const PopupMessage = ({ onClose }) => {
    const [mode, setMode] = useState('view'); // view, reply, sent
    const [reply, setReply] = useState('');

    const handleSend = (e) => {
        e.stopPropagation();
        const subject = encodeURIComponent("Reply from Birthday Website");
        const body = encodeURIComponent(reply);

        // Visual feedback before opening mailto
        setMode('sent');

        // Small delay to let the UI update before the browser tries to switch apps
        setTimeout(() => {
            window.location.href = `mailto:aluruhyderali@gmail.com?subject=${subject}&body=${body}`;
            onClose();
        }, 1000);
    };

    return (
        <motion.div
            className="absolute top-10 right-10 z-40 max-w-xs cursor-pointer"
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 50 }}
            whileHover={{ scale: 1.05, zIndex: 60 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={mode === 'view' ? onClose : undefined}
        >
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl rounded-tr-none shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/40 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {mode === 'view' && (
                        <motion.div
                            key="view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-start gap-3">
                                <div className="bg-gradient-to-br from-barbie-pink to-spiderman-red p-2 rounded-full shrink-0">
                                    <MessageCircle className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">Hyder says:</h3>
                                    <p className="text-slate-600 text-sm font-medium leading-relaxed">You are sooo beautiful ❤️</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setMode('reply'); }}
                                className="self-end text-xs font-bold text-barbie-pink hover:text-barbie-pink/80 px-3 py-1 bg-barbie-pink/10 rounded-full transition-colors"
                            >
                                Reply ↩
                            </button>
                        </motion.div>
                    )}

                    {mode === 'reply' && (
                        <motion.div
                            key="reply"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p className="text-xs font-bold text-slate-500">Replying to Hyder:</p>
                            <textarea
                                autoFocus
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                className="w-full text-sm p-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-barbie-pink/50 resize-none"
                                rows={2}
                                placeholder="Type your message..."
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setMode('view')}
                                    className="text-xs font-medium text-slate-400 hover:text-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSend}
                                    className="text-xs font-bold text-white bg-barbie-pink px-3 py-1.5 rounded-lg hover:bg-barbie-pink/90 transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {mode === 'sent' && (
                        <motion.div
                            key="sent"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-4 gap-2"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <p className="text-sm font-bold text-slate-700">Sent to Hyder!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Message tail */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/90 rotate-45 transform origin-bottom-left" />
            </div>
        </motion.div>
    );
};

const PhotoMemories = ({ onNext }) => {
    const [revealedCards, setRevealedCards] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleReveal = (index) => {
        setRevealedCards(prev => ({ ...prev, [index]: true }));
    };

    const allRevealed = Object.keys(revealedCards).length >= photos.length;

    return (
        <motion.div
            className="flex flex-col items-center justify-center w-full h-full p-4 gpu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
            <AnimatePresence>
                {showPopup && <PopupMessage onClose={() => setShowPopup(false)} />}
            </AnimatePresence>

            <motion.div
                className="bg-white/5 w-full max-w-2xl h-auto min-h-[600px] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center p-8 text-center border border-white/10 gpu"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Header */}
                <div className="mb-8 relative z-10">
                    <CoolText
                        text="Just for you"
                        className="text-5xl font-glam text-barbie-pink mb-2 drop-shadow-[0_0_15px_rgba(224,33,138,0.3)]"
                        delay={0.5}
                    />
                    <p className="text-white/40 font-medium tracking-wide">I don't need a gift, because...</p>
                </div>

                {/* Cards Grid - 3 cards */}
                <div className="flex flex-col items-center gap-4 relative z-10 w-full max-w-lg">
                    <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                        {photos.map((photo, i) => (
                            <PhotoCard
                                key={i}
                                index={i}
                                isRevealed={revealedCards[i]}
                                onReveal={() => handleReveal(i)}
                                imageSrc={photo}
                            />
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <motion.button
                    className={`mt-12 px-10 py-4 rounded-full font-hero text-xl tracking-widest transition-all text-white bg-spiderman-red hover:bg-spiderman-red/80 shadow-[0_0_20px_rgba(226,54,54,0.3)] hover:scale-105 relative z-10`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                >
                    {allRevealed ? "READ LETTER →" : "NEXT"}
                </motion.button>

                {/* Minimalist Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-barbie-pink/[0.02] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-spiderman-red/[0.02] -z-10" />
            </motion.div>
        </motion.div>
    );
};

export default PhotoMemories;
