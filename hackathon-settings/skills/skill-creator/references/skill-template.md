# Skill Template

Copy this into a new `SKILL.md`, fill in the blanks, then run the checklist and validator in [SKILL.md](../SKILL.md) before presenting it to the user.

```markdown
---
name: <kebab-case-name>
description: >-
  <One clause stating the core capability> <one clause with the concrete "use when" trigger>. <Optional: "skip when"/"not for" clause if confusable with a sibling skill.>
---

# <Human-readable title>

## Goal

<One or two sentences: what this skill accomplishes and why it exists.>

## When to use this skill

- <concrete user phrasing or situation #1>
- <concrete user phrasing or situation #2>
- <optional: explicit "skip when" / "not for" line if confusable with another skill>

## Instructions

1. <step>
2. <step>
3. <step>

## References

<Only if needed — link out to references/*.md for anything long-lived-but-detailed
(deep rationale, big schemas, vendor-specific config) rather than inlining it here.>
```

## Notes

- Keep `SKILL.md` itself thin. If a section is pulling in more than a screenfull of detail that will rarely change per-invocation, move it to `references/` and link it.
- Only add `scripts/` if there's something to actually execute (a validator, a codegen step) — not for documentation.
- Only add `examples/` if a copy-pasteable snippet is genuinely faster than the agent writing one from the instructions.
