# Contributing Guide

Thank you for your interest in contributing to the ARC, Tone Scale & EQ Learning Project! This document provides guidelines and instructions for contributing.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Documentation Standards](#documentation-standards)
- [Testing](#testing)
- [Questions and Issues](#questions-and-issues)

---

## Code of Conduct

### Australian English

All documentation and communication must use Australian English spelling and conventions:

- organisation (not organization)
- colour (not color)
- favour (not favor)
- analyse (not analyze)
- centre (not center)

### Respectful Collaboration

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what's best for the project and community

---

## Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Locally

```bash
git clone https://github.com/your-username/LEARN.git
cd LEARN
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

---

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions

### Development Steps

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push to your fork
6. Create a Pull Request

---

## Coding Standards

### TypeScript

- Use strict type checking
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes
- Prefer type aliases for unions
- Include JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Follow component composition patterns
- Keep components small and focused
- Use TypeScript for props

### File Naming

- Use lowercase with dashes: `tone-gauge.tsx`
- Descriptive names that reflect purpose
- Consistent naming across the project

### Code Style

- Follow existing code patterns
- Use ESLint and Prettier configurations
- Keep functions focused and single-purpose
- Add comments for complex logic

---

## Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```
feat(game): add tone gauge component with animation

- Implement ToneGauge component
- Add Framer Motion animations
- Include responsive design

Closes #123
```

```
docs(backlog): update priority framework documentation

- Add status tracking section
- Include example backlog items
- Update version history

Refs: docs/PROJECT-BACKLOG.md
```

---

## Pull Request Process

### Before Submitting

1. Ensure your code follows all coding standards
2. Run all tests successfully
3. Update documentation as needed
4. Ensure commit messages are clear
5. Check for any linting errors

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Testing

## Testing

How you tested your changes

## Related Issues

Closes #123
Refs #456
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, your PR will be merged
4. Consider squashing commits on merge

---

## Documentation Standards

### Markdown Format

- Use consistent heading hierarchy
- Include cross-references with relative paths
- Add line numbers when referencing specific content
- Use tables for structured data
- Include Mermaid diagrams for workflows

### Documentation Locations

| Document Type      | Location             |
| ------------------ | -------------------- |
| Learning content   | `LEARN-DOCS/`        |
| Planning docs      | `plans/`             |
| Project management | `docs/`              |
| Architecture       | `docs/architecture/` |
| Guides             | `docs/guides/`       |
| References         | `docs/references/`   |

### Example Documentation

```markdown
## Section Title

Content here.

### Subsection

More detailed content.

**Related:** [`filename.md`](path/to/file)
```

---

## Testing

### Running Tests

```bash
npm test
```

### Test Coverage

- Aim for high coverage on new code
- Test edge cases and error conditions
- Include both unit and integration tests

### Test Naming

```typescript
describe("ComponentName", () => {
  it("should do expected behavior", () => {
    // test code
  });

  it("should handle edge case", () => {
    // test code
  });
});
```

---

## Questions and Issues

### Reporting Issues

When reporting issues, include:

1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behaviour
4. Environment details (OS, browser, version)
5. Screenshots if applicable

### Getting Help

- Check existing documentation first
- Search existing issues
- Create a new issue with clear details
- Be patient - maintainers are volunteers

---

## Additional Resources

- [AGENTS.md](../AGENTS.md) - AI assistant rules
- [README.md](../README.md) - Project overview
- [GLOSSARY.md](../GLOSSARY.md) - Terminology reference
- [STUDY-GUIDE.md](../STUDY-GUIDE.md) - Learning path

---

_Thank you for contributing! This document was last updated on 2026-02-25_
