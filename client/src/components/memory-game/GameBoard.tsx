import { useState, useEffect } from "react";
import { Card } from "./Card";
import { CardType } from "@/lib/fire-safety-data";
import { motion } from "framer-motion";

// Define the prop structure with cardStates
interface GameBoardProps {
  cards: CardType[];
  onCardClick: (index: number) => void;
  cardStates: Array<{
    isFlipped: boolean;
    isMatched: boolean;
  }>;
  gridSize: string;
}

export function GameBoard({ 
  cards, 
  onCardClick, 
  cardStates,
  gridSize 
}: GameBoardProps) {
  const [gridClass, setGridClass] = useState("grid-cols-4");
  const [maxWidth, setMaxWidth] = useState("max-w-3xl");

  useEffect(() => {
    // Set grid class based on grid size
    const [cols, rows] = gridSize.split('x').map(Number);
    
    let colsClass;
    let widthClass;
    
    switch(cols) {
      case 3:
        colsClass = "grid-cols-3";
        widthClass = "max-w-2xl";
        break;
      case 4:
        colsClass = "grid-cols-4";
        widthClass = "max-w-3xl";
        break;
      case 5:
        colsClass = "grid-cols-5";
        widthClass = "max-w-3xl";
        break;
      case 6:
        colsClass = "grid-cols-6";
        widthClass = "max-w-3xl";
        break;
      default:
        colsClass = "grid-cols-4";
        widthClass = "max-w-3xl";
    }
    
    setGridClass(colsClass);
    setMaxWidth(widthClass);
  }, [gridSize]);

  return (
    <motion.div 
      id="game-board" 
      className={`grid ${gridClass} gap-2 ${maxWidth} mx-auto`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isFlipped={cardStates[index]?.isFlipped || false}
          isMatched={cardStates[index]?.isMatched || false}
          onClick={() => onCardClick(index)}
          animationDelay={index}
        />
      ))}
    </motion.div>
  );
}
