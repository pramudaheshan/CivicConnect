const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g., 'P001'
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
