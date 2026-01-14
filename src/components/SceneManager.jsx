import { AnimatePresence, motion } from 'framer-motion';
import Intro from './scenes/Intro';
import BirthdayReveal from './scenes/BirthdayReveal';
import PhotoMemories from './scenes/PhotoMemories';
import Letter from './scenes/Letter';
import Quiz from './scenes/Quiz';
import TimeTravel from './scenes/TimeTravel';
import CakeCutting from './scenes/CakeCutting';
import Celebration from './scenes/Celebration';

const SceneManager = ({ currentScene, onNext }) => {
    const renderScene = () => {
        switch (currentScene) {
            case 1: return <Intro onNext={onNext} />;
            case 2: return <BirthdayReveal onNext={onNext} />;
            case 3: return <PhotoMemories onNext={onNext} />;
            case 4: return <Letter onNext={onNext} />;
            case 5: return <Quiz onNext={onNext} />;
            case 6: return <TimeTravel onNext={onNext} />;
            case 7: return <CakeCutting onNext={onNext} />;
            case 8: return <Celebration onNext={onNext} />;
            default: return <Intro onNext={onNext} />;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentScene}
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {renderScene()}
            </motion.div>
        </AnimatePresence>
    );
};

export default SceneManager;
