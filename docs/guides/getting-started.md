# Getting Started Guide

Welcome to the ARC, Tone Scale & EQ Learning Project! This guide will help you get up and running quickly.

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** v18 or higher installed
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- **Git** for version control (optional)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LEARN
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

---

## Project Structure Overview

```
LEARN/
├── README.md                          # Project overview
├── GLOSSARY.md                        # Terminology reference
├── STUDY-GUIDE.md                     # Learning path
├── AGENTS.md                          # AI assistant rules
├── docs/                              # Project management docs
│   ├── PROJECT-BACKLOG.md             # Task tracking
│   ├── HIGH-LEVEL-DESIGN.md           # Architecture overview
│   ├── CHANGELOG.md                   # Version history
│   ├── ARCHITECTURE-DECISION-LOG.md   # ADRs
│   ├── DEPLOYMENT.md                  # Deployment guide
│   ├── CONTRIBUTING.md                # Contributing guide
│   ├── architecture/                  # Detailed architecture
│   ├── guides/                        # User guides
│   └── references/                    # Reference materials
├── LEARN-DOCS/                        # Learning content
│   ├── ARC-TRIANGLE/
│   ├── TONE-SCALE/
│   ├── EMOTIONAL-INTELLIGENCE/
│   ├── INTERCONNECTEDNESS/
│   └── PRACTICAL-APPLICATIONS/
└── plans/                             # Planning documents
```

---

## Learning Path

### Recommended Order

1. **Start with the basics**
   - Read [`README.md`](../README.md) for project overview
   - Review [`GLOSSARY.md`](../GLOSSARY.md) for terminology

2. **Explore the frameworks**
   - Start with [`LEARN-DOCS/ARC-TRIANGLE/README.md`](../LEARN-DOCS/ARC-TRIANGLE/README.md)
   - Move to [`LEARN-DOCS/TONE-SCALE/README.md`](../LEARN-DOCS/TONE-SCALE/README.md)
   - Finish with [`LEARN-DOCS/EMOTIONAL-INTELLIGENCE/README.md`](../LEARN-DOCS/EMOTIONAL-INTELLIGENCE/README.md)

3. **Understand connections**
   - Review [`LEARN-DOCS/INTERCONNECTEDNESS/README.md`](../LEARN-DOCS/INTERCONNECTEDNESS/README.md)
   - Explore practical applications in [`LEARN-DOCS/PRACTICAL-APPLICATIONS/`](../LEARN-DOCS/PRACTICAL-APPLICATIONS/)

4. **Follow the study guide**
   - Refer to [`STUDY-GUIDE.md`](../STUDY-GUIDE.md) for structured learning

---

## Development Setup

### IDE Recommendations

- **VS Code** with TypeScript and ESLint extensions
- **WebStorm** with React and TypeScript support
- Any editor with TypeScript support

### Useful Extensions

- ESLint
- Prettier
- TypeScript Official
- GitLens

### Environment Variables

Create a `.env` file in the root:

```env
VITE_APP_NAME=ARC Tone Scale EQ Learning
VITE_APP_VERSION=1.0.0
```

---

## Available Scripts

| Script               | Description                  |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start development server     |
| `npm run build`      | Build for production         |
| `npm run preview`    | Preview production build     |
| `npm run lint`       | Run ESLint                   |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test`       | Run tests                    |

---

## Common Tasks

### Adding New Learning Content

1. Create a new file in the appropriate `LEARN-DOCS/` subdirectory
2. Follow the existing documentation format
3. Update the parent README with links to new content
4. Test by running the development server

### Updating Documentation

1. Edit the relevant file in `docs/` or `LEARN-DOCS/`
2. Ensure Australian English spelling
3. Update the "Last updated" date
4. Commit with clear message

### Tracking Tasks

1. Open `docs/PROJECT-BACKLOG.md`
2. Add new items to the appropriate priority section
3. Update status as work progresses
4. Link to related documentation

---

## Troubleshooting

### Development Server Not Starting

```bash
# Check port availability
lsof -i :5173

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for errors
npm run type-check

# Fix errors and rebuild
npm run build
```

### Build Fails

```bash
# Check for linting errors
npm run lint

# Clear cache
rm -rf dist
npm run build
```

---

## Getting Help

- Check [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines
- Review [`AGENTS.md`](../AGENTS.md) for AI assistant rules
- Read [`STUDY-GUIDE.md`](../STUDY-GUIDE.md) for learning path details

---

_Last updated: 2026-02-25_
