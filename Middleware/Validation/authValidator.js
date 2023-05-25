const { param, body } = require("express-validator");
const User = require("../../Model/userModel");

module.exports.signUpValidator = [
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
];
module.exports.signInValidator = [
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage(" invalid email "),
  body("password")
    .isStrongPassword()
    .withMessage("please enter your strong password")
    .isLength({ min: 6 })
    .withMessage("your password should greater than 6"),
];
