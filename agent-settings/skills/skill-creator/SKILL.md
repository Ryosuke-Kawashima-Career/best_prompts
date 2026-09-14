---
name: skill-creator
description: >-
  Scaffolds new Claude Code skills with English-only, concise, precisely-triggered SKILL.md descriptions. Use when creating a skill or fixing a description field.
---

# Skill Creator

## Goal

Scaffold well-formed Claude Code skills whose `description` field is written so the *matching* agent — not this one, some future agent skimming a long list of skill descriptions — reliably picks the skill up when it's relevant and leaves it alone when it isn't.

## When to use this skill

- "create a new skill for X"
- "scaffold a skill that does Y"
- "help me write/fix the description for this SKILL.md"
- "why isn't my skill triggering?" / "my skill triggers too often"

## The Three Description Rules

Every `description:` field this skill writes (or edits) must satisfy all three. These are not style preferences — they map directly to how a matching agent actually reads a long list of skill descriptions (see the system-reminder skill listing in this very conversation for what that list looks like in practice).

### 1. English only

The `description` field is always English, regardless of what language the skill's body, examples, or the user's request use. `name` stays English too (kebab-case). Rationale: descriptions are read together, side by side, as a single block of candidates the matching agent scans in one pass — mixing scripts forces it to context-switch mid-scan and degrades match reliability across the whole list, not just for this skill.

### 2. Short enough to escape the "dumb zone"

LLM attention over a long context is U-shaped: strong at the start, strong at the end, weak in the middle — the "lost in the middle" effect (Liu et al., 2023), colloquially the "dumb zone." A skill's description doesn't sit alone; it sits in a list with a dozen-plus other descriptions. Two ways this bites:

- **Within one description**: if it's a long run-on paragraph, the actual trigger words can land in the description's own middle and get under-weighted relative to its throat-clearing opener and its closing line.
- **Across the list**: an unusually long, padded description doesn't get a bigger share of attention for its length — it just spends more of its words in low-attention territory.

Concrete rules:
- Target ~1–3 sentences, roughly 150–350 characters. Treat 500+ as a smell; only exceed it when the domain genuinely needs many distinct trigger synonyms enumerated (see `references/description-guidelines.md` for a real example of when that's justified).
- Put the single most important capability/trigger phrase in the *first clause*, not buried after three subordinate clauses.
- Cut filler adjectives ("powerful", "comprehensive", "robust", "seamless") — they add length without adding a matchable signal.
- If you truly need to enumerate many triggers, use short discrete phrases or a structured `Triggers:` / `SKIP when:` list rather than one dense sentence — discrete tokens survive the middle-of-context decay better than prose does.

### 3. Trigger precisely — used when necessary, not by default

A description's job is to make the matching agent invoke the skill exactly when it should and stay out of the way otherwise.

- State concrete "use when" conditions: actual user phrasings or situations, not abstract capability claims.
- If the skill could be confused with a sibling skill (similar domain, adjacent tool), add an explicit "skip when" / "not for" clause to disambiguate — see `claude-api`'s SKIP clause in this project's global skill list for the pattern.
- Avoid single generic verbs as the whole trigger ("helps with code", "for writing") — they overtrigger against unrelated requests.
- Prefer verbs and nouns the user would actually type over internal jargon.

## Step-by-step: creating a new skill

1. **Clarify name and scope.** Kebab-case, descriptive noun/gerund phrase (e.g. `skill-creator`, `compact-context`). If the request is ambiguous about scope, ask rather than guess.
2. **Choose location.** Project-specific → `.claude/skills/<name>/`. Cross-project/personal → user-level `~/.claude/skills/<name>/`. Default to project-level unless the user says otherwise.
3. **Scaffold the directory**: `SKILL.md` at minimum; add `references/` for volatile or lengthy detail, `scripts/` for helper tooling, `examples/` for copy-paste snippets — only the folders the skill actually needs.
4. **Draft the description** against the Three Description Rules above, then run it through the checklist below.
5. **Write the body**: goal, explicit "when to use" list, step-by-step instructions. Keep the body itself lean — push anything long-lived-but-detailed (deep rationale, big examples, reference tables) into `references/` rather than inlining it in `SKILL.md`, mirroring how the other skills in this repo (e.g. `agora`, `compact-context`) split a thin entry point from deeper reference material.
6. **Self-review** with the checklist, then run the validator:
   ```bash
   node .claude/skills/skill-creator/scripts/check-description.js .claude/skills/<name>/SKILL.md
   ```
7. **Present the result** to the user with the file paths created and the final description text, so they can confirm the trigger conditions match what they meant.

## Description Quality Checklist

- [ ] English only — no non-English script anywhere in `name` or `description`
- [ ] ~150–350 characters (longer only if genuinely enumerating many required trigger synonyms)
- [ ] The single most important trigger phrase is in the first clause
- [ ] Explicit "use when" condition is present
- [ ] Explicit "skip/not for" condition is present if confusable with another installed skill
- [ ] No filler adjectives
- [ ] `scripts/check-description.js` run with no `[issue]` lines

## Validation script

```bash
node .claude/skills/skill-creator/scripts/check-description.js <path-to-SKILL.md>
```

Omit the path to scan every `SKILL.md` under `.claude/skills/`.

## References

- `references/description-guidelines.md` — the dumb-zone/U-curve rationale in full, plus a table of bad-vs-good description rewrites drawn from real skills.
- `references/skill-template.md` — copy-paste starter template for a new `SKILL.md`.
