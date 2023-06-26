const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    content: { type: String },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", newSchema);
module.exports = Reviews;
