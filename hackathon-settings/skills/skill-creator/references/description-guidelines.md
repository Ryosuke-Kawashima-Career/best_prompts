# Description Guidelines — the full rationale

This file backs [SKILL.md](../SKILL.md)'s "Three Description Rules." It's reference material — read it when you need the *why*, not every time you write a description.

## Why English only

A matching agent scans every installed skill's `description` in one pass to decide which skill (if any) applies to the current request — the same way you can see a flat list of one-line descriptions in this session's own system reminders. That scan is a single block of text across many skills. A description written in another language doesn't just under-match its own skill; mixed scripts in the middle of that block cost the scan consistency for its neighbors too. Keep `description` English even when:

- the user is writing to you in another language
- the skill's body, examples, and comments are in another language (that's fine — only the frontmatter `description` and `name` need to be English)
- the skill is domain-specific to a non-English-speaking team

## Why length matters: the U-curve / "dumb zone"

The underlying research result is usually called **"lost in the middle"** (Liu et al., 2023): when a model is given a long context with the relevant fact placed at different positions, retrieval accuracy is high when the fact is near the start or end, and drops in the middle — a U-shaped curve. "Dumb zone" is the colloquial name for that low point.

Two places this shows up for skill descriptions specifically:

1. **Inside a single long description.** If the description is one long sentence with the actual trigger noun buried in a subordinate clause in the middle, that trigger gets less relative weight than the throat-clearing opener or the closing flourish — even though, to a human skimming it, it "reads fine."
2. **Across the whole list of descriptions.** The system prompt shown to the matching agent lists every installed skill's description back to back (see the skill listing in this conversation's system reminders for a real example — some entries are one line, some run to several sentences with explicit `Triggers:` / `SKIP:` clauses). A description that's disproportionately long doesn't get proportionally more attention for its extra length; it just occupies more of the list with padding, and the sentence that follows it is more likely to fall into a locally "middle" position relative to the ones around it.

The fix isn't "never write a long description" — some domains genuinely need one (see the `claude-api` example below, which lists many trigger conditions because the domain is broad and easily confused with other providers). The fix is: **every character in the description should be a trigger signal, not connective padding.**

## Concrete targets

| Metric | Target | Notes |
|---|---|---|
| Length | ~150–350 characters | Matches most of this project's shorter skills (`agora`, `architecture-visualizer`, `debugging`) |
| Sentences | 1–3 | More than that, switch to a structured trigger list instead of prose |
| First clause | States the core capability or the single most likely trigger | Front-loaded, not saved for the end |
| Filler adjectives | Zero | "powerful", "comprehensive", "robust", "seamless" — cut these; they cost characters and add no matchable signal |

## Before / after rewrites

**Before** (real anti-pattern — vague opener, trigger buried, no scope limit):

> "This is a powerful and comprehensive skill that helps agents with all sorts of things related to managing and improving the quality of skills across the codebase, which can be useful in many different situations."

**After:**

> "Audits and refines existing Claude Code skills — minimal diffs, change rationale, automated verification. Use when the user asks to update, fix, or improve an existing skill's SKILL.md, scripts, or examples."

Same information, front-loaded capability, explicit trigger, no filler — well under 350 characters.

**When a longer description is justified** (real pattern, abbreviated from this project's global skill list): a skill covering a broad, easily-confused domain (e.g. "is this about Claude/Anthropic, or about a different LLM provider?") legitimately needs an explicit `TRIGGER:` clause listing several concrete signals and a `SKIP:` clause naming the competing providers that should route elsewhere. That's still not padding — every extra word there is a discrete, checkable condition, not connective tissue. The test isn't "is it short," it's "would removing this word lose a real trigger condition."

## Trigger precision — good vs. vague

| Vague (overtriggers) | Precise (triggers when necessary) |
|---|---|
| "Helps with data" | "Use when the user asks to create a chart, graph, plot, or dashboard in any output medium" |
| "For writing better code" | "Use when reviewing a diff or PR for correctness bugs and simplification opportunities" |
| "Assists with skills" | "Use when the user asks to create or scaffold a new Claude Code skill" |

The left column matches almost any request in its domain, which means it fires when it shouldn't and crowds out more specific skills. The right column names the concrete situation, so it only lights up when that situation is actually present.
