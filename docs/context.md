# Context API

## What is Context and when is it useful

React's Context API solves **prop drilling** — the problem of passing data
through many layers of components that don't need it themselves, just to
reach a deeply nested child that does.

Context is useful when:
- Multiple unrelated components need the same data (e.g. the list of lists)
- State needs to survive navigation between pages
- You want to avoid threading props through 3+ component levels
- The data changes and all consumers need to re-render automatically

Context is NOT a replacement for all state. Local UI state (a modal open/close,
a form input value) stays in `useState` inside the component. Only truly
global or shared state belongs in Context.

## Implementation in this project

### ListsContext

Provides the full list state and all mutation functions to any component
in the tree without prop drilling.

**What it stores:**
- `lists` — the array of TopList objects from the API
- `loading` — boolean, true while fetching
- `error` — null or an error message string

**What it exposes:**
- `fetchLists()` — GET all lists from the API
- `addList(data)` — POST a new list, prepends it to state
- `editList(id, data)` — PUT an existing list, updates it in state
- `removeList(id)` — DELETE a list, removes it from state

### ListsProvider

Wraps the entire app in `App.tsx` so every page and component has access.

### useListsContext hook

Custom hook that calls `useContext(ListsContext)` and throws a descriptive
error if used outside the Provider. This prevents silent bugs where a
component gets `null` instead of the context value.

## Data flow

```
App
└── ListsProvider  (holds state, exposes functions)
    ├── Navbar     (reads nothing from context)
    ├── Home       → useListsContext() → reads lists, loading, error, fetchLists
    ├── NewList    → useListsContext() → calls addList()
    └── ListDetail → useListsContext() → calls removeList()
```