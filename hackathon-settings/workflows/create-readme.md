---
description: Standardized workflow for generating professional, publication-ready README documentation without emojis and using relative repository paths.
---

# README Creation Workflow

This workflow defines the standard process for generating high-quality, professional `README.md` documentation for projects, hackathon submissions, and production codebases.

---

## Core Requirements & Design Principles

1. **Zero Emojis Policy:**
   - Do not include decorative emojis in document titles, section headers, badges, bullet points, or body text.
   - Maintain a clean, professional engineering tone suitable for enterprise stakeholders and technical judges.

2. **Strict Relative Pathing:**
   - All internal file references, specifications, skills, workflows, assets, and design links must use relative paths originating from the project root (e.g., `dev/specs/spec_name.md`, `.agents/skills/skill_name/SKILL.md`).
   - Never use absolute paths (e.g., `d:/...`, `C:\...`, `file:///...`).

3. **Standard Section Structure:**
   - Project Title & Tagline
   - Status & Technology Badges (SVG Shields)
   - Overview & Problem Statement Alignment
   - Key Capabilities & Technical Highlights
   - System Architecture Diagram (Mermaid)
   - Protocol / Service Deep Dives (e.g., RTC vs. RTM, IPC, API flow)
   - UI / Design Standards
   - Core Workflow / Game Loop / Interaction Pipeline
   - Tech Stack & Dependencies
   - Getting Started (Prerequisites, Setup, Environment Configuration, Run)
   - Testing & Verification Commands
   - Judging Criteria Scorecard / Evaluation Matrix (for hackathons)
   - Defined Limitations & Fallback Behavior
   - License & Attribution

---

## Step 1: Context Gathering & Specification Review

1. Inspect project requirements and specifications:
   - Read domain specifications in `dev/specs/`.
   - Read implementation plans in `dev/plans/`.
   - Read external context or hackathon prompts in `dev/context/`.
2. Identify core technical pillars:
   - Primary problem statements and domain tracks.
   - Unique architectural differentiators and technical capabilities.
   - Key protocols, SDKs, and external integrations.

---

## Step 2: Drafting Document Structure

1. **Header & Badges:**
   - Set clean top-level heading: `# <Project Name>`.
   - Add concise technical subtitle: `### <One-sentence technical summary>`.
   - Add status badges using Shields.io without emoji icons in labels.

2. **Problem Alignment & System Overview:**
   - Define target audience, problem domain, and technical objectives.
   - Construct a structured markdown table mapping problem statements to implemented technical solutions.

3. **Technical Architecture Diagram:**
   - Create a clean Mermaid diagram (`flowchart TD` or `flowchart LR`) illustrating client layers, backend engines, external services, and data flows.

4. **Deep Dives & Capabilities:**
   - Highlight key capabilities using numbered or structured lists.
   - Contrast protocols or architectural layers using comparison tables (e.g., Media Stream vs. Signaling/Data Stream).

5. **Getting Started & Execution Guide:**
   - Provide exact command blocks for installation, environment setup (`.env.local.example`), and local development.
   - Provide exact testing and validation commands (`npm test`, `lint`, type checks).

6. **Safety, Limitations & Edge Cases:**
   - Explicitly document operational boundaries, fallback mechanisms, and error recovery policies.

---

## Step 3: Professional Formatting & Quality Audit

Perform the following verification checklist before finalizing the document:

- [ ] **Emoji Check:** Ensure zero emoji characters exist in any heading, table, badge, or text paragraph.
- [ ] **Relative Path Check:** Verify all markdown links use relative paths relative to repository root (`dev/...`, `.agents/...`, `src/...`).
- [ ] **Code Blocks:** Ensure all bash commands, JSON payloads, and TypeScript snippets have explicit language identifiers for syntax highlighting.
- [ ] **Mermaid Syntax:** Verify Mermaid node labels use standard text without unescaped special characters.
- [ ] **Table Formatting:** Verify all markdown tables have aligned headers and separators.
- [ ] **Spelling & Tone:** Ensure professional, active voice engineering language throughout.

---

## Step 4: Verification & Final Publication

1. Save the generated file to the repository root as `README.md`.
2. Stage and commit the changes:
   ```bash
   git add README.md
   git commit -m "docs: generate professional README documentation"
   ```
