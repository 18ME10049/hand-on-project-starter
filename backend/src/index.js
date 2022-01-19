const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongo Connected Started");
  })
  .catch((err) => {
    console.log("Error Occured " + err);
  });

app.get("/hello-world", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Backend server has started at " + process.env.PORT);
});
