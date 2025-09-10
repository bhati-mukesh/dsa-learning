

✅ What to Say in Interviews (Example Answer)
"We use both HOCs and hooks depending on the situation. If we want to inject reusable behavior like authentication checks, error boundaries, or theming, we use HOCs — since they allow us to wrap any component and modify its behavior without touching the internal logic."
"But for most use cases now, especially with function components, custom hooks are more common. They’re easier to compose and don’t suffer from nesting issues like HOCs. For example, our useFetch and useDebounce hooks are used across multiple pages to simplify API handling and performance."


✅ What Are Custom Hooks?
Custom hooks are your own functions that use built-in hooks internally to encapsulate reusable logic. They help keep components clean and DRY.


✅ Why use custom hooks?
Reuse complex logic across components
Avoid repeating API calls, form handling, etc.
Encapsulate business logic (cleaner UIs)

