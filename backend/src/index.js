const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

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

// const silence = new UserDetails({ email: "🤩", password: "Ptanhi@123" });

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

app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT ${process.env.PORT} is running ......`);
});