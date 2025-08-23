import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardType } from "@/lib/fire-safety-data";

interface TutorialProps {
  isVisible: boolean;
  onClose: () => void;
  onStartGame: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Fire Safety Memory Match!",
    description: "Learn important fire safety tips while having fun matching cards. This game will teach you essential safety knowledge that could save lives.",
    icon: "fas fa-fire",
    color: "text-red-500",
    bgColor: "bg-red-50",
    showCards: false
  },
  {
    title: "How to Play",
    description: "Click on cards to flip them and find matching pairs. Each pair contains the same fire safety tip. Match all pairs to win!",
    icon: "fas fa-gamepad",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    showCards: false
  },
  {
    title: "Game Controls",
    description: "Use the difficulty selector to choose your challenge level. Track your progress with moves, time, and matches counters.",
    icon: "fas fa-sliders-h",
    color: "text-green-500",
    bgColor: "bg-green-50",
    showCards: false
  },
  {
    title: "Fire Safety Learning",
    description: "Each card contains a vital fire safety tip. Pay attention to these tips - they could help you in real emergencies!",
    icon: "fas fa-shield-alt",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    showCards: true
  },
  {
    title: "Ready to Play?",
    description: "You're all set! Click 'Start Game' to begin your fire safety learning adventure. Remember: safety first, fun second!",
    icon: "fas fa-play",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    showCards: false
  }
];

export function Tutorial({ isVisible, onClose, onStartGame }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartGame = () => {
    onStartGame();
    onClose();
  };

  const handleSkipTutorial = () => {
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
