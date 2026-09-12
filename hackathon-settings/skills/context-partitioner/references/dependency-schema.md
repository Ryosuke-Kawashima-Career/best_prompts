# Dependency Schema

## Frontmatter fields

Added on top of spec-plan-sync's existing frontmatter (`document_type`, `version`, `status`, `last_updated`, `author`):

| Field | Type | Meaning |
|---|---|---|
| `part_of` | string | The topic/original-document name this chunk was split from (e.g. `"tandem"`). Lets you find every chunk of one original document without walking the directory. |
| `depends_on` | list of strings | Repo-relative paths (from the repo root, e.g. `"dev/specs/spec_tandem/02-requirements.md"`) to other chunks this one assumes or references. Empty list (`[]`) if none. |

Both accept the same YAML shapes `build_dependency_graph.py` parses:

```yaml
depends_on: []
depends_on: ["a.md", "b.md"]
depends_on:
  - a.md
  - b.md
```

## What the graph script checks

`scripts/build_dependency_graph.py` walks every `.md` file under the given roots (default `dev/specs` and `dev/plans`), reads each one's `depends_on`, and builds a directed graph where an edge `A -> B` means "A depends on B."

- **Cycles**: DFS over the graph; any back-edge to a node still on the current path is reported as a cycle. A cycle usually means two chunks were split along the wrong boundary and should be merged or re-cut.
- **Broken edges**: a `depends_on` entry whose resolved path doesn't exist on disk — almost always a stale reference left behind by a rename or further split.
- **Stale dependents**: if both the dependent and its dependency have a parseable `last_updated` date, and the dependency's date is *newer*, the dependent is flagged as possibly out of date relative to a change it depends on. This is informational, not an error — it's a prompt to re-read the dependency and confirm the dependent still holds, not an automatic failure.

## Relationship to spec-plan-sync's traceability matrix

These are two different axes and both can exist on the same chunk file without conflict:

- spec-plan-sync's `REQ-xxx` ↔ `TASK-xxx` traceability matrix tracks **which requirement a task implements** (spec ↔ plan, one specific relationship).
- `depends_on` tracks **which chunk a chunk assumes**, in either direction and within or across the specs/plans split (chunk ↔ chunk, general).

A plan chunk can simultaneously carry a traceability-matrix row (for spec-plan-sync) and a `depends_on` list (for context-partitioner) — they answer different questions and neither skill needs to read the other's field.

## Choosing dependency edges

Add an edge only when reading the dependent chunk *without* the dependency would leave a reader confused or wrong — e.g. it references a type, decision, or constraint defined elsewhere. Don't add an edge just because two chunks came from the same original document; `part_of` already captures that relationship, and an edge for every sibling chunk would make the graph useless noise.
