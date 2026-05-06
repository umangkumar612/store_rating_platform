import { query } from "../db/pool.js";

const userSelect = `
  SELECT u.id, u.name, u.email, u.address, u.is_active, u.created_at, u.updated_at,
         r.name AS role
  FROM users u
  JOIN roles r ON r.id = u.role_id
`;

export async function findUserById(id) {
  const result = await query(`${userSelect} WHERE u.id = $1`, [id]);
  return result.rows[0] || null;
}

export async function findUserByEmail(email, includePassword = false) {
  const select = includePassword
    ? `${userSelect.replace("FROM users", ", u.password_hash FROM users")}`
    : userSelect;
  const result = await query(`${select} WHERE LOWER(u.email) = LOWER($1)`, [email]);
  return result.rows[0] || null;
}

export async function createUser({ name, email, passwordHash, address, role = "user" }) {
  const result = await query(
    `INSERT INTO users (name, email, password_hash, address, role_id)
     SELECT $1, LOWER($2), $3, $4, id FROM roles WHERE name = $5
     RETURNING id`,
    [name, email, passwordHash, address, role]
  );
  return findUserById(result.rows[0].id);
}

export async function updateUser(id, data) {
  const result = await query(
    `UPDATE users
     SET name = COALESCE($2, name),
         email = COALESCE(LOWER($3), email),
         address = COALESCE($4, address),
         role_id = COALESCE((SELECT id FROM roles WHERE name = $5), role_id),
         is_active = COALESCE($6, is_active),
         updated_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [id, data.name, data.email, data.address, data.role, data.isActive]
  );
  return result.rows[0] ? findUserById(id) : null;
}

export async function deleteUser(id) {
  const result = await query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
}

export async function updatePassword(id, passwordHash) {
  await query("UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1", [id, passwordHash]);
}

export async function listUsers({ search, role, sortBy = "created_at", order = "DESC", page = 1, limit = 10 }) {
  const allowedSort = new Set(["name", "email", "role", "created_at"]);
  const sort = allowedSort.has(sortBy) ? sortBy : "created_at";
  const direction = order?.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limit;
  const conditions = [];
  const params = [];

  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    conditions.push(`(LOWER(u.name) LIKE $${params.length} OR LOWER(u.email) LIKE $${params.length} OR LOWER(COALESCE(u.address, '')) LIKE $${params.length})`);
  }
  if (role) {
    params.push(role);
    conditions.push(`r.name = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const total = await query(`SELECT COUNT(*)::int AS count FROM users u JOIN roles r ON r.id = u.role_id ${where}`, params);
  const data = await query(
    `${userSelect} ${where} ORDER BY ${sort === "role" ? "r.name" : `u.${sort}`} ${direction} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  return { rows: data.rows, total: total.rows[0].count, page, limit };
}
