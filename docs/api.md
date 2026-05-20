# API Reference

Base URL (development): `http://localhost:3001/api/v1`

All responses follow this envelope:
```json
{ "data": <payload>, "message": "optional string" }
```
Errors return:
```json
{ "error": "description" }
```

---

## GET /lists

Returns all lists.

**Response 200**
```json
{
  "data": [
    {
      "id": "abc-123",
      "title": "Best films of all time",
      "category": "film",
      "items": [
        { "id": "x1", "rank": 1, "name": "2001: A Space Odyssey", "description": "Kubrick" },
        { "id": "x2", "rank": 2, "name": "Mulholland Drive", "description": "Lynch" },
        { "id": "x3", "rank": 3, "name": "Stalker", "description": "Tarkovsky" },
        { "id": "x4", "rank": 4, "name": "Persona", "description": "Bergman" },
        { "id": "x5", "rank": 5, "name": "Jeanne Dielman", "description": "Akerman" }
      ],
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z"
    }
  ]
}
```

---

## GET /lists/:id

Returns a single list by ID.

**Response 200** — same shape as one item above.  
**Response 404**
```json
{ "error": "List not found" }
```

---

## POST /lists

Creates a new list.

**Request body**
```json
{
  "title": "Best films of all time",
  "category": "film",
  "items": [
    { "name": "2001: A Space Odyssey", "description": "Kubrick" },
    { "name": "Mulholland Drive", "description": "Lynch" },
    { "name": "Stalker", "description": "Tarkovsky" },
    { "name": "Persona", "description": "Bergman" },
    { "name": "Jeanne Dielman", "description": "Akerman" }
  ]
}
```

**Response 201**
```json
{ "data": { ...newList }, "message": "List created" }
```

**Response 400**
```json
{ "error": "A list must have exactly 5 items." }
```

---

## PUT /lists/:id

Updates an existing list. Requires the full body (same as POST).

**Response 200**
```json
{ "data": { ...updatedList }, "message": "List updated" }
```

**Response 404**
```json
{ "error": "List not found" }
```

---

## DELETE /lists/:id

Deletes a list permanently.

**Response 200**
```json
{ "data": null, "message": "List deleted" }
```

**Response 404**
```json
{ "error": "List not found" }
```

---

## HTTP status codes used

| Code | Meaning |
|---|---|
| 200 | OK — request succeeded |
| 201 | Created — new resource created |
| 400 | Bad request — invalid or missing fields |
| 404 | Not found — resource doesn't exist |
| 500 | Server error — unexpected failure |