# Chunking Recipe — worked example

This walks through splitting a real bloated file in this repo: `dev/specs/spec_tandem.md` (342 lines, over the 300-line threshold).

## Before

```
dev/specs/spec_tandem.md          (342 lines, one file)
  ---
  document_type: "specification"
  version: "1.21.0"
  status: "Approved"
  last_updated: "2026-09-09"
  author: "AI Agent & Lead Architect"
  ---
  # Tandem Teacher Specification
  ## 1. Intent and Scope
  ## 2. Requirements
  ## 3. Design
  ## 4. Open Questions
  ...
```

## After

```
dev/specs/spec_tandem/
  index.md         <- frontmatter + "# Tandem Teacher Specification" + "## 1. Intent and Scope" + TOC
  02-requirements.md
  03-design.md
  04-open-questions.md
```

`index.md` frontmatter:

```yaml
---
document_type: "specification"
version: "1.21.0"
status: "Approved"
last_updated: "2026-09-09"
author: "AI Agent & Lead Architect"
part_of: "tandem"
depends_on: []
---
```

`03-design.md` frontmatter — a chunk that references decisions made in the requirements chunk:

```yaml
---
document_type: "specification"
version: "1.21.0"
status: "Approved"
last_updated: "2026-09-09"
author: "AI Agent & Lead Architect"
part_of: "tandem"
depends_on: ["dev/specs/spec_tandem/02-requirements.md"]
---
```

## The matching plan side

`dev/plans/implementation_plan_tandem.md` (665 lines, also over threshold) gets split with the **same** section boundaries so spec-plan-sync's spec↔plan pairing still resolves one chunk to one chunk:

```
dev/plans/implementation_plan_tandem/
  index.md
  02-requirements.md    <- depends_on: ["dev/specs/spec_tandem/02-requirements.md"]
  03-design.md          <- depends_on: ["dev/specs/spec_tandem/03-design.md", "dev/plans/implementation_plan_tandem/02-requirements.md"]
  04-open-questions.md
```

Note the plan's `03-design.md` depends on *both* its own requirements chunk and the spec's design chunk — dependencies can cross the specs/plans boundary freely; the graph script doesn't care which directory a node lives in.

## After splitting

1. Update any file that linked to the old `spec_tandem.md` or `implementation_plan_tandem.md` path to point at `spec_tandem/index.md` (or the specific chunk, if the link was section-specific).
2. Run `build_dependency_graph.py` — confirm no broken edges from the rename.
3. Run spec-plan-sync's verifier to confirm the traceability matrix still resolves.
