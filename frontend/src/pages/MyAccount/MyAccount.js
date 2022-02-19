import React from "react";
import { useState } from "react";
import style from './MyAccount.module.scss';
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import swal from 'sweetalert2';
import { useEffect } from "react";

function MyAccount() {
  const [password, setPassword] = useState("");
  const [email,setEmail]=useState("pop");


  useEffect(()=>{
    axios.post("http://localhost:3001/auth",{header : sessionStorage.getItem("accessToken")})
    .then((res)=>{
      if(res.data.error){
        setEmail("Please Sign In")
      }
      else 
      setEmail(res.data.email);
    })
  },[]);
  
  function handleChange(e) {
    if (e.target.name == "password") setPassword(e.target.value);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const obj={
      password: password
    }
    obj.header=sessionStorage.getItem("accessToken");
    axios.put("http://localhost:3001/update-password",obj)
    .then(res=>{
      if(res.data.message){
        swal.fire({title: res.data.message,
              icon: "info",
              button: "OK!",
            });
      }
      else {
        swal.fire({
          icon: 'success',
          title: 'Password Successfully Updated',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    })
    .catch(err=>{
      swal.fire({
        icon: 'warning',
        title: err,
      });
    });
  }

  return (

    <>
    <Navbar />
    {sessionStorage.getItem("accessToken")==null?<h1>Please Login</h1>:<>
      
      <div className={style.main_block}>
        <h4>Hello {email}</h4>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <input className={style.forinput} type="text" name="password" id="name" placeholder="Password"  onChange={handleChange}/>
          <div className={style.btn_block}>
           <button className = "btn btn-primary" type="submit">Change</button>
          </div>
        </form>
        
      </div>
    </>}
    </>
  )

}

MyAccount.propTypes = {};

export default MyAccount;