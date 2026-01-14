import { useState } from 'react';
import Background from './components/Background';
import SceneManager from './components/SceneManager';
import MusicPlayer from './components/common/MusicPlayer';

function App() {
  const [scene, setScene] = useState(1);

  const handleNext = () => {
    setScene((prev) => (prev >= 9 ? 1 : prev + 1));
  };

  return (
    <main className="relative w-full h-screen overflow-hidden font-sans text-slate-800 selection:bg-barbie-pink selection:text-white">
      <Background />
      <MusicPlayer />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <SceneManager currentScene={scene} onNext={handleNext} />
      </div>
    </main>
  );
}

export default App;
