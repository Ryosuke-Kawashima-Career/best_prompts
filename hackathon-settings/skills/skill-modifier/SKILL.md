---
name: skill-modifier
description: >-
  Audits, plans, refines, and minimally modifies agent skills for hackathon solutions using pre-execution plan evaluation, minimal non-breaking diffs, change rationale logging, and automated test verification.
---

# 🔄 Skill Modifier Skill

This skill guides the AI agent through modifying, adapting, and upgrading existing agent skills for hackathon solutions in a controlled, minimal, and fully verified manner.

---

## 🎯 Goal

Safely evolve agent skills to meet new hackathon project demands by:
1. Creating and critically evaluating a revision plan before touching code.
2. Making minimal, non-breaking modifications to prevent inconsistencies.
3. Providing a clear log of what was changed and the architectural rationale behind it.
4. Executing automated test suites and providing exact inspection commands for the user.

---

## 🧭 Core Principles

1. **Plan & Evaluate First (Pre-Execution Review)**:
   - Draft the revision plan explicitly.
   - Evaluate the plan against potential edge cases, breaking changes, or ambiguity.
   - Proceed to modification only after the plan is vetted and free of conceptual defects.

2. **Minimal Surgical Edits (Consistency Preservation)**:
   - Make the smallest possible change that fulfills the requirement.
   - Preserve existing structure, conventions, file links, and unrelated working features.
   - Avoid destructive full rewrites when localized enhancements suffice.

3. **Transparent Rationale (The "What" and "Why")**:
   - Every modification must be accompanied by an explanation of *what* was changed and *why* it was necessary.

4. **Automated Verification Loop**:
   - Verify all YAML frontmatters, internal link integrity, and helper script executions.
   - Run project-level tests and linters to ensure zero workspace regressions.

---

## 📋 5-Phase Skill Modification Lifecycle

```
   ┌────────────────────────────────┐
   │ Phase 1: Skill Audit & Gap     │  Inspect existing SKILL.md, scripts, & examples
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Phase 2: Revision Plan & Eval  │  Draft plan, evaluate edge cases, eliminate bugs
   └────────────────┬───────────────┘
                    │ (Plan verified)
   ┌────────────────▼───────────────┐
   │ Phase 3: Minimal Modification  │  Apply surgical, localized diffs to assets
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Phase 4: Automated Testing     │  Execute skill verifier & project test runners
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Phase 5: Rationale & Delivery  │  Report changes, rationale, & user check commands
   └────────────────────────────────┘
```

---

## 🛠️ Step-by-Step Instructions

### Phase 1: Skill Audit & Gap Analysis
1. Inspect the target skill folder under `.agents/skills/{target-skill}/`.
2. Review:
   - `SKILL.md` (YAML frontmatter, goals, instructions, guardrails).
   - `scripts/` (executable automation tools).
   - `examples/` (reference code templates).
   - `resources/` (design tokens, schemas, static configs).
3. Identify the exact delta required by the new hackathon demands without altering unrelated behaviors.

### Phase 2: Revision Planning & Pre-Execution Evaluation
1. Draft a structured revision plan detailing:
   - Target files to modify or create.
   - Specific sections and lines targeted.
   - Anticipated risks and compatibility impacts.
2. **Plan Evaluation Checklist**:
   - Does the plan introduce breaking changes to existing agent workflows?
   - Are file paths and links preserved or correctly updated?
   - Is the modification minimal and focused solely on the user's demands?
   - Are verification steps clearly defined?
3. Refine the plan to eliminate flaws before applying any changes.

### Phase 3: Minimal Surgical Modification
1. Apply localized changes to the target files.
2. Retain existing comments, headers, and structural conventions.
3. Update helper scripts or examples to match the newly added requirements.

### Phase 4: Automated Testing & Verification
1. Run the skill integrity verifier:
   ```bash
   node .agents/skills/skill-modifier/scripts/verify-skill.js .agents/skills/{target-skill}
   ```
2. Execute the workspace test runner to confirm zero project regressions:
   ```bash
   node .agents/skills/hackathon-rapid-builder/scripts/verify-step.js
   ```

### Phase 5: Change Reporting & User Verification Commands
1. Document the changes in `dev/context/walkthrough_<task-name>.md`.
2. Format the user response with:
   - **Summary**: Concise recap of the skill modification.
   - **Implementation & Rationale**: Itemized list of what was changed and why.
   - **Verification**: Exact test commands executed and results.
   - **Files Changed**: Targeted file list.
   - **User Inspection Commands**: Runnable commands for user verification.

---

## 💡 Best Practices

* **Preserve Backward Compatibility**: Ensure existing agent slash-command invocations and subagent roles continue to work seamlessly.
* **Polyglot & Multi-Stack Awareness**: If modifying multi-language skills, ensure patterns remain valid across TypeScript, Python, Rust, Java, and Go.
* **Keep Descriptions Clean**: Write skill descriptions with clear triggers and keywords so the agent activates the skill accurately.
