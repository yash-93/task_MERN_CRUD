const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://chat_app_user:BSngbnMhVPbCv8uL@cluster0-fpul6.mongodb.net/product?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(5000);
    console.log(`Listening to port ${port}`);
  })
  .catch((error) => {
    console.log(error);
  });
