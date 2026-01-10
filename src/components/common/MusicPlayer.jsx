import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);

    // Using a beautiful Happy Birthday piano instrumental
    const audioUrl = "https://archive.org/download/HappyBirthdayInstrumentalPianoViaInstrumentals.com.ng/Happy%20Birthday%20Instrumental%20Piano%20via%20instrumentals.com.ng.mp3";

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                // We don't autoplay immediately to be polite, but we're ready
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
            }
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.log("Playback failed:", err));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} src={audioUrl} loop />

            <motion.button
                onClick={togglePlay}
                className={`p-4 rounded-full shadow-2xl border transition-all duration-500 flex items-center justify-center gap-2 group ${isPlaying
                    ? 'bg-barbie-pink border-barbie-pink text-white'
                    : 'bg-black/40 border-white/20 text-white hover:border-white/40'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <Volume2 size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <VolumeX size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 whitespace-nowrap font-hero text-sm tracking-widest">
                    {isPlaying ? 'PAUSE' : 'PLAY MUSIC'}
                </span>
            </motion.button>

            {/* Visualizer (Simple) */}
            {isPlaying && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 items-end h-6">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-barbie-pink rounded-full"
                            animate={{
                                height: [4, 16, 8, 20, 4],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
