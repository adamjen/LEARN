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

- [ ] Create project directory structure
- [ ] Initialize package.json with dependencies
- [ ] Configure TypeScript (tsconfig.json)
- [ ] Configure Vite (vite.config.ts)
- [ ] Set up basic folder structure (src/, public/)

**Files to Create:**

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `src/main.tsx`
- `src/index.css`
- `public/index.html`

**Completion Date:** ****\_****

---

### 1.2 Configure Tailwind CSS and shadcn/ui

- [ ] Install and configure Tailwind CSS
- [ ] Set up tailwind.config.js with custom colors
- [ ] Install shadcn/ui components
- [ ] Configure custom color palette (from UI/UX spec)

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

**Completion Date:** ****\_****

---

### 1.3 Set up ESLint + Prettier Configuration

- [ ] Install ESLint and configure rules
- [ ] Install Prettier and configure formatting
- [ ] Set up Husky for pre-commit hooks (optional)
- [ ] Configure VSCode settings for auto-format

**Files to Create:**

- `.eslintrc.json` or `.eslintrc.js`
- `.prettierrc`
- `.editorconfig`

**Completion Date:** ****\_****

---

### 1.4 Create Core Data Structures (ToneScale, ARCState types)

- [ ] Create `src/types/game.ts` with ToneLevel interface
- [ ] Create ARCState interface
- [ ] Create Scenario interface
- [ ] Create ResponseOption interface
- [ ] Create PlayerProgress interface
- [ ] Create GameSettings interface

**Files to Create:**

- `src/types/game.ts`
- `src/types/scenarios.ts`
- `src/types/frameworks.ts`
- `src/types/index.ts`

**Completion Date:** ****\_****

---

### 1.5 Implement Zustand Stores (gameStore, progressStore, uiStore)

- [ ] Install Zustand and persist middleware
- [ ] Create `src/store/gameStore.ts` with game state/actions
- [ ] Create `src/store/progressStore.ts` with player progress
- [ ] Create `src/store/uiStore.ts` with UI state
- [ ] Test persistence with localStorage

**Files to Create:**

- `src/store/gameStore.ts`
- `src/store/progressStore.ts`
- `src/store/uiStore.ts`
- `src/store/index.ts`

**Completion Date:** ****\_****

---

### 1.6 Build ToneGauge Component with Animations

- [ ] Create `src/components/game/ToneGauge.tsx`
- [ ] Implement gradient background (-40 to +40)
- [ ] Add marker indicator with Framer Motion animation
- [ ] Implement size variants (small, medium, large)
- [ ] Add tooltip for tone level name
- [ ] Test with various tone values

**Files to Create:**

- `src/components/game/ToneGauge.tsx`
- `TESTS/components/game/ToneGauge.test.ts`

**Completion Date:** ****\_****

---

### 1.7 Build ARCTriangle Component

- [ ] Create `src/components/game/ARCTriangle.tsx`
- [ ] Implement triangular visualization
- [ ] Show Appreciation, Reality, Communication values
- [ ] Add color coding for each axis
- [ ] Animate value changes
- [ ] Test with various ARC states

**Files to Create:**

- `src/components/game/ARCTriangle.tsx`
- `TESTS/components/game/ARCTriangle.test.ts`

**Completion Date:** ****\_****

---

### 1.8 Create Shared/Common Component Library

- [ ] Create `src/components/common/Button.tsx`
- [ ] Create `src/components/common/Card.tsx`
- [ ] Create `src/components/common/Modal.tsx`
- [ ] Create `src/components/common/index.ts` export file
- [ ] Add tests for each component

**Files to Create:**

- `src/components/common/Button.tsx`
- `src/components/common/Card.tsx`
- `src/components/common/Modal.tsx`
- `src/components/common/index.ts`

**Completion Date:** ****\_****

---

## Phase 1 Summary

**Total Tasks:** 8  
**Completed:** **_ / 8  
**Percentage:** _**%

**Start Date:** 2026-02-25  
**Expected Completion:** 2026-03-01 (Week 1)  
**Actual Completion:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

---

### 2.7 Implement Utility Functions

- [ ] Export all utilities from `src/utils/index.ts`
- [ ] Create helper functions for formatting
- [ ] Create helper functions for date handling (date-fns)
- [ ] Create helper functions for class names (clsx + tailwind-merge)
- [ ] Add comprehensive tests

**Files to Create:**

- `src/utils/index.ts` (updated)

**Completion Date:** ****\_****

---

## Phase 2 Summary

**Total Tasks:** 7  
**Completed:** **_ / 7  
**Percentage:** _**%

**Start Date:** 2026-03-02  
**Expected Completion:** 2026-03-08 (Week 2)  
**Actual Completion:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

---

## Phase 3 Summary

**Total Tasks:** 7  
**Completed:** **_ / 7  
**Percentage:** _**%

**Start Date:** 2026-03-09  
**Expected Completion:** 2026-03-15 (Week 3)  
**Actual Completion:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

---

### 4.5 Write Unit Tests for Components and Utilities

- [ ] Write tests for all components (in TESTS/ directory)
- [ ] Write tests for all hooks
- [ ] Write tests for all utilities
- [ ] Achieve >80% code coverage
- [ ] Fix any failing tests

**Files to Create:**

- All test files in `TESTS/` directory mirroring src/ structure

**Completion Date:** ****\_****

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

**Completion Date:** ****\_****

---

### 4.7 Add "Why This Response?" Educational Explanations to Feedback

- [ ] Update FeedbackModal to include detailed explanations
- [ ] Add learning points to each response
- [ ] Link to relevant documentation
- [ ] Test educational content accuracy
- [ ] Ensure explanations are clear and helpful

**Files Modified:**

- `src/components/game/FeedbackModal.tsx`

**Completion Date:** ****\_****

---

## Phase 4 Summary

**Total Tasks:** 7  
**Completed:** **_ / 7  
**Percentage:** _**%

**Start Date:** 2026-03-16  
**Expected Completion:** 2026-03-22 (Week 4)  
**Actual Completion:** ****\_****

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

**Completion Date:** ****\_****

---

### 5.2 Final Testing Across Browsers and Devices

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Fix any browser-specific issues
- [ ] Document known issues

**Completion Date:** ****\_****

---

### 5.3 Bug Fixes and Performance Improvements

- [ ] Address all reported bugs
- [ ] Optimize performance (memo, useMemo, useCallback)
- [ ] Fix memory leaks
- [ ] Improve load times
- [ ] Test performance metrics

**Completion Date:** ****\_****

---

### 5.4 Deploy to Vercel/Netlify

- [ ] Configure deployment settings
- [ ] Set up environment variables
- [ ] Deploy to staging environment
- [ ] Test staging deployment
- [ ] Deploy to production
- [ ] Verify production deployment

**Completion Date:** ****\_****

---

### 5.5 Set Up Analytics (Optional)

- [ ] Choose analytics platform (Google Analytics, Plausible, etc.)
- [ ] Add analytics tracking code
- [ ] Configure privacy settings
- [ ] Set up basic dashboards
- [ ] Test analytics tracking

**Completion Date:** ****\_****

---

### 5.6 Commit All Changes to GitHub Repository

- [ ] Commit all code changes
- [ ] Write comprehensive commit messages
- [ ] Push to main branch
- [ ] Create release tag
- [ ] Update README with deployment link
- [ ] Document deployment process

**Completion Date:** ****\_****

---

## Phase 5 Summary

**Total Tasks:** 6  
**Completed:** **_ / 6  
**Percentage:** _**%

**Start Date:** 2026-03-23  
**Expected Completion:** 2026-03-29 (Week 5)  
**Actual Completion:** ****\_****

---

## Overall Project Summary

**Total Phases:** 5  
**Total Tasks:** 35

**Overall Progress:** **_ / 35 completed (_**%)

**Project Start Date:** 2026-02-25  
**Expected Completion:** 2026-03-29  
**Actual Completion:** ****\_****

---

## Notes

- Update completion dates as you progress
- Mark tasks with [x] when complete
- Add notes in the "Notes" section below each task if needed
- Keep this document updated for reference

---

_Last updated: 2026-02-25_
