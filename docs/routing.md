# Routing

## Library

React Router v6 with `<BrowserRouter>` for HTML5 history-based navigation.

## Route structure

| Path | Page | Description |
|---|---|---|
| `/` | `Home` | Lists all Top 5 lists with category filter |
| `/new` | `NewList` | Form to create a new list |
| `/list/:id` | `ListDetail` | Detail view of a single list |
| `*` | `NotFound` | 404 fallback for any unknown path |

## How navigation works

**Between pages** — components use `<Link>` from React Router instead of
`<a>` tags. This prevents full page reloads and keeps the app feeling instant.

**After actions** — after creating or deleting a list, the app uses the
`useNavigate` hook to redirect programmatically:

- Create list → redirects to `/list/:id` of the new list
- Delete list → redirects to `/`

**Active route detection** — `Navbar` uses `useLocation` to read the current
path and hide the "+ New list" button when the user is already on `/new`.

**Dynamic segments** — `/list/:id` uses a URL parameter. `ListDetail` reads
it with `useParams<{ id: string }>()` and fetches that specific list from
the API.

## 404 page

Any path that doesn't match the four routes above falls through to the `*`
wildcard route and renders `NotFound`. This includes typos, deleted list URLs,
and any future broken links.

## Route layout

All routes share the same `<Navbar>` because it sits outside `<Routes>` but
inside `<BrowserRouter>`. Only the `<main>` content area changes per route.