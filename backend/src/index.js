const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const auth = require("./middlewares/Auth");
// const fs = require("fs");
dotenv.config();
var FormData = require("form-data");

const { sign } = require("jsonwebtoken");

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

const APISchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  desc: {
    type: String,
  },
  IsPublish: {
    type: Boolean,
    default: false,
  },
});

// eslint-disable-next-line no-unused-vars
const UserDetails = mongoose.model("UserDetails", UserSchema);
const APIDetails = mongoose.model("APIDetails", APISchema);
// const silence = new UserDetails({ email: "okkk", password: "Ptanhi@123" });

async function Saveuserdata(userdata) {
  const newuser = new UserDetails(userdata);
  const result = await newuser.save();
  return result;
}
async function SaveAPIdata(APIdata) {
  const newuser = new APIDetails(APIdata);
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
  // console.log("Kitni baar chalgea? ");
  const Newuser = req.body;
  if (!Newuser.email) res.send({ message: "Please enter Email" });
  else if (!Newuser.password) res.send({ message: "Please enter Password" });
  else {
    UserDetails.findOne({ email: Newuser.email }, (err, user) => {
      if (user) {
        // eslint-disable-next-line no-empty
        if (Newuser.password == user.password) {
          const accessToken = sign(
            {
              email: Newuser.email,
            },
            "RamTeriGangaMeli",
          );
          res.send(accessToken);
        } else res.send({ message: "Please Enter correct password" });
      } else {
        res.send({ message: `User does not exist` });
      }
    });
  }
});

app.post("/auth", auth, async (req, res) => {
  res.json(req.user);
});

app.post("/bg-remover", (req, res) => {
  const image = req.body.base64image;
  const imageData = image.substring(image.indexOf(",") + 1);
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file_b64", imageData);
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

app.post("/new-api", auth, async (req, res) => {
  const NewAPI = req.body;
  NewAPI.email = req.user.email;
  SaveAPIdata(NewAPI);
  res.send("");
  // }
});

app.get("/allapi", async (req, res) => {
  APIDetails.find((err, apis) => {
    // console.log(apis);
    res.send(apis);
  });
});

app.post("/my-all-api", auth, async (req, res) => {
  APIDetails.find({ email: req.user.email }, (err, apis) => {
    // console.log("****");
    res.send(apis);
  });
});

app.put("/update-card", async (req, res) => {
  // var id = new ObjectId(req.body.id);
  var id = req.body.id;
  var obj = req.body.obj;
  console.log(id);
  try {
    APIDetails.findById(id, (err, result) => {
      if (err) res.send({ message: err });
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty("IsPublish")) result.IsPublish = obj.IsPublish;
      if (obj.email) result.email = obj.email;
      if (obj.name) result.name = obj.name;
      if (obj.url) result.url = obj.url;
      if (obj.desc) result.desc = obj.desc;
      SaveAPIdata(result);
      res.send("");
    });
  } catch (err) {
    console.log("fs", err);
    res.send({ message: err });
  }
});

app.delete("/delete-card", async (req, res) => {
  await APIDetails.findByIdAndRemove(req.body.id).exec();
  console.log(req.body.id);
  res.send("");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT ${process.env.PORT} is running ......`);
});
