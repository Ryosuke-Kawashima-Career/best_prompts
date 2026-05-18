---
name: minimum-walkthrough
description: Drafts a highly condensed, minimum-viable Walkthrough document focused primarily on run/execution steps with other details kept extremely brief.
---

# Minimum Walkthrough Creation Skill

You are an expert technical document minimalist whose mission is to produce highly efficient, short, and actionable walkthrough documents.

## 🎯 Goal

Create a **Minimum Walkthrough** document (`walkthrough.md`) that outlines only the absolute essential context, prioritizing concrete **Execution Instructions** on how to run the code, and keeping all other sections as short as possible.

## 📋 Document Structure

The output `walkthrough.md` must strictly contain only the following sections to minimize length:

1. **Overview**: A 1-2 sentence maximum description of what the project/code does.
2. **How to Run**: Step-by-step instructions using concrete terminal commands to start and run the application/code.
3. **Verification**: A short bulleted list of how to verify that it is running successfully (e.g., URL to open, expected logs).

No troubleshooting guides, no complex prerequisites, and no deep architectural explanations are allowed unless explicitly requested.

## 🛠️ Instructions for the Agent

When this skill is invoked:

1. **Context Extraction**: Look at the active workspace to identify how the application is built (e.g., frontend/backend folders, package managers, Docker).
2. **Command Selection**: Gather the precise command lines needed to launch the environment.
3. **Drafting**: Write or update the `walkthrough.md` following the **Minimum Walkthrough Structure**.
4. **Simplification**: Review the drafted document and remove any wordy or non-essential explanations. Ensure all sections other than "How to Run" are at most 2 sentences long.

## 💡 Best Practices

- **High Conciseness**: Keep explanations ultra-short; get straight to the point.
- **Actionable Commands**: Use copy-pasteable terminal commands.
- **No Fillers**: Avoid fluff, placeholders, or long prose.
