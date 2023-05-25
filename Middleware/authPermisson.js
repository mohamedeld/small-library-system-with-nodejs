const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const token = request.header("x-auth-token");
  if (!token) {
    response.status(401).json({ message: "access denied" });
  }

  try {
    let decodedPassword = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedPassword.adminRole) {
      response.status(401).json({ message: "access denied" });
    }
    next();
  } catch (err) {
    next(err);
  }
};
