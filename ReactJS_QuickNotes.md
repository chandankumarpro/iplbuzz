# ReactJS Development Best Practices

- [Variable Declarations](#variable-declarations)
- [Function Declarations](#function-declarations)
- [useState Hook](#usestate-hook)
- [useEffect Hook](#useeffect-hook)

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

## useEffect Hook

1. **`useEffect`** is a React Hook that let us to perform side effects in functional components like:
    a. Fetching Data
    b. Subscribing to events
    c. Timers
    d. Manual interaction with DOM.

    Syntax:

    ```js
    useEffect(() => {
        //logic

        //clean up(optional)
        return () => {
            //logic
        }
    },[dependencies])
    ```

2. **`useEffect`** dependencies rule:
    a. `[]` - Empty dependecy for run useEffect on components mount.
    b. `[a,b]` useEffect will run on when effect a or b dependency change and on component mount.
    c. No array -- Not recomended - runs of every renders.

3. We should call **`useEffect`** at top level of our component, we can't call inside loops or conditions.
4. Remove unnecessary objects and functions from dependencies.
5. For unrelated logic we can write separate use effetcs with proper dependencies.
6. don't use Async function directly.

    ```js
    // correct use of async 
    useEffect(() => {
    const fetchData = async () => { ... };
    fetchData();
    }, []);
    ```

7. Don't mutate state inside dependency, this will result infinte loop.

    ```js
    // Never mutate like this
    useEffect(() => {
    setValue(value + 1);
    }, [value]);
    ```

8. Always write cleanup function for best practices.

    ```js
    // A sample useEffect with cleanup function
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${userId}`, { signal });
                const data = await res.json();
                setUser(data);
            } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
            // Handle other errors
            }
            }
        };

        fetchUser();

        return () => {
          controller.abort();
        };
    }, [userId]);
    ```
