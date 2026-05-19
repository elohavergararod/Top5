# Project Idea — Top 5 of Everything

## Problem Statement

People constantly make mental rankings — best movies they've seen, favourite restaurants in their city, top songs of the year — but have no dedicated place to write them down, organise them, and share them with others. Notes apps are too generic, and social media is too noisy for this kind of structured personal taste.

**Top 5 of Everything** solves this by giving users a focused tool to create, manage, and share personal Top 5 lists on any topic they choose. The constraint of exactly five positions is intentional: it forces the user to think carefully, makes every list feel complete, and keeps the experience lightweight and fun.

---

## Target User

| Attribute | Description |
|-----------|-------------|
| Age range | 16 – 40 years old |
| Interests | Pop culture, music, film, food, travel, sports |
| Behaviour | Enjoys expressing opinions, light social sharing, personal organisation |
| Technical level | Comfortable with web apps; no technical knowledge required |
| Motivation | Wants a quick, satisfying way to record and share ranked opinions |

---

## Core Features

These are the features that define the product and must be delivered for the project to be complete.

1. **Create a Top 5 list** — users can create a new list by giving it a title, selecting a category (film, music, food, travel, sport, other), and adding exactly 5 ranked items with a name and optional short description.

2. **View all lists** — a home page displays all existing lists as cards, showing the title, category tag, and the first item in the ranking.

3. **View list detail** — clicking a list opens a detail page showing all 5 ranked items in order, with their descriptions.

4. **Edit a list** — users can update the title, category, or any of the 5 items in an existing list.

5. **Delete a list** — users can remove a list permanently, with a confirmation step to prevent accidental deletion.

6. **Filter by category** — users can filter the home page to show only lists from a specific category.

7. **REST API backend** — all list data is stored and served through an Express API with proper GET, POST, PUT, and DELETE endpoints.

8. **Persistent storage** — lists are saved in a JSON file on the server so data survives page refreshes and server restarts.

---

## Optional Features

These are nice-to-have features that improve the experience but are not required for a functional product.

- **Search** — a text input on the home page that filters lists by title or item name in real time.
- **Drag and drop reordering** — users can reorder the 5 items inside a list by dragging them up or down.
- **Share a list** — a button that copies a shareable URL to the list's detail page.
- **Dark mode** — a toggle that switches the UI between light and dark themes, respecting the user's OS preference by default.
- **Sort options** — ability to sort the home page by newest, oldest, or alphabetical order.
- **Item images** — optional image URL per item, displayed as a thumbnail in the list detail.

---

## Possible Future Improvements

These are ideas beyond the scope of this project that would make sense in a later version.

- **User accounts** — authentication so each user has their own private collection of lists, with the option to make lists public or private.
- **Social features** — following other users, liking lists, and a discover feed of popular public lists.
- **Collaborative lists** — inviting friends to vote on the final ranking instead of deciding alone.
- **Notifications** — alerts when someone likes or comments on a shared list.
- **Mobile app** — a React Native version using the same API, so lists are accessible on the go.
- **Export** — download a list as a styled image (for Instagram stories) or as a PDF.
- **Premium plan** — free tier limited to 10 lists; premium tier with unlimited lists, as described in the original Microapp concept.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Tailwind CSS, React Router v6 |
| Backend | Node.js, Express, TypeScript |
| Storage | JSON file (server-side); no external database required |
| Deployment | Vercel (frontend + API as serverless functions) |
| State management | React Context API + custom hooks |
| HTTP client | Native `fetch` with a typed API client (`src/api/`) |

---

## Project Structure Overview

```
top5-de-todo/
├── src/                    # React frontend
│   ├── api/                # Typed API client functions
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state (ListsContext)
│   ├── hooks/              # Custom hooks (useLists, useForm)
│   ├── pages/              # Route-level components
│   ├── types/              # Shared TypeScript interfaces
│   └── utils/              # Helper functions
├── server/                 # Express backend
│   └── src/
│       ├── routes/         # API route definitions
│       ├── controllers/    # Request handlers
│       ├── services/       # Business logic
│       └── data/           # lists.json (persistent storage)
└── docs/                   # Project documentation
```

---

## Data Model

```typescript
interface ListItem {
  id: string;
  rank: number;        // 1 to 5
  name: string;
  description?: string;
}

interface TopList {
  id: string;
  title: string;
  category: 'film' | 'music' | 'food' | 'travel' | 'sport' | 'other';
  items: ListItem[];   // Always exactly 5
  createdAt: string;  // ISO date string
  updatedAt: string;
}
```

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/lists` | Returns all lists |
| GET | `/api/v1/lists/:id` | Returns a single list |
| POST | `/api/v1/lists` | Creates a new list |
| PUT | `/api/v1/lists/:id` | Updates an existing list |
| DELETE | `/api/v1/lists/:id` | Deletes a list |

