# Project Rules

## Folder Structure

- All feature routes must live under `/app/[feature]/`
  - Example: `/app/polls/`
- All backend endpoints must live under `/app/api/[endpoint]/route.ts`

## Forms

- Always use `react-hook-form` with `shadcn/ui`
- Wrap inputs in `<FormField>` and prefer `<Input>`, `<Select>`, `<Button>` from shadcn/ui
- Never use raw `<input>` unless outside form context

## Supabase

- Return JSON with `NextResponse.json()` for API responses
- Avoid redirects except for OAuth flows
- Don't create an action.ts file when working on backend. Create a route.ts file in a named folder that explains the feature in the app/api folder.

## TypeScript & Components

- Use arrow functions for everything, all components:
  ```ts
  const fn = async () => {};
  ```
- import Supabase from "../lib/supabaseClient" as the client has already been created
