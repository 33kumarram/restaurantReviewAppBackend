const express = require("express");
const {
  getRestaurantList,
  totalPages,
  addRestaurant,
  restaurantListForAdmin,
} = require("../controllers/restaurantController");
const { authorize, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/totalpages").get(totalPages);
router.route("/list/:pageNo").get(getRestaurantList);
router.route("/add").post(addRestaurant);
router
  .route("/listforadmin/:pageNo")
  .get(authorize, isAdmin, restaurantListForAdmin);

module.exports = router;
