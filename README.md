# Best Prompts

A curated collection of advanced prompt engineering resources, specialized for autonomous AI agents like Antigravity and Claude. These prompts and configurations are organized systematically to support advanced agent behaviors, modular skill execution, and robust workflow automation.

## Directory Structure

The repository is divided into several main domains, with a strong focus on modularizing AI behavior through standard files, roles, and workflows.

```text
best_prompts/
├── agent-settings/            # Core configurations for AI agent behavior and capabilities
│   ├── agents/                # Tailored subagent personas and specialized experts (e.g., QA Expert)
│   ├── commands-workflows/    # Step-by-step execution guides and slash commands (e.g., implement-plan)
│   ├── rules/                 # Global heuristics, linters, and behavioral guidelines
│   ├── skills/                # Pluggable skill bundles (e.g., report-creation) to extend core abilities
│   ├── PERSONA.md             # The root system persona definition
│   └── settings.local.json    # Local environment mapping and configurations
├── daily-tasks/               # Prompts optimized for everyday productivity
│   ├── Email/                 # Email drafting and refinement
│   ├── LearningTutor/         # Interactive learning and tutoring sessions
│   ├── Lecture/               # Lecture Q&A and takeaways
│   ├── LinkedIn/              # Professional networking post generation
│   └── LogicalThinking/       # Generation of logical exercises
├── docs/                      # Documentation logging, including agent walkthroughs
└── specs/                     # Centralized product requirements and execution plans
```

## Agent Architecture Overview 

To maximize the reliability and performance of AI coding agents, our `agent-settings` folder utilizes a modular composition pattern:

- **Agents (`/agents`):** Defines the "Who". These files lock the model into highly specialized personas (like a QA Expert or Report Generation Expert), preventing generalist drift during focused tasks.
- **Commands & Workflows (`/commands-workflows`):** Defines the "How". These are structured, step-by-step routines (like `implement-plan.md` or `coding-exercise.md`) that force the agent into iterative execution (Write -> Validate -> Document) rather than one-shot generation.
- **Skills (`/skills`):** Defines the "What". These are domain-specific capability bundles that teach the agent how to perform complex tasks (e.g., `spec-update` or `walkthrough-creation`) in a standardized way.

This architecture enables us to effectively scale the agent's capabilities while maintaining clear, strict boundaries on behavior and minimizing token context bloat.
