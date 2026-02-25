# memory_bank/ - Project Context Store

**Purpose**: Persistent project context for AI agents across sessions

**How It Works**:

- This directory stores project-specific context that should be retained between sessions
- Agents can read these files to maintain consistent understanding of the project
- Changes to this content are tracked in version control

**File Structure**:

- `project-brief.md` - Core project description, concepts, and guidelines
- `tech-context.md` - Current implementation status and file locations
- `architecture.md` - System architecture and design patterns

**Maintenance**:

- Update these files when project scope, structure, or architecture changes
- Keep content accurate and current
- Reference these files in planning phases for consistent context

**Related**:

- [`.clinerules`](../.clinerules) - Quality standards and workflow protocols
- [`AGENTS.md`](../AGENTS.md) - Active system prompt
