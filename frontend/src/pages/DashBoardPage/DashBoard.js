/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import BigTile from '../../components/BigTile/BigTile'
import axios from 'axios'
import Card from '../../components/Card/Card';
import style from './DashBoard.module.scss'
// import {useLocation} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars

import {  useEffect } from 'react'
function DashBoard() {
  
     const [allapi,setallapi]= useState([]);

     useEffect(()=>{
       axios.get('http://localhost:3001/allapi')
       .then((res) => {
         console.log(res.data[0].name);
         setallapi(res.data);
        //  seaa
       });
     },[])     

  return <div>
      < Navbar />
      <BigTile />
      <div className={style.margindede}>
      <h3>ALL APIs</h3>
      </div>
      <div className={style.parent}>
        {allapi.map((item,index) =>(
          item.IsPublish && <Card key ={index} name={item.name} image={item.url} description={item.desc} className={style.child} />
        ))
        }
      </div>

  </div>;
}

DashBoard.propTypes = {};

export default DashBoard;