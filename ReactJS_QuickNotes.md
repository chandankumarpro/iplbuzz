# ReactJS Development Best Practices

- [Variable Declarations](#variable-declarations)
- [Function Declarations](#function-declarations)
- [useState Hook](#usestate-hook)
- [useEffect Hook](#useeffect-hook)
- [useRef Hook](#useref-hook)
- [useCallback Hook](#usecallback-hook)
- [useReducer Hook](#usereducer-hook)

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

## useRef Hook

1. Syntax

    ```js
    const ref = useRef(null)
    ```

2. We can use **`useRef`** hook to:
    a. Persist value across renders without trigger re-renders.
    b. Directly reference DOM element.
    c. It returns a mutable object **`{current:value}`**.
3. Don't read or write **`ref.current`** during rendering.
4. Don't pass **`useRef`** to your own component like below:

    ```js
    // below code will throw error : Cannot read properties of null
    const inputRef = useRef(null);

    return <MyInput ref={inputRef} />;
    ```

5. If we need to pass ref to child component we need to wrap child component with forwardRef.

    ```js
    import {forwardRef} from 'react'
    const MyInput = forwardRef((props, ref) => {
        return (
            <div>
                <label>{props.label}</label>
                <input ref={ref} {...props} />
            </div>
        );
    });
    ```

## useCallback Hook

1. Syntax

    ```js
    const callbackFn = useCallback(() => {
    // function body
    }, [dependencies]);
    ```

2. useCallback is a React Hook that lets you cache a function definition between re-renders.
3. You should only rely on useCallback as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add useCallback back.
4. Don't use **`useCallback`** if you are not passing function to children or memoize hook.
5. Don't use **`useCallback`** if your funtion doesn't use fequently changing props and state.

## useReducer Hook

1. Syntax:

    ```js
    const [state, dispatch] = useReducer(reducerFn, initialState);
    ```

2. useReducer is a React Hook that lets you add a reducer to your component. This hook is used for managing state transitions.

3. We can use **`useReducer`** if:
    a. Our State logic is complex.
    b. State update depends on previous state.
    c. Two of more state having same related states.

4. Example

    ```js
    const initialFormState = {
      name: '',
      email: '',
      isTouched: false
    };

    const formReducer = (state, action) => {
      switch (action.type) {
        case 'UPDATE_FIELD':
          return { ...state, [action.field]: action.value };
        case 'TOUCH':
          return { ...state, isTouched: true };
        case 'RESET':
          return { name: '', email: '', isTouched: false };
        default:
          return state;
      }
    };


    const Export default FormComponent() {
    const [state, dispatch] = useReducer(formReducer, initialFormState);

        return (
            <form>
                <input
                  value={state.name}
                  onChange={e =>
                    dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })
                  }
                />
                <input
                  value={state.email}
                  onChange={e =>
                    dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })
                  }
                />
                <button type="button" onClick={() => dispatch({ type: 'TOUCH' })}>
                  Touch
                </button>
                <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
                    Reset
                </button>
            </form>
        );
    }
    ```

5. State is read-only. Don’t modify any objects or arrays in state. Instead, always return new objects from your reducer:

    ```js
    function reducer(state, action) {
        switch (action.type) {
            case 'incremented_age': {
                return {
                ...state,// copy all properties of state
                age: state.age + 1
                };
            }
        }
    }
    ```
