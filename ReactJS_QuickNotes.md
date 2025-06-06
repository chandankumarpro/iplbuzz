# Development Practices for ReactJS

- [Variable Declarations](#variable-declarations)
- [Function Declarations](#function-declarations)

## Variable Declarations

1. Always use **`const`** for values that do not need to be reassigned.  
2. **`const`** values can be **mutated** if they are objects or arrays.  
3. Use **`let`** if the variable is block-scoped and needs to be reassigned.  
4. Avoid using **`var`** — it gets **hoisted**, which can lead to bugs.

## Function Declarations
