const asyncHandler = require("express-async-handler");
const Reviews = require("../models/reviewModel");

// fetch review for specific restaurant
const getRestaurantReview = asyncHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
  if (!restaurantId) {
    res.status(400);
    throw new Error("Restaurant id not found");
  }
  try {
    const reviews = await Reviews.find({ restaurant: restaurantId });
    res.status(201).json(reviews);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while fetching reviews");
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { content, restaurantId } = req.body;
  if (!content || !restaurantId) {
    res.status(400);
    throw new Error("Please fill all the details");
  }
  try {
    const new_review = await Reviews.create({
      restaurant: restaurantId,
      content: content,
    });
    res.status(201).json(new_review);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while fetching reviews");
  }
});

module.exports = {
  getRestaurantReview,
  addReview,
};
