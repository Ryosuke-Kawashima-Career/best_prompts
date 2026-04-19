# Example: Backend API Phase

## Phase 2: User Authentication API

**Goal**: Implement secure login and token generation.

| Task | Output | Acceptance Criteria | Testing (Verification Command) |
| :--- | :--- | :--- | :--- |
| Setup JWT | `utils/auth.py` | Token is signed with HS256 | `pytest tests/test_jwt.py` |
| Login Route | `routes/login.py` | Returns 200 and access_token | `curl -X POST -d '{"u":"admin"}'` |
| Protected Route | `routes/profile.py`| Returns 401 without token | `curl -i http://localhost/profile` |

---
**Milestone**: User can login and access their profile with a valid JWT token.
