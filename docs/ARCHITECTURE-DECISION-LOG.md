# Architecture Decision Log

This document records significant architectural decisions made during the development of the ARC, Tone Scale & EQ Learning Project.

---

## Decision Record Format

Each decision is recorded with:

- **Title**: Short descriptive name
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Date**: When the decision was made
- **Context**: The problem or opportunity being addressed
- **Decision**: The chosen approach
- **Consequences**: Positive and negative outcomes

---

## ADR-001: Project Structure Organisation

**Status:** Accepted  
**Date:** 2026-02-25  
**Author:** Roo Code

### Context

The project needed a clear structure for organising learning content, planning documents, and project management artifacts. The existing structure had learning content in `LEARN-DOCS/` and plans in `plans/`, but lacked a dedicated location for project management documentation.

### Decision

Create a new `docs/` directory at the root level to house all project management documentation:

- `PROJECT-BACKLOG.md` - Task tracking with priorities
- `HIGH-LEVEL-DESIGN.md` - Architecture overview
- `CHANGELOG.md` - Version history
- `ARCHITECTURE-DECISION-LOG.md` - ADRs
- `DEPLOYMENT.md` - Setup and deployment guide
- `CONTRIBUTING.md` - Contribution guidelines
- Subdirectories for organised documentation

### Consequences

**Positive:**

- Clear separation between learning content and project management
- Easier to find and maintain documentation
- Scalable structure for future additions
- Consistent with common open-source project patterns

**Negative:**

- Additional directory level to navigate
- Requires team awareness of new structure

---

## ADR-002: Priority Tracking System

**Status:** Accepted  
**Date:** 2026-02-25  
**Author:** Roo Code

### Context

The project needed a systematic way to track tasks and features with clear priority levels to help focus on what matters most.

### Decision

Implement a three-tier priority system:

- **P1 (High)** - Critical, must-do items that block progress
- **P2 (Medium)** - Important, should-do items that enhance the project
- **P3 (Low)** - Nice-to-have, could-do items for future enhancement

Combined with status tracking:

- **Backlog** - Planned but not started
- **In Progress** - Currently being worked on
- **Review** - Ready for review or testing
- **Done** - Completed and verified

### Consequences

**Positive:**

- Clear prioritisation framework for all tasks
- Easy to communicate importance to team members
- Flexible enough for different project phases
- Simple to implement in markdown format

**Negative:**

- Requires regular review to maintain accuracy
- May need adjustment as project evolves

---

## ADR-003: Documentation Location Strategy

**Status:** Accepted  
**Date:** 2026-02-25  
**Author:** Roo Code

### Context

Deciding where to store various types of documentation to maintain clarity and avoid confusion.

### Decision

| Document Type         | Location             | Rationale                           |
| --------------------- | -------------------- | ----------------------------------- |
| Core learning content | `LEARN-DOCS/`        | Dedicated to educational material   |
| Planning documents    | `plans/`             | Existing location, well-established |
| Project management    | `docs/`              | Centralised, easy to find           |
| Architecture details  | `docs/architecture/` | Organised subdirectory              |
| User guides           | `docs/guides/`       | Separate from technical docs        |
| Reference materials   | `docs/references/`   | Quick lookup location               |

### Consequences

**Positive:**

- Logical organisation by purpose
- Easy to locate specific document types
- Scalable for future additions
- Clear separation of concerns

**Negative:**

- Multiple directories to navigate
- Requires documentation of structure

---

## ADR-004: Australian English Convention

**Status:** Accepted  
**Date:** 2026-02-25  
**Author:** Roo Code

### Context

The project has a specific requirement for Australian English spelling and conventions.

### Decision

All documentation and communication must use Australian English:

- organisation (not organization)
- colour (not color)
- favour (not favor)
- analyse (not analyze)
- centre (not center)

### Consequences

**Positive:**

- Consistent with project requirements
- Clear expectation for all contributors
- Aligns with user preferences

**Negative:**

- May require attention from international contributors
- Needs consistent enforcement

---

## Future Decisions

Decisions that may need to be made in the future:

1. **Technology Stack Decisions** - When implementing the Tone Navigator application
2. **API Design Decisions** - If external APIs are needed
3. **Database Decisions** - If persistent storage beyond local storage is required
4. **Testing Strategy Decisions** - When implementing test coverage

---

_Last updated: 2026-02-25_
