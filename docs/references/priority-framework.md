# Priority Framework Reference

This document defines the priority framework used throughout the project for task tracking and prioritisation.

---

## Priority Levels

### P1 - High Priority

**Definition:** Critical items that must be completed to proceed with core functionality.

**Characteristics:**

- Blocks other work
- Critical for project success
- Security or stability issues
- Core functionality gaps

**Examples:**

- Bug fixes that block development
- Security vulnerabilities
- Core feature implementation
- Breaking changes that must be fixed

**Action:** Address immediately, typically in current sprint/iteration

---

### P2 - Medium Priority

**Definition:** Important items that enhance the project but are not blocking.

**Characteristics:**

- Improves user experience
- Enhances existing features
- Nice-to-have functionality
- Refactoring opportunities

**Examples:**

- UI improvements
- Performance enhancements
- Additional scenarios
- Code quality improvements

**Action:** Schedule for upcoming sprint/iteration

---

### P3 - Low Priority

**Definition:** Nice-to-have items for future enhancement.

**Characteristics:**

- Future enhancements
- Long-term vision items
- Optional features
- Cosmetic improvements

**Examples:**

- Additional learning content
- Future feature ideas
- Documentation improvements
- Aesthetic enhancements

**Action:** Add to backlog for future consideration

---

## Status Tracking

### Backlog

**Definition:** Items that are planned but not yet started.

**When to use:**

- New feature ideas
- Tasks identified but not prioritised
- Future enhancement requests

**Action:** Review during planning sessions

---

### In Progress

**Definition:** Items currently being worked on.

**When to use:**

- Active development
- In review
- Testing phase

**Action:** Update regularly, complete when done

---

### Review

**Definition:** Items ready for review or testing.

**When to use:**

- Code complete, awaiting review
- Feature ready for QA
- Documentation ready for approval

**Action:** Request review, address feedback

---

### Done

**Definition:** Items that are complete and verified.

**When to use:**

- Feature implemented and tested
- Bug fixed and verified
- Documentation approved

**Action:** Mark as complete, celebrate!

---

## Priority Assignment Guidelines

### When to Assign P1

- The item blocks other critical work
- It's a security or stability issue
- It's a core feature required for launch
- It affects all users

### When to Assign P2

- The item improves the experience but isn't blocking
- It's a nice-to-have feature
- It's a refactoring that improves code quality
- It's a bug affecting some users

### When to Assign P3

- The item is a future enhancement
- It's a nice-to-have improvement
- It's a long-term vision item
- It's optional functionality

---

## Priority Review

### Regular Review Schedule

- **Weekly:** Review P1 items for progress
- **Monthly:** Review P2 items for scheduling
- **Quarterly:** Review P3 items for prioritisation

### Priority Adjustment

Priorities can change based on:

- User feedback
- Business needs
- Technical discoveries
- Resource availability

---

## Example Backlog Entries

### P1 Example

```markdown
### TODO-001: Fix critical bug in tone calculation

**Priority:** P1  
**Status:** In Progress  
**Description:** Tone calculation produces incorrect values at edge cases  
**Related:** [`tone-navigator-scenarios.md`](../plans/tone-navigator-scenarios.md)  
**Notes:** Affects scenario scoring accuracy
```

### P2 Example

```markdown
### TODO-002: Add more workplace scenarios

**Priority:** P2  
**Status:** Backlog  
**Description:** Expand workplace scenario library  
**Related:** [`tone-navigator-scenarios.md`](../plans/tone-navigator-scenarios.md)  
**Notes:** Target 15 scenarios total
```

### P3 Example

```markdown
### TODO-003: Implement dark mode

**Priority:** P3  
**Status:** Backlog  
**Description:** Add dark mode theme option  
**Related:** [`tone-navigator-ui-ux.md`](../plans/tone-navigator-ui-ux.md)  
**Notes:** User request, not blocking
```

---

## Maintenance

### Updating This Document

- Review quarterly for clarity
- Update examples as needed
- Add new priority levels if required

### Best Practices

1. Be consistent in priority assignment
2. Review priorities regularly
3. Communicate priority changes clearly
4. Document reasoning for priority decisions

---

_Last updated: 2026-02-25_
