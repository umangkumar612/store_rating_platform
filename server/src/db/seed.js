import bcrypt from "bcryptjs";
import { assertEnv, env } from "../config/env.js";
import { pool, query } from "./pool.js";

assertEnv();

const passwordHash = await bcrypt.hash("Admin@123", env.bcryptSaltRounds);

const roleRows = await query("SELECT id, name FROM roles");
const roleId = Object.fromEntries(roleRows.rows.map((role) => [role.name, role.id]));

const users = [
  ["Administrator Account", "admin@example.com", "123 Admin Street", roleId.admin],
  ["Normal Platform User Demo", "user@example.com", "456 User Avenue", roleId.user],
  ["Verified Store Owner Demo", "owner@example.com", "789 Owner Road", roleId.owner]
];

for (const [name, email, address, role] of users) {
  await query(
    `INSERT INTO users (name, email, password_hash, address, role_id)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING`,
    [name, email, passwordHash, address, role]
  );
}

const owner = await query("SELECT id FROM users WHERE email = $1", ["owner@example.com"]);
const admin = await query("SELECT id FROM users WHERE email = $1", ["admin@example.com"]);

await query(
  `INSERT INTO stores (name, email, address, owner_id, created_by)
   VALUES
    ($1, $2, $3, $4, $5),
    ($6, $7, $8, $4, $5)
   ON CONFLICT DO NOTHING`,
  [
    "Downtown Electronics Market",
    "electronics@example.com",
    "12 Business Center, Downtown",
    owner.rows[0].id,
    admin.rows[0].id,
    "Premium Fresh Grocery Store",
    "grocery@example.com",
    "42 Green Street, Central Plaza"
  ]
);

console.log("Seed data inserted");
await pool.end();
