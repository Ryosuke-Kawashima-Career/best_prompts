# Multi-Language Hackathon Verification & Delivery Templates

This reference template outlines standard test patterns and runnable verification commands across multiple languages (**TypeScript**, **Python**, **Rust**, and **Java**).

---

## 1. Multi-Language Test Patterns

### TypeScript (Vitest / Jest)
```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { GameEngine } from "@/lib/engine";

describe("GameEngine Verification", () => {
  let engine: GameEngine;

  beforeEach(() => {
    engine = new GameEngine();
  });

  it("initializes with clean default state", () => {
    expect(engine.getState().score).toBe(0);
  });

  it("processes actions within latency threshold", async () => {
    const start = performance.now();
    const result = await engine.processAction("test");
    expect(result.success).toBe(true);
    expect(performance.now() - start).toBeLessThan(100);
  });
});
```

### Python (Pytest)
```python
import time
import pytest
from src.engine import GameEngine

@pytest.fixture
def engine():
    return GameEngine()

def test_initial_state(engine):
    assert engine.get_state()["score"] == 0

def test_action_processing(engine):
    start = time.perf_counter()
    result = engine.process_action("test")
    duration_ms = (time.perf_counter() - start) * 1000
    
    assert result["success"] is True
    assert duration_ms < 100
```

### Rust (Cargo Test)
```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Instant;

    #[test]
    fn test_initial_state() {
        let engine = GameEngine::new();
        assert_eq!(engine.get_score(), 0);
    }

    #[test]
    fn test_action_processing() {
        let mut engine = GameEngine::new();
        let start = Instant::now();
        let result = engine.process_action("test");
        let duration = start.elapsed();

        assert!(result.is_ok());
        assert!(duration.as_millis() < 100);
    }
}
```

### Java / Kotlin (JUnit 5)
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class GameEngineTest {
    private GameEngine engine;

    @BeforeEach
    void setUp() {
        engine = new GameEngine();
    }

    @Test
    void testInitialState() {
        assertEquals(0, engine.getScore());
    }

    @Test
    void testActionProcessing() {
        long start = System.currentTimeMillis();
        boolean success = engine.processAction("test");
        long duration = System.currentTimeMillis() - start;

        assertTrue(success);
        assertTrue(duration < 100);
    }
}
```

---

## 2. Standard User Inspection Commands by Ecosystem

### TypeScript / Node.js
```bash
npm test                 # Run unit tests
npm run lint             # Static code analysis
npx tsc --noEmit         # Type check
npm run dev              # Start local dev server
```

### Python
```bash
pytest                   # Run test suite
ruff check .             # Fast linter
mypy .                   # Static type checking
python -m src.main       # Start application
```

### Rust
```bash
cargo test               # Run all unit/integration tests
cargo clippy -- -D warnings # Linter & idiom checker
cargo check              # Fast compile/type check
cargo run                # Run application binary
```

### Java (Gradle / Maven)
```bash
./gradlew test           # (or: mvn test) Run test suite
./gradlew check          # (or: mvn checkstyle:check) Linter & code quality
./gradlew run            # (or: mvn spring-boot:run) Run application
```
