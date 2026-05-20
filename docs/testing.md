# Testing

## Manual test checklist

### Create a list
- [x] Form renders with 5 item inputs and a category selector
- [x] Submitting with empty title shows error "Title is required."
- [x] Submitting with any empty item name shows inline error
- [x] Valid form submission creates the list and redirects to detail page
- [x] New list appears on the Home page

### View lists
- [x] Home page fetches and displays all lists on mount
- [x] Category filter buttons filter the grid correctly
- [x] "All" button resets the filter
- [x] Empty state is shown when no lists exist

### View list detail
- [x] Clicking a card navigates to /list/:id
- [x] All 5 items render with correct rank numbers
- [x] Category badge and creation date are displayed
- [x] Edit and Delete buttons are visible

### Edit a list
- [ ] Edit button navigates to /list/:id/edit
- [ ] Form is pre-filled with existing data
- [ ] Saving changes updates the list and redirects to detail
- [x] Validation works the same as the create form

### Delete a list
- [x] Clicking Delete opens the confirmation modal
- [x] Cancelling the modal closes it without deleting
- [x] Confirming deletes the list and redirects to Home
- [x] Deleted list no longer appears on Home

### 404 page
- [x] Navigating to an unknown URL renders the NotFound page
- [x] "Back to lists" link returns to Home

### API health
- [x] GET http://localhost:3001/api/health returns { status: "ok" }
- [x] GET /api/v1/lists returns the list array
- [x] POST /api/v1/lists creates a new list with correct data
- [x] DELETE /api/v1/lists/:id removes the list

---

## Responsive design

Tested at the following breakpoints:

| Breakpoint | Layout | Result |
|---|---|---|
| 375px (mobile) | Single column grid, full width form | ✓ OK |
| 768px (tablet) | Two column grid | ✓ OK |
| 1280px (desktop) | Three column grid | ✓ OK |

Navbar and forms adapt correctly at all sizes. No horizontal scroll detected.

---

## Console errors

No errors found in the browser console during manual testing.
One known issue found during testing:

| # | Description | Status |
|---|---|---|
| 1 | Edit list button not navigating correctly | 🔧 In progress |

---

## Known bugs

### Bug #1 — Edit list not working
**Steps to reproduce:** Open a list detail page and click "Edit list".  
**Expected:** Navigates to the edit form pre-filled with existing data.  
**Actual:** Button does not navigate or form does not load.  
**Fix in progress:** Route `/list/:id/edit` is registered in App.tsx.
Investigating render issue with EditList page.