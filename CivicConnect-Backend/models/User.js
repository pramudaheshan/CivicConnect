const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const wishlistItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
});

const cartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema(
  {
    // id field removed!
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: "user" },
    wishlist: [wishlistItemSchema],
    cart: [cartItemSchema],
    notifications: {
      orders: { type: Boolean, default: true },
      promotions: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password_hash")) {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

module.exports = mongoose.model("User", userSchema);
