// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import React, {useState, useEffect } from 'react';
import DashBoard from './pages/DashBoardPage/DashBoard';
import LoginPage from './pages/LoginPage/loginPage';
import SignupPage from './pages/SignupPage/signupPage';
import BgRemover from './pages/BgRemover/BgRemover';
import { AuthContext } from "./helper/authContext";
import NewAPI from './pages/New-Api/NewAPI';
import MyAPIs from './pages/MyAPIs/MyAPIs';
import axios from "axios"
import MyAccount from './pages/MyAccount/MyAccount';

function App() {

  const [authState, setAuthState]= useState();

  useEffect(()=>{
    axios.post("http://localhost:3001/auth",{header : sessionStorage.getItem("accessToken")})
    .then((res)=>{
      if(res.data.message){
        // console.log("Errr...");
        setAuthState(false);
      }
      else setAuthState(true);
    })
  },[]);
  
  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <Routes>
          <Route path="/"  element={< DashBoard />} />
          <Route path="/loginPage"  element={< LoginPage />} />
          <Route path="/my-account" element={<MyAccount/>}/>
          <Route path="/signupPage"  element={< SignupPage />} />
          <Route path='/bg-remover' element={<BgRemover/>} />
          <Route path='/new-api' element={<NewAPI/>} />
          <Route path='/my-apis' element={<MyAPIs/>} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
