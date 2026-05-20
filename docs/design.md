# Architecture and Design

## 1. Main Component Structure (Frontend)

The application follows a page-based architecture with reusable UI components.

Pages (`src/pages/`):
- `HomePage`: List of created Top 5 rankings.
- `CreateListPage`: Form for creating a new Top 5 list.
- `ListDetailPage`: Detailed view of a Top 5 list.
- `NotFoundPage`: 404 page.

Main components (`src/components/`):
- Reusable UI:
  - `Button`
  - `Input`
  - `Card`
  - `Modal`
  - `Badge`
- Domain-specific Top 5 app:
  - `Top5ListCard` → shows a summary card for a list.
  - `Top5Item` → represents one ranking item.
  - `Top5Editor` → editor for positions 1–5.
  - `CategorySelector` → selects category (movies, music, etc.).
  - `Top5ListForm` → form for creating/editing a Top 5 list.

## 2. Reusable Components

Reusable components:
- `Button`
- `Input`
- `Card`
- `Modal`
- `Badge`

Why they are reusable:
- They do not depend on the Top 5 domain.
- They can be used across forms, list views, cards, or future layouts.

## 3. Application State Management

State is managed using a hybrid approach:

Local state (`useState`):
- Form fields for create/edit list.
- Inputs inside the Top 5 editor.
- UI state such as open/closed modals.

Global state (Context API):
- `Top5Context` will hold:
    - `lists` → all current Top 5 lists.
    - `addList` → create a new list.
    - `deleteList` → remove a list.
    - `updateList` → update an existing list.

Server state (API source of truth):
- Lists are fetched from the API.
- Response state uses a pattern such as:
    - `loading` → request in progress
    - `success` → data received
    - `error` → request failed

## 4. Backend / API Design (Express)

Base URL:

`/api/v1`

### Main resources

Top 5 lists

- `GET /lists`
  - Returns all lists.
  - Response example:
    ```json
    [
      {
        "id": "1",
        "title": "Best Movies",
        "category": "movies",
        "items": [
          "Movie 1",
          "Movie 2",
          "Movie 3",
          "Movie 4",
          "Movie 5"
        ],
        "createdAt": "2026-05-19"
      }
    ]
    ```

- `GET /lists/:id`
  - Returns a single list by id.

- `POST /lists`
  - Creates a new list.
  - Request example:
    ```json
    {
      "title": "Best Songs",
      "category": "music",
      "items": ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"]
    }
    ```

- `PUT /lists/:id`
  - Updates an existing list entirely.

- `DELETE /lists/:id`
  - Deletes a list.

### Error Handling Strategy

The API uses standard HTTP status codes:

- 400 → Bad Request (validation errors)
- 404 → Not Found
- 500 → Internal Server Error

All error responses follow a consistent format:

```json
{
  "success": false,
  "error": "Descriptive error message"
}
```


## 5. Data Persistence

Persisted on the backend:
- Top 5 lists.
- Category.
- Title.
- Items (exactly 5).
- Creation date.

Client-only state:
- Form state for create/edit processes.
- UI state such as open modals and temporary inputs.
- Local filters and view-only settings.

### Data Persistence Strategy

The backend initially uses in-memory or JSON file storage.

This approach simplifies development and avoids database complexity.

The architecture is designed to support future migration to a database
(e.g. MongoDB or PostgreSQL) without affecting the frontend or API contracts.

## 6. Data Flow (Frontend ↔ API ↔ Backend)

React UI
  ↓
Custom API client (`fetch` or typed `axios`)
  ↓
`/api/v1` Express routes
  ↓
Controllers
  ↓
Services (business logic)
  ↓
Storage (JSON file / in-memory / future DB)
  ↓
Response JSON
  ↑
Frontend updates state (`Context` / hooks)

The frontend updates UI state based on API responses and synchronizes local state accordingly.

## 7. Backend Architecture (Layers)

`server/`
- `src/`
  - `routes/`
    - `lists.routes.ts`
  - `controllers/`
    - `lists.controller.ts`
  - `services/`
    - `lists.service.ts`
  - `models/`
    - `list.model.ts`
  - `config/`
  - `app.ts`

The backend is structured to ensure separation of concerns and scalability across all layers.


## 8. Typed API Client (Frontend)

`src/api/`
- `client.ts`
- `lists.api.ts`

Example interface:

```ts
export interface Top5List {
  id: string;
  title: string;
  category: string;
  items: string[];
  createdAt: string;
}
```

### Shared Type Strategy

The application uses a shared TypeScript contract between frontend and backend.

- Ensures API responses match frontend expectations
- Prevents type mismatches
- Improves maintainability and safety

Future improvement:
Move shared types to a common folder (e.g. /shared).

## 9. Architecture Decisions

- Use layered backend architecture to separate responsibilities.
- Use Context API in the frontend for simple global state rather than Redux.
- Keep the API as the single source of truth.
- Enforce exactly 5 items per list for product consistency.
- Use TypeScript end-to-end for type safety.
- Keep the backend design ready for a future database migration.

### Backend Validation

The backend enforces strict validation rules to maintain data integrity:

- title is required and must be a non-empty string
- category is required and must be a valid string
- items must be an array of strings
- Each list must contain exactly 5 items (Top 5 constraint)

### Single Source of Truth Principle

The API is the single source of truth for all application data.

- The frontend does not store permanent data
- All CRUD operations go through the backend
- Client state is derived from API responses

This prevents data inconsistencies between client and server.

## 10. Summary

The Top 5 application is built around:
- Modular frontend structure (pages + components).
- Layered backend design (routes → controllers → services).
- Clear, typed REST API.
- Hybrid state management (local + global + server).
- The architecture ensures scalability, maintainability, and a clear separation between frontend and backend concerns.
