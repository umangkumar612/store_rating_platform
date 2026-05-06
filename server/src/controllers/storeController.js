import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findStoreById, listStores } from "../models/storeModel.js";
import { listUserRatings, upsertRating } from "../models/ratingModel.js";

export const browseStores = asyncHandler(async (req, res) => {
  const data = await listStores({
    search: req.query.search,
    sortBy: req.query.sortBy,
    order: req.query.order,
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 12),
    userId: req.user.id
  });
  res.json({ success: true, data });
});

export const getStore = asyncHandler(async (req, res) => {
  const store = await findStoreById(req.params.id, req.user.id);
  if (!store) throw new ApiError(404, "Store not found");
  res.json({ success: true, data: store });
});

export const rateStore = asyncHandler(async (req, res) => {
  const store = await findStoreById(req.params.id);
  if (!store) throw new ApiError(404, "Store not found");
  const rating = await upsertRating({
    userId: req.user.id,
    storeId: req.params.id,
    rating: req.body.rating,
    comment: req.body.comment
  });
  res.json({ success: true, data: rating });
});

export const myRatings = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await listUserRatings(req.user.id) });
});
