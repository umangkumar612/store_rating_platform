import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";
import { createUser, findUserByEmail, findUserById, updatePassword } from "../models/userModel.js";

export const signup = asyncHandler(async (req, res) => {
  const existing = await findUserByEmail(req.body.email);
  if (existing) throw new ApiError(409, "Email is already registered");

  const passwordHash = await bcrypt.hash(req.body.password, env.bcryptSaltRounds);
  const user = await createUser({
    name: req.body.name,
    email: req.body.email,
    passwordHash,
    address: req.body.address,
    role: "user"
  });

  res.status(201).json({ success: true, token: signToken(user), user });
});

export const login = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email, true);
  if (!user || !user.is_active) throw new ApiError(401, "Invalid credentials");

  const valid = await bcrypt.compare(req.body.password, user.password_hash);
  if (!valid) throw new ApiError(401, "Invalid credentials");

  delete user.password_hash;
  res.json({ success: true, token: signToken(user), user });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: await findUserById(req.user.id) });
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.user.email, true);
  const valid = await bcrypt.compare(req.body.currentPassword, user.password_hash);
  if (!valid) throw new ApiError(400, "Current password is incorrect");

  const passwordHash = await bcrypt.hash(req.body.password, env.bcryptSaltRounds);
  await updatePassword(req.user.id, passwordHash);
  res.json({ success: true, message: "Password changed successfully" });
});
