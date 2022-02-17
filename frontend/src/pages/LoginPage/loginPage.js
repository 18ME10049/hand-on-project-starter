/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState } from "react";
import style from './loginPage.module.scss'
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helper/authContext";
import Navbar from "../../components/Navbar/Navbar";
import swal from 'sweetalert2';

function LoginPage() {

  const {setAuthState} = useContext(AuthContext);
 

  let history = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  
  function handleChange(e) {
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    const obj={
      email:email,
      password: password
    }
    axios.post("http://localhost:3001/loginPage",obj)
    .then(res=>{
      if(res.data.message){
        swal.fire({title: res.data.message,
              icon: "info",
              button: "OK!",
            });
      }
      else {
        setAuthState(true);
        sessionStorage.setItem("accessToken" , res.data);
        swal.fire({
          icon: 'success',
          title: 'Logged In',
          showConfirmButton: false,
          timer: 1000,
        });
        history("/");
      }
    })
    .catch(err=>{
      alert("error in signup: ",err );
    });
  }

  return (
    <>
      <Navbar />
      {sessionStorage.getItem("accessToken")!=null ? <h1>Already Logged In </h1> : <div className={style.main_block}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className={style.forinput} type="email" name="email" id="name" placeholder="Email"  onChange={handleChange}/>
        <input className={style.forinput} type="text" name="password" id="name" placeholder="Password"  onChange={handleChange}/>
        <div className={style.btn_block}>
         <button className = "btn btn-primary" type="submit">Login</button>
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
      
    </div>}
  </> 
  )

}

LoginPage.propTypes = {};

export default LoginPage;