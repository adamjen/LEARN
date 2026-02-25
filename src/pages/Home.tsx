import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../store/uiStore';
import { useGameStore, GameState } from '../store/gameStore';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

/**
 * Home Component - Main landing page
 * 
 * Displays the welcome message, navigation options, and quick access to
 * tutorial and game features.
 * 
 * @component
 */
function Home() {
  const navigate = useNavigate();
  const { openModal } = useUIStore();
  const { startGame, gameState } = useGameStore();

  /**
   * Handle starting the tutorial
   */
  const handleStartTutorial = () => {
    openModal('tutorial');
  };

  /**
   * Handle starting the game
   */
  const handleStartGame = () => {
    startGame();
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Tone Navigator
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            ARC, Tone Scale & Emotional Intelligence Learning Platform
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore the connection between Appreciation, Reality, and Communication
            while learning to navigate the emotional Tone Scale from -40 to +40.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Start Tutorial Card */}
          <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.248 5.477 3.06 6.253v13C4.248 18.523 5.834 19 7.5 19s3.332-.477 4.5-1.247z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Start Tutorial
              </h2>
              <p className="text-gray-600 mb-6">
                Learn the basics of ARC Triangle, Tone Scale, and Emotional Intelligence
                through an interactive walkthrough.
              </p>
              <Button
                onClick={handleStartTutorial}
                variant="primary"
                size="medium"
              >
                Begin Tutorial
              </Button>
            </div>
          </Card>

          {/* Start Game Card */}
          <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Start Game
              </h2>
              <p className="text-gray-600 mb-6">
                Test your understanding through interactive scenarios. Make choices
                and see how they affect your tone level and ARC balance.
              </p>
              <Button
                onClick={handleStartGame}
                variant="primary"
                size="medium"
                disabled={gameState === GameState.PLAYING}
              >
                {gameState === GameState.PLAYING ? 'Game in Progress' : 'Start Game'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Featured Scenarios Preview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Featured Scenarios
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Scenario 1 */}
            <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Workplace Communication
              </h4>
              <p className="text-gray-600 text-sm">
                Navigate a challenging team meeting where miscommunication has
                caused tension.
              </p>
            </Card>

            {/* Scenario 2 */}
            <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Family Dynamics
              </h4>
              <p className="text-gray-600 text-sm">
                Resolve a family disagreement by applying ARC principles effectively.
              </p>
            </Card>

            {/* Scenario 3 */}
            <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Personal Growth
              </h4>
              <p className="text-gray-600 text-sm">
                Work through personal challenges while maintaining emotional balance.
              </p>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
            Explore Our Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate('/learn?section=arc')}
              variant="outline"
            >
              ARC Triangle
            </Button>
            <Button
              onClick={() => navigate('/learn?section=tone')}
              variant="outline"
            >
              Tone Scale
            </Button>
            <Button
              onClick={() => navigate('/learn?section=eq')}
              variant="outline"
            >
              Emotional Intelligence
            </Button>
            <Button
              onClick={() => navigate('/progress')}
              variant="outline"
            >
              My Progress
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Tone Navigator - An educational platform for understanding ARC, Tone Scale,
            and Emotional Intelligence
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2026 Tone Navigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;