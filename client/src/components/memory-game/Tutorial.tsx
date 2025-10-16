import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardType } from "@/lib/fire-safety-data";
import { GameControls } from "./GameControls";

interface TutorialProps {
  isVisible: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

// Custom GameControls component for tutorial with flash effects
interface TutorialGameControlsProps {
  moves: number;
  timeElapsed: string;
  matches: number;
  totalPairs: number;
  onReset: () => void;
  onDifficultyChange: (difficulty: string) => void;
  currentDifficulty: string;
  onShowTutorial: () => void;
}

function TutorialGameControls({ 
  moves, 
  timeElapsed, 
  matches, 
  totalPairs, 
  onReset, 
  onDifficultyChange, 
  currentDifficulty,
  onShowTutorial
}: TutorialGameControlsProps) {
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-shoe-prints text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Moves</p>
            <p className="text-2xl font-bold" id="moves-counter">{moves}</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-clock text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Time</p>
            <p className="text-2xl font-bold" id="time-counter">{timeElapsed}</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-star text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Matches</p>
            <p className="text-2xl font-bold">
              <span id="matches-counter">{matches}</span>/<span id="total-pairs">{totalPairs}</span>
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center">
            <i className="fas fa-percentage text-2xl mb-2 opacity-80"></i>
            <p className="text-xs opacity-80 mb-1">Progress</p>
            <p className="text-2xl font-bold">
              {totalPairs > 0 ? Math.round((matches / totalPairs) * 100) : 0}%
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Game Controls with Flash Effect */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl shadow-lg p-4">
        <div className="difficulty-selector flex items-center space-x-2">
          <label htmlFor="difficulty" className="text-sm font-semibold text-gray-700">
            <i className="fas fa-layer-group mr-1"></i>
            Difficulty:
          </label>
          <div className="relative">
            <motion.select 
              id="difficulty" 
              className="rounded-lg text-sm border-2 border-gray-200 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 py-2 px-3 pr-8 transition-colors appearance-none bg-white cursor-pointer"
              value={currentDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(100, 0, 20, 0)",
                  "0 0 0 4px rgba(100, 0, 20, 0.4)",
                  "0 0 0 0 rgba(100, 0, 20, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
             <option value="3x2">Easy (3×2)</option>
             <option value="3x4">Medium (3×4)</option>
             <option value="5x4">Hard (5×4)</option>
            </motion.select>
            {/* Custom dropdown arrow with flash effect */}
            <motion.div 
              className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              animate={{
                color: ["#6b7280", "#f97316", "#6b7280"],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <i className="fas fa-chevron-down text-xs"></i>
            </motion.div>
          </div>
        </div>
        
        {/* Removed Tutorial and New Game buttons */}
      </div>
    </motion.div>
  );
}

const tutorialSteps = [
  {
    title: "Welcome to the Fire Safety Memory Match!",
    description: "Learn important fire safety tips while having fun matching cards. This game will teach you essential safety knowledge that could save lives.",
    icon: "fas fa-fire",
    color: "text-red-500",
    bgColor: "bg-red-50",
    showCards: false,
    audioTitle: "/audio/tutorial/audioTitle/welcome.mp3",
    audioDescription: "/audio/tutorial/audioDescription/welcomeDesc.mp3"
  },
  {
    title: "How to Play",
    description: "Click on cards to flip them and find matching pairs. Each pair contains the same fire safety tip. Match all pairs to win!",
    icon: "fas fa-gamepad",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    showCards: false,
    audioTitle: "/audio/tutorial/audioTitle/howtoplay.mp3",
    audioDescription: "/audio/tutorial/audioDescription/howtoplayDesc.mp3"
  },
  {
    title: "Game Controls",
    description: "Use the difficulty selector below to choose your challenge level. Click to see Easy, Medium, or Hard options. Track your progress with moves, time, and matches counters.",
    icon: "fas fa-sliders-h",
    color: "text-green-500",
    bgColor: "bg-green-50",
    showCards: false,
    showControls: true,
    audioTitle: "/audio/tutorial/audioTitle/gamecontrols.mp3",
    audioDescription: "/audio/tutorial/audioDescription/gamecontrolsDesc.mp3"
  },
  {
    title: "Fire Safety Learning",
    description: "Each card contains a vital fire safety tip. Pay attention to these tips - they could help you in real emergencies!",
    icon: "fas fa-shield-alt",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    showCards: true,
    audioTitle: "/audio/tutorial/audioTitle/firesafetylearning.mp3",
    audioDescription: "/audio/tutorial/audioDescription/firesafetylearningDesc.mp3"
  },
  {
    title: "Ready to Play?",
    description: "You're all set! Click 'Start Game' to begin your fire safety learning adventure. Remember: safety first and fun second!",
    icon: "fas fa-play",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    showCards: false,
    audioTitle: "/audio/tutorial/audioTitle/readytoplay.mp3",
    audioDescription: "/audio/tutorial/audioDescription/readytoplayDesc.mp3"
  }
];

export function Tutorial({ isVisible, onClose, onStartGame }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play recorded audio for tutorial steps; fallback to TTS only if audio is missing
  useEffect(() => {
    if (!isVisible) {
      // Stop any in-flight audio/speech when hidden
      try { window.speechSynthesis.cancel(); } catch {}
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch {}
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    const current = tutorialSteps[currentStep] as any;
    const audioTitle = current.audioTitle;
    const audioDescription = current.audioDescription;
    const audioSingle = current.audio;

    // Stop any ongoing speech
    try { window.speechSynthesis.cancel(); } catch {}
    // Stop any previous audio
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Case 1: play title then description if provided
    if (audioTitle || audioDescription) {
      const playDesc = () => {
        if (!audioDescription) { setIsSpeaking(false); return; }
        const d = new Audio(audioDescription);
        audioRef.current = d;
        d.onplay = () => setIsSpeaking(true);
        d.onended = () => setIsSpeaking(false);
        d.onerror = () => setIsSpeaking(false);
        void d.play();
      };

      const timer = setTimeout(() => {
        if (audioTitle) {
          const t = new Audio(audioTitle);
          audioRef.current = t;
          t.onplay = () => setIsSpeaking(true);
          t.onended = () => { setIsSpeaking(false); playDesc(); };
          t.onerror = () => { setIsSpeaking(false); playDesc(); };
          void t.play();
        } else {
          playDesc();
        }
      }, 350);
      return () => clearTimeout(timer);
    }

    // Case 2: single audio fallback
    if (audioSingle) {
      const el = new Audio(audioSingle);
      audioRef.current = el;
      el.onplay = () => setIsSpeaking(true);
      el.onended = () => setIsSpeaking(false);
      el.onerror = () => setIsSpeaking(false);
      const timer = setTimeout(() => { void el.play(); }, 350);
      return () => clearTimeout(timer);
    }

    // Case 3: TTS fallback
    if ('speechSynthesis' in window) {
      const textToSpeak = `${current.title}. ${current.description}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStep, isVisible]);


  const nextStep = () => {
    // Stop current speech when moving to next step
    try { window.speechSynthesis.cancel(); } catch {}
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
    
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    // Stop current speech when moving to previous step
    try { window.speechSynthesis.cancel(); } catch {}
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartGame = () => {
    // Stop speech when starting game
    try { window.speechSynthesis.cancel(); } catch {}
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
    onStartGame();
    onClose();
  };

  const handleSkipTutorial = () => {
    // Stop speech when skipping tutorial
    try { window.speechSynthesis.cancel(); } catch {}
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
    onStartGame();
    onClose();
  };

  if (!isVisible) return null;

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${currentTutorial.bgColor} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentTutorial.title}
              </h2>
              <div className="flex items-center gap-2">
                {/* Skip Button */}
                <button
                  onClick={handleSkipTutorial}
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors font-medium"
                >
                  Skip Tutorial
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <i className={`${currentTutorial.icon} text-4xl ${currentTutorial.color} mb-4`}></i>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentTutorial.description}
              </p>
            </div>

            {/* Show Game Controls when showControls is true */}
            {currentTutorial.showControls && (
              <div className="mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-600 mb-3 text-center font-medium">
                    👇 Here are the game controls you'll use:
                  </p>
                  <TutorialGameControls
                    moves={0}
                    timeElapsed="00:00"
                    matches={0}
                    totalPairs={8}
                    onReset={() => {}}
                    onDifficultyChange={() => {}}
                    currentDifficulty="3x2"
                    onShowTutorial={() => {}}
                  />
                </div>
              </div>
            )}

            {/* Sample Cards for Step 4 */}
            {currentTutorial.showCards && (
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-lg p-4 shadow-md border-2 border-green-400">
                  <i className="fas fa-fire-extinguisher text-2xl text-red-500 mb-2"></i>
                  <p className="text-sm font-medium text-gray-800">Know how to use a fire extinguisher</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-2 border-green-400">
                  <i className="fas fa-fire-extinguisher text-2xl text-red-500 mb-2"></i>
                  <p className="text-sm font-medium text-gray-800">Know how to use a fire extinguisher</p>
                </div>
              </motion.div>
            )}

            {/* Progress Indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep
                        ? "bg-orange-500"
                        : index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <i className="fas fa-chevron-left mr-2"></i>
                Previous
              </button>

              {currentStep === tutorialSteps.length - 1 ? (
                <button
                  onClick={handleStartGame}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-play mr-2"></i>
                  Start Game!
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  Next
                  <i className="fas fa-chevron-right ml-2"></i>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
