/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import style from './loginPage.module.scss'
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helper/authContext"
import Navbar from "../../components/Navbar/Navbar"

function LoginPage() {

  const {setAuthState} = useContext(AuthContext);
 

  let history = useNavigate();
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  
  function handleChange(e) {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    const obj={
      email:email,
      password: password
    }
    axios.post("http://localhost:3001/loginPage",obj)
    .then(res=>{
      if(res.data.message)alert(res.data.message);
      else {
        setAuthState(true);
        sessionStorage.setItem("accessToken" , res.data);
        history("/");
      }
    })
    .catch(err=>{
      alert("error in signup: ",err );
    });
  }

  return (
    <body>
      <Navbar />
    <div className={style.main_block}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="name" placeholder="Email"  onChange={handleChange}/>
        <input type="text" name="password" id="name" placeholder="Password"  onChange={handleChange}/>
        <div className={style.btn_block}>
         <button type="submit">Login</button>
        </div>
        <div className={style.or}>
          Or
        </div>
        <div className={style.btn_block}>
      <Link to="/signupPage">
              <button type="button" className="btn btn-secondary">Register
             </button>
      </Link>
     </div>
      </form>
      
    </div>
  </body>
    
  )

}

LoginPage.propTypes = {};

export default LoginPage;