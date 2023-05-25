const { validationResult } = require("express-validator");

module.exports = (request, response, next) => {
  let results = validationResult(request);
  if (results.errors.length != 0) {
    let errorStr = results.errors.reduce((acc, obj) => acc + obj.msg, ",");
    let error = new Error(errorStr);
    error.status = 442;
    next(error);
  } else {
    next();
  }
};
