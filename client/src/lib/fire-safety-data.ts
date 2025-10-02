export interface CardType {
  id: number;       // Content ID (same for matching pairs)
  cardId: number;   // Unique card ID (different for each card)
  icon: string;
  tip: string;
  image?: string;   // Optional: Path to image file
}

// Define all possible card types
const cardTypes: Omit<CardType, 'cardId'>[] = [
  {
    id: 1,
    icon: "fas fa-fire-extinguisher",
    tip: "Know how to use a fire extinguisher"
  },
  {
    id: 2,
    icon: "fas fa-phone-alt",
    tip: "Call 911 in case of emergency"
  },
  {
    id: 3,
    icon: "fas fa-smoking-ban",
    tip: "Stay away from matches - they can start fires",
    image: "/images/fire-safety/match.png"
  },
  {
    id: 4,
    icon: "fas fa-door-open",
    tip: "Know your escape routes",
    image: "/images/fire-safety/fire_exit.png"
  },
  {
    id: 5,
    icon: "fas fa-burn",
    tip: "if someone’s clothes catch on fire, use stop, drop and roll",
    image: "/images/fire-safety/drop & roll.png"
  },
  {
    id: 6,
    icon: "fas fa-bell",
    tip: "as the smoke tends to rise up, to give yourself an extra time get on your hands and knees and crawl towards the nearest exit",
    image: "/images/fire-safety/crawl.png"
  },
  {
    id: 7,
    icon: "fas fa-plug",
    tip: "Don't overload outlets",
    image: "/images/fire-safety/unplug.png"
  },
  {
    id: 8,
    icon: "fas fa-home",
    tip: "Do not park within 15 feet of a fire hydrant",
    image: "/images/fire-safety/fire_hydrant.png"
  },
  {
    id: 9,
    icon: "fas fa-temperature-high",
    tip: "Be careful with candles - keep them away from things that can burn",
    image: "/images/fire-safety/candle.png"
  },
  {
    id: 10,
    icon: "fas fa-tint",
    tip: "Keep a bucket of water or fire blanket nearby"
  },
  {
    id: 11,
    icon: "fas fa-child",
    tip: "Teach children about fire safety"
  },
  {
    id: 12,
    icon: "fas fa-fire-alt",
    tip: "Lighters are not toys - only grown-ups should use them",
    image: "/images/fire-safety/lighter.png"
  },
  {
    id: 13,
    icon: "fas fa-first-aid",
    tip: "Keep a first aid kit accessible",
    image: "/images/fire-safety/medicalkit.png"
  },
  {
    id: 14,
    icon: "fas fa-map-marked-alt",
    tip: "Establish a family meeting point"
  },
  {
    id: 15,
    icon: "fas fa-bolt",
    tip: "Unplug appliances when not in use"
  }
];

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate cards for the game
export function generateCards(numPairs: number, gridSize?: string): CardType[] {
  // Special case for 3x2 grid: 6 cards (3 pairs with images)
  if (gridSize === "3x2") {
    // Get all cards with images and randomly select 3
    const allImageCards = cardTypes.filter(card => card.image);
    const selectedImageCards = shuffleArray(allImageCards).slice(0, 3);
    
    // Create pairs with unique cardIds
    const cardPairs: CardType[] = [];
    let cardIdCounter = 1;
    
    selectedImageCards.forEach(cardType => {
      // Add two of each card type (a pair), but with unique cardIds
      cardPairs.push({...cardType, cardId: cardIdCounter++});
      cardPairs.push({...cardType, cardId: cardIdCounter++});
    });
    
    // Shuffle the pairs and return
    return shuffleArray(cardPairs);
  }
  
  // Special case for 3x4 grid: 12 cards (6 pairs with images)
  if (gridSize === "3x4") {
    // Get all cards with images and randomly select 6
    const allImageCards = cardTypes.filter(card => card.image);
    const selectedImageCards = shuffleArray(allImageCards).slice(0, 6);
    
    // Create pairs with unique cardIds
    const cardPairs: CardType[] = [];
    let cardIdCounter = 1;
    
    selectedImageCards.forEach(cardType => {
      // Add two of each card type (a pair), but with unique cardIds
      cardPairs.push({...cardType, cardId: cardIdCounter++});
      cardPairs.push({...cardType, cardId: cardIdCounter++});
    });
    
    // Shuffle the pairs and return
    return shuffleArray(cardPairs);
  }
  
  // Normal game: use all available cards
  const availableCardTypes = [...cardTypes];
  if (numPairs > availableCardTypes.length) {
    console.warn(`Requested ${numPairs} pairs but only ${availableCardTypes.length} card types are available.`);
  }
  
  // Get the card types for this game
  const gameCardTypes = shuffleArray(availableCardTypes).slice(0, numPairs);
  
  // Create pairs with unique cardIds
  const cardPairs: CardType[] = [];
  let cardIdCounter = 1;
  
  gameCardTypes.forEach(cardType => {
    // Add two of each card type (a pair), but with unique cardIds
    cardPairs.push({...cardType, cardId: cardIdCounter++});
    cardPairs.push({...cardType, cardId: cardIdCounter++});
  });
  
  // Shuffle the pairs and return
  return shuffleArray(cardPairs);
}
