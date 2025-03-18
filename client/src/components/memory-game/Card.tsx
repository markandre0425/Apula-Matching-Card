import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CardType } from "@/lib/fire-safety-data";

interface CardProps {
  card: CardType;
  index: number;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  animationDelay?: number;
}

export function Card({ card, index, isFlipped, isMatched, onClick, animationDelay = 0 }: CardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isMatched) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isMatched]);

  const shouldShowContent = isFlipped || isMatched;
  
  return (
    <motion.div
      className={`flip-card ${shouldShowContent ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: animationDelay * 0.05 }}
      onClick={() => {
        if (!isFlipped && !isMatched) {
          onClick();
        }
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <i className="fas fa-question text-2xl mb-2"></i>
          <div className="w-10 h-10 mx-auto flex items-center justify-center">
            <i className="fas fa-fire text-xl"></i>
          </div>
        </div>
        
        <div className="flip-card-back">
          <div className="text-center">
            <i className={`${card.icon} text-2xl text-[#FF5733] mb-2`}></i>
            <p className="text-sm font-medium">{card.tip}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}



