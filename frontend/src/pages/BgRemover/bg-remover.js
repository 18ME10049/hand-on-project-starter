import Navbar from "../../components/Navbar/Navbar";
import style from "./bg-remover.module.scss";
import photo from "./Photo12.svg";
import axios from "axios";
import React from "react";
import { useState } from "react";

const BgRemover = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleChange(e) {
    console.log("hello Sandeep here..");
    // console.log(e.target);
    setSelectedFile(e.target.files[0]);
    var image = document.getElementById("output");
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    image.src = URL.createObjectURL(e.target.files[0]);
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Succesfully uploaded");
    // const base64image = "";
    // console.log("Converted String: ");
    // const base64image = getBase64(selectedFile);
    const base64image = await toBase64(selectedFile);
    // console.log("String: ", base64image);
    axios
      .post("http://localhost:3001/bg-remover", { base64image: base64image })
      .then((res) => {
        var imgg = document.getElementById("output");
        imgg.src = "data:image/png;base64," + res.data;
        var dl = document.getElementById("krde");
        dl.href = imgg.src;
        // console.log("Responce :", res.data);
      })
      .catch((err) => {
        alert("error in sending file to backend: ", err);
      });
  };

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
          <div>
            <a className="btn btn-primary" href="" download id="krde">
              Download
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BgRemover;
