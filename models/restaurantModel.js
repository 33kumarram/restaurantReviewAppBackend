const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    name: { type: String },
    restaurant_id: { type: String },
    address: {
      address_line: { type: String },
      city: { type: String },
      district: { type: String },
      state: { type: String },
      country: { type: String },
      pin_code: { type: Number },
    },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Restaurants = mongoose.model("Restaurants", newSchema);
module.exports = Restaurants;
