# 📐 Context Compaction Rules & Transformation Patterns

This reference guide provides standard transformation rules and before-and-after patterns for condensing specifications (`dev/specs/`), implementation plans (`dev/plans/`), and agent prompts in Spec-Driven Development (SDD).

---

## 1. Core Transformation Heuristics

| Pattern | Verbose Anti-Pattern (High Token Usage) | Compact Pattern (High Signal, Low Token) | Token Reduction |
|---|---|---|:---:|
| **Workflow Narrative** | Long step-by-step paragraphs describing user actions and backend processing. | Flow notation: `Step 1 -> Step 2 -> Step 3 [Error fallback]` | **~70%** |
| **Data Models** | Multiple paragraphs explaining fields, required values, and formatting. | Compact TypeScript interface or JSON schema. | **~60%** |
| **API Endpoints** | Explanations of HTTP methods, headers, and full natural language descriptions. | Minimal HTTP signature: `POST /api/v1/agent/join { channel, token } -> 200 { agent_id }` | **~65%** |
| **Requirements** | Storytelling user context with redundant adjectives and justifications. | Declarative requirement bullet with explicit Invariant and Verification Command. | **~50%** |

---

## 2. Before & After Transformation Examples

### Example A: Specification Compaction

#### 🔴 Verbose Before (240 Tokens):
```markdown
### Token Generation Service Requirements
We need to create a robust and scalable backend token generation service for the Agora WebRTC voice calling infrastructure. In order for users to securely connect to the voice channel without exposing the master Agora App Certificate to the client application, the client will first make an HTTP request to our backend API. The backend must validate that the channel name is non-empty, ensure that the user ID provided is valid, and then use the official Agora Dynamic Key generation algorithm to construct a signed token. The token must have a lifespan of exactly 24 hours (86,400 seconds). If the generation fails for any reason, the server should return an HTTP 500 error code with a JSON payload explaining the failure.
```

#### 🟢 Compacted After (68 Tokens):
```markdown
### Token Generator Contract (`REQ-01`)
- **Endpoint**: `POST /api/token`
- **Request**: `{ channel: string, uid: string }`
- **Constraints**:
  - `channel` & `uid` must be non-empty strings.
  - Expiry: `86400s` (24h).
  - Secret: `AGORA_APP_CERTIFICATE` (Backend only, never leak to client).
- **Responses**:
  - `200 OK` -> `{ token: string, expire_ts: number }`
  - `400 / 500` -> `{ error: string }`
- **Verification**: `pytest tests/test_token_service.py`
```

---

### Example B: Implementation Plan Slicing

#### 🔴 Verbose Before (Full Monolithic Plan Injected - 450 Tokens):
```markdown
[Injecting entire 10-step implementation plan covering database setup, UI theme styling, auth, payment, testing, deployment, and future roadmap when only Step 3 is being worked on.]
```

#### 🟢 Compacted Task Slice (JIT Context - 75 Tokens):
```markdown
## Active Task: Step 3 - RTC Token Service
- **Target File**: `src/services/token_service.py`
- **Objective**: Implement `generate_rtc_token(app_id, app_cert, channel, uid)` returning signed string.
- **Reference Contract**: `REQ-01` in `dev/specs/spec_voice_agent.md#L45-L60`
- **Verification Command**:
  ```bash
  python -m pytest tests/test_token_service.py -k "test_valid_token"
  ```
```

---

## 3. Delta-Only Prompting for Bug Fixing

When an AI agent is debugging a failed test, do **not** re-paste the entire file or chat history. Supply only the 3-element Delta block:

```markdown
### Context Delta: Test Failure on `test_token_generation`
1. **Failing Test Command**: `pytest tests/test_token.py`
2. **Error Output (Top 5 lines)**:
   ```
   AssertionError: assert '0' == '1002'
   - 1002
   + 0
   ```
3. **Target Function**: `src/token.py:L24-L35` (`build_token_with_uid`)
```
