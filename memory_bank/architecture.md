# memory_bank/architecture.md

**System Architecture**:

**State Management**: Zustand stores for game state, progress, and UI state

**Component Hierarchy**:

- MainLayout → Header, Sidebar, ProtectedRoute
- Game Page → ScenarioCard, ARCTriangle, ToneGauge, ScoreBoard

**Routing**: React Router (implied from pages)

**Data Flow**:

- User actions → Hooks → Store updates → UI re-renders

**Testing Strategy**:

- Component tests in TESTS/components/
- Hook tests in TESTS/hooks/
- Utility tests in TESTS/utils/
