const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");

const products = [
  {
    id: "P001",
    name: "Sustainable Peace Journal",
    price: 24.99,
    description:
      "Handcrafted journal made from recycled materials, perfect for reflection and mindful writing.",
    image:
      "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?auto=format&fit=crop&q=80&w=800",
    category: "Stationery",
    rating: 4.8,
  },
  {
    id: "P002",
    name: "Justice Scales Artwork",
    price: 89.99,
    description:
      "Contemporary art print symbolizing balance and equality in modern society.",
    image:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80&w=800",
    category: "Art",
    rating: 4.9,
  },
  {
    id: "P003",
    name: "Unity Coffee Blend",
    price: 19.99,
    description:
      "Fair trade coffee blend supporting local farming communities worldwide.",
    image:
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&q=80&w=800",
    category: "Food",
    rating: 4.7,
  },
  {
    id: "P004",
    name: "Community Building Guide",
    price: 34.99,
    description:
      "Comprehensive guide for building strong, inclusive communities.",
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
    category: "Books",
    rating: 4.6,
  },
  {
    id: "P005",
    name: "Community Building Guide",
    price: 34.99,
    description:
      "Comprehensive guide for building strong, inclusive communities.",
    image:
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
    category: "Books",
    rating: 4.6,
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    await Product.insertMany(products);
    console.log("Products added!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
