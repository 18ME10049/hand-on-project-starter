import React from "react";
// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import style from './MyCard.module.scss'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import swal from "sweetalert";
import swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
const MyCard = (card) => {

    let history = useNavigate();
    const [name, setname] = useState();
    const [url, seturl] = useState();
    const [desc,setdesc] = useState();
    const [endpoint, setendpoint] = useState();

    function handleChange(e) {
        if (e.target.name == "name") setname(e.target.value);
        if (e.target.name == "url") seturl(e.target.value);
        if (e.target.name == "desc") setdesc(e.target.value);
        if (e.target.name == "endpoint") setendpoint(e.target.value);
    }

    function handleEdit() {
        for(var i=0 ;i<document.getElementsByClassName("delete").length;i++ )
        document.getElementsByClassName("delete")[i].style.display="none";
        // document.getElementsById("1").style.display="none";
        document.getElementById(card.id).style.display="block";
        // console.log("Edit clicked ")
    }
    function handleCross() {
        for(var i=0 ;i<document.getElementsByClassName("delete").length;i++ )
        document.getElementsByClassName("delete")[i].style.display="flex";
        // document.getElementsById("1").style.display="none";
        document.getElementById(card.id).style.display="none";
        
    }
    
    async function handleUpdate(){
        // e.preventD/efault();
        
        const obj = {
            name: name,
            url: url, 
            desc: desc,
            endpoint: endpoint,
            email: card.email,
        }
        // console.log(obj)
        axios.put("http://localhost:3001/update-card", {id:card.id,obj:obj})
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    handleCross();
                    history("/");
                    swal.fire({
                        title: "Successfully Edited!",
                        icon: 'success',
                        showConfirmButton: false,
                        showCloseButton: false,
                        timer: 1200,
                    })
                    history("/my-apis");
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }
    async function handlePublish(){
        // e.preventD/efault();
        
        const obj = {
            IsPublish:true
        }
        // console.log(obj)
        axios.put("http://localhost:3001/update-card", {id:card.id,obj:obj})
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    swal.fire({
                        title: "Published!!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1200,
                    })
                    history("/");
                    history("/my-apis");
                    // window.location.reload(false);
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }

    async function handleUnPublish(){
        // e.preventD/efault();
        
        const obj = {
            IsPublish:false
        }
        // console.log(obj)
        axios.put("http://localhost:3001/update-card", {id:card.id,obj:obj})
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    swal.fire({
                        title: "Removed Publically",
                        showConfirmButton: false,
                        icon: 'success',
                        timer: 1200,
                    })
                    history("/");
                    history("/my-apis");
                    // window.location.reload(false);
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }

    async function handleDelete(){
        // e.preventD/efault();
        axios.delete("http://localhost:3001/delete-card", {data: {id:card.id}})
            .then(res => {
                if (res.data.message) alert(res.data.message);
                else {
                    history("/")
                    history("/my-apis");
                    // window.location.reload(false);
                }
            })
            .catch(err => {
                alert("error in signup: ", err);
            });
    }

    return (
        <>
            <div className={[style.container, "delete"].join(' ')} >
                <div className={style.post}>
                    <div className={style.header_post}>
                        <img src={card.image} alt="" />
                    </div>

                    <div className={style.body_post}>
                        <div className={style.post_content}>
                            <h1>{card.name}</h1>
                            <p className={style.scroll}>{card.description}</p>
                           <div className={style.manageButtons}> 
                            <button className={style.ourbutton}
                                type="button"
                                onClick={() => {
                                    handleEdit()
                                }
                                }
                            >
                                Edit
                            </button>
                            <button className={style.ourbutton}
                                type="button"
                                onClick={() => {
                                    handleDelete()
                                }
                                }
                            >
                                Delete
                            </button>
                            {!card.IsPublish? <button className={style.ourbuttons}
                                type="button"
                                onClick={() => {
                                    handlePublish()
                                }
                                }
                            >
                                Publish
                            </button>:<button className={style.ourbuttons}
                                type="button"
                                onClick={() => {
                                    handleUnPublish()
                                }
                                }
                            >
                                UnPublish
                            </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.bg_modal} id={card.id}>
                    <div className={style.close} onClick={()=>{
                        handleCross();
                    }}>+</div>
                    <form action="">
                        <input className={style.forinput} type="text" name="name" id="name" placeholder="API Name" defaultValue={card.name}  onChange={handleChange}/>
                        <input className={style.forinput} type="text" name="url" id="url" placeholder="API Image Url" defaultValue={card.image} onChange={handleChange}/>
                        <input className={style.forinput} type="text" name="endpoint" id="endpoint" placeholder="API Endpoint" defaultValue={card.endpoint} onChange={handleChange}/>
                        <textarea className={style.fortextarea} type="text" name="desc" id="desc" placeholder="Enter Description" defaultValue={card.description} cols="30" rows="5" onChange={handleChange} />
                        <a href="#" className={[style.custom_button, "btn"].join(' ')} onClick={()=>{
                            handleUpdate();
                        }}>Update and Save</a>
                    </form>
            </div>
        </>
    );
};

export default MyCard;