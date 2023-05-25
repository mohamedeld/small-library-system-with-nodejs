const express = require("express");
const auth = require("../Middleware/authPermisson");
const {
  addUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../Middleware/Validation/userValidator");
const userController = require("../Controller/UserController");
const checkValidator = require("../Middleware/Validation/checkValidator");
const router = express.Router();

router
  .route("/")
  .get(auth, userController.getUsers)
  .post(addUserValidator, checkValidator, auth, userController.addUser);
router
  .route("/:id")
  .get(getUserValidator, checkValidator, auth, userController.getUser)
  .patch(updateUserValidator, checkValidator, auth, userController.updateUser)
  .delete(deleteUserValidator, checkValidator, auth, userController.deleteUser);

router.get("/search/:query", userController.searchBook);
// router.route("/:id/request-book").post(auth, userController.addBorrowBook);
module.exports = router;
