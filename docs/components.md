# Components

## Navbar
Navigation bar fixed at the top. Shows the app logo and a "+ New list" button
that hides itself when the user is already on `/new`.

**Props:** none  
**Uses:** `useLocation` to detect the current route.

---

## CategoryBadge
Pill badge displaying a category emoji and label.

**Props:**
- `category: Category` — required
- `size?: 'sm' | 'md'` — default `'md'`

---

## ListCard
Clickable card linking to a list's detail page. Shows the category emoji,
title, creation date, and all 5 ranked items.

**Props:**
- `list: TopList` — required

---

## RankItem
Displays a single ranked item inside a list detail view. Rank 1–3 have
distinct gold/silver/bronze colour styles.

**Props:**
- `item: ListItem` — required

---

## LoadingSpinner
Centered spinner with an optional message. Used while API calls are in flight.

**Props:**
- `message?: string` — default `'Loading…'`

---

## EmptyState
Shown when a filtered list or the home page has no results. Optionally renders
a "Create a list" CTA button.

**Props:**
- `message?: string` — default `'No lists yet.'`
- `showAction?: boolean` — default `true`

---

## ConfirmModal
Overlay modal for destructive actions (e.g. deleting a list). Clicking the
backdrop cancels the action.

**Props:**
- `title: string` — modal heading
- `message: string` — explanatory text
- `confirmLabel?: string` — default `'Confirm'`
- `onConfirm: () => void`
- `onCancel: () => void`