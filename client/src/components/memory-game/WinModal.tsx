import { motion, AnimatePresence } from "framer-motion";

interface GameStats {
  time: string;
  moves: number;
  pairs: number;
  totalPairs: number;
}

interface WinModalProps {
  isVisible: boolean;
  gameStats: GameStats;
  onPlayAgain: () => void;
}

export function WinModal({ isVisible, gameStats, onPlayAgain }: WinModalProps) {
  if (!isVisible) return null;

  const { time, moves, pairs, totalPairs } = gameStats;
  
  // Calculate efficiency score (lower is better)
  const efficiencyScore = Math.round((pairs / moves) * 100);
  const timeInSeconds = time.split(':').reduce((acc, val) => acc * 60 + parseInt(val), 0);
  const timeScore = Math.round((pairs / timeInSeconds) * 100);

  // Determine performance rating
  const getPerformanceRating = () => {
    if (efficiencyScore >= 80 && timeScore >= 2) return { rating: "Fire Safety Master", color: "text-yellow-500", icon: "fas fa-crown" };
    if (efficiencyScore >= 60 && timeScore >= 1.5) return { rating: "Safety Expert", color: "text-purple-500", icon: "fas fa-star" };
    if (efficiencyScore >= 40 && timeScore >= 1) return { rating: "Safety Learner", color: "text-blue-500", icon: "fas fa-graduation-cap" };
    return { rating: "Safety Beginner", color: "text-green-500", icon: "fas fa-seedling" };
  };

  const performance = getPerformanceRating();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="text-center p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-t-3xl">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <i className="fas fa-trophy text-5xl mb-4"></i>
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg opacity-90">You've completed the Fire Safety Memory Match!</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Performance Rating */}
            <div className="text-center mb-6">
              <div className={`text-2xl font-bold ${performance.color} mb-2`}>
                <i className={`${performance.icon} mr-2`}></i>
                {performance.rating}
              </div>
              <p className="text-sm text-gray-600">Your fire safety knowledge is impressive!</p>
            </div>

            {/* Game Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div 
                className="bg-blue-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <i className="fas fa-clock text-2xl text-blue-500 mb-2"></i>
                <p className="text-xs text-gray-600 mb-1">Time</p>
                <p className="text-xl font-bold text-blue-700">{time}</p>
              </motion.div>

              <motion.div 
                className="bg-green-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className="fas fa-shoe-prints text-2xl text-green-500 mb-2"></i>
                <p className="text-xs text-gray-600 mb-1">Moves</p>
                <p className="text-xl font-bold text-green-700">{moves}</p>
              </motion.div>

              <motion.div 
                className="bg-purple-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <i className="fas fa-star text-2xl text-purple-500 mb-2"></i>
                <p className="text-xs text-gray-600 mb-1">Pairs</p>
                <p className="text-xl font-bold text-purple-700">{pairs}/{totalPairs}</p>
              </motion.div>

              <motion.div 
                className="bg-orange-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <i className="fas fa-percentage text-2xl text-orange-500 mb-2"></i>
                <p className="text-xs text-gray-600 mb-1">Efficiency</p>
                <p className="text-xl font-bold text-orange-700">{efficiencyScore}%</p>
              </motion.div>
            </div>

            {/* Fire Safety Message */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <i className="fas fa-fire text-red-500 mt-1 mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">Fire Safety Reminder</p>
                  <p className="text-xs text-red-700">
                    Remember to practice these safety tips in real life. Your knowledge could save lives!
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={onPlayAgain}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-redo-alt mr-2"></i>
                Play Again
              </motion.button>
              
              <motion.button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-home mr-2"></i>
                Main Menu
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
