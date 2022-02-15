import React from "react";
import { useState } from "react";
import style from "./signupPage.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
// import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function SignupPage() {

  const [usercode, setUsercode] = useState(123);
  const [code, setCode] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  let history = useNavigate();

  function handleChange(e) {
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
    if (e.target.name == 'otp') setUsercode(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    const obj = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/signupPage", obj)
      .then((res) => {
        if (res.data.message == "OTP") {
          swal({title: "Check Your Email To Verify OTP",
              icon: "info",
              button: "OK!",
            });
          document.getElementById("1").style.display="none";
          document.getElementById("2").style.display="block";
          // // console.log("Yehh chal gya")
          setCode(res.data.otp);
          // // console.log("Yehh")
        }
        else{
          swal({title: res.data.message,
              icon: "info",
              button: "OK!",
            });
        }
      })
      .catch((err) => {
        swal({text: "Error!: "+err,
              icon: "error",
            });
      });
  };

  function handleVerify() {
    // // console.log("handleVerify me hun: ",code,usercode, email , password);
    axios.post("http://localhost:3001/verify-otp",{email: email, password: password, code: code, usercode: usercode})
    .then(res=>{
      if(res.data.Isverify == true){
        swal({title: "Registered!!",
              text: "Press OK to login!",
              icon: "success",
              button: "OK!"
            });
        history('/loginPage');
      }
      else{
        swal({
              text: "Wrong OTP Try Again",
              icon: "warning",
            });
      }
    })
  }
function handleCross() {
  document.getElementById("2").style.display="none";
  // document.getElementsById("1").style.display="none";
  document.getElementById("1").style.display="block";
  // console.log("Cross clicked ")
}
   
  return (
    <body>
      <Navbar />
      <div className={style.main_block} id="1">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="name"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="password"
            id="name"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className={style.btn_block}>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <div className={style.or}>Or</div>
          <div className={style.btn_block}>
            <Link to="/LoginPage">
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>

      <div className={style.bg_modal} id="2">
        <div className={style.modal_contents}>
          <div
            className={style.close}
            onClick={() => {
              handleCross();
            }}
          >
            +
          </div>
          <form action="">
            <input
              type="number"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
            />
            <a
              href="#"
              className={style.buttons}
              onClick={() => {
                handleVerify();
              }}
            >
              Verify OTP
            </a>
          </form>
        </div>
      </div>
    </body>
  );
}

SignupPage.propTypes = {};

export default SignupPage;
