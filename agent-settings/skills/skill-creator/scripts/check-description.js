#!/usr/bin/env node
'use strict';

/**
 * Validates a SKILL.md's frontmatter `description` against skill-creator's
 * Three Description Rules: English only, short enough to avoid the
 * lost-in-the-middle "dumb zone", and stated as a concrete trigger.
 *
 * Usage:
 *   node check-description.js <path-to-SKILL.md>
 *   node check-description.js            # scans every SKILL.md under .claude/skills
 */

const fs = require('fs');
const path = require('path');

const MAX_CHARS_OK = 350;
const MAX_CHARS_WARN = 500;
const MAX_CHARS_FAIL = 700;

// Unicode ranges treated as non-English scripts (heuristic; extend if needed).
const NON_ENGLISH_RANGES = [
  [0x0400, 0x04ff], // Cyrillic
  [0x0600, 0x06ff], // Arabic
  [0x0900, 0x097f], // Devanagari
  [0x0e00, 0x0e7f], // Thai
  [0x3040, 0x30ff], // Hiragana / Katakana
  [0x3400, 0x4dbf], // CJK extension A
  [0x4e00, 0x9fff], // CJK unified ideographs
  [0xac00, 0xd7a3], // Hangul syllables
];

function isNonEnglishChar(codePoint) {
  return NON_ENGLISH_RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi);
}

function extractDescription(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const lines = fmMatch[1].split(/\r?\n/);
  let capturing = false;
  let baseIndent = null;
  const descLines = [];

  for (const line of lines) {
    if (!capturing) {
      const m = line.match(/^description:\s*(.*)$/);
      if (!m) continue;
      const rest = m[1].trim();
      if (rest === '' || /^[>|][-+]?$/.test(rest)) {
        capturing = true;
        continue;
      }
      return rest.replace(/^["']|["']$/g, '');
    }
    if (line.trim() === '') {
      descLines.push('');
      continue;
    }
    const indent = line.match(/^(\s*)/)[1].length;
    if (baseIndent === null) baseIndent = indent;
    if (indent < baseIndent) break;
    descLines.push(line.trim());
  }
  return descLines.join(' ').replace(/\s+/g, ' ').trim() || null;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const description = extractDescription(content);
  const issues = [];
  const infos = [];

  if (!description) {
    issues.push('No `description` field found in frontmatter.');
    return { filePath, description, chars: 0, words: 0, issues, infos };
  }

  const chars = description.length;
  const words = description.split(/\s+/).filter(Boolean).length;

  if (chars > MAX_CHARS_FAIL) {
    issues.push(
      `${chars} characters — well past the point where trigger words fall into the "dumb zone" (over ${MAX_CHARS_FAIL}).`
    );
  } else if (chars > MAX_CHARS_WARN) {
    issues.push(`${chars} characters — likely too long; trim it or switch to short discrete trigger phrases.`);
  } else if (chars > MAX_CHARS_OK) {
    infos.push(`${chars} characters — acceptable only if it enumerates genuine trigger synonyms; otherwise tighten it.`);
  }

  const nonEnglishChars = new Set();
  for (const ch of description) {
    if (isNonEnglishChar(ch.codePointAt(0))) nonEnglishChars.add(ch);
  }
  if (nonEnglishChars.size > 0) {
    issues.push(`Contains non-English script characters: ${[...nonEnglishChars].join(' ')}`);
  }

  const hasTriggerLanguage = /\b(use when|activate when|trigger|when the user|use for|use this)\b/i.test(description);
  if (!hasTriggerLanguage) {
    infos.push('No explicit "use when" / trigger phrasing detected — confirm the description states a concrete activation condition.');
  }

  return { filePath, description, chars, words, issues, infos };
}

function findSkillFiles(root) {
  const skillsDir = path.join(root, '.claude', 'skills');
  if (!fs.existsSync(skillsDir)) return [];
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(skillsDir, d.name, 'SKILL.md'))
    .filter((p) => fs.existsSync(p));
}

function main() {
  const arg = process.argv[2];
  const files = arg ? [path.resolve(arg)] : findSkillFiles(process.cwd());

  if (files.length === 0) {
    console.error('No SKILL.md files found under .claude/skills. Pass a path explicitly.');
    process.exit(1);
  }

  let hadIssues = false;
  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.log(`\n${filePath}`);
      console.log('  [issue] file not found');
      hadIssues = true;
      continue;
    }
    const result = checkFile(filePath);
    console.log(`\n${filePath}`);
    if (result.description) {
      console.log(`  description (${result.chars} chars, ${result.words} words): "${result.description}"`);
    }
    result.infos.forEach((info) => console.log(`  [info] ${info}`));
    result.issues.forEach((issue) => {
      console.log(`  [issue] ${issue}`);
      hadIssues = true;
    });
    if (result.issues.length === 0 && result.description) {
      console.log('  OK');
    }
  }

  process.exit(hadIssues ? 1 : 0);
}

main();
