const app = require("./app");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config(path.join(__dirname, ".env"));

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    app.listen(PORT, () => console.log("listening"));
    console.log("database connected");
  })
  .catch((err) => console.log(err));
