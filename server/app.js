const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const spendingRoutes = require("./routes/spending-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/spending", spendingRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.xq6fs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch(err => {
    console.log(err);
  });
