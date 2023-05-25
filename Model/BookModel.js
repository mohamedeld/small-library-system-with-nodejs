const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    trim: true,
    required: [true, "please enter your title"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "book should have a author"],
    trim: true,
  },
  pages: {
    type: Number,
    required: [true, "book should have pages"],
  },
  NoOfCopies: {
    type: Number,
    required: [true, "please enter number of copies "],
  },
  shelfNo: {
    type: Number,
    required: [true, "please enter location of book"],
  },
  available: {
    type: Boolean,
  },
  borrowed: {
    type: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    default: [],
  },
});

module.exports = mongoose.model("Book", bookSchema);
