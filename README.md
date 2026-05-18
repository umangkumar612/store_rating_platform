<img width="960" height="470" alt="image" src="https://github.com/user-attachments/assets/8cbada61-ec49-4ba3-81fc-a6a40c072619" /># Store Rating Platform

A production-ready full stack application where users rate stores from 1 to 5 stars. It includes role-based dashboards for administrators, normal users, and store owners.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, React Router DOM, Axios, React Hot Toast
- Backend: Node.js, Express.js, PostgreSQL, JWT, bcrypt
- Security: Helmet, CORS allowlist, rate limiting, centralized validation, password hashing

## Folder Structure

```text
client/                 React application
  src/api/              Axios client
  src/components/       Reusable layout and UI components
  src/context/          Authentication state
  src/pages/            Role-based screens
  src/routes/           Protected route wrapper
server/                 Express API
  migrations/           PostgreSQL schema
  seeds/                Seed data
  src/config/           Environment config
  src/controllers/      HTTP handlers
  src/middleware/       Auth, validation, error handling
  src/models/           SQL data access
  src/routes/           API routes
  src/validators/       express-validator rules
docs/                   Architecture and API documentation
```

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create the database:

```sql
CREATE DATABASE store_rating_platform;
```

3. Configure environment variables:

```bash
cp server/.env server/.env
cp client/.env client/.env
```

4. Run migrations and seed demo users:

```bash
npm run migrate --workspace server
npm run seed --workspace server
```

5. Start development servers:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api

## Demo Accounts

After seeding, use password `Admin@123` for every demo account.

- Admin: `admin@example.com`
- User: `user@example.com`
- Store owner: `owner@example.com`

## Validation Rules

- Name: 3 to 50 characters
- Address: maximum 400 characters
- Password: 8 to 16 characters, at least one uppercase letter and one special character
- Email: valid email format
- Rating: integer from 1 to 5

## Documentation

- [Database Schema](docs/DATABASE_SCHEMA.md)
- [API Endpoints](docs/API_ENDPOINTS.md)
- [Authentication Flow](docs/AUTH_FLOW.md)
- [Architecture](docs/ARCHITECTURE.md)

<img width="951" height="482" alt="{FEA879F0-3807-459F-B246-0A14AB88DDFF}" src="https://github.com/user-attachments/assets/102bd445-99d4-47c2-b822-126b8e9962ad" />

- [Professional UI Structure](docs/UI_STRUCTURE.md)
- [Development Plan](docs/DEVELOPMENT_PLAN.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Security and Performance](docs/SECURITY_PERFORMANCE.md)


