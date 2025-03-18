import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WinModalProps {
  isVisible: boolean;
  gameStats: {
    time: string;
    moves: number;
    pairs: number;
    totalPairs: number;
  };
  onPlayAgain: () => void;
}

export function WinModal({ isVisible, gameStats, onPlayAgain }: WinModalProps) {
  const [showCopyToast, setShowCopyToast] = useState(false);
  
  useEffect(() => {
    if (showCopyToast) {
      const timer = setTimeout(() => setShowCopyToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopyToast]);

  const shareResults = () => {
    const shareText = `I completed the Fire Safety Memory Match game in ${gameStats.time} with ${gameStats.moves} moves!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          setShowCopyToast(true);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4 w-full relative"
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#28A745] flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-trophy text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-[#FF5733] mb-4">Congratulations!</h2>
              <p className="text-lg mb-4">You've completed the Fire Safety Memory Match!</p>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Time:</span>
                  <span id="win-time">{gameStats.time}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Moves:</span>
                  <span id="win-moves">{gameStats.moves}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Pairs Found:</span>
                  <span id="win-pairs">{gameStats.pairs}/{gameStats.totalPairs}</span>
                </div>
              </div>
              
              <div className="mb-4 p-3 border border-[#FFC107] bg-[#FFC107] bg-opacity-10 rounded">
                <p className="text-sm"><i className="fas fa-info-circle mr-2 text-[#FF9800]"></i>Remember: Regular fire drills and safety checks save lives!</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={onPlayAgain}
                  className="bg-[#FF5733] hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition duration-200"
                >
                  Play Again
                </button>
                <button 
                  onClick={shareResults}
                  className="bg-[#3498DB] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
                >
                  Share Results
                </button>
              </div>
              
              {showCopyToast && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-2 bg-green-100 text-green-800 rounded"
                >
                  Results copied to clipboard!
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
