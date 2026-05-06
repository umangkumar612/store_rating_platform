import { query } from "../db/pool.js";

export async function upsertRating({ userId, storeId, rating, comment }) {
  const result = await query(
    `INSERT INTO ratings (user_id, store_id, rating, comment)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, store_id)
     DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = NOW()
     RETURNING *`,
    [userId, storeId, rating, comment || null]
  );
  return result.rows[0];
}

export async function listUserRatings(userId) {
  const result = await query(
    `SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at,
            s.id AS store_id, s.name AS store_name, s.address AS store_address
     FROM ratings r
     JOIN stores s ON s.id = r.store_id
     WHERE r.user_id = $1
     ORDER BY r.updated_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function listStoreRatings(storeId) {
  const result = await query(
    `SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at,
            u.id AS user_id, u.name AS user_name, u.email AS user_email
     FROM ratings r
     JOIN users u ON u.id = r.user_id
     WHERE r.store_id = $1
     ORDER BY r.updated_at DESC`,
    [storeId]
  );
  return result.rows;
}

export async function ownerStats(ownerId) {
  const result = await query(
    `SELECT s.id, s.name,
            COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0)::float AS average_rating,
            COUNT(r.id)::int AS total_ratings
     FROM stores s
     LEFT JOIN ratings r ON r.store_id = s.id
     WHERE s.owner_id = $1
     GROUP BY s.id
     ORDER BY s.created_at DESC`,
    [ownerId]
  );
  return result.rows;
}

export async function dashboardStats() {
  const result = await query(
    `SELECT
       (SELECT COUNT(*)::int FROM users) AS total_users,
       (SELECT COUNT(*)::int FROM stores) AS total_stores,
       (SELECT COUNT(*)::int FROM ratings) AS total_ratings,
       (SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)::float FROM ratings) AS platform_average`
  );
  return result.rows[0];
}
