import React from "react";
import { useState } from "react";
import style from './signupPage.module.scss'
import {Link} from 'react-router-dom';
function SignupPage() {

  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});

  function handleChange(e) {
    if (e.target.name == "email") setEmail(e.target.value);
    if (e.target.name == "password") setPassword(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  }

  return (
    <div className={style.cont}>
    <form  onSubmit={handleSubmit}>
      
      <label>Enter your Email:
        <input type="email" className={style.div} name="email" onChange={handleChange} />
      </label>

      <label>Enter your Password:
        <input className={style.div} type="text" name="password" onChange={handleChange} />
      </label>
      <input className={style.sub_btn} type="submit" />

    </form>

     <h1>Already have an account ?</h1>
     <Link to="/loginPage">
             <button type="button" className="btn btn-secondary">Login
            </button>
            </Link>
    </div>
    
  )

}

SignupPage.propTypes = {};

export default SignupPage;