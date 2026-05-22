# Retrospective

## What I built

A fullstack web application called **Top 5 of Everything** — a tool to create,
manage and share personal Top 5 ranked lists on any topic. The app is built
with React + TypeScript + Tailwind CSS on the frontend and Node.js + Express
on the backend, deployed on Vercel.

## What I learned

### Connecting frontend, backend and API

The most valuable lesson was understanding how the three layers fit together
as a system. The backend defines the data shape and exposes it through REST
endpoints. The frontend consumes those endpoints through a typed API client
that maps the responses to TypeScript interfaces. The Context API then
distributes that data to any component that needs it without prop drilling.

Before this project I understood each layer separately. Building them together
made the contracts between layers concrete — a change in the backend type
immediately breaks the frontend types, which forces you to think carefully
about the shape of your data from the start.

### TypeScript across the stack

Defining shared interfaces in `src/types/index.ts` and mirroring them in
`server/src/services/lists.service.ts` made the integration much safer.
TypeScript caught several bugs at compile time that would have been silent
runtime errors in plain JavaScript — for example, passing `string | string[]`
where only `string` was expected in the Express request params.

### React patterns

Working with `useState`, `useEffect`, `useMemo` and `useCallback` in real
components — not just isolated examples — made their purpose much clearer.
`useMemo` for filtering lists by category and `useCallback` for stable
function references in the Context provider were not obvious choices at first,
but after seeing unnecessary re-renders they made complete sense.

Custom hooks (`useForm`, `useLists`, `useDarkMode`, `useLocalStorage`) turned
out to be the cleanest way to share stateful logic between components without
the overhead of a global state library.

## Main problems encountered

### API integration and types

The biggest challenge was the `string | string[]` TypeScript error in the
Express controller. `req.params.id` is typed as `string` in Express but
TypeScript inferred a broader type. The fix was a simple guard function but
finding the cause took time.

### Vercel serverless deployment

Deploying Express as a Vercel Serverless Function required more configuration
than expected. The main issues were the conflict between `"type": "module"`
in `package.json` and `module.exports` in the API file, and the missing
`api/tsconfig.json`. The `/tmp` storage limitation on Vercel also means data
is ephemeral — acceptable for this project but important to document.

### Git branch naming

Starting all work in a branch called `feature/components` instead of separate
feature branches was a mistake caught late. The lesson is to create branches
before starting work, not after. From the bonus features onwards the branch
strategy was correct.

### Dark mode with Tailwind v4

Tailwind v4 changed how dark mode works compared to v3. The `@variant dark`
directive in `index.css` was needed to make `dark:` classes work with the
class strategy. The official docs were not always clear on this for v4.

## How I used AI during development

Claude was used throughout the project as a coding assistant and architecture
advisor. The main uses were:

- **Architecture decisions** — discussing the folder structure, layered backend
  architecture, and Context vs prop drilling before writing any code.
- **Boilerplate generation** — generating repetitive but correct code like the
  Express controller methods, TypeScript interfaces, and Tailwind component
  markup.
- **Debugging** — pasting error messages and getting targeted fixes, which was
  faster than searching documentation for unfamiliar TypeScript or Express errors.
- **Documentation** — drafting the `docs/` files based on the actual code,
  ensuring the documentation matched the implementation.

The key learning about using AI for development is that it is most useful when
you understand what you are asking for. When I asked vague questions I got
generic answers. When I described the specific problem — the file, the line,
the error — the answers were precise and immediately usable.

## What I would do differently

- Create a proper database from the start (Supabase or MongoDB Atlas) instead
  of a JSON file, to avoid the ephemeral storage problem on Vercel.
- Set up the Git branching strategy before writing any code.
- Write the TypeScript interfaces before writing any component or endpoint —
  types-first development would have prevented several integration bugs.
- Add end-to-end tests with Playwright instead of only unit tests, to verify
  the full frontend-API flow automatically.

## Final reflection

This project connected concepts that had previously felt separate. Building
a real app — however small — with a proper API, typed contracts, global state,
routing, forms, deployment and documentation forced every decision to have a
reason. The constraints of the assignment (exactly 5 items, REST architecture,
layered backend) turned out to be useful design guides rather than limitations.

The result is a working, deployed application with a codebase that a developer
unfamiliar with the project could understand and extend — which is ultimately
what good software architecture means.