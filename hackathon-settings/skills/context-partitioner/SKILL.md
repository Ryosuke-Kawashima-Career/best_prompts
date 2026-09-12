---
name: context-partitioner
description: >-
  Splits bloated dev/specs/ and dev/plans/ files into smaller linked chunk files and tracks dependencies between them. Use when a spec or plan file has grown too long to read or edit cleanly. Not for spec-plan drift (spec-plan-sync) or prompt compression (compact-context).
---

# Context Partitioner

## Goal

Keep `dev/specs/` and `dev/plans/` navigable as the project grows, by splitting bloated documents into smaller chunk files/directories and maintaining a dependency graph between the chunks — without breaking [spec-plan-sync](../spec-plan-sync/SKILL.md)'s spec↔plan pairing or traceability matrix.

## When to use this skill

- "this spec/plan file is too long, split it up"
- "`dev/specs`/`dev/plans` is getting hard to navigate"
- "what does this chunk depend on?" / "did I break something by editing this out of order?"
- **Not for**: reconciling drift between a spec and its plan → [spec-plan-sync](../spec-plan-sync/SKILL.md). Compressing content for a single prompt → [compact-context](../compact-context/SKILL.md). This skill only changes on-disk file layout and cross-file dependency metadata.

## Bloat threshold

Treat a file as a chunking candidate once it crosses either:
- **300 lines**, or
- **6 top-level (`##`) sections**

`scripts/check_bloat.py` applies this automatically. In this repo, `dev/plans/implementation_plan_tandem.md` (665 lines) and `dev/specs/spec_tandem.md` (342 lines) are both already over threshold.

## Chunking convention

1. Split at existing `##` heading boundaries — one chunk per heading or per tight group of headings. Never split mid-section.
2. Turn `dev/specs/spec_<topic>.md` into a directory `dev/specs/spec_<topic>/`:
   - `index.md` — the original frontmatter, the intent/scope section, and a table of contents linking every chunk in order.
   - `<NN>-<slug>.md` per section (`01-scope.md`, `02-requirements.md`, …).
3. Mirror the **same** split boundaries in `dev/plans/implementation_plan_<topic>/` so each spec chunk still pairs 1:1 with a plan chunk — spec-plan-sync's pairing logic depends on this.
4. Every chunk keeps the standard frontmatter (`document_type`, `version`, `status`, `last_updated`, `author`) plus two additional fields:
   - `part_of: "<topic>"` — the original document this chunk was split from.
   - `depends_on: []` — repo-relative paths of other chunks this one assumes or references (empty list if none).
5. Update every inbound link (sibling docs, code comments, READMEs) that pointed at the old single file.
6. Prefer `git mv` plus edits over a fresh rewrite, so history and authorship survive the split.

## Dependency tracking

Dependencies are declared per-chunk in `depends_on:` (repo-relative paths). `scripts/build_dependency_graph.py` then:
- renders the graph as a Mermaid `graph TD` block,
- flags **cycles** (A depends on B depends on A),
- flags **broken edges** (a `depends_on` entry pointing at a file that doesn't exist),
- flags **stale dependents** — a chunk whose `last_updated` predates a chunk it depends on, meaning it may need re-review after that dependency changed.

## Step-by-step

1. `python .claude/skills/context-partitioner/scripts/check_bloat.py` — find candidates over threshold.
2. For each candidate, apply the Chunking Convention above.
3. Add/update `depends_on:` on the new chunks and on any pre-existing file that now references the split content.
4. `python .claude/skills/context-partitioner/scripts/build_dependency_graph.py --write dev/DEPENDENCY_GRAPH.md` — resolve any cycle/broken-edge warning before moving on; review stale-dependent warnings.
5. If the split file was indexed by spec-plan-sync's traceability matrix, run that skill's verifier next to confirm pairing survived the split.

## Validation scripts

```bash
python .claude/skills/context-partitioner/scripts/check_bloat.py [dir ...]        # default: dev/specs dev/plans
python .claude/skills/context-partitioner/scripts/build_dependency_graph.py [--write <path>]
```

## References

- `references/chunking-recipe.md` — a worked before/after example splitting a real bloated file.
- `references/dependency-schema.md` — the `depends_on` / `part_of` frontmatter fields in full, and how cycle/staleness detection works.
