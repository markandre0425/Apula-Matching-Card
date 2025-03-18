import { GameContainer } from "@/components/memory-game/GameContainer";

export default function Home() {
  return (
    <div className="min-h-screen flame-bg flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <header className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF5733] mb-1 flex justify-center items-center">
            <i className="fas fa-fire mr-2"></i>
            Fire Safety Memory Match
            <i className="fas fa-fire ml-2"></i>
          </h1>
          <p className="text-md text-gray-700">Match cards to learn important fire safety tips!</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left sidebar with game info */}
          <div className="hidden lg:block lg:col-span-1 p-4 bg-white/90 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#FF5733] mb-3">About the Game</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-[#FF5733]">How to Play</h3>
                <p className="text-sm text-gray-700">Flip cards to find matching pairs. Each pair contains important fire safety information.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#FF5733]">Educational Goal</h3>
                <p className="text-sm text-gray-700">Learn critical fire safety tips while having fun with this memory matching game.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#FF5733]">Game Features</h3>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>Multiple difficulty levels</li>
                  <li>Educational fire safety content</li>
                  <li>Timer and move counter</li>
                  <li>Visual feedback for matches</li>
                </ul>
              </div>
              
              {/* Footer information moved to the side */}
              <div className="mt-8 border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-500">APULA Fire Safety Memory Match Game &copy; {new Date().getFullYear()}</p>
                <p className="text-xs text-gray-500">An educational game for fire safety awareness</p>
              </div>
            </div>
          </div>
          
          {/* Game container */}
          <div className="lg:col-span-3">
            <GameContainer />
          </div>
        </div>
        
        {/* Mobile footer - only visible on small screens */}
        <footer className="mt-4 text-center text-gray-600 text-xs lg:hidden">
          <p>Fire Safety Memory Match Game &copy; {new Date().getFullYear()} | An educational game for fire safety awareness</p>
        </footer>
      </div>
    </div>
  );
}
