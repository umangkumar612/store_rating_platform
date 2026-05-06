# Security, Scalability, and Performance

## Security Best Practices

- Hash passwords with bcrypt and never store plain text passwords.
- Keep JWT secrets outside source control.
- Use short-lived JWTs for high-security deployments and add refresh-token rotation if needed.
- Validate all inputs on the server.
- Use parameterized SQL queries.
- Apply Helmet security headers and restrictive CORS.
- Rate-limit public and authenticated API routes.
- Return generic login errors to avoid account enumeration.
- Use `is_active` for account suspension instead of deleting audit-relevant users.

## Scalability

- Keep controllers thin and SQL access isolated in models.
- Use indexes for search, ownership filters, and rating aggregation.
- Add cursor pagination for very large data sets.
- Cache expensive dashboard analytics if traffic grows.
- Move migrations to a dedicated migration tool such as Knex, Prisma Migrate, or node-pg-migrate for teams.

## Performance

- Select only required fields in APIs.
- Use database aggregation for ratings instead of calculating in application memory.
- Add debouncing to high-frequency frontend search in later iterations.
- Use production build assets served by a CDN.
- Add API response compression if responses become large.
