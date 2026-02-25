import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, GameState, Scenario } from '../store/gameStore';
import { useUIStore } from '../store/uiStore';
import ToneGauge from '../components/game/ToneGauge';
import ARCTriangle from '../components/game/ARCTriangle';
import { ScenarioCard } from '../components/game/ScenarioCard';
import { ScoreBoard } from '../components/game/ScoreBoard';
import { FeedbackModal } from '../components/game/FeedbackModal';
import { TutorialModal } from '../components/game/TutorialModal';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { ScenarioCategory, ScenarioDifficulty } from '../types/scenarios';

/**
 * Game Page Component
 * 
 * Main game interface that integrates all game components:
 * - ToneGauge for visualizing emotional state
 * - ARCTriangle for ARC balance visualization
 * - ScenarioCard for presenting scenarios
 * - ScoreBoard for tracking progress
 * - FeedbackModal for response feedback
 * - TutorialModal for onboarding
 * 
 * @component
 */
function Game() {
  const navigate = useNavigate();
  const {
    currentToneLevel,
    currentScenario,
    selectedResponse,
    gameState,
    toneHistory,
    startGame,
    selectResponse,
    nextScenario,
    endGame,
    resetGame,
  } = useGameStore();
  const {
    activeModal,
    closeModal,
    openModal,
    animationsEnabled,
  } = useUIStore();

  /**
   * Initialize game when component mounts
   */
  useEffect(() => {
    if (gameState === GameState.NOT_STARTED) {
      startGame();
    }
  }, [gameState, startGame]);

  /**
   * Handle scenario response selection
   * 
   * @param optionId - ID of the selected option
   */
  const handleResponseSelect = (optionId: string) => {
    if (currentScenario) {
      const option = currentScenario.options.find((opt) => opt.id === optionId);
      if (option) {
        selectResponse(currentScenario.id, optionId, option.toneChange);
      }
    }
  };

  /**
   * Move to next scenario
   */
  const handleNextScenario = () => {
    nextScenario([]); // Empty array - scenarios will be loaded dynamically
  };

  /**
   * Handle ending the game
   */
  const handleEndGame = () => {
    endGame();
    navigate('/');
  };

  /**
   * Handle resetting the game
   */
  const handleResetGame = () => {
    resetGame();
    startGame();
  };

  /**
   * Close feedback modal and continue
   */
  const handleCloseFeedback = () => {
    closeModal();
    handleNextScenario();
  };

  /**
   * Close tutorial modal
   */
  const handleCloseTutorial = () => {
    closeModal();
  };

  /**
   * Check if game is complete
   */
  const isGameComplete = gameState === GameState.COMPLETED;

  /**
   * Generate ARC state based on current tone level
   */
  const generateARCState = () => {
    const base = Math.max(1, Math.min(10, 5 + (currentToneLevel / 10)));
    return {
      appreciation: base,
      reality: base,
      communication: base,
      total: base * 3,
      average: base,
    };
  };

  /**
   * Generate mock scenario for demonstration
   */
  const generateScenario = (): Scenario => ({
    id: 'demo-scenario-1',
    title: 'Workplace Communication Challenge',
    description: 'A team meeting has revealed conflicting information about project deadlines.',
    context: 'A team meeting has revealed conflicting information about project deadlines.',
    category: ScenarioCategory.GENERAL,
    difficulty: ScenarioDifficulty.BEGINNER,
    initialARC: generateARCState(),
    initialTone: currentToneLevel,
    toneLevel: currentToneLevel,
    options: [
      {
        id: 'opt-1',
        text: 'Listen actively and ask clarifying questions',
        toneChange: 2.5,
      },
      {
        id: 'opt-2',
        text: 'Express frustration about the confusion',
        toneChange: -3,
      },
      {
        id: 'opt-3',
        text: 'Suggest a team meeting to resolve issues',
        toneChange: 1.5,
      },
    ],
  });

  /**
   * Get feedback data for modal
   */
  const getFeedbackData = () => {
    if (!selectedResponse) return null;
    
    return {
      isOptimal: selectedResponse.toneChange > 0,
      toneChange: selectedResponse.toneChange,
      newToneLevel: currentToneLevel + selectedResponse.toneChange,
      explanation: selectedResponse.toneChange > 0
        ? 'This response shows good emotional intelligence by addressing the situation constructively.'
        : 'This response may escalate tension. Consider a more constructive approach.',
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
              Tone Navigator - Game
            </h1>
            <div className="flex gap-4">
              <Button onClick={handleResetGame} variant="outline" size="small">
                Reset
              </Button>
              <Button onClick={handleEndGame} variant="error" size="small">
                End Game
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Game Status Bar */}
        <Card className="mb-8 p-4 bg-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-semibold">Status:</span>{' '}
              {isGameComplete ? 'Game Complete' : 'Playing'}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Tone Level:</span>{' '}
              {currentToneLevel.toFixed(1)}
            </div>
          </div>
        </Card>

        {/* Game Components Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tone Gauge & ARC Triangle */}
          <div className="space-y-6">
            {/* Tone Gauge */}
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Current Tone Level
              </h2>
              <ToneGauge
                value={currentToneLevel}
                size="large"
                showTooltip={true}
                animated={animationsEnabled}
              />
            </Card>

            {/* ARC Triangle */}
            <Card className="p-6 bg-white shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                ARC Balance
              </h2>
              <ARCTriangle
                appreciation={generateARCState().appreciation}
                reality={generateARCState().reality}
                communication={generateARCState().communication}
                size="medium"
                animated={animationsEnabled}
              />
            </Card>

            {/* Score Board */}
            <Card className="p-6 bg-white shadow-lg">
              <ScoreBoard
                currentTone={currentToneLevel}
                bestTone={Math.max(...toneHistory, 0)}
                eqScores={{
                  selfAwareness: 50,
                  selfRegulation: 45,
                  motivation: 55,
                  empathy: 40,
                  socialSkills: 35,
                }}
                scenariosCompleted={toneHistory.length}
                currentStreak={toneHistory.length > 0 ? 1 : 0}
                bestStreak={1}
                animated={animationsEnabled}
              />
            </Card>
          </div>

          {/* Right Column - Scenario Card */}
          <div className="lg:col-span-2">
            {isGameComplete ? (
              <Card className="p-12 bg-white shadow-lg text-center">
                <div className="mb-6">
                  <svg
                    className="w-20 h-20 mx-auto text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Game Complete!
                </h2>
                <p className="text-gray-600 mb-8">
                  You've completed all scenarios. Your final tone level is{' '}
                  <strong>{currentToneLevel.toFixed(1)}</strong>.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {toneHistory.length}
                    </div>
                    <div className="text-sm text-gray-600">Scenarios</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {currentToneLevel.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Final Tone</div>
                  </div>
                </div>
                <Button onClick={handleResetGame} variant="primary" size="medium">
                  Play Again
                </Button>
              </Card>
            ) : currentScenario ? (
              <ScenarioCard
                scenario={currentScenario}
                currentTone={currentToneLevel}
                currentARC={generateARCState()}
                isLoading={false}
                onRespond={handleResponseSelect}
                showFeedback={!!selectedResponse}
                selectedOption={
                  selectedResponse
                    ? currentScenario.options.find(
                        (opt) => opt.id === selectedResponse.optionId
                      ) || null
                    : null
                }
                feedbackResult={getFeedbackData()}
              />
            ) : (
              <Card className="p-12 bg-white shadow-lg text-center">
                <div className="mb-6">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Loading Scenario...
                </h2>
                <p className="text-gray-600">
                  Please wait while we prepare your next scenario.
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeModal === 'tutorial' && (
        <TutorialModal
          isOpen={true}
          onComplete={handleCloseTutorial}
          onSkip={handleCloseTutorial}
          animated={animationsEnabled}
        />
      )}

      {activeModal === 'gameOver' && selectedResponse && (
        <FeedbackModal
          isOpen={true}
          feedback={getFeedbackData()}
          onClose={handleCloseFeedback}
          animated={animationsEnabled}
        />
      )}
    </div>
  );
}

export default Game;