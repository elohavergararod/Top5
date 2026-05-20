# Forms

## How controlled forms work in React

A controlled form is one where React owns the input values via state.
Every keystroke calls `onChange`, which updates state, which re-renders
the input with the new value. This gives full control over what the user
can type and when the form can be submitted.

The alternative (uncontrolled forms with `ref`) is avoided here because
controlled forms make validation and error display straightforward.

## Forms in this project

### NewList form (`/new`)

Creates a new Top 5 list.

**Fields:**
- `title` — text input, required
- `category` — select dropdown, defaults to `other`
- `items[0..4].name` — text input, required for all 5
- `items[0..4].description` — text input, optional

**State managed with `useState`:**
```ts
const [title, setTitle] = useState('')
const [category, setCategory] = useState<Category>('other')
const [items, setItems] = useState(EMPTY_ITEMS)
const [errors, setErrors] = useState<Record<string, string>>({})
const [submitting, setSubmitting] = useState(false)
```

**Validation rules:**
- Title must not be empty
- All 5 item names must not be empty
- Errors are shown inline below each field in red
- The submit button is disabled while the request is in flight

**On success:** redirects to `/list/:id` of the newly created list.

### EditList form (`/list/:id/edit`)

Same fields and validation as NewList. The difference is that on mount
it fetches the existing list from the API and pre-fills all fields with
`useEffect`. On submit it calls `PUT` instead of `POST`.

**On success:** redirects back to `/list/:id`.

## Validation pattern

Validation runs on submit, not on every keystroke, to avoid showing errors
before the user has finished typing. Errors are cleared field by field as
the user corrects them:

```ts
function validate(): boolean {
  const next: Record<string, string> = {}
  if (!title.trim()) next.title = 'Title is required.'
  items.forEach((item, i) => {
    if (!item.name.trim()) next[`item-${i}`] = 'Name is required.'
  })
  setErrors(next)
  return Object.keys(next).length === 0
}
```

## Error and confirmation messages

| Situation | UI feedback |
|---|---|
| Empty required field | Red border + red text below the input |
| API error on submit | Red message above the submit button |
| Submitting in progress | Button text changes to "Saving…" and is disabled |
| Delete confirmation | `ConfirmModal` overlay before the action runs |