#!/usr/bin/env python3
"""
compact_document.py
Extracts, compacts, and slices specifications and implementation plans
into high-density, token-efficient context blocks for AI coding prompts.
"""

import argparse
import os
import re
import sys
from pathlib import Path

# Force UTF-8 on Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


def estimate_tokens(text: str) -> int:
    """Rough estimation: ~4 characters per token for English markdown/code."""
    return max(1, len(text) // 4)


def strip_filler(text: str) -> str:
    """Removes HTML comments, excessive horizontal rules, and redundant blank lines."""
    # Remove HTML comments
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    # Collapse multiple blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Trim leading/trailing whitespace per line
    lines = [line.rstrip() for line in text.splitlines()]
    return "\n".join(lines).strip()


def extract_section(content: str, section_title: str) -> str:
    """Extracts a markdown section matching the heading title."""
    pattern = rf"(^#{{1,4}}\s+.*{re.escape(section_title)}.*?)(?=\n#{{1,4}}\s+|\Z)"
    match = re.search(pattern, content, flags=re.IGNORECASE | re.MULTILINE | re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""


def compact_markdown(content: str) -> str:
    """Applies basic heuristic compaction to markdown content."""
    cleaned = strip_filler(content)
    # Strip polite conversational preamble patterns
    cleaned = re.sub(r"(?i)^(Please note that|It is important to remember that|In this section, we will explain)\s*", "", cleaned, flags=re.MULTILINE)
    return cleaned


def main():
    parser = argparse.ArgumentParser(description="Compact specifications and implementation plans for token-efficient AI prompts.")
    parser.add_argument("--file", "-f", help="Path to Markdown file (spec or plan)")
    parser.add_argument("--task", "-t", help="Specific task or section name to slice (e.g. 'Task 1.2' or 'Token Generator')")
    parser.add_argument("--spec", "-s", help="Specification file for joint slicing")
    parser.add_argument("--plan", "-p", help="Implementation plan file for joint slicing")
    parser.add_argument("--output", "-o", help="Optional output file to save compacted context")

    args = parser.parse_args()

    collected_text = []

    if args.file:
        p = Path(args.file)
        if not p.exists():
            print(f"[ERROR] File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        raw = p.read_text(encoding="utf-8")
        if args.task:
            section = extract_section(raw, args.task)
            if section:
                collected_text.append(f"### Sliced Section: {args.task}\n{section}")
            else:
                collected_text.append(f"### File: {p.name}\n{compact_markdown(raw)}")
        else:
            collected_text.append(compact_markdown(raw))

    if args.spec:
        sp = Path(args.spec)
        if sp.exists():
            raw_spec = sp.read_text(encoding="utf-8")
            if args.task:
                sec = extract_section(raw_spec, args.task)
                collected_text.append(f"### Spec Requirement Slice ({sp.name}):\n{sec if sec else compact_markdown(raw_spec)}")
            else:
                collected_text.append(f"### Spec ({sp.name}):\n{compact_markdown(raw_spec)}")

    if args.plan:
        pp = Path(args.plan)
        if pp.exists():
            raw_plan = pp.read_text(encoding="utf-8")
            if args.task:
                sec = extract_section(raw_plan, args.task)
                collected_text.append(f"### Plan Task Slice ({pp.name}):\n{sec if sec else compact_markdown(raw_plan)}")
            else:
                collected_text.append(f"### Plan ({pp.name}):\n{compact_markdown(raw_plan)}")

    if not collected_text:
        print("[ERROR] No input file specified. Use --file, or --spec and --plan.", file=sys.stderr)
        sys.exit(1)

    final_compacted = "\n\n---\n\n".join(collected_text).strip()
    est_tok = estimate_tokens(final_compacted)

    print("=" * 60)
    print(f"📦 Compacted Context Summary (Est. {est_tok} tokens, {len(final_compacted)} chars)")
    print("=" * 60)
    print(final_compacted)
    print("=" * 60)

    if args.output:
        out_path = Path(args.output)
        out_path.write_text(final_compacted, encoding="utf-8")
        print(f"\n[INFO] Saved compacted context to {out_path}")


if __name__ == "__main__":
    main()
