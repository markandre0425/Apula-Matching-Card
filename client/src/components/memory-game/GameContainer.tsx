import React, { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./GameBoard";
import { GameControls } from "./GameControls";
import { WinModal } from "./WinModal";
import { Tutorial } from "./Tutorial";
import { generateCards, CardType } from "@/lib/fire-safety-data";

// Define card state types
type CardState = {
  isFlipped: boolean;
  isMatched: boolean;
};

export function GameContainer() {
  // Game configuration
  const [difficulty, setDifficulty] = useState("3x2");
  const [totalPairs, setTotalPairs] = useState(3);
  
  // Game cards
  const [cards, setCards] = useState<CardType[]>([]);
  
  // Game state
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [firstCardIndex, setFirstCardIndex] = useState<number | null>(null);
  const [secondCardIndex, setSecondCardIndex] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // Game timer
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  
  // UI state
  const [showWinModal, setShowWinModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Initialize or reset the game
  const initializeGame = useCallback(() => {
    const [cols, rows] = difficulty.split('x').map(Number);
    const numCards = cols * rows;
    const numPairs = numCards / 2;
    
    // Generate cards based on difficulty and grid size
    const newCards = generateCards(numPairs, difficulty);
    
    // Initialize card states
    const newCardStates = newCards.map(() => ({ 
      isFlipped: false, 
      isMatched: false 
    }));
    
    setCards(newCards);
    setCardStates(newCardStates);
    setFlippedCount(0);
    setFirstCardIndex(null);
    setSecondCardIndex(null);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setGameStarted(false);
    setGameEnded(false);
    setStartTime(null);
    setElapsedTime("00:00");
    
    // Set total pairs based on grid type
    if (difficulty === "3x3") {
      setTotalPairs(3); // 3 sets of 3 cards each
    } else {
      setTotalPairs(numPairs);
    }
    
    setShowWinModal(false);
  }, [difficulty]);

  // Start the game timer
  const startGameTimer = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(new Date());
    }
  }, [gameStarted]);

  // Update the timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (gameStarted && !gameEnded && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const timeDiff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const minutes = Math.floor(timeDiff / 60).toString().padStart(2, '0');
        const seconds = (timeDiff % 60).toString().padStart(2, '0');
        setElapsedTime(`${minutes}:${seconds}`);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameEnded, startTime]);

  // Initialize game on first render and when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  // Show tutorial for first-time users
  useEffect(() => {
    if (isFirstTime) {
      setShowTutorial(true);
      setIsFirstTime(false);
    }
  }, [isFirstTime]);

  // Handle card click
  const handleCardClick = (index: number) => {
    // Ignore if the board is locked
    if (isLocked) return;
    
    // Ignore if card is already flipped or matched
    if (cardStates[index].isFlipped || cardStates[index].isMatched) return;
    
    // Start the game timer on first card flip
    if (!gameStarted) startGameTimer();
    
    // Create new card states array
    const newCardStates = [...cardStates];
    newCardStates[index] = { ...newCardStates[index], isFlipped: true };
    setCardStates(newCardStates);
    setFlippedCount(prevCount => prevCount + 1);
    
    // First card flipped
    if (firstCardIndex === null) {
      setFirstCardIndex(index);
      return;
    }
    
    // Second card flipped - process the move
    setSecondCardIndex(index);
    setMoves(prev => prev + 1);
    setIsLocked(true);
    
    // Get the cards
    const firstCard = cards[firstCardIndex];
    const secondCard = cards[index];
    
    // Check for a match
    if (firstCard.id === secondCard.id) {
      // It's a match!
      let matchedCardStates;
      
      if (difficulty === "3x3") {
        // For 3x3 grid: match all 3 cards of the same type
        matchedCardStates = cardStates.map((state, idx) => {
          if (cards[idx].id === firstCard.id) {
            return {
              isFlipped: true,
              isMatched: true
            };
          }
          return state;
        });
      } else {
        // For regular pairs: match just the two cards
        matchedCardStates = cardStates.map((state, idx) => {
          if (idx === firstCardIndex || idx === index) {
            return {
              isFlipped: true,
              isMatched: true
            };
          }
          return state;
        });
      }
      
      setTimeout(() => {
        setCardStates(matchedCardStates);
        setFlippedCount(0);
        setFirstCardIndex(null);
        setSecondCardIndex(null);
        
        setMatches(prev => {
          const newMatchCount = prev + 1;
          if (newMatchCount === totalPairs) {
            setGameEnded(true);
            setShowWinModal(true);
          }
          return newMatchCount;
        });
        
        setIsLocked(false);
      }, 500);
    } else {
      // Not a match
      setTimeout(() => {
        setCardStates(cardStates.map((state, idx) => {
          if (idx === firstCardIndex || idx === index) {
            return {
              ...state,
              isFlipped: false
            };
          }
          return state;
        }));
        setFlippedCount(0);
        setFirstCardIndex(null);
        setSecondCardIndex(null);
        setIsLocked(false);
      }, 1500);
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
  };

  // Handle game reset
  const handleReset = () => {
    initializeGame();
  };

  // Handle tutorial close
  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  // Handle tutorial start game
  const handleTutorialStartGame = () => {
    setShowTutorial(false);
    initializeGame();
  };

  return (
    <>
      <GameControls 
        moves={moves}
        timeElapsed={elapsedTime}
        matches={matches}
        totalPairs={totalPairs}
        onReset={handleReset}
        onDifficultyChange={handleDifficultyChange}
        currentDifficulty={difficulty}
        onShowTutorial={() => setShowTutorial(true)}
      />
      
      <GameBoard 
        cards={cards}
        onCardClick={handleCardClick}
        cardStates={cardStates}
        gridSize={difficulty}
      />
      
      <WinModal 
        isVisible={showWinModal}
        gameStats={{
          time: elapsedTime,
          moves: moves,
          pairs: matches,
          totalPairs: totalPairs
        }}
        onPlayAgain={handleReset}
      />

      <Tutorial
        isVisible={showTutorial}
        onClose={handleTutorialClose}
        onStartGame={handleTutorialStartGame}
      />
    </>
  );
}



