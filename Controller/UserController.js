const User = require("../Model/userModel");
const Book = require("../Model/BookModel");
exports.addUser = async (request, response, next) => {
  try {
    const user = await User.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      isAdmin: request.body.isAdmin,
      books: request.body.books,
    });
    const token = user.getAuthToken();
    response.header("x-auth-token", token);
    response.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (request, response, next) => {
  try {
    const users = await User.find({});
    response.status(200).json({
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (request, response, next) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!user) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (request, response, next) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    next(err);
  }
};

exports.searchBook = async (req, res, next) => {
  try {
    const { query } = req.params;

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });

    const booksWithAvailability = await Promise.all(
      books.map(async (book) => {
        const borrowedCount = book.borrowed.length;
        const available = borrowedCount < book.copies;

        return { ...book.toObject(), available };
      })
    );

    res.status(200).json(booksWithAvailability);
  } catch (err) {
    next(err);
  }
};
