# Skill Revision Plan & Evaluation Template

This template structures the planning, critical pre-execution evaluation, change logging, and verification of skill modifications.

---

## 1. Skill Revision Plan

### Target Skill
- **Name**: `example-skill`
- **Location**: `.agents/skills/example-skill/`
- **Revision Objective**: Add support for real-time WebSocket signaling without altering existing REST polling.

### Target Files & Minimal Changes
1. `SKILL.md`: Add a dedicated section for WebSocket transport under Step 3.
2. `examples/websocket-sample.ts`: Provide a standalone reference implementation.
3. `scripts/verify-connection.js`: Add automated handshake verification test.

---

## 2. Pre-Execution Plan Evaluation

Evaluate the plan against common failure modes before modifying code:

| Evaluation Check | Status | Evaluation Notes |
| :--- | :--- | :--- |
| **Breaking Changes** | ✅ Pass | Extends existing functionality; existing interfaces remain untouched. |
| **Scope Minimality** | ✅ Pass | Modifies only 1 section in `SKILL.md` and adds 2 modular files. |
| **Path & Link Integrity** | ✅ Pass | All relative and absolute links verified against project root. |
| **Verification Feasibility** | ✅ Pass | Automated tests can execute locally with zero external credentials. |

---

## 3. Change Rationale Report (Post-Execution)

| File | Change Summary | Architectural Rationale ("Why") |
| :--- | :--- | :--- |
| `SKILL.md` | Added WebSocket transport instructions | Enables sub-50ms real-time signaling required for hackathon live demo. |
| `examples/websocket-sample.ts` | Created minimalist client wrapper | Gives developers a copy-pasteable reference pattern avoiding bulky external SDKs. |
| `scripts/verify-connection.js` | Added mock handshake test | Guarantees connection logic is verified in CI without requiring live server. |

---

## 4. User Verification Commands

Provide clear terminal commands for the user to inspect and test the changes:

```bash
# 1. Verify skill structure and test health
node .agents/skills/skill-modifier/scripts/verify-skill.js .agents/skills/example-skill

# 2. Run automated test suite
npm test
```
