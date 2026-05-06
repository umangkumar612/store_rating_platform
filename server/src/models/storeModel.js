import { query } from "../db/pool.js";

const storeSelect = `
  SELECT s.id, s.name, s.email, s.address, s.owner_id, s.created_at, s.updated_at,
         owner.name AS owner_name,
         COALESCE(ROUND(AVG(rt.rating)::numeric, 2), 0)::float AS average_rating,
         COUNT(rt.id)::int AS total_ratings
  FROM stores s
  LEFT JOIN users owner ON owner.id = s.owner_id
  LEFT JOIN ratings rt ON rt.store_id = s.id
`;

export async function createStore(data) {
  const result = await query(
    `INSERT INTO stores (name, email, address, owner_id, created_by)
     VALUES ($1, LOWER($2), $3, $4, $5)
     RETURNING id`,
    [data.name, data.email, data.address, data.ownerId || null, data.createdBy || null]
  );
  return findStoreById(result.rows[0].id);
}

export async function findStoreById(id, userId = null) {
  const result = await query(
    `${storeSelect}
     WHERE s.id = $1
     GROUP BY s.id, owner.name
     LIMIT 1`,
    [id]
  );
  const store = result.rows[0] || null;
  if (!store || !userId) return store;
  const rating = await query("SELECT rating, comment FROM ratings WHERE store_id = $1 AND user_id = $2", [id, userId]);
  return { ...store, user_rating: rating.rows[0]?.rating || null, user_comment: rating.rows[0]?.comment || null };
}

export async function listStores({ search, ownerId, sortBy = "created_at", order = "DESC", page = 1, limit = 10, userId = null }) {
  const allowedSort = new Set(["name", "address", "average_rating", "total_ratings", "created_at"]);
  const sort = allowedSort.has(sortBy) ? sortBy : "created_at";
  const direction = order?.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const offset = (page - 1) * limit;
  const conditions = [];
  const params = [];

  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    conditions.push(`(LOWER(s.name) LIKE $${params.length} OR LOWER(s.address) LIKE $${params.length})`);
  }
  if (ownerId) {
    params.push(ownerId);
    conditions.push(`s.owner_id = $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const total = await query(`SELECT COUNT(*)::int AS count FROM stores s ${where}`, params);
  const data = await query(
    `${storeSelect}
     ${where}
     GROUP BY s.id, owner.name
     ORDER BY ${sort === "average_rating" || sort === "total_ratings" ? sort : `s.${sort}`} ${direction}
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  if (!userId) return { rows: data.rows, total: total.rows[0].count, page, limit };

  const ratingMap = await query(
    `SELECT store_id, rating AS user_rating FROM ratings WHERE user_id = $1 AND store_id = ANY($2::uuid[])`,
    [userId, data.rows.map((store) => store.id)]
  );
  const ratings = new Map(ratingMap.rows.map((row) => [row.store_id, row.user_rating]));
  return {
    rows: data.rows.map((store) => ({ ...store, user_rating: ratings.get(store.id) || null })),
    total: total.rows[0].count,
    page,
    limit
  };
}

export async function updateStore(id, data) {
  const result = await query(
    `UPDATE stores
     SET name = COALESCE($2, name),
         email = COALESCE(LOWER($3), email),
         address = COALESCE($4, address),
         owner_id = COALESCE($5, owner_id),
         updated_at = NOW()
     WHERE id = $1
     RETURNING id`,
    [id, data.name, data.email, data.address, data.ownerId]
  );
  return result.rows[0] ? findStoreById(id) : null;
}

export async function deleteStore(id) {
  const result = await query("DELETE FROM stores WHERE id = $1", [id]);
  return result.rowCount > 0;
}
