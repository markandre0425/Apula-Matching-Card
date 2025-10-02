import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { CardType } from "@/lib/fire-safety-data";

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
  cardStates: Array<{
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  gridSize: string;
}

export function GameBoard({ cards, onCardClick, cardStates, gridSize }: GameBoardProps) {
  const [cols, rows] = gridSize.split('x').map(Number);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Calculate responsive card sizes
  const getGridCols = () => {
    if (cols <= 4) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    if (cols === 5) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    if (cols === 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  };

  const getCardSize = () => {
    if (cols <= 4) return "min-h-[120px] sm:min-h-[140px] md:min-h-[160px]";
    if (cols === 5) return "min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px]";
    if (cols === 6) return "min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px]";
    return "min-h-[120px] sm:min-h-[140px] md:min-h-[160px]";
  };

  // Fullscreen functionality for gameboard
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when in fullscreen
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Fullscreen overlay component
  if (isFullscreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-red-50 to-orange-100 z-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Fullscreen Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="fas fa-th text-orange-500 text-xl"></i>
            <h2 className="text-2xl font-bold text-gray-800">
              Fire Safety Memory Match - Fullscreen Mode
            </h2>
          </div>
          
          <motion.button
            onClick={toggleFullscreen}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-compress text-lg"></i>
            <span>Exit Fullscreen</span>
          </motion.button>
        </div>

        {/* Fullscreen Gameboard */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto h-full">
            {/* Game Info */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {rows} × {cols} Grid • {cards.length / 2} Pairs to Match
              </h3>
            </div>

            {/* Cards Grid - Optimized for fullscreen */}
            <div className={`grid ${getGridCols()} gap-4 lg:gap-6 justify-items-center`}>
              {cards.map((card, index) => (
                <motion.div
                  key={card.cardId}
                  className="w-full h-32 lg:h-40 xl:h-48"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  <Card
                    card={card}
                    index={index}
                    isFlipped={cardStates[index]?.isFlipped || false}
                    isMatched={cardStates[index]?.isMatched || false}
                    onClick={() => onCardClick(index)}
                    animationDelay={index}
                  />
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span className="font-medium">Game Progress</span>
                <span className="font-medium">
                  {cardStates.filter(state => state.isMatched).length} / {cards.length / 2} pairs
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: cards.length > 0 
                      ? `${(cardStates.filter(state => state.isMatched).length / (cards.length / 2)) * 100}%`
                      : "0%"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Normal gameboard view
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Game Board Container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
        {/* Grid Header with Fullscreen Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              <i className="fas fa-th mr-2 text-orange-500"></i>
              Game Board
            </h3>
            <p className="text-sm text-gray-600">
              {rows} × {cols} Grid • {cards.length / 2} Pairs to Match
            </p>
          </div>
          
          {/* Fullscreen Toggle Button */}
          <motion.button
            onClick={toggleFullscreen}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Enter Fullscreen Mode"
          >
            <i className="fas fa-expand text-sm"></i>
            <span className="hidden sm:inline">Fullscreen</span>
          </motion.button>
        </div>

        {/* Cards Grid */}
        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-5 justify-items-center`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.cardId}
              className={`w-full ${getCardSize()}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <Card
                card={card}
                index={index}
                isFlipped={cardStates[index]?.isFlipped || false}
                isMatched={cardStates[index]?.isMatched || false}
                onClick={() => onCardClick(index)}
                animationDelay={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Game Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {cardStates.filter(state => state.isMatched).length} / {cards.length / 2} pairs
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: cards.length > 0 
                  ? `${(cardStates.filter(state => state.isMatched).length / (cards.length / 2)) * 100}%`
                  : "0%"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
