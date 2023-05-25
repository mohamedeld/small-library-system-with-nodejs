const Book = require("../Model/BookModel");
const User = require("../Model/userModel");
exports.addBook = async (request, response, next) => {
  try {
    const book = await Book.create(request.body);
    response.status(200).json({
      message: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (request, response, next) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      message: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});
    response.status(200).json({
      message: "success",
      data: {
        books,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBooks = async (request, response, next) => {
  try {
    const book = await Book.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (!book) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      message: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.borrowBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    if (book.copies === 1) {
      throw new Error("Book is the only copy and cannot be borrowed");
    }

    if (!book.available) {
      throw new Error("Book is not available");
    }

    if (book.borrowed.length >= book.copies) {
      throw new Error("All copies of book are already borrowed");
    }
    const memberBorrowing = book.borrowed.find(
      (borrowed) => borrowed.user.toString() === memberId
    );
    if (memberBorrowing) {
      throw new Error("Member already has a copy of this book");
    }

    book.borrowed.push(userId);
    book.available = book.borrowed.length < book.copies;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const isBorrowed = book.borrowed.some(
      (borrow) => borrow.user.toString() === userId && borrow.returned === false
    );
    if (!isBorrowed) {
      throw new Error("Book is not borrowed by user");
    }

    const borrowedIndex = book.borrowed.findIndex(
      (borrow) => borrow.user.toString() === userId && borrow.returned === false
    );
    book.borrowed[borrowedIndex].returned = true;
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (request, response, next) => {
  try {
    const book = await Book.findByIdAndDelete(request.params.id);
    if (!book) {
      throw new Error("invalid id");
    }
    response.status(200).json({
      message: "deleted",
    });
  } catch (err) {
    next(err);
  }
};
