/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import style from "./BgRemover.module.scss";
import photo from "./girl.svg";
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React,{Component} from 'react';
import { useState } from "react";

const BgRemover = () => {

    const [selectedFile, setSelectedFile] = useState(null);
     
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

    function handleChange(e){
        // console.log(e.target);
        setSelectedFile(e.target.files[0])
        var image = document.getElementById('output');
        // eslint-disable-next-line no-mixed-spaces-and-tabs
        image.src = URL.createObjectURL(e.target.files[0]);

      }

    const handleSubmit = async (event) =>{
      event.preventDefault();
      const image = await toBase64(selectedFile);

      console.log(image);
      // const image = await selectedFile;
      axios.post("http://localhost:3001/bg-remover",{ image : image },{
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // }
    })
    .then(res=>{
      var imgg = document.getElementById('output');
      imgg.src="data:image/png;base64,"+res.data;
      console.log("Responce :",res.data);
    })
    .catch(err=>{
      alert("error in signup: ",err );
    });
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
          <input type="file" accept="image/*" onChange={handleChange} />
          <img src="randi" id="output" />
          <button className="btn btn-primary" onClick={handleSubmit}>
                  Upload!
          </button>
        </div>
      </div>
    </>
  );
};

export default BgRemover;