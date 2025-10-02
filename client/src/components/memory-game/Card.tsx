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
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  useEffect(() => {
    if (isMatched) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isMatched]);

  // Auto text-to-speech when card is flipped
  useEffect(() => {
    if (isFlipped && !isMatched && 'speechSynthesis' in window) {
      // Small delay to let the flip animation start
      const timer = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(card.tip);
        utterance.rate = 0.8; // Slower for children
        utterance.pitch = 1.1; // Slightly higher pitch
        utterance.volume = 0.8;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
      }, 300); // Wait for flip animation
      
      return () => clearTimeout(timer);
    }
  }, [isFlipped, isMatched, card.tip]);

  // Text-to-speech function for repeat button
  const speakCardTip = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking speaker
    
    if (isSpeaking) {
      // Stop current speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.tip);
      utterance.rate = 0.8; // Slower for children
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const shouldShowContent = isFlipped || isMatched;
  
  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: animationDelay * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        scale: shouldShowContent ? 1 : 1.05,
        y: shouldShowContent ? 0 : -5
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (!isFlipped && !isMatched) {
          onClick();
        }
      }}
    >
      {/* Card Container */}
      <div className="relative w-full h-full">
        {/* Front of card - always visible when not flipped */}
        {!shouldShowContent && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg flex flex-col items-center justify-center text-white cursor-pointer"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            {/* APULA Brand - Centered in middle */}
            <div className="bg-white/20 rounded-lg px-2 py-1 text-center mb-8">
              <span className="text-xs font-bold text-white">APULA</span>
            </div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-2"
            >
              <i className="fas fa-fire text-3xl opacity-80"></i>
            </motion.div>
            
            <div className="text-center">
              <i className="fas fa-question text-2xl opacity-60"></i>
            </div>
          </motion.div>
        )}
        
        {/* Back of card - visible when flipped */}
        {shouldShowContent && (
          <motion.div 
            className="absolute inset-0 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center cursor-pointer"
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center p-4">
              <motion.div
                animate={isMatched ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={card.tip}
                    className="w-32 h-32 object-contain mx-auto rounded-lg"
                    onError={(e) => {
                      console.error('Image failed to load:', card.image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <i className={`${card.icon} text-6xl text-red-500`}></i>
                )}
              </motion.div>
              <p className="text-sm font-medium text-gray-800 leading-tight max-w-full mb-2">
                {card.tip}
              </p>
              
              {/* Repeat Speech Button */}
              <motion.button
                onClick={speakCardTip}
                className={`mt-2 p-2 rounded-full transition-colors ${
                  isSpeaking 
                    ? 'bg-green-500 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isSpeaking ? "Stop reading" : "Repeat"}
              >
                <i className={`fas ${isSpeaking ? 'fa-stop' : 'fa-volume-up'} text-sm`}></i>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Match animation overlay */}
      {isMatched && (
        <motion.div
          className="absolute inset-0 bg-green-400 bg-opacity-20 rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-2 right-2">
            <i className="fas fa-check-circle text-green-500 text-xl"></i>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}



