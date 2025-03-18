export interface CardType {
  id: number;       // Content ID (same for matching pairs)
  cardId: number;   // Unique card ID (different for each card)
  icon: string;
  tip: string;
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
    tip: "No smoking indoors"
  },
  {
    id: 4,
    icon: "fas fa-door-open",
    tip: "Know your escape routes"
  },
  {
    id: 5,
    icon: "fas fa-burn",
    tip: "Stop, drop, and roll"
  },
  {
    id: 6,
    icon: "fas fa-bell",
    tip: "Test smoke alarms monthly"
  },
  {
    id: 7,
    icon: "fas fa-plug",
    tip: "Don't overload outlets"
  },
  {
    id: 8,
    icon: "fas fa-home",
    tip: "Create a home fire escape plan"
  },
  {
    id: 9,
    icon: "fas fa-temperature-high",
    tip: "Keep flammable items away from heat"
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
    tip: "Never leave cooking unattended"
  },
  {
    id: 13,
    icon: "fas fa-first-aid",
    tip: "Keep a first aid kit accessible"
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
export function generateCards(numPairs: number): CardType[] {
  // Take only the number of card types we need
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
