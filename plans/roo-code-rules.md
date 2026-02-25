# Roo Code Rules for ARC, Tone Scale & Emotional Intelligence Learning Project

This document defines the rules and guidelines for using Roo Code (AI coding assistant) in this learning project. These rules ensure consistent, high-quality output across all AI interactions.

---

## 1. Project Overview

### 1.1 Purpose

This project is a learning resource covering:

- **ARC Triangle** (Appreciation, Reality, Communication) - Scientology framework for human interaction
- **Tone Scale** - L. Ron Hubbard's emotional gradient scale (-40 to +40)
- **Emotional Intelligence (EQ)** - Multiple frameworks (Goleman, Six Seconds, Freedman-Fariselli, ARC Trauma Model)

### 1.2 Project Structure

```
LEARN/
├── README.md
├── GLOSSARY.md
├── STUDY-GUIDE.md
├── LEARN-DOCS/
│   ├── ARC-TRIANGLE/
│   │   ├── README.md
│   │   ├── appreciation.md
│   │   ├── reality.md
│   │   ├── communication.md
│   │   └── arc-triangle-diagram.md
│   ├── TONE-SCALE/
│   │   ├── README.md
│   │   ├── full-scale.md
│   │   ├── key-levels.md
│   │   └── applying-tone-scale.md
│   ├── EMOTIONAL-INTELLIGENCE/
│   │   ├── README.md
│   │   ├── goleman-model.md
│   │   ├── six-seconds-model.md
│   │   ├── freedman-fariselli.md
│   │   └── arc-trauma-model.md
│   ├── INTERCONNECTEDNESS/
│   │   ├── arc-and-tone.md
│   │   ├── tone-and-eq.md
│   │   ├── arc-and-eq.md
│   │   └── README.md
│   └── PRACTICAL-APPLICATIONS/
│       ├── self-assessment.md
│       ├── communication-tools.md
│       └── emotional-regulation.md
└── plans/
    └── tone-navigator-*.md
```

---

## 2. Core Principles

### 2.1 Content Accuracy

- **Historical Context**: When discussing Scientology frameworks (ARC, Tone Scale), always acknowledge their origin (L. Ron Hubbard, 1950s)
- **Terminology**: Use "Appreciation" instead of "Affinity" (project convention), but note the original term
- **Tone Scale Levels**: Maintain accuracy when referencing tone levels (-40 to +40 scale)
- **EQ Frameworks**: Clearly distinguish between different EQ models (Goleman, Six Seconds, etc.)

### 2.2 Tone and Style

- **Educational**: Content should be instructional, clear, and accessible
- **Neutral**: Maintain objective tone when discussing potentially controversial frameworks
- **Structured**: Use consistent formatting (headers, lists, tables) for readability
- **Referenced**: Include links to related documentation where applicable

### 2.3 Documentation Standards

- **Markdown Format**: All documentation must be in Markdown
- **Line Numbers**: Reference specific line numbers when discussing code or content
- **Cross-References**: Link to related documents using relative paths
- **Glossary Alignment**: Terms should match the GLOSSARY.md definitions

---

## 3. Mode-Specific Rules

### 3.1 Architect Mode (`🏗️ Architect`)

**Purpose**: Planning, design, and strategic documentation

**Rules**:

1. Create detailed, structured plans with clear phases and milestones
2. Use Mermaid diagrams for architecture and workflow visualisation
3. Include todo lists with specific, actionable items
4. Document assumptions and constraints clearly
5. Reference existing documentation to maintain consistency
6. Avoid implementing code - focus on planning and design only

**Output Format**:

- Markdown files in `plans/` directory
- Mermaid diagrams for visualisations
- Checklists for implementation steps

**Example**:

```markdown
## Phase 1: Foundation

- [ ] Review existing ARC Triangle documentation
- [ ] Map Tone Scale levels to EQ competencies
- [ ] Create scenario database structure
```

### 3.2 Code Mode (`💻 Code`)

**Purpose**: Implementation, file creation, and modifications

**Rules**:

1. Follow existing project structure and conventions
2. Use TypeScript for any code files (TypeScript preferred)
3. Include comprehensive comments and documentation
4. Test changes before committing
5. Maintain consistency with GLOSSARY.md terminology
6. Reference related documentation in code comments

**File Naming**:

- Use descriptive, lowercase-with-dashes naming
- Match existing patterns (e.g., `tone-scale-mapper.ts`)
- Place files in appropriate directories

### 3.3 Ask Mode (`❓ Ask`)

**Purpose**: Research, explanation, and clarification

**Rules**:

1. Provide well-researched, sourced information
2. Use MCP tools (Context7, Tavily) for current information
3. Distinguish between established facts and interpretations
4. Reference original sources when discussing frameworks
5. Clarify terminology and concepts clearly

### 3.4 Debug Mode (`🪲 Debug`)

**Purpose**: Troubleshooting and error resolution

**Rules**:

1. Systematically analyse errors before proposing fixes
2. Include logging or diagnostic information
3. Test fixes thoroughly
4. Document root causes and solutions
5. Update documentation if fixes affect understanding

### 3.5 Orchestrator Mode (`🪃 Orchestrator`)

**Purpose**: Complex, multi-step projects

**Rules**:

1. Break down tasks into clear subtasks
2. Coordinate across different modes as needed
3. Maintain project-wide consistency
4. Track progress with todo lists
5. Ensure all phases connect logically

---

## 4. Content Guidelines

### 4.1 ARC Triangle Documentation

**Key Points**:

- Always explain the interdependence of A/R/C elements
- Use the Appreciation terminology (not Affinity)
- Include visual representations (diagrams)
- Connect to Tone Scale and EQ frameworks

**Example Structure**:

```markdown
# [Component Name]

## Definition

[Clear explanation]

## Relationship to Other Elements

[How it connects to other ARC elements]

## Practical Applications

[Real-world examples]

## Related Concepts

[Links to Tone Scale, EQ frameworks]
```

### 4.2 Tone Scale Documentation

**Key Points**:

- Maintain accurate tone level references (-40 to +40)
- Explain historical context (1950s terminology)
- Distinguish between emotional tones (above 0) and mental concepts (below 0)
- Include practical application examples

**Important Levels to Reference**:

- +40.0: Serenity of Beingness
- +30.0: Ecstatic
- +15.0: Gay (historical meaning: cheerful)
- +10.0: Cheerful
- +4.0: Enthusiasm
- +2.0: Antagonism
- +1.5: Anger
- +1.0: Fear
- +0.5: Grief
- 0.0: Body Death (neutral point)
- -40.0: Total Failure

### 4.3 Emotional Intelligence Documentation

**Key Points**:

- Clearly distinguish between different EQ models
- Explain historical development and context
- Show connections to ARC and Tone Scale
- Include practical application examples

**EQ Models to Cover**:

1. Goleman Model (5 components)
2. Six Seconds Model (3 pursuits)
3. Freedman-Fariselli Model (8 competencies)
4. ARC Trauma Model (Attachment, Regulation, Competency)

---

## 5. Best Practices

### 5.1 Planning Phase

1. **Research First**: Use Context7 and Tavily MCP for current information
2. **Document Assumptions**: Clearly state any assumptions made
3. **Create Todo Lists**: Break tasks into specific, actionable items
4. **Use Visuals**: Include Mermaid diagrams for complex workflows
5. **Reference Existing Docs**: Maintain consistency with current documentation

### 5.2 Implementation Phase

1. **Follow Structure**: Adhere to existing project organisation
2. **Test Incrementally**: Make small, testable changes
3. **Document Changes**: Update relevant documentation
4. **Maintain Terminology**: Use consistent terms from GLOSSARY.md
5. **Review Before Commit**: Ensure quality and accuracy

### 5.3 Review Phase

1. **Verify Accuracy**: Check factual accuracy of content
2. **Check Consistency**: Ensure alignment with existing docs
3. **Test Functionality**: Verify any code works as expected
4. **Update Glossary**: Add new terms if needed
5. **Document Lessons**: Record insights for future reference

---

## 6. Security and Ethics

### 6.1 Content Sensitivity

- **Scientology Context**: Acknowledge the controversial nature of some frameworks
- **Mental Health**: Include disclaimers for EQ and trauma-related content
- **Educational Purpose**: Emphasise learning and self-reflection, not therapy

### 6.2 Best Practices

- **No Medical Advice**: Clearly state content is not professional advice
- **Encourage Professional Help**: Suggest consulting qualified professionals
- **Respect Diverse Views**: Present frameworks objectively
- **Cite Sources**: Reference original authors and publications

---

## 7. File Organisation

### 7.1 Documentation Files

- **Location**: `LEARN-DOCS/[CATEGORY]/`
- **Format**: Markdown (.md)
- **Naming**: Descriptive, lowercase-with-dashes
- **Structure**: Consistent headers and formatting

### 7.2 Plan Files

- **Location**: `plans/`
- **Format**: Markdown (.md)
- **Naming**: `[project]-[type].md` (e.g., `tone-navigator-architecture.md`)

### 7.3 Code Files (if applicable)

- **Location**: Appropriate subdirectory based on functionality
- **Format**: TypeScript (.ts, .tsx)
- **Naming**: Descriptive, lowercase-with-dashes

---

## 8. Communication Guidelines

### 8.1 When Asking Questions

1. Be specific about what you need
2. Provide context from existing documentation
3. Reference specific files or concepts
4. Ask focused, actionable questions

### 8.2 When Receiving Output

1. Review for accuracy and completeness
2. Check alignment with project goals
3. Verify terminology consistency
4. Provide feedback for improvements

### 8.3 When Making Changes

1. Explain the rationale for changes
2. Reference relevant documentation
3. Test before finalising
4. Update related files if needed

---

## 9. Example Prompts

### 9.1 Planning a New Section

```
Create a detailed plan for adding a new section on "ARC and EQ Integration" to the INTERCONNECTEDNESS documentation. Include:
- Key concepts to cover
- Structure and organisation
- Todo list for implementation
- Mermaid diagram showing relationships
```

### 9.2 Researching a Topic

```
Research the ARC Trauma Model and provide:
- Historical context and origin
- Key components and definitions
- Relationship to other EQ frameworks
- Sources for further reading
```

### 9.3 Creating Documentation

```
Create a new documentation file for "Emotional Regulation Techniques" in the PRACTICAL-APPLICATIONS directory. Include:
- Definition and purpose
- Step-by-step techniques
- Connection to Tone Scale
- Practical examples
```

---

## 10. Quick Reference

### 10.1 Key Terminology

| Term          | Meaning                         | Notes                              |
| ------------- | ------------------------------- | ---------------------------------- |
| Appreciation  | Value/care/regard for others    | Also called "Affinity" in original |
| Reality       | Shared understanding/truth      | Same in all frameworks             |
| Communication | Information exchange            | Same in all frameworks             |
| Tone Scale    | Emotional gradient (-40 to +40) | Hubbard, 1951                      |
| EQ            | Emotional Intelligence          | Multiple models exist              |

### 10.2 Important Files

- `README.md` - Project overview
- `GLOSSARY.md` - Terminology reference
- `STUDY-GUIDE.md` - Learning path
- `plans/` - Architecture and scenario documents

### 10.3 Key Directories

- `LEARN-DOCS/ARC-TRIANGLE/` - ARC documentation
- `LEARN-DOCS/TONE-SCALE/` - Tone Scale documentation
- `LEARN-DOCS/EMOTIONAL-INTELLIGENCE/` - EQ frameworks
- `LEARN-DOCS/INTERCONNECTEDNESS/` - Cross-framework connections
- `LEARN-DOCS/PRACTICAL-APPLICATIONS/` - Practical usage
- `plans/` - Planning documents

---

## 11. Version History

| Date       | Version | Changes                                    |
| ---------- | ------- | ------------------------------------------ |
| 2026-02-25 | 1.0     | Initial creation based on project research |

---

## 12. Additional Resources

### 12.1 Official Documentation

- [Roo Code Documentation](https://docs.roocode.com/)
- [AGENTS.md Standard](https://agents.md/)

### 12.2 Research Sources

- Hubbard, L. Ron. "Science of Survival" (1951)
- Goleman, Daniel. "Emotional Intelligence" (1995)
- Six Seconds Network - Modern EQ frameworks
- Trauma Center, JRI - ARC Model for trauma therapy

---

_This document should be treated as living documentation and updated as the project evolves._
