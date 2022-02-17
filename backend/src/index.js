/* eslint-disable prettier/prettier */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
// var fs = require("fs");
var FormData = require("form-data");
const { sign } = require("jsonwebtoken");
dotenv.config();
const auth = require("./middlewares/auth")
const nodemailer = require("nodemailer");
// var ObjectId = require('mongodb').ObjectId;

// eslint-disable-next-line no-unused-vars
// var FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marketplaceapiowner@gmail.com',
    pass: process.env.MYPASS
  }
});


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
  },
  password: {
    type: String,
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
  endpoint: {
    type: String,
  },
  desc: {
    type: String,
  },
  IsPublish : {
    type: Boolean,
    default: false,
  }
});

// eslint-disable-next-line no-unused-vars
const UserDetails = mongoose.model("UserDetails", UserSchema);
const APIDetails = mongoose.model("APIDetails", APISchema);

// const silence = new UserDetails({ email: "🤩", password: "Ptanhi@123" });

// async function Saveuserdata(userdata) {
//   const newuser = new UserDetails(userdata);
//   const result = await newuser.save();
//   return result;
// }

async function SaveAPIdata(APIdata) {
  const newuser = new APIDetails(APIdata);
  const result = await newuser.save();
  return result;
}

function decryptmyotp(currOtp){
  var num = currOtp + 54980;
  num = num/8;
  num = num - 100007;
  return num;
}

function encryptmyotp(currOtp){
   var num = currOtp + 100007;
   num = num*8;
   num = num - 54980;
   return num;
}

app.post("/signupPage", (req, res) => {
  const Newuser = req.body;
  if (Newuser.email === null) res.send({ message: "Please enter Email" });
  else if (Newuser.password === null) res.send({ message: "Please enter Password" });
  else {
    UserDetails.findOne({ email: Newuser.email }, (err, user) => {
      if (user) {
        res.send({ message: "User Already Registered" });
      } 
      else {
        try {

          var currOtp = 1000 + Math.floor(Math.random() * 9000);
          var mailOptions = {
            from: 'marketplaceapiowner@gmail.com',
            to: Newuser.email,
            subject: 'API Marketplace | OTP to Verify Email',
            text: `Verify your email to finish signing up with API Marketplace. Use the following verification code: ${currOtp}`,
            authentication: 'plain'
          };
          transporter.sendMail(mailOptions, async function(error,info){
            if(error){
              console.log(info);
              res.send({message : "error aa rhi hai"});
            }
            else{
              currOtp = encryptmyotp(currOtp);
              res.send({message: "OTP", otp: currOtp});
            }
          })
          // Saveuserdata(Newuser);
          // res.send({ message: "Succefully Registered 😎" });
        } catch (err) {
          res.send({ message: `Error : ${err}` });
        }
      }
    });
  }
});

app.post("/verify-otp", async (req, res) => {
  const Rbody = req.body;
  var code = decryptmyotp(Rbody.code);
  var usercode = Rbody.usercode;
  // // console.log("code = ", code, usercode);
  if(code == usercode){
    // await Saveuserdata({email :Rbody.email, password: Rbody.password});
    res.send({Isverify:  true});
  }
  else{
    res.send({Isverify:  false});
  }
});

app.post("/loginPage", (req, res) => {
  const Newuser = req.body;
  if (Newuser.email === null) res.send({ message: "Please enter Email" });
  else if (Newuser.password === null) res.send({ message: "Please enter Password" });
  else {
    UserDetails.findOne({ email: Newuser.email }, (err, user) => {
      if (user) {
        if (Newuser.password == user.password) {
          const accessToken = sign(
            {
              email: Newuser.email,
            },
            "Ram",
          );
          res.send(accessToken);
        } else res.send({ message: "Please Enter correct password" });
      } else {
        res.send({ message: `User is not registered` });
      }
    });
  }
});

// eslint-disable-next-line no-unused-vars
app.post("/bg-remover", async (req, res) => {
  const { image } = req.body;
  // res.send(req.body.data);
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
    .then((response) => {
      if (response.status != 200)
        return console.error("Error:", response.status, response.statusText);
      // fs.writeFileSync(
      //   "C:/Users/pradh/Desktop/cuvette/no-bgg.png",
      //   response.data,
      // );
      res.send(response.data.data.result_b64);
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
});

app.post("/auth", auth, async (req, res) => {
  res.send(req.user);
});

app.post("/new-api", auth, async (req, res) => {
  const NewAPI = req.body;
  NewAPI.email = req.user.email;
  SaveAPIdata(NewAPI);
  res.send("");
  // }
});

app.get("/allapi", async ( req, res)=>{

  APIDetails.find((err, apis) => {
    // // console.log(apis);
    res.send(apis);
  })
});

app.post("/my-all-api",auth,async (req, res)=>{
  APIDetails.find({ email: req.user.email },  (err, apis)=>{
    // // console.log("********",apis);
     res.send(apis);
  });
});

app.put("/update-card",async (req,res)=>{
  
  // var id = new ObjectId(req.body.id);
  var id=req.body.id;
  var obj=req.body.obj;
  // console.log(id);
 try{
    APIDetails.findById(id,(err,result)=>{
    if(err)res.send({message:err});
    // eslint-disable-next-line no-prototype-builtins
    if(obj.hasOwnProperty("IsPublish"))
    result.IsPublish=obj.IsPublish
    if(obj.email)
    result.email=obj.email;
    if(obj.name)
    result.name=obj.name;
    if(obj.url)
    result.url=obj.url;
    if(obj.desc)
    result.desc=obj.desc;
    if(obj.endpoint)
    result.endpoint=obj.endpoint;
    SaveAPIdata(result);
    res.send("")
})
 }
 catch(err){
   // console.log("fs",err)
  res.send({message:err});
 }
  
})

app.delete("/delete-card",async(req,res)=>{
  await APIDetails.findByIdAndRemove(req.body.id).exec();
  // // console.log(req.body.id);
  res.send("")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`PORT ${process.env.PORT} is running ......`);
});
