const { param, body } = require("express-validator");
const Book = require("../../Model/BookModel");
const bcrypt = require("bcrypt");
const User = require("../../Model/userModel");

module.exports.addUserValidator = [
  body("name").notEmpty().withMessage("please enter your name"),
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage(" invalid email ")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("email already in use"));
        }
      })
    ),
  body("password")
    .isStrongPassword()
    .withMessage("please enter your strong password")
    .isLength({ min: 6 })
    .withMessage("your password should greater than 6"),
  body("isAdmin")
    .notEmpty()
    .withMessage("please enter your role")
    .isBoolean()
    .withMessage("should be boolean"),
  body("books")
    .notEmpty()
    .withMessage("please enter your books")
    .isArray()
    .withMessage("please enter your books")
    .custom(async (val, { req }) => {
      let book = await Book.findById(val);
      if (!book) {
        throw new Error("book not found");
      }
      return true;
    }),
];

module.exports.getUserValidator = [
  param("id").isMongoId().withMessage("user id should be mongo id"),
];

module.exports.updateUserValidator = [
  body("name").optional().isEmpty().withMessage("please enter your name"),
  body("email")
    .isEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage("please enter your email ")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          throw new Error("invalid id ");
        }
      })
    ),
  body("password")
    .optional()
    .isEmpty()
    .withMessage("please enter your password"),
  body("isAdmin").optional().isEmpty().withMessage("please enter your role"),
  body("books").optional().notEmpty().withMessage("please enter your books"),
];

module.exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("user id should be mongo id"),
];
