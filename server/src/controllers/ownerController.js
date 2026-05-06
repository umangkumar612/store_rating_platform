import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ownerStats, listStoreRatings } from "../models/ratingModel.js";

export const dashboard = asyncHandler(async (req, res) => {
  const stores = await ownerStats(req.user.id);
  const totalRatings = stores.reduce((sum, store) => sum + store.total_ratings, 0);
  const average = stores.length
    ? stores.reduce((sum, store) => sum + Number(store.average_rating), 0) / stores.length
    : 0;

  res.json({
    success: true,
    data: {
      stores,
      totalRatings,
      averageRating: Number(average.toFixed(2))
    }
  });
});

export const ratingsForStore = asyncHandler(async (req, res) => {
  const stores = await ownerStats(req.user.id);
  if (!stores.some((store) => store.id === req.params.id)) {
    throw new ApiError(403, "You can only view ratings for your own stores");
  }
  res.json({ success: true, data: await listStoreRatings(req.params.id) });
});
