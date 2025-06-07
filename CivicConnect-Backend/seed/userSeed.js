const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password_hash: "userpassword1",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "user",
    wishlist: [],
    cart: [],
    notifications: { orders: true, promotions: true },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password_hash: "userpassword2",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "user",
    wishlist: [],
    cart: [],
    notifications: { orders: true, promotions: false },
  },
  {
    name: "Alice Admin",
    email: "alice.admin@example.com",
    password_hash: "adminpassword2",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "admin",
    wishlist: [],
    cart: [],
    notifications: { orders: false, promotions: true },
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  for (const user of users) {
    await new User(user).save(); // triggers password hashing!
  }
  console.log("Users seeded!");
  await mongoose.disconnect();
}

seed();
