![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

# 🏆 Top 5 of Everything

> Rank anything. Five slots. No compromises.

A full-stack application for creating, managing, and sharing personal Top 5 lists on any topic. Users define a title, category, and exactly 5 items in order of preference.

| Deployment | URL |
|------------|-----|
| Frontend | [top5-pi.vercel.app](https://top5-pi.vercel.app) |
| API | [top5-pi.vercel.app/api/v1/lists](https://top5-pi.vercel.app/api/v1/lists) |
| Trello | [trello.com/b/q31mxbym/mi-tablero-de-trello](https://trello.com/invite/b/6a0c727e5b2e2096a30f330f/ATTI6c5444d774c46b5323182bf0029561918326738A/mi-tablero-de-trello) |

---

## Features

- Create lists of exactly 5 items with title, category, and optional item descriptions
- Filter lists by category on the homepage
- View, edit, and delete lists with a confirmation modal
- Dark mode with automatic system preference detection
- Staggered entry animations for cards and items
- REST API documented with Swagger/OpenAPI
- Lazy loading of pages using React.lazy and Suspense

---

## Technologies

| Frontend | Purpose |
|----------|-----|
| React 18 | Main UI library |
| TypeScript | Static typing across the project |
| Tailwind CSS v4 | Styling and layout |
| React Router v6 | Routing and navigation |
| Vite | Build tool and dev server|

| Backend | Purpose |
|---------|-----|
| Node.js | Runtime environment |
| Express | HTTP framework and REST API |
| UUID | Unique ID generation |
| JSON file / /tmp | Data persistence |

| Tools | Purpose |
|------------|-----|
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Swagger / OpenAPI | API documentation |
| Vercel | Frontend and serverless deployment |

---

## Project Structure
```
Top5/
├── api/
│   ├── index.ts              # Vercel serverless function (Express)
│   └── tsconfig.json         # TS configuration for function
├── src/                      # React frontend
│   ├── api/
│   │   └── client.ts         # Typed API client
│   ├── components/          # Reusable components
│   ├── context/             # Context API and providers
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Route pages
│   ├── types/               # TypeScript interfaces
│   └── utils/               # Helpers
├── server/                  # Express backend (local development)
│   └── src/
│       ├── config/          # Central configuration
│       ├── routes/          # Route definitions
│       ├── controllers/     # Request/response handling
│       └── services/        # Business logic and persistence
├── docs/                    # Project documentation
├── vercel.json             # Deployment configuration
├── .env.development        # Local environment variables
└── .env.production         # Production environment variables
```
---

## Install and Run

```bash
git clone https://github.com/elohavergararod/Top5.git
cd Top5

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..

# Run frontend and backend together
npm run dev:all
```

Frontend available at `http://localhost:5173`  
API available at `http://localhost:3001/api/v1`

---

## Deploy on Vercel

### Frontend + API

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the steps
3. Add environment variable `VITE_API_URL` = `/api/v1` in the Vercel dashboard
4. Deploy to production with `vercel --prod`

### Despliegue automático

1. Connect the GitHub repository in [vercel.com/dashboard](https://vercel.com/dashboard)
2. Vercel automatically detects Vite as the framework
3. Add environment variable `VITE_API_URL` = `/api/v1`
4. Every push to `main` triggers an automatic deployment

---

*Developed during internship at [Corner Estudios](https://www.corner-estudios.com) — Elohá Vergara Rodrigues — 2026*
