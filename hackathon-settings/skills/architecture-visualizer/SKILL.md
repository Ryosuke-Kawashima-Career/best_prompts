---
name: architecture-visualizer
description: >-
  Analyzes project structure, code boundaries, IPC/API patterns, and generates comprehensive directory trees and Mermaid architecture/sequence diagrams in English.
---

# Architecture Visualizer Skill

This skill provides step-by-step instructions for analyzing codebases and rendering structured architectural visualizations (ASCII directory trees, component flowcharts, sequence diagrams, and module interaction models).

---

## 1. Directory Tree Extraction

### Procedures
1. Run the directory tree helper script to inspect the project layout while ignoring build noise (`node_modules`, `target`, `.git`, `dist`):
   ```powershell
   pwsh -File .agents/skills/architecture-visualizer/scripts/generate_tree.ps1 -TargetDir "." -MaxDepth 3
   ```
2. Annotate key folders with their functional responsibilities:
   - `src/` or `app/`: Frontend / client application code.
   - `src-tauri/` or `server/` or `backend/`: Core host process / backend logic.
   - `dev/specs/`, `dev/plans/`, `dev/context/`: Specification, planning, and documentation roots.
   - `.agents/`: Agent customization configurations, rules, workflows, and skills.

---

## 2. Architectural Pattern Detection

Examine key configuration and entry point files to identify architectural patterns:
1. **Frontend / UI Layer**: Check `package.json`, `tsconfig.json`, framework entry points (`src/main.tsx`, `src/App.tsx`).
2. **IPC / Bridge Layer**: Check for `@tauri-apps/api`, electron `ipcRenderer`, WebSocket connectors, or REST/GraphQL clients.
3. **Backend / Core Engine**: Check `Cargo.toml`, `src-tauri/src/lib.rs`, `src-tauri/src/main.rs`, or backend server entry points.
4. **Data Models & State Management**: Check state libraries (Zustand, Redux, React Context, `tauri::State`, Serde schemas).

---

## 3. Mermaid Diagram Synthesis

When generating Mermaid diagrams, follow these rules:
- **Use Subgraphs**: Group components by layer or process (e.g. `Frontend (Webview Process)`, `Bridge (IPC)`, `Backend (Rust Core)`).
- **Label Quoting**: Always wrap node labels in double quotes if they contain punctuation or parentheses: `node["Label (Details)"]`.
- **Direction**: Use `flowchart TB` (top-to-bottom) for layered architectures or `flowchart LR` (left-to-right) for data pipelines.
- **Reference Templates**: Consult [references/mermaid-templates.md](./references/mermaid-templates.md) for pre-built layout patterns.

---

## 4. Standard Response Output Structure

When presenting architecture visualizations to the user, format the output as follows:

1. **Executive Summary**: 2-3 sentences explaining the overarching architecture and frameworks.
2. **Directory Architecture**: Clean ASCII tree with short functional annotations.
3. **High-Level System Architecture**: `flowchart TB` Mermaid diagram depicting the primary subsystems.
4. **Interaction / Data Flow**: `sequenceDiagram` Mermaid diagram illustrating a typical end-to-end operation (e.g. user action $\rightarrow$ IPC dispatch $\rightarrow$ backend processing $\rightarrow$ UI update).
5. **Component Breakdown**: Markdown table detailing modules, responsibilities, and relevant file paths.
