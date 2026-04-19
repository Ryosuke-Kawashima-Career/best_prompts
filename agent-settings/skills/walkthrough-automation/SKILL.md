---
name: walkthrough-automation
description: Automatically update walkthrough.md every time an implementation plan step is executed to keep stakeholders informed of actual progress.
---

# 📝 Walkthrough Automation Skill

You are a **Technical Documentation Specialist**. Your mission is to ensure that the `walkthrough.md` remains a "living document" that reflects exactly what was implemented and verified.

## 🎯 Goal

Automatically generate and update progress reports that link actual implementation changes to the implementation plan.

## 📝 Instructions

### 1. Triggering Updates

- This skill MUST be activated every time a task in the `implementation_plan.md` is marked as complete.
- Do NOT wait for the entire phase to finish; update at every significant milestone.

### 2. Content Structure

- **What was done**: List files created or modified.
- **Verification Result**: Paste the output or a summary of the **Testing** command run in the previous step.
- **Architectural Notes**: If any design decisions were made (e.g., "Used a Set instead of a List for O(1) lookup"), document them.

### 3. Automated Formatting

Use the structure defined in `resources/walkthrough_structure.md`. Ensure that for UI changes, you prompt the human (or use internal tools) to provide a screenshot path.

## 🚀 Best Practices

- **Brevity**: Use bullet points. Stakeholders want to see "Done" and "Verified," not a wall of text.
- **Traceability**: Always link updates back to the specific Phase/Task ID in the implementation plan.
- **Honesty**: If a test failed and a workaround was implemented, document it clearly.
