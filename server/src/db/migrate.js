import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { assertEnv } from "../config/env.js";
import { pool } from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

assertEnv();

const migrationsDir = path.resolve(__dirname, "../../migrations");
const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

for (const file of files) {
  const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");
  await pool.query(sql);
  console.log(`Applied migration ${file}`);
}

await pool.end();
