import { GameContainer } from "@/components/memory-game/GameContainer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flame-bg flex flex-col">
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <i className="fas fa-fire text-5xl md:text-6xl text-red-500 mb-4"></i>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Fire Safety Memory Match
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Learn essential fire safety tips through an engaging memory matching game. 
            Match cards, improve your knowledge, and become a fire safety expert!
          </p>
        </motion.header>
        
        {/* Game Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-brain text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Memory Training</h3>
            <p className="text-gray-600">Enhance your memory skills while learning important safety information.</p>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Safety Education</h3>
            <p className="text-gray-600">Learn critical fire safety tips that could save lives in emergencies.</p>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-gamepad text-2xl text-white"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fun Gameplay</h3>
            <p className="text-gray-600">Multiple difficulty levels and engaging animations make learning fun!</p>
          </motion.div>
        </motion.div>
        
        {/* Main Game Section */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GameContainer />
        </motion.div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <i className="fas fa-heart text-red-500 mr-2"></i>
              Why Fire Safety Matters
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Fire safety knowledge is crucial for everyone. This game helps you learn essential tips 
              that could prevent accidents and save lives. Practice regularly to keep your knowledge fresh!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Educational Content
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Multiple Difficulty Levels
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Progress Tracking
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                APULA Fire Safety Memory Match Game &copy; {new Date().getFullYear()} | 
                An educational game for fire safety awareness
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
