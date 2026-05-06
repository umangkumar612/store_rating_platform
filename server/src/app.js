import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import { apiLimiter, corsMiddleware, helmetMiddleware } from "./middleware/security.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

export const app = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);
