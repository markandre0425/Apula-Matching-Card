import { motion } from "framer-motion";
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
  
  // Calculate responsive card sizes
  const getGridCols = () => {
    // For specific layouts - ALWAYS fixed columns
    if (gridSize === "3x2") return "grid-cols-3"; // 3 columns for 3x2
    if (gridSize === "3x4") return "grid-cols-3"; // 3 columns for 3x4
    
    if (cols <= 4) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    if (cols === 5) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
    if (cols === 6) return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  };

  const getCardSize = () => {
    // 2x bigger cards for better clarity
    if (cols <= 4) return "min-h-[240px] sm:min-h-[280px] md:min-h-[320px]";
    if (cols === 5) return "min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px]";
    if (cols === 6) return "min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px] xl:min-h-[320px]";
    return "min-h-[240px] sm:min-h-[280px] md:min-h-[320px]";
  };


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
        {/* Grid Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            <i className="fas fa-th mr-2 text-orange-500"></i>
            Game Board
          </h3>
          <p className="text-sm text-gray-600">
            {cols} × {rows} Grid • {Math.floor(cards.length / 2)} Pairs to Match
          </p>
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
              {Math.floor(cardStates.filter(state => state.isMatched).length / 2)} / {Math.floor(cards.length / 2)} pairs
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: cards.length > 0 
                  ? `${(Math.floor(cardStates.filter(state => state.isMatched).length / 2) / Math.floor(cards.length / 2)) * 100}%`
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
