# Authentication Flow

1. User submits signup or login form.
2. Backend validates email, password, name, and address rules.
3. Signup hashes the password with bcrypt and creates a normal user.
4. Login compares submitted password against the stored bcrypt hash.
5. Backend signs a JWT containing user id and role.
6. Frontend stores the JWT and user profile in local storage.
7. Axios attaches `Authorization: Bearer <token>` to API requests.
8. Express auth middleware verifies the JWT and reloads the user from the database.
9. Role middleware checks whether the user can access the route.
10. Logout clears client-side token and user state.

For production systems that require stricter session control, add refresh tokens, token revocation, and device/session tables.
