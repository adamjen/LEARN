import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore, GameState } from '../store/gameStore';
import { useUIStore } from '../store/uiStore';
import { useProgressStore } from '../store/progressStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

/**
 * Progress Page Component
 * 
 * Displays player statistics, achievements, tone history, and EQ component progress.
 * Provides a comprehensive view of player progress through the game.
 * 
 * @component
 */
function Progress() {
  const navigate = useNavigate();
  const { toneHistory, currentToneLevel, gameState } = useGameStore();
  const { animationsEnabled } = useUIStore();
  const { progress, settings, updateSettings, resetProgress } = useProgressStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'tone' | 'eq' | 'scenarios'>('tone');

  /**
   * Calculate current positive streak
   */
  const calculateCurrentStreak = (): number => {
    let streak = 0;
    for (let i = toneHistory.length - 1; i >= 0; i--) {
      if (toneHistory[i] >= 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  /**
   * Calculate best positive streak
   */
  const calculateBestStreak = (): number => {
    let maxStreak = 0;
    let currentStreak = 0;
    
    for (let i = toneHistory.length - 1; i >= 0; i--) {
      if (toneHistory[i] >= 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return maxStreak;
  };

  /**
   * Calculate statistics from tone history
   */
  const stats = {
    totalScenarios: progress.scenariosCompleted,
    averageTone: toneHistory.length > 0
      ? toneHistory.reduce((a, b) => a + b, 0) / toneHistory.length
      : 0,
    highestTone: Math.max(...toneHistory, progress.bestTone, 0),
    lowestTone: Math.min(...toneHistory, 0),
    positiveResponses: toneHistory.filter(t => t > 0).length,
    negativeResponses: toneHistory.filter(t => t < 0).length,
    currentStreak: calculateCurrentStreak(),
    bestStreak: calculateBestStreak(),
  };

  /**
   * Get tone level name based on value
   */
  const getToneName = (value: number): string => {
    const levels: Record<string, string> = {
      '40': 'Serenity of Beingness',
      '35': 'Ecstatic',
      '30': 'Excitement',
      '25': 'Enthusiasm',
      '20': 'Contentment',
      '15': 'Cheerfulness',
      '10': 'Cheerful',
      '5': 'Optimism',
      '0': 'Neutrality',
      '-5': 'Scepticism',
      '-10': 'Pessimism',
      '-15': 'Boredom',
      '-20': 'Disinterest',
      '-25': 'Gloom',
      '-30': 'Apathy',
      '-35': 'Despair',
      '-40': 'Total Failure',
    };
    
    const levelKeys = Object.keys(levels).map(Number);
    const closest = levelKeys.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    
    return levels[String(closest)] || 'Unknown';
  };

  /**
   * Get tone color based on value
   */
  const getToneColor = (value: number): string => {
    if (value >= 15) return 'text-green-600';
    if (value >= 5) return 'text-green-500';
    if (value >= 0) return 'text-yellow-500';
    if (value >= -10) return 'text-orange-500';
    return 'text-red-500';
  };

  /**
   * Get background color based on value
   */
  const getBgColor = (value: number): string => {
    if (value >= 15) return 'bg-green-100';
    if (value >= 5) return 'bg-green-50';
    if (value >= 0) return 'bg-yellow-50';
    if (value >= -10) return 'bg-orange-50';
    return 'bg-red-50';
  };

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
    // toggleAnimations is in uiStore
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
    // resetGame is in gameStore
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
              <h1 className="text-2xl font-bold text-gray-800">My Progress</h1>
              <p className="text-gray-600">Track your learning journey</p>
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
        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats.totalScenarios}
              </div>
              <div className="text-gray-600">Scenarios Completed</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getToneColor(stats.highestTone)} mb-2`}>
                {stats.highestTone.toFixed(1)}
              </div>
              <div className="text-gray-600">Best Tone Level</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats.averageTone.toFixed(1)}
              </div>
              <div className="text-gray-600">Average Tone</div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.currentStreak}
              </div>
              <div className="text-gray-600">Current Streak</div>
            </div>
          </Card>
        </div>

        {/* Metric Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-300">
            <button
              onClick={() => setSelectedMetric('tone')}
              className={`px-4 py-2 font-semibold ${
                selectedMetric === 'tone'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tone History
            </button>
            <button
              onClick={() => setSelectedMetric('eq')}
              className={`px-4 py-2 font-semibold ${
                selectedMetric === 'eq'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              EQ Scores
            </button>
            <button
              onClick={() => setSelectedMetric('scenarios')}
              className={`px-4 py-2 font-semibold ${
                selectedMetric === 'scenarios'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Scenarios
            </button>
          </div>
        </div>

        {/* Content based on selected metric */}
        {selectedMetric === 'tone' && (
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Tone Level History</h2>
            
            {/* Current Tone */}
            <div className={`p-6 rounded-lg mb-6 ${getBgColor(currentToneLevel)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Current Tone Level</h3>
                  <p className="text-gray-600">
                    {currentToneLevel.toFixed(1)} - {getToneName(currentToneLevel)}
                  </p>
                </div>
                <div className={`text-3xl font-bold ${getToneColor(currentToneLevel)}`}>
                  {currentToneLevel >= 0 ? '+' : ''}{currentToneLevel.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stats.positiveResponses}
                </div>
                <div className="text-sm text-gray-600">Positive Responses</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {stats.negativeResponses}
                </div>
                <div className="text-sm text-gray-600">Negative Responses</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stats.bestStreak}
                </div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
            </div>

            {/* Tone History Chart (simplified) */}
            {toneHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tone Progression</h3>
                <div className="flex items-end gap-1 h-32">
                  {toneHistory.slice(-20).map((tone, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-t ${getBgColor(tone)}`}
                      style={{
                        height: `${Math.min(100, Math.max(10, (tone + 40) / 80 * 100))}%`,
                      }}
                      title={`${tone.toFixed(1)} - ${getToneName(tone)}`}
                    />
                  ))}
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Last {Math.min(20, toneHistory.length)} scenarios
                </div>
              </div>
            )}
          </Card>
        )}

        {selectedMetric === 'eq' && (
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">EQ Component Scores</h2>
            
            <div className="space-y-6">
              {Object.entries(progress.eqScores).map(([component, score]) => (
                <div key={component}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">
                      {component.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-gray-600">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        score >= 80 ? 'bg-green-500' :
                        score >= 60 ? 'bg-blue-500' :
                        score >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* EQ Summary */}
            <div className="mt-8 p-6 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">EQ Summary</h3>
              <p className="text-gray-600">
                Your overall EQ score is{' '}
                <strong className="text-purple-600">
                  {Math.round(Object.values(progress.eqScores).reduce((a: number, b: number) => a + b, 0) / Object.values(progress.eqScores).length)}%
                </strong>
                . Keep practicing to improve your emotional intelligence skills!
              </p>
            </div>
          </Card>
        )}

        {selectedMetric === 'scenarios' && (
          <Card className="p-6 bg-white shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Scenario Completion</h2>
            
            {stats.totalScenarios === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No scenarios completed yet.</p>
                <Button
                  onClick={() => navigate('/game')}
                  variant="primary"
                  size="medium"
                >
                  Start Playing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {toneHistory.map((tone, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg flex items-center justify-between ${getBgColor(tone)}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(tone)}`}>
                        <span className={`font-bold ${getToneColor(tone)}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-800">
                          Scenario {index + 1}
                        </div>
                        <div className="text-sm text-gray-600">
                          Tone: {tone.toFixed(1)} - {getToneName(tone)}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${getToneColor(tone)}`}>
                      {tone >= 0 ? '+' : ''}{tone.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Achievements Section */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Achievements</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold text-gray-800 mb-1">First Steps</div>
              <div className="text-sm text-gray-600">
                Complete your first scenario
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.totalScenarios >= 1 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-3xl mb-2">📈</div>
              <div className="font-semibold text-gray-800 mb-1">Rising Star</div>
              <div className="text-sm text-gray-600">
                Reach tone level +10 or higher
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.highestTone >= 10 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="font-semibold text-gray-800 mb-1">On Fire</div>
              <div className="text-sm text-gray-600">
                Achieve a streak of 5+ positive responses
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.bestStreak >= 5 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold text-gray-800 mb-1">Dedicated Learner</div>
              <div className="text-sm text-gray-600">
                Complete 10 scenarios
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.totalScenarios >= 10 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="font-semibold text-gray-800 mb-1">Champion</div>
              <div className="text-sm text-gray-600">
                Reach tone level +20 or higher
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.highestTone >= 20 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold text-gray-800 mb-1">Master</div>
              <div className="text-sm text-gray-600">
                Complete 25 scenarios
              </div>
              <div className="mt-2 text-green-600 font-semibold">
                {stats.totalScenarios >= 25 ? '✓ Unlocked' : 'Locked'}
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Tone Navigator - Track your learning journey
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2026 Tone Navigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Progress;