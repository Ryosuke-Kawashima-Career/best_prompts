---
name: hackathon-rapid-builder
description: >-
  Builds, iterates, and verifies language-agnostic hackathon MVPs rapidly using minimalist architecture, step-by-step test verification, and actionable user check commands across TypeScript, Python, Rust, Java, and Go.
---

# ⚡ Hackathon Rapid Builder Skill (Language-Independent)

This skill guides the AI agent through building agile, lightweight, and fully verified hackathon MVPs across any programming language or technology stack (TypeScript/Node, Python, Rust, Java/Kotlin, Go, etc.).

---

## 🎯 Goal

Deliver fully functional hackathon applications by strictly prioritizing **simplicity**, **rapid test-driven step verification**, and providing **clear, actionable inspection commands** for the user at every phase, regardless of the underlying programming language.

---

## 🧭 Core Principles

1. **Simple is the Best**:
   - Avoid over-engineering, monolithic frameworks, and excessive abstraction layers.
   - Favor decoupled, self-contained modules and pure functions/classes over deep inheritance or complex design patterns.
   - Prefer standard library utilities and native runtime features over heavy third-party packages to eliminate dependency bottlenecks.

2. **Step-by-Step Verification**:
   - Never transition to the next phase until the current milestone passes automated unit/integration tests, linting, and type/compile checks.
   - Write lightweight, fast-executing tests alongside every new engine, service, or endpoint.

3. **User Inspection Enablement**:
   - Always present exact, runnable terminal commands that the user can copy-paste to test, lint, and run the application locally.

---

## 📋 5-Step Universal Development Workflow

```
   ┌────────────────────────────────┐
   │ Step 1: Minimal Project Setup  │  Initialize minimal environment, configuration & test runner
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Step 2: Core Domain Logic      │  Implement standalone engines/services with unit test coverage
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Step 3: Interface / Transport  │  Build UI views, REST/gRPC endpoints, or WebSocket signaling
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Step 4: Automated Verification │  Execute test runner, linter, and type checker (Exit Code 0)
   └────────────────┬───────────────┘
                    │
   ┌────────────────▼───────────────┐
   │ Step 5: User Walkthrough       │  Provide live demo steps & terminal commands to the user
   └────────────────────────────────┘
```

---

## 🛠️ Multi-Language Toolchain & Verification Matrix

Apply the standard commands matching the target codebase language:

| Ecosystem / Language | Automated Tests | Linter / Static Analysis | Type / Compile Check | Run Local Application |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js / TypeScript** | `npm test` (Vitest/Jest) | `npm run lint` (ESLint) | `npx tsc --noEmit` | `npm run dev` |
| **Python** | `pytest` | `ruff check .` / `flake8` | `mypy .` / `pyright` | `python -m src.main` |
| **Rust** | `cargo test` | `cargo clippy -- -D warnings` | `cargo check` | `cargo run` |
| **Java / Kotlin** | `./gradlew test` (or `mvn test`) | `./gradlew check` (or `mvn checkstyle:check`) | `./gradlew compileJava` | `./gradlew run` / `mvn spring-boot:run` |
| **Go** | `go test ./...` | `golangci-lint run` | `go vet ./...` | `go run .` |

---

## 📝 Step-by-Step Instructions

### Step 1: Minimal Project Scaffolding
1. Initialize only the essential dependencies and build configuration for the chosen stack.
2. Configure a fast, lightweight test runner for sub-second feedback loops.
3. Validate baseline environment health by executing initial tests and lint checks.

### Step 2: Standalone Engine Implementation
1. Add a brief summary header and step-by-step process comments to every source file.
2. Implement domain logic as pure, decoupled modules or classes (e.g., state machines, mathematical models, protocol parsers, audio/video handlers).
3. Write unit tests immediately to validate:
   - Initial default state
   - Happy path workflows
   - Boundary conditions and graceful error fallbacks

### Step 3: Interface & Transport Binding
1. Bind core domain engines to the presentation or transport layer:
   - Web/Desktop UI components
   - HTTP/REST/gRPC controllers
   - Real-time signaling or event buses
2. Maintain clean separation of concerns: domain logic must remain testable independently of UI or network layers.

### Step 4: Automated Verification Loop
1. Execute the full verification suite before reporting milestone completion.
2. Ensure all commands exit with code `0`. If any failure occurs, resolve it before proceeding.
3. Use the polyglot verification runner when available:
   ```bash
   node .agents/skills/hackathon-rapid-builder/scripts/verify-step.js
   ```

### Step 5: Documentation & User Command Delivery
1. Update walkthrough logs in `dev/context/walkthrough_<task-name>.md`.
2. Format final responses with the standard structure:
   - **Summary**
   - **Implementation**
   - **Verification**
   - **Files Changed**
   - **Documentation**
   - **Notes & User Commands**

---

## 💡 Best Practices for Hackathons

* **Offline-First & Local Simulation**:
  Provide mock data providers or local loopback modes so live demos function flawlessly regardless of spotty event Wi-Fi.
* **Defensive Error Boundaries**:
  Wrap external API calls and hardware I/O with timeouts and clear fallback states.
* **Keep Codebase Lean**:
  Eliminate boilerplate and dead code ruthlessly to keep code reviews and live debugging effortless.
