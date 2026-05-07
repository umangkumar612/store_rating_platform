import pg from "pg";
import { env } from "../config/env.js";

export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false
  },
  max: 12,
  idleTimeoutMillis: 30000
});

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result;
}