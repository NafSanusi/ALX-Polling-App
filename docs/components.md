# Component Documentation

This document provides an overview of the primary React components used in the ALX Polling App.

---

## `PollList`

**File:** `components/PollList.tsx`

A client component responsible for rendering a list of polls. It conditionally displays "Edit" and "Delete" buttons based on whether the current user is the creator of the poll. It also manages the state for the `EditPollModal`.

### Props

- `polls: Poll[]`: An array of poll objects fetched from the database.
- `currentUserId?: string`: The ID of the currently authenticated user.

---

## `PollForm`

**File:** `app/create-poll/PollForm.tsx`

A client-side form for creating new polls. It handles dynamic adding/removing of poll options and includes client-side validation for the question and options fields.

### Features

- Dynamically add or remove option input fields.
- Displays validation errors below each respective input.
- Shows loading and success states upon submission.
- Redirects to the `/polls` dashboard after successful creation.

---

## `EditPollModal`

**File:** `components/EditPollModal.tsx`

A modal component that allows a user to edit the question of an existing poll. It is controlled by the `PollList` component.

### Props

- `poll: Poll | null`: The poll object to be edited.
- `isOpen: boolean`: Controls the visibility of the modal.
- `onClose: () => void`: Function to call when the modal should be closed.
- `onSuccess: () => void`: Callback function to execute after a successful update (e.g., to refresh the poll list).

---

## `PollDetails`

**File:** `components/PollDetails.tsx`

A client component designed to display the details of a single poll, including the question, options, and a form for voting. It also shows the results after a vote has been cast.

### Props

- `question: string`: The poll question.
- `options: string[]`: An array of poll option texts.
- `votes?: number[]`: An array of vote counts corresponding to the options.
- `onVote?: (optionIndex: number) => void`: A callback function to handle the vote submission.

---

## `PollsSkeleton`

**File:** `components/PollsSkeleton.tsx`

A simple presentation component that displays a loading skeleton UI. It is used as a fallback for a React `Suspense` boundary while the poll data is being fetched on the server.

---
