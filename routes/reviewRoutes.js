const express = require("express");
const {
  addReview,
  getRestaurantReview,
} = require("../controllers/reviewController");
const Router = express.Router();

Router.route("/:restaurantId").get(getRestaurantReview);
Router.route("/add").post(addReview);

module.exports = Router;
