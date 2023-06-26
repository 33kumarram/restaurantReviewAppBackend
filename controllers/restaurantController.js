const asyncHandler = require("express-async-handler");
const Restaurants = require("../models/restaurantModel");

//no of restaurants in one page
let restaurantPerPage = 10;

const getRestaurantList = asyncHandler(async (req, res) => {
  const pageNo = req.params.pageNo || 1;
  try {
    // no of restaurants before current page
    let skip = (pageNo - 1) * restaurantPerPage;
    const restaurant = await Restaurants.find()
      .skip(skip)
      .limit(restaurantPerPage)
      .sort({ name: 1 });
    res.status(201).json(restaurant);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while fetching restaurants");
  }
});

const addRestaurant = asyncHandler(async (req, res) => {
  const { name, address, description } = req.body;
  if (!name || !address || !description) {
    res.status(400);
    throw new Error("Please Fill all the details");
  }
  try {
    const count = await Restaurants.count();
    const restaurant_id = name.split(" ")[0] + count; // creates unique id for every restaurant
    const newRestaurant = await Restaurants.create({
      name: name,
      restaurant_id: restaurant_id,
      address: address,
      description: description,
    });
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while adding new restaurant");
  }
});

// caculate number of pages for resturant list
const totalPages = asyncHandler(async (req, res) => {
  try {
    const totalRestaurant = await Restaurants.count();
    let totalPages = Math.ceil(totalRestaurant / restaurantPerPage);
    res.status(201).json(totalPages);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while adding new restaurant");
  }
});
const restaurantListForAdmin = asyncHandler(async (req, res) => {
  const pageNo = req.params.pageNo || 1;
  try {
    //no of restaurants in one page
    let restaurantPerPage = 10;
    // no of restaurants before current page
    let skip = (pageNo - 1) * 10;
    const restaurant = await Restaurants.aggregate([
      { $skip: skip },
      { $limit: restaurantPerPage },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurant",
          as: "reviews",
        },
      },
      {
        $addFields: {
          reviewsCount: { $size: "$reviews" },
        },
      },
      {
        $project: {
          reviews: 0,
        },
      },
    ]);

    console.log(restaurant);

    res.status(201).json(restaurant);
  } catch (err) {
    res.status.code(400);
    console.log(err);
    throw new Error("Error occurred while fetching restaurants");
  }
});

module.exports = {
  getRestaurantList,
  addRestaurant,
  totalPages,
  restaurantListForAdmin,
};
