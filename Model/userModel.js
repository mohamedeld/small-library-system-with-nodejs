const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.method("getAuthToken", function () {
  const token = jwt.sign(
    { userId: this._id, adminRole: this.isAdmin },
    process.env.SECRET_KEY
  );
  return token;
});

module.exports = mongoose.model("User", userSchema);
