# Deployment

## Platform

Both frontend and API are deployed on **Vercel** from the same repository.
The frontend is a static Vite build served as a CDN. The backend runs as a
Vercel Serverless Function via `api/index.ts`.

## Live URLs

| | URL |
|---|---|
| Frontend | https://top5-pi.vercel.app |
| API lists | https://top5-pi.vercel.app/api/v1/lists |
| API health | https://top5-pi.vercel.app/api/health |

## Project structure for Vercel

Top5/
├── api/
│   ├── index.ts        ← Vercel Serverless Function (Express app)
│   └── tsconfig.json   ← TypeScript config for the API function
├── dist/               ← Vite build output (auto-generated)
├── src/                ← React frontend
├── server/             ← Backend
├── vercel.json         ← Vercel configuration
├── .env.development    ← Local API URL
└── .env.production     ← Production API URL

## Environment variables

| Variable | Development | Production |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3001/api/v1` | `/api/v1` |

In production the API is served from the same domain as the frontend so
the URL is a relative path — no CORS issues.

## vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.ts" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

The first rewrite sends all `/api/*` requests to the serverless function.
The second rewrite sends everything else to `index.html` so React Router
handles client-side navigation correctly.

## Important note on data persistence

The serverless function uses `/tmp` to store `lists.json`. This storage
is ephemeral on Vercel — data resets between cold starts and new deploys.
For a production app a persistent database (MongoDB Atlas, PlanetScale,
Supabase) would replace the JSON file approach.

## Deploy steps

```bash
# Install Vercel CLI
npm i -g vercel

# First deploy (follow the prompts)
vercel

# Deploy to production
vercel --prod
```

## Automatic deploys

To enable automatic deploys on every push to `main`:

1. Go to vercel.com/dashboard
2. Click "Add New Project"
3. Import the GitHub repository
4. Leave build settings as default
5. Add environment variable `VITE_API_URL` = `/api/v1`
6. Click Deploy

## Issues found during deployment

| Issue | Cause | Fix |
|---|---|---|
| API returning 404 | `module.exports` incompatible with `"type": "module"` | Changed to `export default app` |
| API not found | Missing `api/tsconfig.json` | Added tsconfig for the serverless function |
| GitHub connection error | Repository permissions | Ignored — deploy worked without it |