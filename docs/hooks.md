# Hooks

## useState
Stores local component state. Used for: list arrays, loading booleans,
error strings, form field values, and the active category filter.

Example from `useLists`:
- `lists` — the array of TopList objects fetched from the API
- `loading` — true while the request is in flight
- `error` — null on success, error message string on failure

## useEffect
Runs side effects after render. Used to trigger the initial API fetch
when a component mounts. The dependency array controls when it re-runs:
an empty array `[]` means "run once on mount".

Example from `useLists`:
```ts
useEffect(() => {
  fetchLists()
}, [fetchLists])
```

## useMemo
Memoizes an expensive calculation and only recomputes it when its
dependencies change. Used to filter the lists array by category without
re-running the filter on every render.

Example from `useLists`:
```ts
const filtered = useMemo(() => {
  if (activeCategory === 'all') return lists
  return lists.filter(l => l.category === activeCategory)
}, [lists, activeCategory])
```

## useCallback
Returns a stable function reference between renders. Prevents child
components from re-rendering when a parent re-renders but the function
logic hasn't changed. Used for `fetchLists`, `remove`, and `add` inside
`useLists`, and for `setFieldValue` and `validate` inside `useForm`.

## Custom hook — useLists
Encapsulates all list-related state and logic: fetching, filtering,
adding, and deleting. Any component that needs list data calls this
hook instead of managing its own state.

Returns: `{ lists, loading, error, filtered, activeCategory,
setActiveCategory, refetch, remove, add }`

## Custom hook — useForm
Generic form hook that works with any shape of form data. Manages field
values and validation errors. Accepts an optional validation rules object
where each key is a field name and the value is a function that returns
an error string or undefined.

Returns: `{ values, errors, setFieldValue, validate, reset }`