# Tests Directory

This directory contains all test files for the ARC, Tone Scale & EQ Learning Project.

---

## Structure

The TESTS directory mirrors the `src/` directory structure. All tests for source files should be placed in the corresponding subdirectory.

```
TESTS/
├── components/          # Tests for src/components/
├── engine/              # Tests for src/engine/
├── store/               # Tests for src/store/
├── utils/               # Tests for src/utils/
├── types/               # Tests for src/types/
└── App.test.ts          # Tests for src/App.tsx
```

---

## Naming Convention

Test files should follow this naming pattern:

- **For source files:** `filename.test.ts` or `filename.spec.ts`
- **Example:** `tone-gauge.tsx` → `tone-gauge.test.ts`

---

## Test File Location Examples

### Example 1: Component Test

```
src/
└── components/
    └── tone-gauge.tsx

TESTS/
└── components/
    └── tone-gauge.test.ts
```

### Example 2: Utility Function Test

```
src/
└── utils/
    └── tone-calculator.ts

TESTS/
└── utils/
    └── tone-calculator.test.ts
```

### Example 3: Store Test

```
src/
└── store/
    └── game-state.ts

TESTS/
└── store/
    └── game-state.test.ts
```

---

## Testing Framework

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing
- **TypeScript** - Type-safe tests

---

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import { ToneGauge } from '../src/components/tone-gauge';

describe('ToneGauge', () => {
  it('renders correctly', () => {
    render(<ToneGauge toneLevel={10} />);
    expect(screen.getByText(/Tone Scale/i)).toBeInTheDocument();
  });
});
```

### Utility Function Tests

```typescript
import { calculateTone } from "../src/utils/tone-calculator";

describe("calculateTone", () => {
  it("returns correct value for valid input", () => {
    expect(calculateTone(10)).toBe(10);
  });

  it("handles edge cases", () => {
    expect(calculateTone(-40)).toBe(-40);
    expect(calculateTone(40)).toBe(40);
  });
});
```

---

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## Test Coverage Goals

- **Components:** >80% coverage
- **Utilities:** >90% coverage
- **Store:** >85% coverage

---

_Last updated: 2026-02-25_
