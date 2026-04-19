# Example: Basic Data Processing Refinement

## User Draft

```python
x = [10, 20, 30]
y = 0
for i in x:
y = y + i
print("total is", y)
```

## Mentor Refinement

### ✅ Refined Code

```python
prices = [10, 20, 30]
total_sum = 0

for price in prices:
    total_sum += price

print(f"Total price is: {total_sum}")
```

### 💡 What Changed?

- **Variable Names**: Changed `x` to `prices` and `y` to `total_sum` to make the code's purpose clear.
- **Indentation**: Fixed the indentation error inside the loop.
- **f-Strings**: Used f-strings for cleaner string formatting.

### 🧠 Concept Check: Accumulation

The `+=` operator is a shorthand way to add a value to an existing variable. It's used for summing up totals.

### 🌱 Future Learning (Whole Picture)

In professional data analysis, we often use `sum(prices)` instead of a loop. As you grow, you'll learn tools like **Pandas** that can do this for millions of rows in a single command!
