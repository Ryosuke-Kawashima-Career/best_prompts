---
name: scaffolding
description: Builds a saved practice document that scaffolds someone's understanding of a topic through follow-up questions, each paired with a concrete real-world example and a step-by-step explanation. Use this whenever someone wants to learn, study, practice, drill, quiz themselves, or "really get" a concept — in data science, ML, deep learning, LLMs, finance, business, or general life topics — even if they don't say the word "quiz" or "questions" explicitly. Trigger on phrases like "help me understand X", "make me some practice problems on Y", "I want to get better at Z", "test my knowledge of...", "give me exercises for...", or "explain this with examples". Prefer this skill over a plain inline explanation whenever the request implies the person wants to actively practice or be walked through a concept rather than just be told about it once.
---

# Scaffolding

## What this skill is for

Some requests aren't really "explain X to me" — they're "help me build real understanding of X." The difference matters: a one-shot explanation is something a person reads once and forgets, while a scaffolded set of questions is something they can work through, get stuck on, and learn from. This skill turns a topic into that second kind of artifact: a saved practice document that walks someone from fundamentals to real-world application through a sequence of questions, each followed by a worked explanation grounded in a concrete example.

Think of it the way a good professor builds a problem set: easy questions first to cement the vocabulary and rules, then questions that force the learner to apply those rules in a slightly unfamiliar shape, then questions lifted straight from how the concept shows up in the wild — a debugging scenario, a business calculation, a real dataset, a decision someone actually has to make. By the end, the learner hasn't just been told the definition; they've seen it work, broken it, and fixed it.

## When to reach for this

Use this skill whenever the request is really about building durable understanding rather than getting a quick answer — requests to learn, practice, drill, prepare, study, get better at, or deeply understand something. This applies broadly: a numpy concept, a financial idea like compound interest or P/E ratios, a business framework like unit economics, or even a "soft" topic like how to give better feedback at work. The throughline is always the same — questions, concrete examples, step-by-step reasoning.

It's a much better fit than a plain explanation whenever you sense the person wants to *engage* with the material — to test themselves, to come back to it later, or to move from "I've heard of this" to "I can use this."

## How to build the document

### 1. Figure out the shape of the topic

Before writing anything, get clear on:
- **What's the core mechanic or rule?** (the thing that, once it clicks, makes everything else make sense)
- **Where does it actually show up?** Pick 2-4 real, specific domains or scenarios where this concept does real work — not generic placeholders like "imagine a company," but something with texture: a dataset shape, a dollar amount, a named scenario, a believable bug.
- **What's the natural order of difficulty?** Usually: rules and definitions → applying the rules in slightly awkward situations → recognizing the concept inside a bigger real-world workflow → debugging a case where someone got it wrong → a stretch question that rewards real mastery.

If the user gave you a specific angle (their job, a dataset they're working with, a goal like "I'm prepping for an interview"), bend the examples toward that — a tailored example lands far better than a generic one.

### 2. Write the questions in a deliberate progression

Aim for roughly 8-12 questions, organized into a few labeled parts (e.g., "The Rules," "Applying It," "Where It Shows Up in Practice," "Debugging," "Stretch Questions"). This isn't a rigid template — let the topic's natural structure guide the section names — but the progression from "can you state it" to "can you spot it gone wrong in the wild" is what makes a problem set feel like a real course rather than a trivia list.

Write each question so that someone could plausibly attempt it before reading on — give them enough setup to engage, not so much that the explanation is given away.

### 3. Open with a short glossary of key terms

Before the questions begin, give the learner a compact orientation: a short list of the core terms and concepts this topic depends on, each with a one- or two-sentence plain-language explanation (e.g., "**Learning rate** — the size of the step taken in the direction that reduces loss; too large and training oscillates or diverges, too small and it crawls"). Think of it as handing someone the vocabulary before the lecture starts, so that when a question uses a term like "scaled dot-product" or "trailing P/E," they're not pausing mid-question to look it up — the meaning is already in reach a few lines above.

Keep this tight — five to ten terms is usually plenty, and each entry should be a definition with a flash of intuition, not a mini-essay (the questions and their explanations are where the deep unpacking happens). This isn't busywork stacked on top of the questions; it's scaffolding in the most literal sense — the support structure that makes everything built on top of it sturdier.

### 4. Follow every question with a worked explanation

This is the heart of the skill, and where it's easy to be lazy. A good explanation does three things:
- **Answers the question directly** — don't bury the answer in a wall of context.
- **Shows the reasoning step by step** — walk through *why*, not just *what*. If shapes change, show each intermediate shape; if a calculation has stages, show each stage; if a decision has tradeoffs, name them in order.
- **Connects back to a concrete, specific scenario** — a dataset with real-feeling dimensions, a dollar figure, a named bug, a workflow someone would recognize from their own work. This is what separates a scaffolded explanation from a textbook footnote: the learner should be able to picture the situation, not just parse the abstraction.

When something commonly goes wrong (a classic off-by-one, a sign error, a misread chart, a broadcasting shape mismatch), it's worth calling that out explicitly — naming the trap is often more valuable than restating the rule.

### 5. Save it as a markdown file — don't just answer in chat

This skill exists because a saved document is something a person can return to, print, work through slowly, or share — a chat reply scrolls away. Always create an actual `.md` file (following the file-creation guidance already in your environment: write it to the user's working folder, use clear headers and horizontal rules between questions, and use `*Explanation:*` or similar to visually separate the question from its answer so a learner can cover the answer and self-test).

A good structure to follow:

```markdown
# [Topic] — Practice Questions

A short framing line about what this set covers and how to use it (e.g., "try to answer before reading the explanation").

## Key terms at a glance

- **[Term]** — [one or two plain-language sentences capturing both the definition and the intuition behind it]
- **[Term]** — ...

---

## Part 1: [Foundational theme]

**Q1.** [Question text — enough setup to attempt it]

*Explanation:* [Direct answer, then step-by-step reasoning, grounded in a concrete example]

---

**Q2.** ...
```

Close with a short "tip for self-study" — a tool, habit, or way of checking your own work that helps the learner keep growing after they finish this set.

### 6. After saving, share it and offer to go deeper

Use `present_files` (or your environment's equivalent) to hand the file over, and say briefly what it covers — don't re-explain every question in the chat itself; the document speaks for itself. If the topic is rich, it's worth offering to build a follow-up set that goes further (harder variants, an adjacent concept, or questions tailored to something specific the user is working on).

## A note on tone

Resist the urge to pad questions with throat-clearing or to write explanations that just restate the question in other words. The goal is for someone to finish the document thinking "oh, *that's* how it actually works" — which means every explanation needs to teach something the question alone didn't already reveal. When in doubt, ask: would this example survive being read by someone who actually works with this stuff every day? If it feels generic or hand-wavy, make it more specific.
