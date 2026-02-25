# Source Code Directory

This directory contains the main source code for the ARC, Tone Scale & EQ Learning Project.

---

## Structure

```
src/
├── components/          # React components
├── engine/              # Game engine logic
├── store/               # Zustand state management
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

---

## Naming Conventions

- **File names:** lowercase-with-dashes (e.g., `tone-gauge.tsx`)
- **Component names:** PascalCase (e.g., `ToneGauge`)
- **Utility functions:** camelCase (e.g., `calculateTone`)
- **Type definitions:** PascalCase with clear descriptive names

---

## Testing

All tests for source files should be placed in the `TESTS/` directory, mirroring the source structure.

**Example:**

```
src/
└── components/
    └── tone-gauge.tsx

TESTS/
└── components/
    └── tone-gauge.test.ts
```

---

_Last updated: 2026-02-25_
