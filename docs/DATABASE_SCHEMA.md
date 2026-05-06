# Database Schema

The implementation uses PostgreSQL. The schema lives in `server/migrations/001_init.sql`.

## Tables

### roles

- `id` serial primary key
- `name` unique role name: `admin`, `user`, `owner`

### users

- `id` UUID primary key
- `name` varchar(60), constrained to 20-60 characters
- `email` unique, indexed case-insensitively
- `password_hash` bcrypt hash
- `address` varchar(400)
- `role_id` foreign key to `roles(id)`
- `is_active` boolean for account deactivation
- timestamps

### stores

- `id` UUID primary key
- `name` varchar(60), constrained to 20-60 characters
- `email` optional contact email
- `address` varchar(400), required
- `owner_id` nullable foreign key to `users(id)`, `ON DELETE SET NULL`
- `created_by` nullable foreign key to admin user, `ON DELETE SET NULL`
- timestamps

### ratings

- `id` UUID primary key
- `user_id` foreign key to `users(id)`, `ON DELETE CASCADE`
- `store_id` foreign key to `stores(id)`, `ON DELETE CASCADE`
- `rating` integer constrained from 1 to 5
- `comment` optional varchar(500)
- unique `(user_id, store_id)` so users can modify one rating per store
- timestamps

## Indexing

- Lowercase indexes for user email, store name, and store address searches
- Foreign-key indexes for role, owner, store, and user lookups
- Composite rating index on `(store_id, rating)` for rating analytics

## Relationships

- One role has many users
- One owner user can manage many stores
- One user can rate many stores
- One store can receive many ratings
- `ratings` is the many-to-many join table between users and stores
