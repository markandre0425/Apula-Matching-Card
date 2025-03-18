import { motion } from "framer-motion";

interface GameControlsProps {
  moves: number;
  timeElapsed: string;
  matches: number;
  totalPairs: number;
  onReset: () => void;
  onDifficultyChange: (difficulty: string) => void;
  currentDifficulty: string;
}

export function GameControls({ 
  moves, 
  timeElapsed, 
  matches, 
  totalPairs, 
  onReset, 
  onDifficultyChange, 
  currentDifficulty 
}: GameControlsProps) {
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 mb-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="game-stats flex items-center justify-center space-x-6 bg-white rounded-lg shadow-md p-2 w-full md:w-auto">
        <div className="text-center">
          <p className="text-xs text-gray-600">Moves</p>
          <p className="text-xl font-bold text-gray-800" id="moves-counter">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Time</p>
          <p className="text-xl font-bold text-gray-800" id="time-counter">{timeElapsed}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Matches</p>
          <p className="text-xl font-bold text-gray-800">
            <span id="matches-counter">{matches}</span>/<span id="total-pairs">{totalPairs}</span>
          </p>
        </div>
      </div>
      
      <div className="game-controls flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg shadow-md p-2 w-full md:w-auto">
        <div className="difficulty-selector flex items-center">
          <label htmlFor="difficulty" className="text-xs font-medium text-gray-700 mr-1">Difficulty:</label>
          <select 
            id="difficulty" 
            className="rounded text-sm border-gray-300 shadow-sm focus:border-[#FF5733] focus:ring focus:ring-[#FF5733] focus:ring-opacity-50 py-1 px-1"
            value={currentDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            <option value="4x3">Easy (4x3)</option>
            <option value="4x4">Medium (4x4)</option>
            <option value="5x4">Hard (5x4)</option>
            <option value="6x5">Expert (6x5)</option>
          </select>
        </div>
        
        <button 
          onClick={onReset}
          className="bg-[#FF5733] hover:bg-red-700 text-white font-bold py-1 px-3 text-sm rounded transition duration-200 flex items-center"
        >
          <i className="fas fa-redo-alt mr-1"></i> New Game
        </button>
      </div>
    </motion.div>
  );
}
