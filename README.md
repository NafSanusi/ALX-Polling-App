# ALX Polling App

This is a full-stack polling application built with Next.js and Supabase. It allows users to register, log in, and create, view, vote on, edit, and delete polls.

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A Supabase account and project

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/NafSanusi/ALX-Polling-App.git
    cd alx-polling-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add your Supabase project credentials. You can find these in your Supabase project's "API" settings.

    ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Set up the database:**
    Navigate to the SQL Editor in your Supabase project dashboard and run the SQL script located in `supabase/schema.sql` (or wherever you have saved your schema) to create the `polls`, `poll_options`, and `votes` tables, along with their respective policies.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open http://localhost:3000 with your browser to see the result.

## Features Implemented

- **User Authentication**: Secure user registration and login using Supabase Auth.
- **Email Confirmation**: New user accounts require email verification.
- **Protected Routes**: Middleware protects application routes, redirecting unauthenticated users to the login page.
- **Poll Creation**: Authenticated users can create new polls with a question and multiple options.
- **Poll Dashboard**: View a list of all polls, fetched from the database.
- **Poll Management**: Users can edit (via a modal) and delete the polls they have created.
- **Voting System**: Users can vote on polls (implementation in progress).

## Technologies Used

- **Framework**: Next.js (App Router)
- **Backend & Database**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript

## Notes on AI Usage

This project was developed with the assistance of an AI coding assistant, **Gemini Code Assist**. The AI was used in the following contexts:

- **Boilerplate Code Generation**: Generating initial code for components, API routes, and database schemas.
- **Refactoring**: Improving code structure, such as refactoring a form to handle individual validation errors.
- **Debugging**: Identifying and fixing bugs, such as authentication issues between client/server components and "405 Method Not Allowed" errors in API routes.
- **Feature Implementation**: Scaffolding new features like the edit/delete functionality and the associated modals and API endpoints.
- **Documentation**: Generating and updating this `README.md` file.
