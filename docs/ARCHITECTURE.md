# Architecture

## Backend

The Express API follows an MVC-style structure.

- Routes define HTTP surface and role middleware.
- Controllers handle request/response logic.
- Models contain parameterized SQL queries.
- Validators contain express-validator rules.
- Middleware centralizes JWT authentication, role authorization, validation, rate limiting, CORS, Helmet, and error handling.

All SQL uses parameter binding through `pg` to avoid injection. Passwords are hashed with bcrypt before storage. JWTs contain only `id` and `role`, and the authenticated user is reloaded from the database on protected requests.

## Frontend

The React app uses role-oriented pages under a shared dashboard layout.

- `AuthContext` owns login/signup/logout state.
- Axios interceptors attach JWTs.
- `ProtectedRoute` enforces role-based navigation.
- Reusable components keep tables, forms, buttons, stats, spinners, and star ratings consistent.
- Toasts show API success and failure states.

## UI Design Structure

- Work-focused dashboard layout with fixed desktop sidebar and mobile horizontal navigation
- Dense but readable admin tables for repeated management tasks
- Store cards for normal users, optimized for browsing and quick rating
- Owner analytics split into summary cards, store selector, and user rating table
- Neutral slate background, white work surfaces, green action color, amber rating stars
