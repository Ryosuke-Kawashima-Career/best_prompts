# CLAUDE.md

You are a Claude Code agent system designer.
Based on the information below, build a virtual team that supports my work.

---

## 1. My Information

- **Company name:** [e.g., 〇〇 Co., Ltd.]
- **Position:** [e.g., Sales Department Manager]
- **Job duties:** [e.g., As the person primarily responsible for the business side, I mainly do the following:
  - Creating business strategy, operations, and tactics
  - General sales work
  - Contract review
  - Recruiting]
- **Company's business:** [e.g., Supporting AI and data utilization. Recently, also providing support for AI employee adoption.]
- **Company mission / vision:** [e.g., Through AI and data utilization, we aim to build "smooth business operations," leaving a new future for the next generation through technology.]

---

## 2. Objective

Break down my work areas comprehensively and without overlap (MECE), and build a Claude Code agent system with the structure defined below.

---

## 3. Required Structure

### 3.1 `CLAUDE.md` — Command Center

- Placed at the project root.
- Describes the rules for receiving my instructions, determining the optimal agent, and launching it.
- Keep the routing table minimal. Details are separated into department-specific skills.
- Rules that grow long must be split into separate files and loaded via the import syntax `@.claude/rules/xxx.md`.
- Keep it as lightweight as possible, since CLAUDE.md is loaded into context on every turn.

### 3.2 `.claude/agents/` — Department-Specific Agents

- Design departments by breaking work down functionally (target: 5–10 departments).
- Place specialist agents in each department (1–3 per department).
- Follow the design principle: **one area of expertise is handled by one person.**
- Each file must begin with YAML frontmatter:

```yaml
---
name: agent-name  # lowercase English letters and hyphens
description: When to call this agent. Be specific — this is the basis for the command center's routing decisions.
model: opus | sonnet | haiku | inherit
tools: # Only specify when restricting tools. If omitted, all tools are inherited.
---
```

- Below the frontmatter, the body must describe:
  - Definition of the role
  - Personality and tone
  - Guidelines to reference
  - Rules for collaborating with other agents
  - Decision criteria (how far it decides on its own, and at what point it checks in with me)
- **Model split:** use `sonnet` for research and information gathering; use `opus` for integration, judgment, and final deliverables.

### 3.3 `.claude/skills/` — Department Routers

- Separate each department's detailed routing into a skill.
- One directory and one file per department, e.g. `.claude/skills/strategy/SKILL.md`, `.claude/skills/marketing/SKILL.md`.
- Frontmatter must always include `name` and `description`. The `description` must state specifically what kind of request triggers it — so it launches both when I type `/strategy` and when Claude picks it up automatically from a related consultation.
- Only the departments needed are loaded on demand, which keeps CLAUDE.md lightweight.

### 3.4 `guidelines/` — Internal Manuals

- Create work manuals that all agents reference (target: 6–12 manuals).
- Write them at the level of new-employee onboarding manuals, so that anyone reading them can produce the same quality of work.

### 3.5 `templates/` — Output Templates

- Prepare templates that standardize the agents' output format.

### 3.6 `output/` — Deliverables Storage

- Agent deliverables are written to `output/{department}/{theme}_{YYYYMMDD}.md`.

---

## 4. Operational Optimization Rules

- Clearly define the conditions under which the command center **does** and **does not** use subagents.
- Write a rule that responses to short questions and casual conversation are returned conversationally.
- Write a rule that small tasks are executed immediately, without asking for confirmation.
- Routine processing that must always happen (e.g., appending to a deliverables catalog) should not be left to an agent. Consider a design that executes it mechanically via hooks in `.claude/settings.json`.

---

## 5. Memory Design

- Create a `memory/` directory to manage memory across sessions.
- Use a three-layer structure:
  - `context-log.md` — event log
  - `frameworks.md` — decision criteria
  - `preferences.md` — work style
- Place `MEMORY.md` as an index, referenced from CLAUDE.md.
- At the start of a session, read the index and load **only** the individual files needed. Do not load everything.

---

## 6. Core Design Principles

- Design a **team of specialists**, not one AI doing everything.
- Each agent must have a clearly distinct personality, expertise, and tone.
- The command center (CLAUDE.md) does not do the work itself. It only plans, routes, and integrates.
- For composite tasks, launch multiple agents in parallel.
- Launch agents as independent processes via the Agent tool (subagents).
- When there are 3 or more parallel agents, or a multi-stage structure such as generate → verify → integrate, use a **Workflow** (deterministic orchestration) rather than improvising the arrangement inline.
- **Separate generation from evaluation** — the agent that creates and the agent that evaluates must be different.
- For large tasks, split into phases and reset context: write each phase's deliverable to a file, and have a new agent in the next phase read that file and work from it.

---

## 7. Output Format

- Actually create all files. Write out the full content — do not abbreviate or omit anything.

---

Now, create all files according to the structure above.
