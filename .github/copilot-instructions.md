# AI Coding Agent Instructions for Mini HRIS Frontend

## Architecture Overview
This is a **Nuxt 4 / Vue 3** frontend for the Mini HRIS application. It interacts with the Laravel backend via a RESTful API.
The application uses **Tailwind CSS 4** for styling and **@nuxt/ui** for UI components.

**Key Components:**
- **Framework**: Nuxt 4 (Vue 3, TypeScript)
- **Styling**: Tailwind CSS 4, @nuxt/ui
- **State Management**: Nuxt `useState` or Pinia (if added)
- **Validation**: Zod
- **API Interaction**: `useFetch` / `$fetch`

---

## Critical Workflows

- **Setup**
  - `npm install`
  - Installs dependencies.

- **Development**
  - `npm run dev`
  - Starts the Nuxt development server.

- **Build**
  - `npm run build`
  - Builds the application for production.

---

## Project-Specific Patterns

- **Components**
  - Located in `components/`.
  - `pathPrefix` is set to `false`, so components are auto-imported by their filename (e.g., `UserCard.vue` -> `<UserCard />`).
  - Use `<script setup lang="ts">`.

- **Pages**
  - Located in `pages/`.
  - Follow Nuxt file-based routing.

- **Validation**
  - Use **Zod** schemas for form validation and data parsing.

- **API Integration**
  - Use `useFetch` for data fetching in components/pages.
  - Define a base URL in `nuxt.config.ts` or runtime config (e.g., pointing to Laravel backend).
  - Handle JWT token attachment automatically (e.g., via a custom fetch wrapper or interceptors).

- **Styling**
  - Use Tailwind utility classes.
  - Avoid custom CSS files unless necessary; prefer `tailwind.css` or component-scoped styles.
  - Always use NuxtUI (@nuxt/ui) components for UI elements.

---

## Coding Principles

- **Composition API**
  - Always use `<script setup lang="ts">`.
  - Avoid Options API.

- **TypeScript**
  - Strict typing. Never use `any`.
  - Define interfaces/types for props and API responses.

- **Reusability**
  - Extract common UI patterns into `components/ui` or generic components.
  - Use slots for flexible content injection.
  - When a specific section is too large or is being repeated already, make it into a component. However, if it is only going to be used once or the lines of code isn't that big, opt to be in the same file.

- **Performance**
  - Use `<NuxtImg>` (via `@nuxt/image`) for images.
  - Lazy load heavy components if needed.
  - Always use the store to optimize performance. For example, when creating a user instead of refetching, we should append it to the users variable in store instead of doing a complete refetch.

- **SOLID Principles**
  - **Single Responsibility**: Each class/function should have one reason to change.
  - **Open-Closed**: Open for extension, closed for modification.
  - **Liskov Substitution**: Subtypes should be substitutable for their base types.
  - **Interface Segregation**: Clients should not be forced to depend on interfaces they do not use.
  - **Dependency Inversion**: Depend on abstractions, not concretions.

- **DRY (Don't Repeat Yourself)**
  - Avoid code duplication by extracting common logic into reusable functions, components, or utilities.

- **Code Style**
  - Avoid unnecessary assignment to a variable. If only being used once then directly use it. For example, `someFunction(Date.now())` instead of assigning to a variable unless it will be reused like: `const date = Date.now(); someFunction1(date); someOtherFunction(date);` where it is being reused.

---

## Key Files to Reference

- `nuxt.config.ts` – Nuxt configuration.
- `app.vue` – Main entry point/layout.
- `tailwind.css` – Global styles.
- `package.json` – Dependencies and scripts.

---

## Integration Points

- **Backend API**
  - Expects JSON responses from Laravel backend (`data`, `message` structure).
  - Auth: JWT token handling.
  - Endpoints: `/api/v1/...`

---

## AI Instructions (Behavior of the Coding Agent)

- **Ask Questions**
  - Clarify UI/UX requirements if vague.
  - Confirm API contract details if not provided.

- **Follow Standards**
  - Adhere to Vue 3 Style Guide (Priority A & B).
  - Use Tailwind classes idiomatically.
  - Ensure accessibility (a11y) best practices.
  - Always run `npm run build` to test for build errors, as TypeScript errors will break the build.
  - Always follow coding conventions being implemented unless the convention is already a bad practice. Always refer to industry standards and point out bad practices by the user.

- **Explain Implementations**
  - Briefly explain the "why" behind architectural choices or complex logic.

---

## AI Guardrails

- **Destructive Changes**
  - Do not delete components or pages without confirmation.
  - Do not drastically change the UI design system without approval.

- **Code Safety**
  - Ensure no sensitive data (API keys, secrets) is hardcoded in the frontend.
