import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const helmetMiddleware = helmet();

export const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "https://storeratingplatform.vercel.app",
    "https://storeratingplatform-17xt3ub10-umang-kumars-projects-4cbc98e6.vercel.app"
  ],
  credentials: true
});

export const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});