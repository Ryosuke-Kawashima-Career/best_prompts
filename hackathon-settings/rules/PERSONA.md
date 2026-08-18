---
trigger: always_on
---

# Behavior Settings

## Directory Structure

### `dev/specs/`

Store requirements and design documents here.

- `user_story.md` — use-case scenarios and user goals
- `requirements.md` — functional and non-functional requirements
- `design.md` — architecture and technical design
- `spec_<task-name>.md` — detailed specification for a specific task

### `dev/plans/`

Store implementation planning documents here.

- `implementation_plan.md` — overall implementation plan
- `implementation_plan_<task-name>.md` — implementation plan for a specific task
- `task_list.md` — actionable task checklist

### `dev/context/`

Store task outcomes and historical context here.

- `walkthrough_<task-name>.md` — report of completed work, modified files, implementation details, tests, and verification results

### `dev/output/`

Place generated reports, exported documents, and other requested output artifacts here.

### `src/` or `app`

Place application source code and implementation files here.

- Write a summary of each code file on the head.
- Comment the algorithm of each process step by step.

## Required Workflow

### 1. Inspect the repository

Before making changes:

- Inspect `dev/specs/`, `dev/plans/`, `dev/context/`, `dev/output/`, and `src/` or `app` when they exist.
- Read relevant specifications, plans, and walkthroughs.
- Check the current Git branch and working-tree status.
- Identify existing conventions, dependencies, tests, and entry points.
- Do not overwrite unrelated user changes.

### 2. Clarify the task

Determine:

- The intended outcome
- Relevant requirements and constraints
- Files that must be created or modified
- How success will be verified
- Any assumptions or unresolved questions

If the task is ambiguous and a reasonable assumption would materially affect the implementation, ask the user before proceeding.

### 3. Create an implementation plan

Create or update:

```text
dev/plans/implementation_plan_<task-name>.md
```

The plan should include:

- Objective
- Relevant existing files
- Proposed solution
- Implementation steps
- Risks and edge cases
- Test and verification strategy
- Expected files to be created or modified

Present the plan to the user and wait for explicit approval before writing implementation code.

### 4. Implement the approved plan

After approval:

- Implement only the approved scope.
- Follow the repository’s existing style and architecture.
- Keep changes focused and reversible.
- Update specifications or plans if the approved scope changes.
- Do not claim that code works until it has been executed or tested.

### 5. Execute and test

Run the relevant commands, such as:

- Build commands
- Unit and integration tests (e.g. Linters and formatters, Type checks)
- Relevant application or verification commands

Record:

- The exact commands executed
- Whether each command passed or failed
- Important output, errors, or warnings
- Any limitations caused by the environment

If a test cannot be run, state why and provide the command the user can run.

### 6. Write the walkthrough

Create or update:

```text
dev/context/walkthrough_<task-name>.md
```

The walkthrough must include:

- Task summary
- Original and approved scope
- Implementation approach
- Algorithms or important logic
- Files created, modified, or deleted
- Tests and verification commands
- Test results
- Follow-up work, if any
- Git branch and final working-tree status, when relevant

## Response Format

Every final response must use this structure:

### Summary

Start with a concise summary of what was completed and the current status.

### Implementation

Explain:

- What was changed
- The algorithms or logic used
- Important design decisions
- Step-by-step behavior, using examples where helpful

### Verification

Provide the exact commands used to verify the work and summarize their results.

Example:

```bash
npm test
npm run lint
```

Do not present unexecuted commands as completed verification. Clearly distinguish between commands that were run and commands recommended for the user.

### Files Changed

List the relevant files and briefly describe each change.

### Documentation

Confirm that the corresponding walkthrough was created or updated:

```text
dev/context/walkthrough_<task-name>.md
```

### Notes

Mention assumptions, limitations, unresolved issues, or required user actions.
Explain algorithms and concepts step by step with some examples and references.
