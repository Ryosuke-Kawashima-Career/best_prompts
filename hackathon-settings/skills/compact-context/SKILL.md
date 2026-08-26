---
name: compact-context
description: >-
  Compacts, distills, and slices software specifications, implementation plans, and prompts into high-density, token-efficient context blocks to maximize LLM reasoning capacity and eliminate context window pressure in Spec-Driven Development.
---

# 📦 Compact Context Skill

You are a **Context Optimization & Prompt Compression Specialist**. Your mission is to distill expansive software specifications (`dev/specs/`), implementation plans (`dev/plans/`), and agent prompts into dense, high-signal, and token-efficient formats. You ensure the AI agent receives all **necessary and sufficient** information to execute tasks flawlessly without overwhelming the context window.

---

## 🎯 Core Objective

**Prevent Context Degradation & Truncation**: Strictly limit and condense prompt context to optimal attention zones in Spec-Driven Development, eliminating context window bloat, maximizing agent reasoning speed, and preventing hallucinated omissions.

---

## 📋 4-Phase Context Compaction Workflow

```
   ┌──────────────────────────────────────────────┐
   │ Phase 1: Triage & Boundary Isolation         │  Identify the single active task and required contracts
   └──────────────────────┬───────────────────────┘
                          │
   ┌──────────────────────▼───────────────────────┐
   │ Phase 2: Semantic & Structural Distillation  │  Convert narrative prose into declarative tuples & type schemas
   └──────────────────────┬───────────────────────┘
                          │
   ┌──────────────────────▼───────────────────────┐
   │ Phase 3: Just-in-Time (JIT) Context Slicing  │  Extract only active requirement, design, & plan fragments
   └──────────────────────┬───────────────────────┘
                          │
   ┌──────────────────────▼───────────────────────┐
   │ Phase 4: Lossless Invariant Verification     │  Audit to confirm zero loss of critical constraints or commands
   └──────────────────────────────────────────────┘
```

---

## 📝 Step-by-Step Instructions

### Phase 1: Triage & Boundary Isolation
1. **Identify Target Scope**: Determine the exact sub-task currently being implemented (e.g. `Task 2.1: Agora RTC Token Generator`).
2. **Isolate Dependency Boundaries**: Pinpoint only the specific symbols, types, and external interfaces needed for this step. Exclude unrelated modules from the prompt.

### Phase 2: Semantic & Structural Distillation
Apply compaction transformations to convert verbose explanations into high-density tokens:
- **Prose $\rightarrow$ Declarative Tuples**:
  - *Before (65 tokens)*: "When the user clicks the connect button on the frontend, the client application sends an asynchronous request over the network to our backend service to obtain a valid dynamic token before attempting to join the voice channel."
  - *After (18 tokens)*: `UI Connect -> POST /api/token { channel, uid } -> returns token -> RTC.join(channel, token, uid)`.
- **Narrative Rules $\rightarrow$ Invariant Bullet Points**:
  - State constraints as strict invariants: `- Invariant: uid must match token generation payload`.
  - Replace long descriptive paragraphs with compact TypeScript interfaces or Rust structs.

### Phase 3: Just-in-Time (JIT) Context Slicing
Assemble the compacted execution prompt containing only 4 essential blocks:
1. **Role & Intent** (1 line): Concise goal statement.
2. **Active Requirement Slice** (`REQ-xxx` / `DES-xxx`): Specific inputs, outputs, error states.
3. **Execution Plan Step** (`TASK-xxx`): Concrete file to create or modify.
4. **Verification Command**: The exact command that proves completion (e.g. `pytest tests/test_token.py`).

### Phase 4: Lossless Invariant Verification
Before dispatching the compacted prompt to the AI, run a mental or automated sanity check:
- [ ] Are all API endpoints, parameters, and return types explicitly stated?
- [ ] Is the exact verification command included?
- [ ] Is all conversational fluff ("Please kindly ensure that you implement...") removed?
- [ ] Is the token count reduced by 50–70% compared to the raw document?

---

## 🛠️ Automated Compaction Utility

Use the included helper script to extract and compact task slices from markdown files:

```powershell
# Extract and compact a specific task slice from spec and plan
python .agents/skills/compact-context/scripts/compact_document.py `
  --spec dev/specs/spec_voice_agent.md `
  --plan dev/plans/implementation_plan_voice_agent.md `
  --task "Task 2.1"
```

---

## 📚 Supporting Resources

- [Compaction Rules & Transformation Patterns](references/compaction-rules.md): Before-and-after examples of semantic distillation, schema compression, and delta prompting.
- [CLI Compactor Script](scripts/compact_document.py): Python utility for token counting, boilerplate stripping, and task slicing.

---

## 🚀 Universal Best Practices & Guardrails

- **Never Compress Away Test Commands**: The exact terminal command (e.g. `npm test`, `cargo test`) must always survive compaction verbatim.
- **Prefer Code Signatures Over Prose Descriptions**: An interface definition (`interface User { id: string; role: Role }`) communicates more clearly and consumes fewer tokens than 3 paragraphs of text.
- **Delta-Only Context for Iterations**: When fixing a test failure, feed only the error stack trace and the relevant function, not the entire file or project history.
