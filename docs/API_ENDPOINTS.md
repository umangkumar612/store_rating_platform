# API Endpoints

Base URL: `/api`

## Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Public | Register a normal user |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | Authenticated | Current user profile |
| PATCH | `/auth/change-password` | Authenticated | Change password |
| POST | `/auth/logout` | Authenticated | Client-side logout acknowledgement |

## Admin

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/admin/stats` | Dashboard totals |
| GET | `/admin/users` | List users with search, filter, pagination, sort |
| POST | `/admin/users` | Create user, owner, or admin |
| GET | `/admin/users/:id` | User details |
| PATCH | `/admin/users/:id` | Update user |
| DELETE | `/admin/users/:id` | Delete user |
| GET | `/admin/stores` | List stores |
| POST | `/admin/stores` | Create store |
| GET | `/admin/stores/:id` | Store details |
| PATCH | `/admin/stores/:id` | Update store |
| DELETE | `/admin/stores/:id` | Delete store |
| GET | `/admin/stores/:id/ratings` | Ratings for a store |

## Normal User

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/stores` | Browse searchable stores |
| GET | `/stores/my-ratings` | View submitted ratings |
| GET | `/stores/:id` | Store details with own rating |
| POST | `/stores/:id/ratings` | Create or modify rating |

## Store Owner

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/owner/dashboard` | Store average and total rating analytics |
| GET | `/owner/stores/:id/ratings` | Users who rated one owned store |

## Query Parameters

List endpoints support:

- `page`
- `limit`
- `search`
- `sortBy`
- `order=ASC|DESC`
- `role` for user filtering
