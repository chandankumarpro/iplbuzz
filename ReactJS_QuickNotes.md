# ReactJS Development Best Practices

- [Variable Declarations](#variable-declarations)
- [Function Declarations](#function-declarations)
- [useState Hook](#usestate-hook)

## Variable Declarations

1. Always use **`const`** for values that do not need to be reassigned.  
2. **`const`** values can be **mutated** if they are objects or arrays.  
3. Use **`let`** if the variable is block-scoped and needs to be reassigned e.g. for loop.  
4. Avoid using **`var`** — it gets **hoisted**, which can lead to bugs.
5. Use **`const`** in props destructuring:

    ```js
    const { name, age } = props;
    ```

6. Use **`const`** in state variables.

    ```js
    const [count, setCount] = useState(0);
    ```

## Function Declarations

### Arrow functions

1. For react component declaration prefer **Arrow function** (ES6 syntax).
2. If you are inside react component prefer to use **Arrow functions**, this will avoid re-rendering.
3. Avoid inline anonymous function inside JSX for better performamnce.
4. When passing functions to memoized or child components use **Arrow functions with useCallback** to avoid unnecessary re-renders.

    ```js
    const handleClick = useCallback(() => {}, []);
    ```

5. Function name should be meaningful or descriptive.
6. Avoid define functions inside useEffect.

### Named functions

1. Named functions have hoisting behavior.
2. We can use Named function in helper / reuadsable function outside component.
3. **`this`** binding works only in named functions, named functions get thier own **`this`**.

## useState Hook

1. **`useState`** is a React Hook that lets you add a state variable to your component.

    ```js
    const [state, setState] = useState(initialState)
    ```

2. Call useState at the top level of your component to declare one or more state variables.
3. Use right **`initialState`** value type.
4. Pass an updater function when state depends on previous state.

    ```js
    setCount(prev => prev + 1)
    ```

5. For **`Objects`** and **`Arrays`**, you should replace it rather than mutate your existing objects or arrays.

    ```js
    setForm({
    ...form,
    firstName: 'Taylor'
    });
    ```

    ```js
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
   ```

6. To get updated value after state change, use **`useEffect`**.

## useEffect
