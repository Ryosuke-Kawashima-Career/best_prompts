#!/usr/bin/env python3
"""Builds a dependency graph across dev/specs/ and dev/plans/ chunk files
from their `depends_on:` frontmatter, and reports cycles, broken edges,
and stale dependents.

Usage:
    python build_dependency_graph.py [dir ...]              # default: dev/specs dev/plans
    python build_dependency_graph.py --write dev/DEPENDENCY_GRAPH.md

Exit code 1 if any cycle or broken edge is found, 0 otherwise
(stale-dependent warnings are informational only).
"""
from __future__ import annotations

import re
import sys
from datetime import date
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

FRONTMATTER_RE = re.compile(r"^---\r?\n(.*?)\r?\n---", re.DOTALL)
SCALAR_RE = re.compile(r'^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$')
BLOCK_LIST_ITEM_RE = re.compile(r'^\s*-\s*(.+?)\s*$')


def strip_quotes(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def parse_inline_list(value: str) -> list[str]:
    inner = value.strip()[1:-1]  # drop [ ]
    if not inner.strip():
        return []
    return [strip_quotes(item) for item in inner.split(",") if item.strip()]


def parse_frontmatter(text: str) -> dict:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}
    fm = {}
    lines = match.group(1).splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        scalar = SCALAR_RE.match(line)
        if not scalar:
            i += 1
            continue
        key, rest = scalar.group(1), scalar.group(2).strip()
        if rest.startswith("[") and rest.endswith("]"):
            fm[key] = parse_inline_list(rest)
            i += 1
            continue
        if rest == "":
            # possible block list on following indented lines
            items = []
            j = i + 1
            while j < len(lines):
                item_match = BLOCK_LIST_ITEM_RE.match(lines[j])
                if not item_match or not lines[j].startswith((" ", "\t", "-")):
                    break
                items.append(strip_quotes(item_match.group(1)))
                j += 1
            if items:
                fm[key] = items
                i = j
                continue
            fm[key] = ""
            i += 1
            continue
        fm[key] = strip_quotes(rest)
        i += 1
    return fm


def find_markdown_files(roots: list[Path]) -> list[Path]:
    files: list[Path] = []
    for root in roots:
        if root.exists():
            files.extend(sorted(root.rglob("*.md")))
    return files


def normalize_edge(edge: str, repo_root: Path) -> Path:
    p = Path(edge)
    if not p.is_absolute():
        p = repo_root / edge
    return p.resolve()


def find_cycles(graph: dict[Path, list[Path]]) -> list[list[Path]]:
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}
    cycles: list[list[Path]] = []
    stack: list[Path] = []

    def visit(node: Path):
        color[node] = GRAY
        stack.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in color:
                continue
            if color[neighbor] == GRAY:
                idx = stack.index(neighbor)
                cycles.append(stack[idx:] + [neighbor])
            elif color[neighbor] == WHITE:
                visit(neighbor)
        stack.pop()
        color[node] = BLACK

    for node in list(graph):
        if color[node] == WHITE:
            visit(node)
    return cycles


def main() -> int:
    args = sys.argv[1:]
    write_path: Path | None = None
    if "--write" in args:
        idx = args.index("--write")
        write_path = Path(args[idx + 1])
        del args[idx : idx + 2]

    roots = [Path(a) for a in args] or [Path("dev/specs"), Path("dev/plans")]
    repo_root = Path.cwd()
    files = find_markdown_files(roots)

    if not files:
        print(f"No markdown files found under: {', '.join(str(r) for r in roots)}")
        return 0

    graph: dict[Path, list[Path]] = {}
    metadata: dict[Path, dict] = {}
    broken_edges: list[tuple[Path, str]] = []

    for path in files:
        node = path.resolve()
        fm = parse_frontmatter(path.read_text(encoding="utf-8", errors="replace"))
        metadata[node] = fm
        deps = fm.get("depends_on") or []
        if isinstance(deps, str):
            deps = [deps] if deps else []
        resolved_deps = []
        for dep in deps:
            target = normalize_edge(dep, repo_root)
            if not target.exists():
                broken_edges.append((node, dep))
                continue
            resolved_deps.append(target)
        graph[node] = resolved_deps

    def rel(p: Path) -> str:
        try:
            return p.relative_to(repo_root).as_posix()
        except ValueError:
            return p.as_posix()

    cycles = find_cycles(graph)

    stale: list[tuple[Path, Path]] = []
    for node, deps in graph.items():
        node_date = metadata[node].get("last_updated")
        for dep in deps:
            dep_date = metadata.get(dep, {}).get("last_updated")
            if not node_date or not dep_date:
                continue
            try:
                nd = date.fromisoformat(node_date)
                dd = date.fromisoformat(dep_date)
            except ValueError:
                continue
            if dd > nd:
                stale.append((node, dep))

    lines: list[str] = []
    lines.append("# Dependency Graph")
    lines.append("")
    lines.append("Auto-generated by `context-partitioner/scripts/build_dependency_graph.py`.")
    lines.append("")
    lines.append("```mermaid")
    lines.append("graph TD")
    for node, deps in graph.items():
        if not deps:
            lines.append(f'    "{rel(node)}"')
        for dep in deps:
            lines.append(f'    "{rel(node)}" --> "{rel(dep)}"')
    lines.append("```")
    lines.append("")

    had_issue = False

    if cycles:
        had_issue = True
        lines.append("## Cycles")
        for cycle in cycles:
            lines.append(f"- {' -> '.join(rel(p) for p in cycle)}")
        lines.append("")

    if broken_edges:
        had_issue = True
        lines.append("## Broken edges")
        for node, dep in broken_edges:
            lines.append(f"- `{rel(node)}` depends_on `{dep}` — target does not exist")
        lines.append("")

    if stale:
        lines.append("## Stale dependents (informational)")
        for node, dep in stale:
            lines.append(f"- `{rel(node)}` predates its dependency `{rel(dep)}` — review for drift")
        lines.append("")

    output = "\n".join(lines)
    print(output)

    if write_path:
        write_path.write_text(output + "\n", encoding="utf-8")
        print(f"\nWritten to {write_path}")

    return 1 if had_issue else 0


if __name__ == "__main__":
    sys.exit(main())
