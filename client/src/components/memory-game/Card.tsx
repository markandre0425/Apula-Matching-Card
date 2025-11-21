import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevFlippedRef = useRef<boolean>(false);
  
  useEffect(() => {
    if (isMatched) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isMatched]);

  // Auto play pre-generated audio when card is flipped (if available)
  useEffect(() => {
    const wasFlipped = prevFlippedRef.current;
    // Update previous state for next render
    prevFlippedRef.current = isFlipped;

    if (!isFlipped || isMatched) {
      // Stop any playing audio when card is not actively showing content
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch { /* noop */ }
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    // Only play when transitioning from not flipped -> flipped
    if (!wasFlipped && card.audio) {
      // Cancel any browser speech if active
      try { window.speechSynthesis.cancel(); } catch { /* noop */ }

      // Stop any previous audio
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch { /* noop */ }
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(card.audio);
      audioRef.current = audio;
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
      };

      // Small delay to let the flip animation start
      const timer = setTimeout(() => { void audio.play(); }, 250);

      return () => clearTimeout(timer);
    }
  }, [isFlipped, isMatched, card.audio]);

  // Text-to-speech function for repeat button
  const speakCardTip = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking speaker

    // Prefer local audio if available
    if (card.audio) {
      // Stop browser speech if any
      try { window.speechSynthesis.cancel(); } catch { /* noop */ }

      // Toggle play/pause
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          try { audioRef.current.pause(); } catch { /* noop */ }
          audioRef.current.currentTime = 0;
          setIsSpeaking(false);
          return;
        }
        // Replay from start
        audioRef.current.currentTime = 0;
        void audioRef.current.play();
        return;
      }

      const audio = new Audio(card.audio);
      audioRef.current = audio;
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);
      void audio.play();
      return;
    }

    // Fallback to browser speech if no audio is provided
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        try { window.speechSynthesis.cancel(); } catch { /* noop */ }
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(card.tip);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
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



