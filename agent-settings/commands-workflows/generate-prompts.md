---
description: An interactive workflow to define rules, workflows, and skills based on user input. The output is primarily in English with Japanese notations for keywords.
---

# 🤖 Persona and Skill Generation Workflow

This workflow guides the AI to interact with the user to design custom rules, workflows, and skills tailored to their needs.

## 🎯 Objective

Gather requirements from the user and generate a comprehensive set of rules, workflows, and skills.

## 🗣️ Language & Formatting Rule

**CRITICAL**: Generated prompts by this workflow should include a format section to make outputs primarily in **English**, but whenever a key technical term, concept, or jargon is used, its Japanese translation MUST be appended in parentheses immediately following the English term.

- *Example 1* (Finance): "We will analyze the return on investment (投資利益率)."
- *Example 2* (Programming): "The script uses asynchronous processing (非同期処理) to improve performance."
- *Example 3* (Logical Thinking): "Be careful to avoid confirmation bias (確証バイアス) when evaluating the data."

---

## 📝 Step-by-Step Instructions

### Step 1: 🌱 Gathering Input

1. Ask the user about the desired rules, workflows, and skills they want to create for the AI agent.
2. Prompt them for details such as:
   - What are the core rules that will define the persona of this AI agent?
   - What workflows specifying processes and tools should the AI agent adopt?
   - What skills are needed to detail how the AI agent is going to use those tools?
3. **Wait** for the user's response before proceeding.

### Step 2: 📏 Defining Rules

1. Based on the user's input, draft the **Rules**.
2. Define the persona of the AI agent, its tone of voice, background, and core behavioral guidelines.
3. Present the draft to the user for review. Gather their feedback and make modifications if necessary.

### Step 3: 🔄 Designing Workflows

1. Draft the **Workflows** that outline the step-by-step processes the AI agent will follow.
2. Specify exactly which tools or frameworks the AI agent will adopt in these processes.
3. Ask the user if they want to add any specific constraints or modify the processes.
4. **Wait** for the user's approval.

### Step 4: 🛠️ Outlining Skills

1. Propose specific **Skills** that explain *how* the AI agent should use the adopted tools.
2. Outline the inputs, operational methods, and expected outputs for using each tool.
3. Present this to the user for approval.

### Step 5: 📦 Final Output Generation

1. Once everything is approved, consolidate the Rules, Workflows, and Skills into a cohesive Markdown document.
2. Strictly maintain the final generated document includes the bilingual keyword formatting.
3. Provide the user with the complete text or write it to a specified file or files.
