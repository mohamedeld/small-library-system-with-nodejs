const { param, body } = require("express-validator");

module.exports.addBookValidator = [
  body("title").notEmpty().withMessage("title should be not empty"),
  body("author").notEmpty().withMessage("author should be not empty"),
  body("pages")
    .notEmpty()
    .withMessage("pages should be not empty")
    .isNumeric()
    .withMessage("pages should be number"),
  body("NoOfCopies")
    .notEmpty()
    .withMessage("NoOfCopies should be not empty")
    .isNumeric()
    .withMessage("NoOfCopies should be number"),
  body("shelfNo")
    .notEmpty()
    .withMessage("shelfNo should be not empty")
    .isNumeric()
    .withMessage("shelfNo should be number"),
];

module.exports.getBookValidator = [
  param("id").isMongoId().withMessage("should be mongodb id"),
];

module.exports.updateBookValidator = [
  body("title").optional().notEmpty().withMessage("title should be not empty"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("author should be not empty"),
  body("pages")
    .optional()
    .notEmpty()
    .withMessage("pages should be not empty")
    .isNumeric()
    .withMessage("pages should be number"),
  body("NoOfCopies")
    .optional()
    .notEmpty()
    .withMessage("NoOfCopies should be not empty")
    .isNumeric()
    .withMessage("NoOfCopies should be number"),
  body("shelfNo")
    .optional()
    .notEmpty()
    .withMessage("shelfNo should be not empty")
    .isNumeric()
    .withMessage("shelfNo should be number"),
];

module.exports.deleteBookValidator = [
  param("id").isMongoId().withMessage("should be mongodb id"),
];
