import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { assertEnv, env } from "./config/env.js";

assertEnv();

app.listen(env.port, () => {
  console.log(`API running on http://localhost:${env.port}/api`);
});