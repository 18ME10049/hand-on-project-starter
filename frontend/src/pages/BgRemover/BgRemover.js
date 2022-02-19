/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import style from "./BgRemover.module.scss";
import photo from "./girl.svg";
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React,{Component} from 'react';
import { useState } from "react";
import df from "./Default.png";

const BgRemover = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [image,setImage]=useState(df);
    const [ready,setReady]= useState(false);
     
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

  async function  handleChange(e){
        setReady(false);
        setSelectedFile(e.target.files[0]);
        var i=await toBase64(e.target.files[0]);
        setImage(i);
        console.log(image);

      }

    const handleSubmit = async (event) =>{
      event.preventDefault();
      
      axios.post("http://localhost:3001/bg-remover",{ image : image },{})
    .then(res=>{
      setReady(true);
      setImage("data:image/png;base64,"+res.data)
    })
    .catch(err=>{
      alert("error in signup: ",err );
    });
    }

    function getfile(){
      document.getElementById("upfile").click();
    }


    function hadnleDownload(){
      var download=document.createElement('a');
      download.href=image;
      download.download='your-img.png'
      download.click();
    }

  return (
    <>
      <Navbar />
      <div className={style.box}>
        <div className={style.box1}>
          <h2 className={style.h2text}>Remove image background </h2>
          <h4 className={style.h4text}>100% automatic and free</h4>
          <img className={style.image12} src={photo} alt="" />
        </div>
        <div className={style.box2}>
          <div className={style.imgdiv}>
          <img className={style.imgg} src={image} id="output" />
          </div>

          <div style={{height:"0px",widht:"0px",overflow:"hidden"}}>
            <input className ={style.inputdiv} id="upfile" type="file" accept="image/*" onChange={handleChange} />
            </div>
          <span className={style.yourbtn} onClick={getfile}>Click to upload Image</span>


          {ready? <span><button className ={style.sandeep} onClick={hadnleDownload}>
                  DownLoad 
          </button></span>:<span><button className ={style.sandeep} onClick={handleSubmit}>
                  Remove background
          </button></span>}
        </div>
      </div>
    </>
  );
};

export default BgRemover;