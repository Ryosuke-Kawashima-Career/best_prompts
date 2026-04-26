# Example: Refining Simulated Annealing

## 📄 Strategy Update (`strategy.md`)
### Ver 1.2
- **Change**: Added "Swap" transition in addition to the "Move" transition.
- **Reasoning**: The "Move" transition was getting stuck in local optima; "Swap" allows larger jumps in the search space.

## ⚙️ Implementation (Rust)
```rust
// Ver 1.1: Only move
fn apply_move(state: &mut State) { ... }

// Ver 1.2: Randomly choose between Move and Swap
if rng.gen_bool(0.7) {
    apply_move(&mut state);
} else {
    apply_swap(&mut state);
}
```

## 📝 Results (`walkthrough.md`)
- **Execution**: `cargo run --release --bin tester --seed 0`
- **Result**: Score improved from 45,000 to 52,000 on Seed 0.
- **Analysis**: The "Swap" transition effectively reduced the count of unplaced items in the grid.
