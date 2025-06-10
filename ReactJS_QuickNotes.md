# ReactJS Development Best Practices

- [Variable Declarations](#variable-declarations)
- [Function Declarations](#function-declarations)
- [useState Hook](#usestate-hook)
- [useEffect Hook](#useeffect-hook)
- [useRef Hook](#useref-hook)
- [useCallback Hook](#usecallback-hook)
- [useReducer Hook](#usereducer-hook)
- [State management using useState vs useReducer vs Context API](#state-management-using-usestate-vs-usereducer-vs-context-api)

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
    - **a.** Fetching Data
    - **b.** Subscribing to events
    - **c.** Timers
    - **d.** Manual interaction with DOM.

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
    - **a.** `[]` - Empty dependecy for run useEffect on components mount.
    - **b.** `[a,b]` useEffect will run on when effect a or b dependency change and on component mount.
    - **c.** No array -- Not recomended - runs of every renders.

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
    - **a.** Persist value across renders without trigger re-renders.
    - **b.** Directly reference DOM element.
    - **c.** It returns a mutable object **`{current:value}`**.
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
    - **a.** Our State logic is complex.
    - **b.** State update depends on previous state.
    - **c.** Two of more state having same related states.

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

## State Management using useState vs useReducer vs context API

1. React offers many powerful tools for managing state in our applications. useState, useReducer, and the Context API are more commonly used and are built-in functional hooks.

2. When to use **`useState`** hook:
    - When we need state for our current component and we need not to prop drill to other components.
    - It's independent, small, and doesn't require complex updates.
    - Some examples use cases are in :
        - a counter
        - form input
        - toggle state
        - tab selection
        - modal visiblity etc.
    e.g.

    ```js
    const [count, setCount] = useState(0);

    const incrementFn = () => {
        setCount(prev => prev + 1)
    }

    <button onClick={incrementFn}>Increment</button>
    ```

3. When to use **`useReducer`** hook:
    - When we have complex state logic.
        e.g.

        ```js
        // Here state of "step" may affect "error" state or formdata
        const initialState = {
          step: 1,
          formData: {},
          error: null,
        };

        function formReducer(state, action) {
          switch (action.type) {
            case 'NEXT_STEP':
              return { ...state, step: state.step + 1 };
            case 'UPDATE_FIELD':
              return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value },
              };
            case 'SET_ERROR':
              return { ...state, error: action.payload };
            default:
              return state;
          }
        }
        ```

    - When more than one state are uses for same purpose like username and email in login form.
        e.g.

        ```js
        // In this case, state of "total" is dependent on state of "item[]"
        const initialState = {
            items: [],
            total: 0,
        };

        function cartReducer(state, action) {
          switch (action.type) {
            case 'ADD_ITEM':
              const updatedItems = [...state.items, action.payload];
              const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
              return { items: updatedItems, total: updatedTotal };

            case 'REMOVE_ITEM':
              const filteredItems = state.items.filter(item => item.id !== action.payload);
              const newTotal = filteredItems.reduce((sum, item) => sum + item.price, 0);
              return { items: filteredItems, total: newTotal };

            default:
              return state;
          }
        }
        ```

    - When state action depends on previous state or other state.
        e.g.

        ```js
        // Here each "TOGGLE" action depend on state od "isOn" 
        const initialState = {
        isOn: false,
        history: [],
        };

        function toggleReducer(state, action) {
          switch (action.type) {
            case 'TOGGLE':
              return {
                isOn: !state.isOn,
                history: [...state.history, state.isOn],
              };
            case 'UNDO':
              const last = state.history.pop();
              return {
                isOn: last ?? state.isOn,
                history: [...state.history],
              };
            default:
              return state;
          }
        }
        ```

### 4.Context API

1. The Context API provides a way to pass data through the component tree without having to pass props down manually at every level (known as "prop drilling").
2. We can't over use context api, It may make components less reusable.
3. Always use contextProvider at root level of application like in app.js
4. For better performance and organization, consider breaking down your global state into smaller, more specific contexts rather than a single large context. This helps prevent unnecessary re-renders of components that only rely on a small part of the global state.  
5. Best use of context API is in simple global state management like **theme setting** and **language preference**.
6. Example of theme context

    ```js
    // ThemeContext.js
    import React, { createContext, useState, useContext } from 'react';

    const ThemeContext = createContext();

    export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={contextValue}>
          {children}
        </ThemeContext.Provider>
    );
    };

    export const useTheme = () => {
        return useContext(ThemeContext);
    };
    ```

    ```js
    import React from 'react';
    import { ThemeProvider } from './ThemeContext';
    import Header from './Header';

    function App() {
      return (
        <ThemeProvider>
            <div>
            <Header />
            // other components
            </div>
        </ThemeProvider>
      );
    }

    export default App;
    ```

    ```js
    import React from 'react';
    import { useTheme } from './ThemeContext';

    function Header() {
      const { theme, toggleTheme } = useTheme();

      return (
        <header style={{ background: theme === 'light' ? '#f0f0f0' : '#333', color: theme === 'light' ? '#333' : '#fff', padding: '10px' }}>
          <h2>Current Theme: {theme}</h2>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
      );
    }

    export default Header;
    ```

7. For more complex global state logic, it's a common and powerful pattern to combine Context API with useReducer. The useReducer manages the complex state updates, and the Context API provides the state and dispatch function to the component tree.
    e.g:

    ```js
    // AuthContext.tsx
    const AuthContext = createContext();

    const initialState = { user: null, loading: false, error: null };

    function authReducer(state, action) {
      switch (action.type) {
        case 'LOGIN_START': return { ...state, loading: true };
        case 'LOGIN_SUCCESS': return { user: action.payload, loading: false };
        case 'LOGIN_FAIL': return { ...state, error: action.payload, loading: false };
        case 'LOGOUT': return initialState;
        default: return state;
      }
    }

    function AuthProvider({ children }) {
      const [state, dispatch] = useReducer(authReducer, initialState);

      return (
        <AuthContext.Provider value={{ state, dispatch }}>
          {children}
        </AuthContext.Provider>
      );
    }
    ```

    ```js
    // Usage
    const { dispatch } = useContext(AuthContext);

    const handleLogin = async () => {
      dispatch({ type: 'LOGIN_START' });
      try {
        const user = await loginApiCall();
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (err) {
        dispatch({ type: 'LOGIN_FAIL', payload: err.message });
      }
    };
    ```
