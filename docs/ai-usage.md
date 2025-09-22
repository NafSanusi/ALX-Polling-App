# AI Usage Reflection for ALX Polling App

This document outlines how an AI coding assistant, Gemini Code Assist, was utilized throughout the development of this polling application. The goal is to provide transparency on the role of AI in the build process, from initial scaffolding to debugging and feature implementation.

## How AI Impacted the Build Process

Integrating an AI assistant into the development workflow fundamentally changed the pace and nature of the build process. Instead of writing every line of code from scratch, a significant portion of my time shifted towards articulating requirements, reviewing generated code, and guiding the AI toward the desired outcome. This made the process feel more like a high-level architectural collaboration than low-level implementation.

### What Worked Well

The AI excelled at accelerating development, particularly in generating boilerplate and scaffolding new features. When tasked with creating the initial database schema, the AI produced a well-structured set of SQL tables with appropriate relationships and security policies. Similarly, for front-end components like the poll creation form (`PollForm.tsx`) or the poll list (`PollList.tsx`), the AI provided a complete, functional starting point, including state management, event handlers, and basic styling.

One of the most impressive aspects was its ability to handle complex, multi-file features. For instance, when asked to "implement a feature to edit polls in a modal," the AI correctly identified the need for a new API route (`/api/polls/update`), a new modal component (`EditPollModal.tsx`), and the necessary state management logic in the parent component (`PollList.tsx`) to control the modal's visibility. This ability to reason about the entire feature stack, from the database to the UI, was a massive productivity boost.

### What Felt Limiting

The primary limitation was the AI's reliance on the context it was given. Initially, it frequently generated code that used its own Supabase client initialization logic instead of adhering to the project's established pattern in `lib/supabaseClient.ts`. It also defaulted to using Next.js Server Actions (`actions.ts`) until it was explicitly and repeatedly corrected to use API Routes (`route.ts`) as per the project's rules. This highlighted a key challenge: the AI doesn't inherently understand project-specific conventions without consistent guidance. It required careful review to ensure its output aligned with the existing architecture, which sometimes felt repetitive.

Furthermore, debugging with the AI could be a double-edged sword. While it was excellent at spotting common errors like mismatched API paths causing "405 Method Not Allowed" errors, it sometimes struggled with more nuanced issues. For example, when I encountered a 404 error on a dynamic page, the AI's initial suggestions were generic fixes. It took several iterations of providing more specific context about the use of mock data before it correctly identified the root cause and reverted the page to a simple client component.

### What I Learned About Prompting, Reviewing, and Iterating

This project was a masterclass in effective AI collaboration. I learned that **prompting is a skill of precision and context**. Vague requests like "fix the page" were ineffective. In contrast, specific prompts like "Refactor the PollForm so that validation errors show below each input instead of as one global error" yielded excellent results. Providing the relevant file context was crucial; the more focused the context, the more accurate the AI's response.

**Reviewing AI-generated code is non-negotiable.** I learned to treat the AI's output as a first draft from a junior developer—conceptually sound but potentially naive about project-specific patterns. I had to be vigilant about checking for adherence to my rules, such as the correct use of the Supabase client or the API route structure.

Finally, **iteration is the key to success.** The development process became a rapid cycle of prompt, review, and refine. When the AI produced code that was close but not quite right, the most effective approach was not to start over, but to provide a corrective prompt. For example, after it generated a server component that caused a cookie-related error, the follow-up prompt "That caused a 'Cookies can only be modified...' error" led it to the correct `createServerComponentClient` function. This iterative dialogue proved to be the most efficient way to guide the AI to the perfect solution.
