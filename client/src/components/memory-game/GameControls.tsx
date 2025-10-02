import { motion } from "framer-motion";

interface GameControlsProps {
  moves: number;
  timeElapsed: string;
  matches: number;
  totalPairs: number;
  onReset: () => void;
  onDifficultyChange: (difficulty: string) => void;
  currentDifficulty: string;
  onShowTutorial: () => void;
}

export function GameControls({ 
  moves, 
  timeElapsed, 
  matches, 
  totalPairs, 
  onReset, 
  onDifficultyChange, 
  currentDifficulty,
  onShowTutorial
}: GameControlsProps) {
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-shoe-prints text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Moves</p>
            <p className="text-2xl font-bold" id="moves-counter">{moves}</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-clock text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Time</p>
            <p className="text-2xl font-bold" id="time-counter">{timeElapsed}</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-star text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Matches</p>
            <p className="text-2xl font-bold">
              <span id="matches-counter">{matches}</span>/<span id="total-pairs">{totalPairs}</span>
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-percentage text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Progress</p>
            <p className="text-2xl font-bold">
              {totalPairs > 0 ? Math.round((matches / totalPairs) * 100) : 0}%
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Game Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="difficulty-selector flex items-center space-x-2">
          <label htmlFor="difficulty" className="text-sm font-semibold text-gray-700">
            <i className="fas fa-layer-group mr-1"></i>
            Difficulty:
          </label>
          <div className="relative">
            <select 
              id="difficulty" 
              className="rounded-lg text-sm border-2 border-gray-200 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 py-2 px-3 pr-8 transition-colors appearance-none bg-white cursor-pointer"
              value={currentDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
            >
            <option value="3x2">Easy (3×2)</option>
            <option value="3x3">Medium (3×3)</option>
            <option value="5x4">Hard (5×4)</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
            </div>
          </div>
        </div>
        
        <motion.button 
          onClick={onShowTutorial}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-question-circle mr-2"></i>
          Tutorial
        </motion.button>
        
        <motion.button 
          onClick={onReset}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-redo-alt mr-2"></i>
          New Game
        </motion.button>
      </div>
    </motion.div>
  );
}
