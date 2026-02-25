# Tone Navigator: UI/UX Design Specification

This document outlines the user interface and user experience design for the Tone Navigator game, including component specifications, visual design, and interaction patterns.

---

## Design Philosophy

### Core Principles

1. **Clarity First** - Information should be immediately understandable
2. **Visual Feedback** - Every action has a clear visual response
3. **Progressive Disclosure** - Show complexity as needed
4. **Accessibility** - WCAG 2.1 AA compliant
5. **Consistency** - Unified design language throughout

### Color Palette

```
Primary Colors:
- Primary: #3b82f6 (Blue-500)
- Secondary: #8b5cf6 (Purple-500)
- Success: #10b981 (Green-500)
- Warning: #f59e0b (Yellow-500)
- Error: #ef4444 (Red-500)

Tone Scale Colors:
- Peak (+10 to +40): #10b981 → #a855f7 (Green to Purple)
- Productive (+3 to +9): #3b82f6 → #10b981 (Blue to Green)
- Moderate (0 to +2.9): #f59e0b → #3b82f6 (Yellow to Blue)
- Low (-0.01 to -9): #ef4444 → #f97316 (Red to Orange)
- Failure (-10 to -40): #7f1d1d → #450a0a (Dark Red)
```

### Typography

```
Font Family: Inter (Google Fonts)
- Headings: 700 (Bold)
- Body: 400 (Regular)
- Small: 300 (Light)

Font Sizes:
- H1: 2.25rem (36px)
- H2: 1.875rem (30px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- XS: 0.75rem (12px)
```

---

## Component Library

### 1. ToneGauge Component

**Purpose:** Visual representation of current tone level on the -40 to +40 scale

**Props:**

```typescript
interface ToneGaugeProps {
  toneLevel: number; // Current tone value (-40 to +40)
  size?: "small" | "medium" | "large";
  showLabel?: boolean; // Show numeric value
  showTooltip?: boolean; // Show tone name on hover
  animate?: boolean; // Animate value changes
  height?: number; // Custom height (optional)
}
```

**Visual Design:**

```
┌─────────────────────────────────────────────────────────┐
│  Tone Scale                                             │
│  ┌────────────────────────────────────────────────────┐ │
│  │  -40    -20     0      +20     +40                │ │
│  │  [████████████████████████████████████]           │ │
│  │                    ↑                               │ │
│  │                  +1.5                               │ │
│  └────────────────────────────────────────────────────┘ │
│                    Anger                                  │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// src/components/game/ToneGauge.tsx

import { motion } from 'framer-motion';

interface ToneGaugeProps {
  toneLevel: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

const gaugeSizes = {
  small: { height: 8, labelSize: 'text-xs' },
  medium: { height: 12, labelSize: 'text-sm' },
  large: { height: 16, labelSize: 'text-base' }
};

export const ToneGauge: React.FC<ToneGaugeProps> = ({
  toneLevel,
  size = 'medium',
  showLabel = true,
  showTooltip = true,
  animate = true
}) => {
  const { height, labelSize } = gaugeSizes[size];

  // Calculate percentage position (-40 to +40 = 0% to 100%)
  const percentage = ((toneLevel + 40) / 80) * 100;

  // Get tone level info
  const toneInfo = getToneLevel(toneLevel);

  return (
    <div className="tone-gauge-container relative">
      {/* Background track */}
      <div className="gauge-track bg-gray-200 rounded-full overflow-hidden">
        {/* Color gradient background */}
        <div
          className="gauge-gradient absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to right, #7f1d1d, #f97316, #ef4444, #f59e0b, #3b82f6, #10b981, #a855f7)'
          }}
        />

        {/* Marker indicator */}
        {animate ? (
          <motion.div
            className="gauge-marker absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg"
            initial={{ left: `${percentage}%` }}
            animate={{ left: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ left: `${percentage}%` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full" />
          </motion.div>
        ) : (
          <div
            className="gauge-marker absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg"
            style={{ left: `${percentage}%` }}
          />
        )}
      </div>

      {/* Numeric label */}
      {showLabel && (
        <div className={`gauge-label text-center mt-2 ${labelSize} font-semibold text-gray-700`}>
          {toneLevel.toFixed(1)}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {toneInfo.label}
        </div>
      )}
    </div>
  );
};
```

---

### 2. ARCTriangle Component

**Purpose:** Visual representation of the ARC Triangle with Appreciation, Reality, and Communication levels

**Props:**

```typescript
interface ARCTriangleProps {
  arcState: ARCState; // { appreciation, reality, communication }
  size?: "small" | "medium" | "large";
  showLabels?: boolean;
  animate?: boolean;
  highlightWeak?: boolean; // Highlight lowest component
}
```

**Visual Design:**

```
         C: 7
         /\
        /  \
       /    \
      /      \
     /        \
    A: 5 ---- R: 6
```

**Implementation:**

```typescript
// src/components/game/ARCTriangle.tsx

import { motion } from 'framer-motion';

interface ARCTriangleProps {
  arcState: ARCState;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  animate?: boolean;
  highlightWeak?: boolean;
}

const triangleSizes = {
  small: { width: 120, fontSize: 'text-xs' },
  medium: { width: 180, fontSize: 'text-sm' },
  large: { width: 240, fontSize: 'text-base' }
};

export const ARCTriangle: React.FC<ARCTriangleProps> = ({
  arcState,
  size = 'medium',
  showLabels = true,
  animate = true,
  highlightWeak = false
}) => {
  const { width, fontSize } = triangleSizes[size];

  // Find weakest component
  const weakest = Object.entries(arcState).reduce((a, b) =>
    a[1] < b[1] ? a : b
  )[0];

  return (
    <div className="arc-triangle-container relative">
      <svg
        viewBox="0 0 100 90"
        className="arc-triangle w-full"
        style={{ width: `${width}px` }}
      >
        {/* Triangle fill */}
        <motion.polygon
          points="50,5 15,80 85,80"
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            fill: highlightWeak && weakest[0] === 'appreciation'
              ? 'rgba(239, 68, 68, 0.3)'
              : highlightWeak && weakest[0] === 'reality'
              ? 'rgba(245, 158, 11, 0.3)'
              : highlightWeak && weakest[0] === 'communication'
              ? 'rgba(16, 185, 129, 0.3)'
              : 'rgba(59, 130, 246, 0.2)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Communication label (top) */}
        {showLabels && (
          <text
            x="50"
            y="2"
            textAnchor="middle"
            className={`${fontSize} font-semibold fill-gray-700`}
          >
            C: {arcState.communication}
          </text>
        )}

        {/* Appreciation label (bottom left) */}
        {showLabels && (
          <text
            x="18"
            y="85"
            textAnchor="middle"
            className={`${fontSize} font-semibold fill-gray-700`}
          >
            A: {arcState.appreciation}
          </text>
        )}

        {/* Reality label (bottom right) */}
        {showLabels && (
          <text
            x="82"
            y="85"
            textAnchor="middle"
            className={`${fontSize} font-semibold fill-gray-700`}
          >
            R: {arcState.reality}
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="arc-legend flex justify-center gap-4 mt-2 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" /> Communication
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full" /> Appreciation
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-yellow-500 rounded-full" /> Reality
        </span>
      </div>
    </div>
  );
};
```

---

### 3. ScenarioCard Component

**Purpose:** Displays the current game scenario with response options

**Props:**

```typescript
interface ScenarioCardProps {
  scenario: Scenario;
  currentTone: number;
  currentARC: ARCState;
  onRespond: (responseId: string) => void;
  showToneGauge?: boolean;
  showARCTriangle?: boolean;
}
```

**Visual Design:**

```
┌─────────────────────────────────────────────────────────┐
│  Scenario: Resistant Team Member                        │
│  Character: Alex                                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  Alex has been missing deadlines and seems      │   │
│  │  disengaged in team meetings. You need to       │   │
│  │  address this without damaging the relationship.│   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Current State                                  │   │
│  │  Tone: [====---] +1.5 (Anger)                  │   │
│  │  ARC:  C:7                                      │   │
│  │       A:5───R:6                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Choose your response:                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  A       │ │  B       │ │  C       │ │  D       │  │
│  │  Direct  │ │  Ask     │ │  Share   │ │  Ignore  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// src/components/game/ScenarioCard.tsx

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  currentTone,
  currentARC,
  onRespond,
  showToneGauge = true,
  showARCTriangle = true
}) => {
  return (
    <Card className="scenario-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-xl">{scenario.title}</CardTitle>
        <CardDescription>
          Character: {scenario.characterName}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Scenario Description */}
        <div className="scenario-description mb-6">
          <p className="text-gray-700 leading-relaxed">
            {scenario.description}
          </p>
        </div>

        {/* Current State Display */}
        {(showToneGauge || showARCTriangle) && (
          <div className="scenario-state mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Current State
            </h3>

            <div className="flex flex-col gap-4">
              {showToneGauge && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">Tone:</span>
                  <ToneGauge toneLevel={currentTone} size="small" />
                </div>
              )}

              {showARCTriangle && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-20">ARC:</span>
                  <ARCTriangle arcState={currentARC} size="small" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Response Options */}
        <div className="scenario-responses">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            Choose your response:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scenario.responses.map((response) => (
              <Button
                key={response.id}
                onClick={() => onRespond(response.id)}
                variant="outline"
                className="response-option h-auto py-4 px-4 text-left hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {response.id.toUpperCase().charAt(0)}
                  </span>
                  <span className="text-gray-700">{response.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

---

### 4. ScoreBoard Component

**Purpose:** Displays player score, level, and progress

**Props:**

```typescript
interface ScoreBoardProps {
  score: number;
  level: number;
  scenariosCompleted: number;
  bestToneReached: number;
  showProgress?: boolean;
}
```

**Visual Design:**

```
┌─────────────────────────────────────────────────────────┐
│  Score: 245    Level: 3    Scenarios: 12/20            │
│  ┌──────────────────────────────────────────────────┐   │
│  │  XP Progress                                     │   │
│  │  █████████████████████░░░░░░░░░  65%            │   │
│  └──────────────────────────────────────────────────┘   │
│  Best Tone: +15.0 (Gay)                                 │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// src/components/game/ScoreBoard.tsx

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  level,
  scenariosCompleted,
  bestToneReached,
  showProgress = true
}) => {
  const xpToNextLevel = 500;
  const currentLevelXP = score % xpToNextLevel;
  const progressPercentage = (currentLevelXP / xpToNextLevel) * 100;

  return (
    <div className="score-board p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-4">
          <div className="score-item">
            <span className="text-xs text-gray-500 uppercase">Score</span>
            <span className="text-lg font-bold text-gray-800">{score}</span>
          </div>
          <div className="score-item">
            <span className="text-xs text-gray-500 uppercase">Level</span>
            <span className="text-lg font-bold text-blue-600">{level}</span>
          </div>
          <div className="score-item">
            <span className="text-xs text-gray-500 uppercase">Scenarios</span>
            <span className="text-lg font-bold text-gray-800">{scenariosCompleted}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Best: <span className="font-semibold text-green-600">
            {bestToneReached.toFixed(1)}
          </span>
        </div>
      </div>

      {showProgress && (
        <div className="xp-progress">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>XP Progress</span>
            <span>{currentLevelXP}/{xpToNextLevel}</span>
          </div>
          <div className="xp-bar bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="xp-fill bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
```

---

### 5. FeedbackModal Component

**Purpose:** Shows feedback after submitting a response

**Props:**

```typescript
interface FeedbackModalProps {
  data: FeedbackData;
  onClose: () => void;
  onNext: () => void;
  showNextButton?: boolean;
}
```

**Visual Design:**

```
┌─────────────────────────────────────────────────────────┐
│  ✓ Great choice!                                        │
├─────────────────────────────────────────────────────────┤
│  Your response raised the tone by +2.0 points           │
│                                                         │
│  This response showed empathy by asking about their     │
│  challenges, which built Appreciation and Reality.      │
│                                                         │
│  Tone: +1.5 → +3.5 (Anger → Conservative)              │
│                                                         │
│  [Continue]                                             │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// src/components/game/FeedbackModal.tsx

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  data,
  onClose,
  onNext,
  showNextButton = true
}) => {
  const isPositive = data.toneChange >= 0;

  return (
    <motion.div
      className="feedback-modal fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="feedback-content bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isPositive ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {isPositive ? 'Great choice!' : 'Consider a different approach'}
            </h3>
            <p className="text-sm text-gray-600">
              Tone changed by {data.toneChange > 0 ? '+' : ''}{data.toneChange.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className="feedback-explanation mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {data.explanation}
          </p>
        </div>

        {/* Tone Change Visualization */}
        <div className="tone-change mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Before: {data.previousTone.toFixed(1)}</span>
            <span>After: {data.newTone.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <ToneGauge toneLevel={data.previousTone} size="small" />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <ToneGauge toneLevel={data.newTone} size="small" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
          {showNextButton && (
            <Button
              onClick={onNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
```

---

### 6. TutorialModal Component

**Purpose:** Introduces new players to the game mechanics

**Props:**

```typescript
interface TutorialModalProps {
  onClose: () => void;
  step?: number; // For multi-step tutorial
}
```

**Visual Design:**

```
┌─────────────────────────────────────────────────────────┐
│  Welcome to Tone Navigator!                             │
├─────────────────────────────────────────────────────────┤
│  In this game, you'll navigate social scenarios by      │
│  applying the ARC Triangle and Tone Scale frameworks.   │
│                                                         │
│  Your goal: Help characters reach higher tone levels    │
│  by choosing responses that build Appreciation,         │
│  Reality, and Communication.                            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Quick Guide:                                   │   │
│  │  • Higher tone = better emotional state         │   │
│  │  • Balance ARC elements for best results        │   │
│  │  • Empathy often helps at low tones             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Got it, let's start!]                                │
└─────────────────────────────────────────────────────────┘
```

---

## Page Layouts

### Home Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  Tone Navigator           [Play] [Learn] [Progress]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    ┌─────────────────┐                  │
│                    │  Tone Navigator │                  │
│                    │  Learn through  │                  │
│                    │  interactive    │                  │
│                    │  scenarios      │                  │
│                    └─────────────────┘                  │
│                                                         │
│              [Start Playing] [Learn the Frameworks]      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Select Difficulty:                             │   │
│  │  [Beginner] [Intermediate] [Advanced] [Expert]  │   │
│  │  [Mastery]                                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Tone Scale  │ │ ARC Triangle│ │  EQ Models  │       │
│  │  Understand │ │  Appreciate │ │  Develop    │       │
│  │ emotions    │ │ Reality     │ │  Intelligence│      │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Mobile Navigation Pattern

```
┌─────────────────────────────────────────────────────────┐
│  [Menu]                                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    ┌─────────────────┐                  │
│                    │  Tone Navigator │                  │
│                    └─────────────────┘                  │
│                                                         │
│              [Start Playing]                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  [Home]  [Play]  [Learn]  [Progress]  [Settings]        │
└─────────────────────────────────────────────────────────┘
```

**Key Mobile Considerations:**

- Bottom tab bar for easy thumb access
- Single column layout for all content
- Larger touch targets (min 44px height)
- Simplified navigation with 5 main tabs
- Hamburger menu for secondary actions

### Game Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  Tone Navigator    [Home] [Learn] [Progress]    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │ Score: 245  Level: 3  Scenarios: 12/20          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Scenario: Resistant Team Member                │   │
│  │  Character: Alex                                │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Scenario description and context]             │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Response options grid]                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Current State                                  │   │
│  │  Tone: [Gauge] +1.5 (Anger)                    │   │
│  │  ARC:  C:7                                      │   │
│  │       A:5───R:6                                 │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Interaction Patterns

### 1. Response Selection

**Flow:**

1. User clicks a response option
2. Button shows loading state
3. Animation plays (card tilts, color change)
4. Feedback modal appears
5. User can close or continue

**Animation:**

```typescript
// Button click animation
const handleResponseClick = (responseId: string) => {
  // Show loading
  setLoading(true);

  // Simulate processing
  setTimeout(() => {
    // Calculate result
    const result = calculateResult(responseId);

    // Show feedback
    setFeedbackData(result);
    setShowFeedback(true);
    setLoading(false);
  }, 300);
};
```

### 1.1 Difficulty Selector Interaction

**Flow:**

1. User selects difficulty level on Home page
2. Selection is saved to localStorage
3. Scenarios are filtered by selected difficulty
4. UI updates to show selected difficulty

**Animation:**

```typescript
// Difficulty selector interaction
const handleDifficultyChange = (difficulty: number) => {
  setSelectedDifficulty(difficulty);
  localStorage.setItem("tone-navigator-difficulty", difficulty.toString());

  // Filter scenarios by difficulty
  const filteredScenarios = scenarios.filter(
    (s) => s.difficulty === difficulty || s.difficulty <= difficulty,
  );

  setScenarios(filteredScenarios);
};
```

````

### 2. Tone Level Transitions

**Animation:**

```typescript
// Smooth gauge animation
<motion.div
  className="gauge-marker"
  initial={{ left: `${oldPercentage}%` }}
  animate={{ left: `${newPercentage}%` }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 30
  }}
/>
````

### 3. ARC Triangle Updates

**Animation:**

```typescript
// Triangle pulse on change
<motion.polygon
  initial={{ opacity: 0.8 }}
  animate={{
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.02, 1]
  }}
  transition={{ duration: 0.3 }}
/>
```

---

## Responsive Design

### Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
```

### Mobile Considerations

- Single column layout for responses
- Smaller gauge and triangle components
- Simplified score display
- Touch-friendly button sizes (min 44px)

### Tablet Considerations

- Two-column response grid
- Medium-sized visual components
- Side-by-side score and state display

### Desktop Considerations

- Full layout with all components
- Larger visual components
- Multi-column layouts

---

## Accessibility Features

### 1. Keyboard Navigation

- All interactive elements focusable
- Tab order follows visual flow
- Escape closes modals
- Enter/Space activates buttons

### 2. Screen Reader Support

- ARIA labels on all interactive elements
- Live regions for dynamic updates
- Descriptive button text
- Alt text for visual elements

### 3. Color Contrast

- All text meets WCAG AA (4.5:1 minimum)
- Color not sole indicator of meaning
- Icons/text accompany color cues

### 4. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Loading States

### 1. Initial Load

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    Loading...                           │
│                    ┌─────────────┐                      │
│                    │  Loading    │                      │
│                    │  scenarios  │                      │
│                    └─────────────┘                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Scenario Loading

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────┐   │
│  │  Loading scenario...                            │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  [Loading spinner]                              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Error States

### 1. No Scenarios Available

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────┐   │
│  │  No scenarios available                         │   │
│  │  Please check your connection and try again.    │   │
│  │  [Retry]                                          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2. Progress Not Found

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────────────────┐   │
│  │  Welcome! Start your first scenario to begin    │   │
│  │  [Start Playing]                                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

This UI/UX specification provides a comprehensive design system for the Tone Navigator game, ensuring a consistent, accessible, and engaging user experience across all devices and interaction patterns.
