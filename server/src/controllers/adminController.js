import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { dashboardStats, listStoreRatings } from "../models/ratingModel.js";
import { createUser, deleteUser, findUserByEmail, findUserById, listUsers, updateUser } from "../models/userModel.js";
import { createStore, deleteStore, findStoreById, listStores, updateStore } from "../models/storeModel.js";

const pageQuery = (query) => ({
  search: query.search,
  role: query.role,
  ownerId: query.ownerId,
  sortBy: query.sortBy,
  order: query.order,
  page: Number(query.page || 1),
  limit: Number(query.limit || 10)
});

export const stats = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await dashboardStats() });
});

export const getUsers = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await listUsers(pageQuery(req.query)) });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

export const addUser = asyncHandler(async (req, res) => {
  if (await findUserByEmail(req.body.email)) throw new ApiError(409, "Email is already registered");
  const passwordHash = await bcrypt.hash(req.body.password, env.bcryptSaltRounds);
  const user = await createUser({ ...req.body, passwordHash });
  res.status(201).json({ success: true, data: user });
});

export const editUser = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

export const removeUser = asyncHandler(async (req, res) => {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) throw new ApiError(404, "User not found");
  res.status(204).send();
});

export const getStores = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await listStores(pageQuery(req.query)) });
});

export const getStore = asyncHandler(async (req, res) => {
  const store = await findStoreById(req.params.id);
  if (!store) throw new ApiError(404, "Store not found");
  res.json({ success: true, data: store });
});

export const addStore = asyncHandler(async (req, res) => {
  const store = await createStore({ ...req.body, createdBy: req.user.id });
  res.status(201).json({ success: true, data: store });
});

export const editStore = asyncHandler(async (req, res) => {
  const store = await updateStore(req.params.id, req.body);
  if (!store) throw new ApiError(404, "Store not found");
  res.json({ success: true, data: store });
});

export const removeStore = asyncHandler(async (req, res) => {
  const deleted = await deleteStore(req.params.id);
  if (!deleted) throw new ApiError(404, "Store not found");
  res.status(204).send();
});

export const storeRatings = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await listStoreRatings(req.params.id) });
});
