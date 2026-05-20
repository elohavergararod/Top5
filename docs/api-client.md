# API Client & Network Layer

## Overview

The frontend communicates with the Express backend exclusively through a
typed API client located at `src/api/client.ts`. There is no LocalStorage
involved — the API is the single source of truth for all list data.

## Base request function

All API calls go through a single `request<T>` function that handles headers,
error parsing, and JSON deserialization:

```ts
async function request<T>(endpoint: string, options?: RequestInit): Promise<T>
```

If the response is not `ok`, it parses the error body and throws an `Error`
with the message from the API. This means every caller can use a simple
`try/catch` without dealing with HTTP status codes directly.

## Available functions

| Function | Method | Endpoint | Returns |
|---|---|---|---|
| `getLists()` | GET | `/api/v1/lists` | `Promise<TopList[]>` |
| `getList(id)` | GET | `/api/v1/lists/:id` | `Promise<TopList>` |
| `createList(data)` | POST | `/api/v1/lists` | `Promise<TopList>` |
| `updateList(id, data)` | PUT | `/api/v1/lists/:id` | `Promise<TopList>` |
| `deleteList(id)` | DELETE | `/api/v1/lists/:id` | `Promise<void>` |

## TypeScript contracts

All functions are fully typed. The API response envelope is:

```ts
interface ApiResponse<T> {
  data: T
  message?: string
}
```

The client unwraps the envelope and returns only `data`, so components
always work with the actual payload, never the wrapper.

The main domain types used across client and context:

```ts
interface TopList {
  id: string
  title: string
  category: Category
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

interface ListItem {
  id: string
  rank: number
  name: string
  description?: string
}
```

These types are defined in `src/types/index.ts` and imported by both the
API client and the context, keeping the contract consistent end to end.

## Network states in the UI

Every component that fetches data handles three states explicitly:

| State | How it's managed |
|---|---|
| `loading` | `boolean` in `ListsContext` state, renders `<LoadingSpinner />` |
| `data` | `lists` array in context, renders the list grid or detail view |
| `error` | `string \| null` in context, renders an error message with a Retry button |

Example from `Home.tsx`:

```tsx
{loading && <LoadingSpinner message="Fetching your lists…" />}
{error && <p>{error} <button onClick={fetchLists}>Retry</button></p>}
{!loading && !error && <ListGrid lists={filtered} />}
```

## No LocalStorage

The project intentionally avoids LocalStorage for list data. The API is
the single source of truth. Data is fetched fresh on mount via `useEffect`
and kept in React context for the duration of the session. This avoids
stale data bugs and keeps the frontend stateless between sessions.