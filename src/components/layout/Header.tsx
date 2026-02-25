import { useNavigate } from 'react-router-dom';
import { useGameStore, GameState } from '../../store/gameStore';
import { Button } from '../common/Button';

/**
 * Header Component
 * 
 * Top navigation bar with logo and main navigation links.
 * Displays on all pages except the game page.
 * 
 * @component
 */
function Header() {
  const navigate = useNavigate();
  const { gameState } = useGameStore();

  /**
   * Handle navigation to different sections
   */
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  /**
   * Handle starting the game
   */
  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">Tone Navigator</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigate('/learn')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Learn
            </button>
            <button
              onClick={() => handleNavigate('/progress')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Progress
            </button>
            <button
              onClick={() => handleNavigate('/settings')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Settings
            </button>
          </nav>

          {/* Start Game Button */}
          <Button
            onClick={handleStartGame}
            variant="primary"
            size="medium"
          >
            {gameState === GameState.PLAYING ? 'Continue Game' : 'Start Game'}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;