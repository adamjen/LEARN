# AGENTS.md - Roo Code Rules for ARC, Tone Scale & EQ Learning Project

This file contains the rules and guidelines for using Roo Code AI assistant in this learning project.

---

## Language Preference

**Australian English**: All documentation and communication must use Australian English spelling and conventions (e.g., "organisation", "colour", "favour", "analyse", "centre").

---

## Project Overview

This project is a learning resource covering:

- **ARC Triangle** (Appreciation, Reality, Communication) - Framework for human interaction
- **Tone Scale** - L. Ron Hubbard's emotional gradient scale (-40 to +40)
- **Emotional Intelligence (EQ)** - Multiple frameworks (Goleman, Six Seconds, etc.)

---

## Core Principles

### Content Accuracy

- Always acknowledge historical context when discussing Scientology frameworks (L. Ron Hubbard, 1950s)
- Use "Appreciation" terminology (not "Affinity") - this is the project convention
- Maintain accuracy when referencing tone levels (-40 to +40 scale)
- Clearly distinguish between different EQ models

### Tone and Style

- Educational, clear, and accessible
- Neutral/objective when discussing frameworks
- Structured with consistent formatting (headers, lists, tables)
- Include cross-references to related documentation

### Documentation Standards

- All documentation in Markdown format
- Reference specific line numbers when discussing content
- Link to related documents using relative paths
- Align terminology with GLOSSARY.md

---

## Mode-Specific Rules

### 🏗️ Architect Mode

**Purpose**: Planning, design, strategic documentation

**Rules**:

1. Create detailed, structured plans with clear phases and milestones
2. Use Mermaid diagrams for architecture and workflow visualization
3. Include todo lists with specific, actionable items
4. Document assumptions and constraints clearly
5. Reference existing documentation for consistency
6. **Do not implement code** - focus on planning only

**Output**: Markdown files in `plans/` directory with Mermaid diagrams

### 💻 Code Mode

**Purpose**: Implementation, file creation, modifications

**Rules**:

1. Follow existing project structure and conventions
2. Use TypeScript for any code files
3. Include comprehensive comments and documentation
4. Test changes before committing
5. Maintain consistency with GLOSSARY.md terminology
6. Reference related documentation in code comments
7. **Commit to GitHub after task completion** - Ensure all changes are committed to the repository
8. **Place tests in TESTS folder** - All test files must be placed in the TESTS directory, mirroring the src/ structure (e.g., src/components/tone-gauge.tsx → TESTS/components/tone-gauge.test.ts)

**File Naming**: Descriptive, lowercase-with-dashes (e.g., `tone-scale-mapper.ts`)

### ❓ Ask Mode

**Purpose**: Research, explanation, clarification

**Rules**:

1. Provide well-researched, sourced information
2. Use MCP tools (Context7, Tavily) for current information
3. Distinguish between established facts and interpretations
4. Reference original sources when discussing frameworks
5. Clarify terminology and concepts clearly

### 🪲 Debug Mode

**Purpose**: Troubleshooting, error resolution

**Rules**:

1. Systematically analyse errors before proposing fixes
2. Include logging or diagnostic information
3. Test fixes thoroughly
4. Document root causes and solutions
5. Update documentation if fixes affect understanding

### 🪃 Orchestrator Mode

**Purpose**: Complex, multi-step projects

**Rules**:

1. Break down tasks into clear subtasks
2. Coordinate across different modes as needed
3. Maintain project-wide consistency
4. Track progress with todo lists
5. Ensure all phases connect logically

---

## Content Guidelines

### ARC Triangle Documentation

- Always explain interdependence of A/R/C elements
- Use Appreciation terminology (not Affinity)
- Include visual representations (diagrams)
- Connect to Tone Scale and EQ frameworks

### Tone Scale Documentation

- Maintain accurate tone level references (-40 to +40)
- Explain historical context (1950s terminology)
- Distinguish emotional tones (above 0) from mental concepts (below 0)
- Include practical application examples

**Key Levels**:

- +40.0: Serenity of Beingness
- +30.0: Ecstatic
- +15.0: Gay (historical: cheerful)
- +10.0: Cheerful
- +4.0: Enthusiasm
- +2.0: Antagonism
- +1.5: Anger
- +1.0: Fear
- +0.5: Grief
- 0.0: Body Death (neutral point)
- -40.0: Total Failure

### Emotional Intelligence Documentation

- Clearly distinguish between different EQ models
- Explain historical development and context
- Show connections to ARC and Tone Scale
- Include practical application examples

**EQ Models**:

1. Goleman Model (5 components)
2. Six Seconds Model (3 pursuits)
3. Freedman-Fariselli Model (8 competencies)
4. ARC Trauma Model (Attachment, Regulation, Competency)

---

## Best Practices

### Planning Phase

1. Research first using Context7 and Tavily MCP
2. Document assumptions clearly
3. Create todo lists with specific items
4. Use Mermaid diagrams for complex workflows
5. Reference existing documentation

### Implementation Phase

1. Follow existing project structure
2. Test incrementally with small changes
3. Document all changes
4. Maintain terminology consistency
5. Review before finalising

### Review Phase

1. Verify factual accuracy
2. Check consistency with existing docs
3. Test functionality
4. Update glossary if needed
5. Document lessons learned

---

## Security and Ethics

### Content Sensitivity

- Acknowledge controversial nature of some frameworks
- Include disclaimers for EQ and trauma-related content
- Emphasise educational purpose, not therapy

### Best Practices

- No medical advice - state content is not professional advice
- Encourage consulting qualified professionals
- Respect diverse viewpoints
- Cite original sources

---

## File Organisation

### Documentation Files

- **Location**: `LEARN-DOCS/[CATEGORY]/`
- **Format**: Markdown (.md)
- **Naming**: Descriptive, lowercase-with-dashes

### Plan Files

- **Location**: `plans/`
- **Format**: Markdown (.md)
- **Naming**: `[project]-[type].md`

### Code Files (if applicable)

- **Location**: Appropriate subdirectory
- **Format**: TypeScript (.ts, .tsx)
- **Naming**: Descriptive, lowercase-with-dashes

---

## Key Directories Reference

| Directory                            | Purpose                     |
| ------------------------------------ | --------------------------- |
| `LEARN-DOCS/ARC-TRIANGLE/`           | ARC documentation           |
| `LEARN-DOCS/TONE-SCALE/`             | Tone Scale documentation    |
| `LEARN-DOCS/EMOTIONAL-INTELLIGENCE/` | EQ frameworks               |
| `LEARN-DOCS/INTERCONNECTEDNESS/`     | Cross-framework connections |
| `LEARN-DOCS/PRACTICAL-APPLICATIONS/` | Practical usage             |
| `plans/`                             | Planning documents          |

---

## Important Files

- `README.md` - Project overview
- `GLOSSARY.md` - Terminology reference
- `STUDY-GUIDE.md` - Learning path
- `AGENTS.md` - This file (AI rules)

---

## Quick Reference: Key Terminology

| Term          | Meaning                                                    |
| ------------- | ---------------------------------------------------------- |
| Appreciation  | Value/care/regard for others (also "Affinity" in original) |
| Reality       | Shared understanding/truth                                 |
| Communication | Information exchange                                       |
| Tone Scale    | Emotional gradient (-40 to +40)                            |
| EQ            | Emotional Intelligence (multiple models)                   |

---

## Example Prompts

### Planning a New Section

```
Create a detailed plan for adding a new section on "ARC and EQ Integration" to the INTERCONNECTEDNESS documentation. Include key concepts, structure, todo list, and Mermaid diagram.
```

### Researching a Topic

```
Research the ARC Trauma Model and provide historical context, key components, relationship to other EQ frameworks, and sources for further reading.
```

### Creating Documentation

```
Create a new documentation file for "Emotional Regulation Techniques" in the PRACTICAL-APPLICATIONS directory with definition, techniques, connection to Tone Scale, and practical examples.
```

---

_This document is living documentation - update as the project evolves._
