const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authPermisson");

const checkValidator = require("../Middleware/Validation/checkValidator");
const {
  addBookValidator,
  getBookValidator,
  updateBookValidator,
  deleteBookValidator,
} = require("../Middleware/Validation/bookValidator");
const bookController = require("../Controller/bookController");

router
  .route("/")
  .get(bookController.getBooks)
  .post(addBookValidator, checkValidator, auth, bookController.addBook);

router
  .route("/:id")
  .get(getBookValidator, checkValidator, bookController.getBook)
  .patch(updateBookValidator, checkValidator, auth, bookController.updateBooks)
  .delete(deleteBookValidator, checkValidator, auth, bookController.deleteBook);

router.route("/:id/borrow").post(bookController.borrowBook);

router.route("/:id/return/:userId").put(bookController.returnBook);
module.exports = router;
