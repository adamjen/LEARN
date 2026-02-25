# memory_bank/tech-context.md

**Current Implementation Status**:

**LLM Server**: llama.cpp updated to latest master branch (Feb 2026) enabling Flash Attention 2.0 and stable CUDA graphs, resulting in ~38 TPS at 50k context.

**Optimisation**: Removed tool-definition redundancy from active prompt to reduce VRAM overhead and improve reasoning speed.

**Components**:

- `src/components/common/` - Button, Card, Modal
- `src/components/game/` - ARCTriangle, ToneGauge, ScoreBoard, ScenarioCard
- `src/components/layout/` - Header, MainLayout, Sidebar, ProtectedRoute
- `src/components/ui/` - Reusable UI components

**Hooks**:

- `src/hooks/` - useARCTriangle, useGame, useLocalStorage, useScore, useToneScale

**Pages**:

- `src/pages/` - Home, Learn, Game, Progress, Settings

**Store**:

- `src/store/` - gameStore, progressStore, uiStore

**Utils**:

- `src/utils/` - arcCalculator, scoring, toneScale

**Tests**:

- `TESTS/` - Mirrors `src/` structure

**Documentation**:

- `LEARN-DOCS/` - Learning content
- `docs/` - Technical documentation
- `plans/` - Implementation plans
