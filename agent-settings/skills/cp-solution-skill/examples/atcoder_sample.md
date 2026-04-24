# AtCoder Beginner Contest 123 - D: Cake 123

## 🧐 Deduction Phase (思考のプロセス)

### 🔍 Observations

- We have three lists of cake prices: $A$ (size $X$), $B$ (size $Y$), and $C$ (size $Z$).
- We need to find the $K$ largest sums of one element from each list.
- $X, Y, Z \le 1000$ and $K \le 3000$.

### 💡 Strategy: How to come up with it

1. Simple triple loop would be $O(XYZ)$, which is $10^9$—too slow.
2. However, we only need the top $K=3000$ sums.
3. We can merge $A$ and $B$ first, take the top $K$ largest sums, and then merge that result with $C$.
4. Merging $A$ and $B$ takes $O(XY)$, resulting in $10^6$ sums. Sorting them takes $O(XY \log XY)$.
5. Taking only the top $\min(XY, K)$ sums reduces the intermediate list size.
6. Merging the reduced list with $C$ takes $O(KZ)$, which is $3 \times 10^6$. Sorting the final results takes $O(KZ \log KZ)$.
7. Total complexity will be well within the time limit.

---

## 🛠️ Algorithm Walkthrough

1. **Merge A & B**: Calculate all $X \times Y$ sums of $A_i + B_j$.
2. **Sort & Truncate**: Sort these sums in descending order and keep only the top $K$ values.
3. **Merge with C**: Calculate all $K \times Z$ sums of (Top AB sums)$_i + C_k$.
4. **Final Sort**: Sort the final list and output the top $K$ values.

---

## 🦀 Rust Implementation

```rust
use proconio::input;

fn main() {
    input! {
        x: usize, y: usize, z: usize, k: usize,
        mut a: [i64; x],
        mut b: [i64; y],
        mut c: [i64; z],
    }

    let mut ab = Vec::new();
    for i in 0..x {
        for j in 0..y {
            ab.push(a[i] + b[j]);
        }
    }
    ab.sort_by(|p, q| q.cmp(p));
    ab.truncate(k);

    let mut abc = Vec::new();
    for i in 0..ab.len() {
        for j in 0..z {
            abc.push(ab[i] + c[j]);
        }
    }
    abc.sort_by(|p, q| q.cmp(p));
    abc.truncate(k);

    for val in abc {
        println!("{}", val);
    }
}
```

---

## 📊 Complexity Analysis

- **Time Complexity**: $O(XY \log XY + KZ \log KZ)$
- **Space Complexity**: $O(XY + KZ)$
