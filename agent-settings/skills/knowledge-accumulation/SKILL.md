---
name: knowledge-accumulation
description: >
  Persistent knowledge base across sessions: recalls saved context at session start,
  captures on "remember/save/log this", suggests saving at natural pauses.
  Trigger at session start and on any intent to store or retrieve knowledge.
---

# Knowledge Accumulation Skill

This skill has three phases: **Recall** (load context at session start), **Capture** (record new knowledge on demand), and **Suggest** (proactively surface candidate knowledge for the user to approve).

The knowledge base lives in the `knowledge/` folder next to this SKILL.md. All files are plain markdown — readable and writable by any LLM or tool.

---

## Phase 1 — Recall (session start)

At the beginning of each session, before responding to the user's first task:

1. Check whether `knowledge/INDEX.md` exists. If it doesn't, skip recall silently — there's nothing stored yet.
2. Read `knowledge/INDEX.md` to get a list of all stored entries (date, type, tag, summary).
3. If any entries look relevant to the current conversation topic, read the corresponding file (`knowledge/insights.md` or `knowledge/decisions.md`) and load those entries into context.
4. Briefly mention to the user: _"I found [N] relevant knowledge entries from previous sessions — I'll keep those in mind."_ Don't dump the raw files at the user; just let them know relevant context was loaded.

The goal is seamless continuity: the user shouldn't have to re-explain context they've already shared.

---

## Phase 2 — Capture (explicit command)

When the user asks to save or remember something, do the following:

### Step 1 — Classify the knowledge

Determine which type fits best:

- **Insight**: A domain pattern, best practice, or understanding discovered during the conversation. Examples: "JWT refresh tokens should be rotated on use", "this codebase uses feature flags for all A/B tests", "the client prefers concise executive summaries over detailed reports".
- **Decision**: Something that was tried, a choice that was made, or an outcome (positive or negative). Examples: "Tried migrating to Postgres — blocked by the legacy ORM, shelved for Q3", "chose Tailwind over CSS Modules because the team is more familiar with it".

If it's unclear, default to **insight**.

### Step 2 — Extract and structure

Pull out the essential knowledge — not a transcript dump, but a distilled, reusable entry. Use this format:

```
### [YYYY-MM-DD] <short-topic-tag>
**Type**: insight | decision
**Context**: One sentence on what was being worked on or discussed
**Knowledge**: The core insight or decision, in 1–3 sentences. Write it so it's useful to someone reading it cold, with no memory of this conversation.
**Outcome**: (optional) What happened as a result, or what to do next
```

**Topic tag** should be a short kebab-case label (e.g., `auth-flow`, `postgres-migration`, `client-report-style`). Tags help future retrieval.

### Step 3 — Write to the knowledge base

- Append the entry to `knowledge/insights.md` (for insights) or `knowledge/decisions.md` (for decisions). Create the file if it doesn't exist.
- Update `knowledge/INDEX.md`: add one line in this format:
  ```
  | YYYY-MM-DD | insight/decision | <topic-tag> | <one-line summary> |
  ```
  If `INDEX.md` doesn't exist yet, create it with this header first:
  ```markdown
  # Knowledge Index
  
  | Date | Type | Tag | Summary |
  |------|------|-----|---------|
  ```

### Step 4 — Confirm to the user

Reply with something like: _"Saved as a [insight/decision] under `<topic-tag>`."_ Keep it short — the user just wants to know it worked.

---

## Phase 3 — Suggest (proactive, at natural conversation pauses)

Don't wait for the user to ask you to remember things — good knowledge often emerges mid-conversation without anyone flagging it. When a natural pause occurs (e.g., a task wraps up, the topic shifts, or the user says "thanks" or "got it"), scan back over the recent exchange and ask yourself: _did anything come up that would be genuinely useful to remember for next time?_

### What's worth suggesting

Look for moments where:
- A non-obvious pattern or constraint was revealed ("turns out the API rate-limits at 100 req/min, not 1000")
- A trade-off was reasoned through and a choice was made
- The user corrected a wrong assumption or stated a strong preference
- A dead-end was hit that others should avoid
- A reusable approach or heuristic was discovered

**Don't suggest** things that are obvious, trivial, already in the knowledge base, or too specific to be useful beyond this conversation.

### How to suggest

When you spot a candidate, present it compactly at the end of your response — don't interrupt the flow of the task:

> 💡 **Worth saving?** We found that [one-sentence summary]. Want me to log this as a [insight/decision]?

Keep it to one suggestion at a time. If there are multiple candidates, pick the most valuable one. Flooding the user with suggestions defeats the purpose.

If the user says yes (or "save it", "log it", "yep", etc.), proceed with Phase 2 — Capture using the entry you already drafted mentally. If they say no or ignore it, drop it without comment.

### Calibration

Aim for zero to two suggestions per conversation. If you're suggesting after every response, raise the bar.

---

## Guidelines for cross-LLM portability

This skill is designed to work with any LLM that has file read/write access:

- All operations are plain file reads and writes — no special APIs or tool-specific syntax required.
- Entries are human-readable markdown — any model can parse and use them without special formatting.
- The INDEX.md table format is intentionally simple: pipe-delimited markdown, sortable and scannable.
- When in doubt about what to save, err on the side of capturing more rather than less. Pruning is easier than reconstruction.

---

## Knowledge folder layout

```
knowledge/
├── INDEX.md        ← master index of all entries
├── insights.md     ← domain patterns, best practices, user preferences
└── decisions.md    ← choices made, things tried, outcomes
```

---

## Example

User says: _"Remember that we decided to use Redis for session storage because the DB was getting hammered."_

LLM action:
1. Classify → **decision** (`redis-session-storage`)
2. Write to `knowledge/decisions.md`:
   ```
   ### [2026-06-04] redis-session-storage
   **Type**: decision
   **Context**: Evaluating session storage options for the web app
   **Knowledge**: Chose Redis for session storage over DB-backed sessions. DB was experiencing high read load from session queries; Redis offloads this entirely.
   **Outcome**: To implement: set up Redis cluster, update session middleware config
   ```
3. Append to `knowledge/INDEX.md`:
   ```
   | 2026-06-04 | decision | redis-session-storage | Chose Redis for sessions to reduce DB load |
   ```
4. Reply: _"Saved as a decision under `redis-session-storage`."_
