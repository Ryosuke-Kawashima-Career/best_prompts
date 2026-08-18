---
description: Run an automated architectural analysis, directory tree inspection, and Mermaid diagram visualization for the project.
---

# 🏛️ Architecture Visualization Workflow

This workflow guides the agent through inspecting the current repository, deriving structural boundaries, and generating comprehensive Mermaid diagrams and directory trees in English.

---

## Step 1: Discover Repository Structure

1. Inspect the workspace root and determine the tech stack (e.g. Tauri + React + TypeScript + Rust).
2. Execute the directory tree generation script:
   ```powershell
   pwsh -File .agents/skills/architecture-visualizer/scripts/generate_tree.ps1 -TargetDir "." -MaxDepth 3
   ```
3. Read relevant entry points (e.g. `src/main.tsx`, `src/App.tsx`, `src-tauri/src/lib.rs`).

---

## Step 2: Formulate System Architecture

1. Map the process and module boundaries:
   - Identify UI components and frontend state stores.
   - Identify the transport / IPC bridge mechanism.
   - Identify backend handlers, persistent storage, and background workers.
2. Select appropriate diagram patterns from [mermaid-templates.md](../skills/architecture-visualizer/references/mermaid-templates.md).

---

## Step 3: Generate Mermaid Diagrams & Documentation

1. Synthesize the **System Architecture Flowchart** (`flowchart TB`).
2. Synthesize the **Runtime Interaction Sequence Diagram** (`sequenceDiagram`).
3. Summarize module responsibilities in a clear comparison table.

---

## Step 4: Output and Artifact Delivery

1. Present the formatted architecture visualization directly in the response.
2. (Optional) If requested by the user, export the diagram and specification to `dev/output/architecture_visualization.md` or a requested markdown location.
