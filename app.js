const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const bookRoutes = require("./Routes/bookRoutes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use((request, response, next) => {
  response.status(404).json({
    message: "Page Not Found",
  });
});

app.use((error, request, response, next) => {
  response.status(500).json({
    message: error + "",
  });
});

module.exports = app;
