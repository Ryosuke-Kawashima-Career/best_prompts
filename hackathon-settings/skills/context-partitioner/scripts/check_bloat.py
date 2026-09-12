#!/usr/bin/env python3
"""Finds dev/specs/ and dev/plans/ files that have grown too large to edit
cleanly, and suggests split points at existing `##` heading boundaries.

Usage:
    python check_bloat.py [dir ...]     # default: dev/specs dev/plans

Exit code 1 if any file is over threshold, 0 otherwise.
"""
from __future__ import annotations

import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

LINE_THRESHOLD = 300
SECTION_THRESHOLD = 6


def find_markdown_files(root: Path) -> list[Path]:
    if not root.exists():
        return []
    return sorted(root.rglob("*.md"))


def heading_lines(lines: list[str]) -> list[tuple[int, str]]:
    return [(i + 1, line.rstrip()) for i, line in enumerate(lines) if line.startswith("## ")]


def report_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    headings = heading_lines(lines)
    line_count = len(lines)
    section_count = len(headings)

    over = line_count > LINE_THRESHOLD or section_count > SECTION_THRESHOLD
    if not over:
        return False

    print(f"\n{path}")
    print(f"  {line_count} lines, {section_count} top-level sections (threshold: {LINE_THRESHOLD} lines / {SECTION_THRESHOLD} sections)")
    if headings:
        print("  suggested split points:")
        for line_no, heading in headings:
            print(f"    L{line_no}: {heading}")
    else:
        print("  no `## ` headings found — split points must be chosen manually")
    return True


def main() -> int:
    args = sys.argv[1:] or ["dev/specs", "dev/plans"]
    roots = [Path(a) for a in args]

    files: list[Path] = []
    for root in roots:
        files.extend(find_markdown_files(root))

    if not files:
        print(f"No markdown files found under: {', '.join(str(r) for r in roots)}")
        return 0

    any_over = False
    for path in files:
        if report_file(path):
            any_over = True

    if not any_over:
        print(f"No bloat found across {len(files)} file(s) under: {', '.join(str(r) for r in roots)}")
        return 0

    print("\nSee SKILL.md's Chunking Convention for how to split these.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
