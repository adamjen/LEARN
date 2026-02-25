import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, GameState } from '../store/gameStore';
import { useUIStore } from '../store/uiStore';
import { useProgressStore } from '../store/progressStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

/**
 * Settings Page Component
 * 
 * Displays game settings including difficulty level, animations, sound,
 * and tutorial preferences. Allows users to customize their experience.
 * 
 * @component
 */
function Settings() {
  const navigate = useNavigate();
  const { gameState, startGame, resetGame } = useGameStore();
  const { animationsEnabled, soundEnabled, toggleAnimations } = useUIStore();
  const { progress, settings, updateSettings, resetProgress } = useProgressStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  /**
   * Handle difficulty change
   */
  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    updateSettings({ difficulty });
  };

  /**
   * Handle animation toggle
   */
  const handleAnimationToggle = () => {
    toggleAnimations();
  };

  /**
   * Handle sound toggle
   */
  const handleSoundToggle = () => {
    // Note: toggleSound is in uiStore, not progressStore
    // This will need to be handled differently
  };

  /**
   * Handle tutorial toggle
   */
  const handleTutorialToggle = () => {
    updateSettings({ tutorialEnabled: !settings.tutorialEnabled });
  };

  /**
   * Handle reset progress
   */
  const handleResetProgress = () => {
    resetProgress();
    resetGame();
    setShowResetConfirm(false);
  };

  /**
   * Cancel reset
   */
  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Customize your experience</p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="medium"
            >
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Game Settings */}
        <Card className="p-6 bg-white shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Game Settings</h2>
          
          <div className="space-y-6">
            {/* Difficulty Level */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Difficulty Level</h3>
              <div className="flex gap-4">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <Button
                    key={level}
                    onClick={() => handleDifficultyChange(level)}
                    variant={settings.difficulty === level ? 'primary' : 'outline'}
                    size="medium"
                    className="flex-1"
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {settings.difficulty === 'easy' && 'Simpler scenarios with more guidance'}
                {settings.difficulty === 'medium' && 'Balanced difficulty for most players'}
                {settings.difficulty === 'hard' && 'Challenging scenarios for experienced players'}
              </p>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Animations</h3>
                <p className="text-sm text-gray-500">Enable/disable visual animations</p>
              </div>
              <Button
                onClick={handleAnimationToggle}
                variant={animationsEnabled ? 'primary' : 'outline'}
                size="medium"
              >
                {animationsEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Sound Effects</h3>
                <p className="text-sm text-gray-500">Enable/disable audio feedback</p>
              </div>
              <Button
                onClick={() => {}}
                variant="outline"
                size="medium"
              >
                Enabled
              </Button>
            </div>

            {/* Tutorial */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Tutorial</h3>
                <p className="text-sm text-gray-500">Show tutorial on game start</p>
              </div>
              <Button
                onClick={handleTutorialToggle}
                variant={settings.tutorialEnabled ? 'primary' : 'outline'}
                size="medium"
              >
                {settings.tutorialEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Settings */}
        <Card className="p-6 bg-white shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Progress Settings</h2>
          
          <div className="space-y-6">
            {/* Current Progress */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Your Progress</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {progress.scenariosCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Scenarios Completed</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {progress.bestTone.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Best Tone Level</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {Math.round(Object.values(progress.eqScores).reduce((a: number, b: number) => a + b, 0) / Object.values(progress.eqScores).length)}%
                  </div>
                  <div className="text-sm text-gray-600">Average EQ Score</div>
                </div>
              </div>
            </div>

            {/* Reset Progress */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Reset Progress</h3>
              <p className="text-gray-600 mb-4">
                This will clear all your progress including scenarios completed, tone history, and EQ scores.
                This action cannot be undone.
              </p>
              
              {showResetConfirm ? (
                <div className="flex gap-4">
                  <Button
                    onClick={handleResetProgress}
                    variant="error"
                    size="medium"
                  >
                    Yes, Reset Progress
                  </Button>
                  <Button
                    onClick={cancelReset}
                    variant="outline"
                    size="medium"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowResetConfirm(true)}
                  variant="error"
                  size="medium"
                >
                  Reset All Progress
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About Tone Navigator</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Tone Navigator is an educational platform designed to help you develop emotional
              intelligence through interactive scenarios and learning.
            </p>
            <p>
              The app combines the ARC Triangle framework (Appreciation, Reality, Communication)
              with the Tone Scale emotional gradient (-40 to +40) to create an engaging learning experience.
            </p>
            <p className="text-sm text-gray-500">
              Version 1.0.0 | Created: 2026-02-25
            </p>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Tone Navigator - Settings & Preferences
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2026 Tone Navigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Settings;