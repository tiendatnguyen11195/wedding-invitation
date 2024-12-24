// src/components/layout/Layout.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import BottomBar from './BottomBar'; // Update the import path as needed

const Layout = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/audio/backsound.mp3'); // Make sure this path is correct
    audioRef.current.loop = true;

    // Add event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      setShowToast(true);
      // Hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowToast(false);
    };

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    // Try to play automatically (this might be blocked by browsers)
    const attemptAutoplay = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Autoplay prevented:', error);
      }
    };
    attemptAutoplay();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Playback error:', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100/40 flex items-center justify-center">
      <motion.div
        className="mx-auto w-full max-w-[430px] min-h-screen bg-white relative overflow-hidden border-x border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Music Control Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100/50"
        >
          {isPlaying ? (
            <PauseCircle className="w-6 h-6 text-rose-500" />
          ) : (
            <PlayCircle className="w-6 h-6 text-rose-500" />
          )}
        </motion.button>

        <main className="relative h-full w-full pb-[100px]">
          {children}
        </main>
        <BottomBar />

        {/* Music Info Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-black/80 transform -translate-x-1/2 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2">
                <Music className="w-4 h-4 animate-pulse" />
                <span className="text-sm whitespace-nowrap">
                  Nasheed - Fulfilling Humming
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome Modal for Music */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={toggleMusic}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-xl max-w-xs mx-4 text-center"
                onClick={e => e.stopPropagation()}
              >
                <Music className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Wedding Music
                </h3>
                <p className="text-gray-600 mb-4">
                  Click the button below to play the background music
                </p>
                <button
                  onClick={toggleMusic}
                  className="w-full px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Play Music
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;