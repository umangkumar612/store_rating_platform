# Deployment Steps

## Backend

1. Provision PostgreSQL on Render, Railway, Supabase, Neon, AWS RDS, or another managed provider.
2. Set server environment variables:
   - `NODE_ENV=production`
   - `PORT`
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `BCRYPT_SALT_ROUNDS=12`
3. Install dependencies with `npm install --workspace server`.
4. Run migrations with `npm run migrate --workspace server`.
5. Start with `npm run start --workspace server`.

## Frontend

1. Set `VITE_API_URL` to the deployed API URL plus `/api`.
2. Run `npm run build --workspace client`.
3. Deploy `client/dist` to Vercel, Netlify, Cloudflare Pages, or static hosting.

## Production Checklist

- Use HTTPS only.
- Use a strong JWT secret from a secret manager.
- Restrict CORS to the deployed frontend domain.
- Enable database backups.
- Run migrations in CI/CD or controlled release jobs.
- Monitor API errors and rate-limit events.
