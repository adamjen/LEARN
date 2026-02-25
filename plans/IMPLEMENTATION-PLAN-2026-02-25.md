# Implementation Plan: Tone Navigator

**Created:** 2026-02-25  
**Project:** ARC, Tone Scale & Emotional Intelligence Learning Project  
**Status:** Ready to Begin

---

## Overview

This document tracks the implementation progress of the Tone Navigator application. Each section includes checkboxes that should be marked as complete when implemented.

---

## Phase 1: Project Setup (Week 1)

**Goal:** Establish the foundation for the React + TypeScript + Vite application.

### 1.1 Initialize React + TypeScript + Vite Project Structure

- [x] Create project directory structure
- [x] Initialize package.json with dependencies
- [x] Configure TypeScript (tsconfig.json)
- [x] Configure Vite (vite.config.ts)
- [x] Set up basic folder structure (src/, public/)

**Files to Create:**

- `package.json` ✓
- `tsconfig.json` ✓
- `vite.config.ts` ✓
- `src/main.tsx` ✓
- `src/index.css` ✓
- `public/index.html` ✓

**Completion Date:** 2026-02-25

---

### 1.2 Configure Tailwind CSS and shadcn/ui

- [x] Install and configure Tailwind CSS
- [x] Set up tailwind.config.js with custom colors
- [x] Install shadcn/ui dependencies (@radix-ui/react-dialog, @radix-ui/react-slot, @radix-ui/react-label, @radix-ui/react-select, @radix-ui/react-tooltip, @radix-ui/react-progress, @radix-ui/react-tabs)
- [x] Create utility functions (cn.ts)
- [x] Create Button component

**Configuration:**

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  }
}
```

**Files Created:**

- `src/lib/cn.ts` - Utility function for merging class names
- `src/components/ui/Button.tsx` - shadcn-style Button component

**Completion Date:** 2026-02-25

---

### 1.3 Set up ESLint + Prettier Configuration

- [x] Install ESLint and configure rules
- [x] Install Prettier and configure formatting
- [x] Set up Husky for pre-commit hooks (optional - not installed)
- [x] Configure VSCode settings for auto-format

**Files to Create:**

- `.eslintrc.cjs` ✓
- `.prettierrc` ✓
- `.editorconfig` ✓

**Completion Date:** 2026-02-25

---

### 1.4 Create Core Data Structures (ToneScale, ARCState types)

- [x] Create `src/types/game.ts` with ToneLevel interface
- [x] Create ARCState interface
- [x] Create Scenario interface
- [x] Create ResponseOption interface
- [x] Create PlayerProgress interface
- [x] Create GameSettings interface

**Files to Create:**

- `src/types/game.ts` ✓
- `src/types/scenarios.ts` ✓
- `src/types/frameworks.ts` ✓
- `src/types/index.ts` ✓

**Completion Date:** 2026-02-25

---

### 1.5 Implement Zustand Stores (gameStore, progressStore, uiStore)

- [x] Install Zustand and persist middleware
- [x] Create `src/store/gameStore.ts` with game state/actions
- [x] Create `src/store/progressStore.ts` with player progress
- [x] Create `src/store/uiStore.ts` with UI state
- [x] Configure localStorage persistence for all stores

**Files to Create:**

- `src/store/gameStore.ts` ✓
- `src/store/progressStore.ts` ✓
- `src/store/uiStore.ts` ✓
- `src/store/index.ts` ✓

**Completion Date:** 2026-02-25

---

### 1.6 Build ToneGauge Component with Animations

- [x] Create `src/components/game/ToneGauge.tsx`
- [x] Implement gradient background (-40 to +40)
- [x] Add marker indicator with Framer Motion animation
- [x] Implement size variants (small, medium, large)
- [x] Add tooltip for tone level name
- [x] Test with various tone values

**Files to Create:**

- `src/components/game/ToneGauge.tsx` ✓
- `TESTS/components/game/ToneGauge.test.ts` ✓

**Completion Date:** 2026-02-25

---

### 1.7 Build ARCTriangle Component

- [x] Create `src/components/game/ARCTriangle.tsx`
- [x] Implement triangular visualization
- [x] Show Appreciation, Reality, Communication values
- [x] Add color coding for each axis
- [x] Animate value changes
- [x] Test with various ARC states

**Files to Create:**

- `src/components/game/ARCTriangle.tsx` ✓
- `TESTS/components/game/ARCTriangle.test.ts` ✓

**Completion Date:** 2026-02-25

---

### 1.8 Create Shared/Common Component Library

- [x] Create `src/components/common/Button.tsx`
- [x] Create `src/components/common/Card.tsx`
- [x] Create `src/components/common/Modal.tsx`
- [x] Create `src/components/common/index.ts` export file
- [x] Add tests for each component

**Files to Create:**

- `src/components/common/Button.tsx` ✓
- `src/components/common/Card.tsx` ✓
- `src/components/common/Modal.tsx` ✓
- `src/components/common/index.ts` ✓
- `TESTS/components/common/Button.test.ts` ✓
- `TESTS/components/common/Card.test.ts` ✓
- `TESTS/components/common/Modal.test.ts` ✓

**Completion Date:** 2026-02-25

---

## Phase 1 Summary

**Total Tasks:** 8
**Completed:** 8 / 8
**Percentage:** 100%

**Start Date:** 2026-02-25
**Expected Completion:** 2026-03-01 (Week 1)
**Actual Completion:** 2026-02-25

**Notes:** Phase 1 completed ahead of schedule. All core components (ToneGauge, ARCTriangle, common components) and stores are implemented with tests.

---

## Phase 2: Core Game Engine (Week 2)

**Goal:** Build the game logic and core components.

### 2.1 Implement ScenarioCard Component

- [ ] Create `src/components/game/ScenarioCard.tsx`
- [ ] Display scenario description and character info
- [ ] Show current tone level and ARC state
- [ ] Render response options as clickable buttons
- [ ] Add animations for scenario transitions
- [ ] Test with all scenario categories

**Files to Create:**

- `src/components/game/ScenarioCard.tsx`
- `TESTS/components/game/ScenarioCard.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.2 Build ScoreBoard Component

- [ ] Create `src/components/game/ScoreBoard.tsx`
- [ ] Display current score and level
- [ ] Show best tone reached
- [ ] Display EQ component scores
- [ ] Add progress indicators
- [ ] Test with various score values

**Files to Create:**

- `src/components/game/ScoreBoard.tsx`
- `TESTS/components/game/ScoreBoard.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.3 Create FeedbackModal Component

- [ ] Create `src/components/game/FeedbackModal.tsx`
- [ ] Show response correctness feedback
- [ ] Display tone change result
- [ ] Explain "Why this response?"
- [ ] Show learning points
- [ ] Add close/continue button
- [ ] Test with various feedback scenarios

**Files to Create:**

- `src/components/game/FeedbackModal.tsx`
- `TESTS/components/game/FeedbackModal.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.4 Implement Game Logic (scoring, tone calculation, ARC calculation)

- [ ] Create `src/utils/scoring.ts` with scoring rules
- [ ] Create `src/utils/toneScale.ts` with tone calculations
- [ ] Create `src/utils/arcCalculator.ts` with ARC calculations
- [ ] Implement tone impact calculation
- [ ] Implement ARC impact calculation
- [ ] Test all utility functions

**Files to Create:**

- `src/utils/scoring.ts`
- `src/utils/toneScale.ts`
- `src/utils/arcCalculator.ts`
- `src/utils/index.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.5 Build TutorialModal for Onboarding

- [ ] Create `src/components/game/TutorialModal.tsx`
- [ ] Explain ARC Triangle basics
- [ ] Explain Tone Scale basics
- [ ] Explain game mechanics
- [ ] Add interactive walkthrough
- [ ] Include "Skip Tutorial" option
- [ ] Test tutorial flow

**Files to Create:**

- `src/components/game/TutorialModal.tsx`
- `TESTS/components/game/TutorialModal.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.6 Create Custom Hooks (useGame, useToneScale, useARCTriangle, useScore)

- [ ] Create `src/hooks/useGame.ts` for game state management
- [ ] Create `src/hooks/useToneScale.ts` for tone calculations
- [ ] Create `src/hooks/useARCTriangle.ts` for ARC calculations
- [ ] Create `src/hooks/useScore.ts` for score tracking
- [ ] Create `src/hooks/useLocalStorage.ts` for persistence
- [ ] Test all hooks with various scenarios

**Files to Create:**

- `src/hooks/useGame.ts`
- `src/hooks/useToneScale.ts`
- `src/hooks/useARCTriangle.ts`
- `src/hooks/useScore.ts`
- `src/hooks/useLocalStorage.ts`
- `src/hooks/index.ts`

**Completion Date:** \***\*\_\*\***

---

### 2.7 Implement Utility Functions

- [ ] Export all utilities from `src/utils/index.ts`
- [ ] Create helper functions for formatting
- [ ] Create helper functions for date handling (date-fns)
- [ ] Create helper functions for class names (clsx + tailwind-merge)
- [ ] Add comprehensive tests

**Files to Create:**

- `src/utils/index.ts` (updated)

**Completion Date:** \***\*\_\*\***

---

## Phase 2 Summary

**Total Tasks:** 7
**Completed:** 0 / 7
**Percentage:** 0%

**Start Date:** 2026-03-02
**Expected Completion:** 2026-03-08 (Week 2)
**Actual Completion:** TBD

**Status:** Not Started

---

## Phase 3: Pages & Routing (Week 3)

**Goal:** Build all application pages and navigation.

### 3.1 Set up React Router with Protected Routes

- [ ] Install React Router v6
- [ ] Configure routes in `src/App.tsx`
- [ ] Set up protected route wrapper
- [ ] Configure route parameters
- [ ] Test navigation flow

**Files to Create:**

- `src/App.tsx` (updated)
- `src/components/layout/ProtectedRoute.tsx`

**Completion Date:** \***\*\_\*\***

---

### 3.2 Create Home Page (landing, tutorial, start game)

- [ ] Create `src/pages/Home.tsx`
- [ ] Design landing page with project overview
- [ ] Add "Start Tutorial" button
- [ ] Add "Start Game" button
- [ ] Show featured scenarios
- [ ] Test responsive design

**Files to Create:**

- `src/pages/Home.tsx`
- `TESTS/pages/Home.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 3.3 Build Game Page with Full Gameplay Flow

- [ ] Create `src/pages/Game.tsx`
- [ ] Integrate all game components (ToneGauge, ARCTriangle, ScenarioCard, ScoreBoard)
- [ ] Implement scenario loading logic
- [ ] Implement response selection flow
- [ ] Implement feedback display
- [ ] Test complete game loop

**Files to Create:**

- `src/pages/Game.tsx`
- `TESTS/pages/Game.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 3.4 Create Learn Page for Framework Reference Library

- [ ] Create `src/pages/Learn.tsx`
- [ ] Display ARC Triangle reference
- [ ] Display Tone Scale reference
- [ ] Display EQ frameworks reference
- [ ] Add search/filter functionality
- [ ] Test navigation between sections

**Files to Create:**

- `src/pages/Learn.tsx`
- `TESTS/pages/Learn.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 3.5 Build Progress Page (stats, achievements, tone history)

- [ ] Create `src/pages/Progress.tsx`
- [ ] Display player statistics
- [ ] Show scenarios completed
- [ ] Display tone history chart (recharts)
- [ ] Show EQ component progress
- [ ] Test with player data

**Files to Create:**

- `src/pages/Progress.tsx`
- `TESTS/pages/Progress.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 3.6 Add Settings Page (difficulty, animations, sound)

- [ ] Create `src/pages/Settings.tsx`
- [ ] Configure difficulty level selector
- [ ] Toggle animations on/off
- [ ] Toggle sound on/off
- [ ] Toggle tutorial on/off
- [ ] Add reset progress button
- [ ] Test settings persistence

**Files to Create:**

- `src/pages/Settings.tsx`
- `TESTS/pages/Settings.test.ts`

**Completion Date:** \***\*\_\*\***

---

### 3.7 Implement Layout Component

- [ ] Create `src/components/layout/Header.tsx`
- [ ] Create `src/components/layout/Sidebar.tsx`
- [ ] Create `src/components/layout/MainLayout.tsx`
- [ ] Implement responsive navigation
- [ ] Add mobile bottom tab navigation
- [ ] Test layout across breakpoints

**Files to Create:**

- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/index.ts`

**Completion Date:** \***\*\_\*\***

---

## Phase 3 Summary

**Total Tasks:** 7
**Completed:** 0 / 7
**Percentage:** 0%

**Start Date:** 2026-03-09
**Expected Completion:** 2026-03-15 (Week 3)
**Actual Completion:** TBD

**Status:** Not Started

---

## Phase 4: Content Integration (Week 4)

**Goal:** Integrate all scenarios and polish the application.

### 4.1 Add All 9 Scenarios to data/scenarios/ Directory

- [ ] Create `src/data/scenarios/workplace.ts` (3 scenarios)
- [ ] Create `src/data/scenarios/family.ts` (2 scenarios)
- [ ] Create `src/data/scenarios/friends.ts` (2 scenarios)
- [ ] Create `src/data/scenarios/general.ts` (2 scenarios)
- [ ] Create `src/data/scenarios/index.ts` with exports
- [ ] Verify all scenarios match tone-navigator-scenarios.md
- [ ] Test scenario loading

**Files to Create:**

- `src/data/scenarios/workplace.ts`
- `src/data/scenarios/family.ts`
- `src/data/scenarios/friends.ts`
- `src/data/scenarios/general.ts`
- `src/data/scenarios/index.ts`

**Completion Date:** \***\*\_\*\***

---

### 4.2 Create frameworks.ts with Tone Scale and ARC Data

- [ ] Create `src/data/frameworks.ts`
- [ ] Add complete Tone Scale data (-40 to +40)
- [ ] Add key levels reference
- [ ] Add ARC component definitions
- [ ] Add EQ framework definitions
- [ ] Test data structure

**Files to Create:**

- `src/data/frameworks.ts`

**Completion Date:** \***\*\_\*\***

---

### 4.3 Implement Responsive Design (desktop + mobile bottom tabs)

- [ ] Update all pages for mobile responsiveness
- [ ] Implement bottom tab navigation for mobile
- [ ] Test on various screen sizes
- [ ] Fix any layout issues
- [ ] Add touch-friendly UI elements

**Files Modified:**

- All page components
- All layout components

**Completion Date:** \***\*\_\*\***

---

### 4.4 Add Framer Motion Animations Throughout

- [ ] Add animations to ToneGauge
- [ ] Add animations to ARCTriangle
- [ ] Add animations to ScenarioCard transitions
- [ ] Add animations to FeedbackModal
- [ ] Add page transition animations
- [ ] Test animations across browsers

**Files Modified:**

- All game components
- All page components

**Completion Date:** \***\*\_\*\***

---

### 4.5 Write Unit Tests for Components and Utilities

- [ ] Write tests for all components (in TESTS/ directory)
- [ ] Write tests for all hooks
- [ ] Write tests for all utilities
- [ ] Achieve >80% code coverage
- [ ] Fix any failing tests

**Files to Create:**

- All test files in `TESTS/` directory mirroring src/ structure

**Completion Date:** \***\*\_\*\***

---

### 4.6 Conduct Accessibility Audit and Fixes (WCAG 2.1 AA)

- [ ] Run accessibility audit (axe, Lighthouse)
- [ ] Fix contrast issues
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Document accessibility features

**Files Modified:**

- All components and pages

**Completion Date:** \***\*\_\*\***

---

### 4.7 Add "Why This Response?" Educational Explanations to Feedback

- [ ] Update FeedbackModal to include detailed explanations
- [ ] Add learning points to each response
- [ ] Link to relevant documentation
- [ ] Test educational content accuracy
- [ ] Ensure explanations are clear and helpful

**Files Modified:**

- `src/components/game/FeedbackModal.tsx`

**Completion Date:** \***\*\_\*\***

---

## Phase 4 Summary

**Total Tasks:** 7
**Completed:** 0 / 7
**Percentage:** 0%

**Start Date:** 2026-03-16
**Expected Completion:** 2026-03-22 (Week 4)
**Actual Completion:** TBD

**Status:** Not Started

---

## Phase 5: Polish & Deployment (Week 5)

**Goal:** Finalize and deploy the application.

### 5.1 Build Optimization (code splitting, lazy loading)

- [ ] Implement code splitting with React.lazy()
- [ ] Lazy load page components
- [ ] Optimize bundle size
- [ ] Add loading indicators for lazy components
- [ ] Test build performance

**Files Modified:**

- `src/App.tsx`
- All page imports

**Completion Date:** \***\*\_\*\***

---

### 5.2 Final Testing Across Browsers and Devices

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Fix any browser-specific issues
- [ ] Document known issues

**Completion Date:** \***\*\_\*\***

---

### 5.3 Bug Fixes and Performance Improvements

- [ ] Address all reported bugs
- [ ] Optimize performance (memo, useMemo, useCallback)
- [ ] Fix memory leaks
- [ ] Improve load times
- [ ] Test performance metrics

**Completion Date:** \***\*\_\*\***

---

### 5.4 Deploy to Vercel/Netlify

- [ ] Configure deployment settings
- [ ] Set up environment variables
- [ ] Deploy to staging environment
- [ ] Test staging deployment
- [ ] Deploy to production
- [ ] Verify production deployment

**Completion Date:** \***\*\_\*\***

---

### 5.5 Set Up Analytics (Optional)

- [ ] Choose analytics platform (Google Analytics, Plausible, etc.)
- [ ] Add analytics tracking code
- [ ] Configure privacy settings
- [ ] Set up basic dashboards
- [ ] Test analytics tracking

**Completion Date:** \***\*\_\*\***

---

### 5.6 Commit All Changes to GitHub Repository

- [ ] Commit all code changes
- [ ] Write comprehensive commit messages
- [ ] Push to main branch
- [ ] Create release tag
- [ ] Update README with deployment link
- [ ] Document deployment process

**Completion Date:** \***\*\_\*\***

---

## Phase 5 Summary

**Total Tasks:** 6
**Completed:** 0 / 6
**Percentage:** 0%

**Start Date:** 2026-03-23
**Expected Completion:** 2026-03-29 (Week 5)
**Actual Completion:** TBD

**Status:** Not Started

---

## Phase 6: Documentation Improvements (Week 6)

**Goal:** Address audit findings and improve documentation quality.

### 6.1 Add Terminology Glossary Component

- [ ] Create `src/components/learn/Glossary.tsx`
- [ ] Map all terms between Scientology, EQ, and project terminology
- [ ] Include Appreciation/Affinity terminology mapping
- [ ] Add searchable glossary functionality
- [ ] Link glossary terms throughout the application

**Files to Create:**

- `src/components/learn/Glossary.tsx`
- `src/data/glossary.ts`
- `TESTS/components/learn/Glossary.test.ts`

**Completion Date:** **\*\_\_**

---

### 6.2 Add Historical Context Notes to Tone Scale

- [ ] Add note explaining "+15.0 Gay" historical meaning (1950s usage)
- [ ] Add explanation for "Bodies" terminology in negative tone levels
- [ ] Add cultural context note for tone scale interpretations
- [ ] Update Tone Scale documentation with disclaimers

**Files Modified:**

- `src/data/frameworks.ts`
- `LEARN-DOCS/TONE-SCALE/full-scale.md`
- `LEARN-DOCS/TONE-SCALE/key-levels.md`

**Completion Date:** **\*\_\_**

---

### 6.3 Add Chronic Tone Level Definition

- [ ] Define "Chronic Tone Level" concept in documentation
- [ ] Add chronic tone level assessment to self-assessment tools
- [ ] Include explanation in Learn page
- [ ] Add visual indicator for chronic vs current tone

**Files to Create:**

- `src/components/learn/ChronicToneIndicator.tsx`
- `LEARN-DOCS/TONE-SCALE/chronic-tone-level.md`

**Completion Date:** **\*\_\_**

---

### 6.4 Add Professional Help Disclaimers

- [ ] Add stronger disclaimers for severe tone levels (below -10.0)
- [ ] Include resources for professional help
- [ ] Add modal with help resources for critical scenarios
- [ ] Ensure all EQ/trauma content has appropriate disclaimers

**Files to Create:**

- `src/components/common/HelpResourcesModal.tsx`
- `LEARN-DOCS/PRACTICAL-APPLICATIONS/professional-help.md`

**Completion Date:** **\*\_\_**

---

### 6.5 Standardize Cross-Reference Links

- [ ] Audit all internal links for consistency
- [ ] Standardize path format (relative vs absolute)
- [ ] Fix any broken links
- [ ] Add link checking to CI pipeline

**Files Modified:**

- All LEARN-DOCS files with cross-references

**Completion Date:** **\*\_\_**

---

### 6.6 Add EQ Model Differentiation Section

- [ ] Add section explaining historical development of EQ models
- [ ] Explain unique contributions of each model (Goleman, Six Seconds, Freedman-Fariselli)
- [ ] Add comparison table with model-specific features
- [ ] Include visual indicators to distinguish ARC Trauma from ARC Triangle

**Files to Create:**

- `src/components/learn/EQModelComparison.tsx`
- `LEARN-DOCS/EMOTIONAL-INTELLIGENCE/model-comparison.md`

**Completion Date:** **\*\_\_**

---

## Phase 6 Summary

**Total Tasks:** 6
**Completed:** 0 / 6
**Percentage:** 0%

**Start Date:** 2026-03-30
**Expected Completion:** 2026-04-05 (Week 6)
**Actual Completion:** TBD

**Status:** Not Started

**Notes:** Phase 6 addresses findings from AUDIT-2026-02-25.md

---

## Overall Project Summary

**Total Phases:** 6
**Total Tasks:** 41

**Overall Progress:** 8 / 41 completed (20%)

| Phase                               | Tasks | Completed | Percentage | Status         |
| ----------------------------------- | ----- | --------- | ---------- | -------------- |
| Phase 1: Project Setup              | 8     | 8         | 100%       | ✅ Complete    |
| Phase 2: Core Game Engine           | 7     | 0         | 0%         | ⏳ Not Started |
| Phase 3: Pages & Routing            | 7     | 0         | 0%         | ⏳ Not Started |
| Phase 4: Content Integration        | 7     | 0         | 0%         | ⏳ Not Started |
| Phase 5: Polish & Deployment        | 6     | 0         | 0%         | ⏳ Not Started |
| Phase 6: Documentation Improvements | 6     | 0         | 0%         | ⏳ Not Started |

**Project Start Date:** 2026-02-25
**Expected Completion:** 2026-04-05
**Actual Completion:** TBD

---

## Notes

- Update completion dates as you progress
- Mark tasks with [x] when complete
- Add notes in the "Notes" section below each task if needed
- Keep this document updated for reference

---

_Last updated: 2026-02-25 (Updated with Phase 1 completion and Phase 6 added)_
