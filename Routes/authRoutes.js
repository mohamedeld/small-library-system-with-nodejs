const express = require("express");
const router = express.Router();
const {
  signUpValidator,
  signInValidator,
} = require("../Middleware/Validation/authValidator");
const checkValidator = require("../Middleware/Validation/checkValidator");
const authController = require("../Controller/authController");

router
  .route("/signup")
  .post(signUpValidator, checkValidator, authController.signUp);

router
  .route("/login")
  .post(signInValidator, checkValidator, authController.login);

module.exports = router;
