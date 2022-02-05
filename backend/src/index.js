const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
// const fs = require("fs");
dotenv.config();
var FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB is connected .......");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line no-unused-vars
const UserDetails = mongoose.model("UserDetails", UserSchema);

// const silence = new UserDetails({ email: "okkk", password: "Ptanhi@123" });

async function Saveuserdata(userdata) {
  const newuser = new UserDetails(userdata);
  const result = await newuser.save();
  return result;
}

// eslint-disable-next-line no-unused-vars
app.post("/register", (req, res) => {
  const Newuser = req.body;
  if (!Newuser.email) res.send({ message: "Please enter Email" });
  else if (!Newuser.password) res.send({ message: "Please enter Password" });
  else {
    UserDetails.findOne({ email: Newuser.email }, (err, user) => {
      if (user) {
        res.send({ message: "User Already Registered" });
      } else {
        try {
          Saveuserdata(Newuser);
          res.send({ message: "Succefully Registered 😎" });
        } catch (err) {
          res.send({ message: `Error : ${err}` });
        }
      }
    });
  }
});

app.post("/login", (req, res) => {
  const Newuser = req.body;
  if (!Newuser.email) res.send({ message: "Please enter Email" });
  else if (!Newuser.password) res.send({ message: "Please enter Password" });
  else {
    UserDetails.findOne({ email: Newuser.email }, (err, user) => {
      if (user) {
        if (Newuser.password == user.password)
          res.send({ message: "Ur are logged in" });
        else res.send({ message: "Please Enter correct password" });
      } else {
        res.send({ message: `User does not exist` });
      }
    });
  }
});

app.post("/bg-remover", (req, res) => {
  // Image should be in base64 format from the frontend
  // data:image/jpeg , jkjlkjjkljkjlkjlkjh
  const image = req.body.base64image;
  const imageData = image.substring(image.indexOf(",") + 1);

  // Base64 image request related form data for Remove Background API
  // image_file_b64 is a variable for base64 image.
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file_b64", imageData);

  // Axios post request to remove.bg with the formData
  // axios({
  //   method: "post",
  //   url: "https://api.remove.bg/v1.0/removebg",
  //   data: formData,
  //   responseType: "json",
  //   headers: {
  //     "X-Api-Key": "wkaGohZucxHUgiEBokmiUiFS",
  //     Accept: "application/json",
  //   },
  // })
  //   .then((response) => {
  //     return res.status(200).json({
  //       image: response.data.data.result_b64, // This variable returns base64 image result from remove.bg api
  //     });
  //   })
  //   .catch((error) => {
  //     return console.error("Request failed:", error);
  //   });

  //for checking in backend itself
  // const formData = new FormData();
  // formData.append("size", "auto");
  // formData.append(
  //   "image_url",
  //   "https://www.whatsappimages.in/wp-content/uploads/2020/12/Cute-Girl-Images-For-Whatsapp-Dp-Free-Download-9.jpg",
  // );

  axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    responseType: "json",
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": "wkaGohZucxHUgiEBokmiUiFS",
      Accept: "application/json",
    },
    encoding: null,
  })
    .then((responce) => {
      if (responce.status != 200)
        return console.error("Error: ", responce.status, responce.statusText);
      res.send(responce.data.data.result_b64);
    })
    .catch((error) => {
      return console.log("Request failed: ", error);
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT ${process.env.PORT} is running ......`);
});
