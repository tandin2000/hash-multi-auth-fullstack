import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import RestService from "../API/RestApi";
import img from '../img/airplane.gif'
import img2 from '../img/hacker.gif'


import "./style.css"
const styles = {
  border: '1px solid rgba(1, 1, 1, 0.1)', 
  padding: 5,
};
function View() {
    let data = JSON.parse(localStorage.getItem('dataKey'));
    const [hiddenField, setHiddenField] = useState(false);
    const [newPassword, setNewPassword] = useState(""); 
    const [newTextMsg, setTextMsg] = useState(""); 
    const [fileUpload, setFileUpload] = useState(""); 
    const [password, setPassword] = useState(""); 

    const [hiddenStatus, setHiddenStatus] = useState(false);
    const [errorValue, SetErrorValue] = useState("");
    const resetFunction = () => {
      setHiddenField(true);
    } 

    const addStaffFunction = () => {
      window.open("https://localhost:3000/sign-up","_self");
    }

   
    const resetCancelFunction = () => {
      setPassword("");
      setNewPassword("");
      setHiddenField(false);
    } 

    const sendMessage = () => {
      const payload ={
        userId:data.username,
        message:newTextMsg
      }

      RestService.sendMsg(payload).then((response)=>{
        if(response.status === 201){
          setTextMsg("");
          alert("Message  sent failed!");
        }

        if(response.status === 200){
          setTextMsg("");
          alert("Message  sent!");
        }
      });
    }

    const onFileUpload = () => { 
      // console.log();
      RestService.sendFile(fileUpload).then((response)=>{
        if(response.status === 201){
          alert("File  sent failed!");
        }

        if(response.status === 200){
          alert("File  sent!");
        }
      });

    }

    const UpdateFunction = () =>{
      const payload = {
        password:password,
        newPassword:newPassword,
        username:data.username
      }

      RestService.resetPassword(payload).then((response)=>{
        if(response.status === 201){
          
          setPassword("");
          setNewPassword("");
          SetErrorValue(response.data.error);
          setHiddenStatus(true);
        }

        if(response.status === 200){
          setHiddenStatus(false);
          resetCancelFunction();
          alert("Password Reset");
        }
      });
    }

    if(data.role === 'admin'){
      return (
        <>
        <center>
          <img alt=" "src={img2} style={{height:"100px", width:"100px","margin-top":"-15px"}} />
        </center>

        <article className="card">
          <div className="card_content">
            <h3 className="card_title">
              Hello {data.name}
            </h3>
            <span className="card_subtitle">Number: +{data.number}</span>
            <p className="card_description">
              Your username is "{data.username}" and you are assigned as "{data.role}", Therefore you have the control to reset your password.
            </p>
          </div>
        </article>
        <br/>
        <br/>
        <center>
        {hiddenField ? (
          <>
          <h3>Reset</h3>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter old password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              />
          </div>
          {hiddenStatus ? (
            <p style={{color:"red"}}>{errorValue}</p>
          ) : ""}
          <br/>
          <br/>
          <button onClick={UpdateFunction}  className="btn btn-primary">
              Update
          </button> &nbsp; &nbsp; &nbsp;
          <button onClick={resetCancelFunction}  className="btn btn-primary">
              Cancel
          </button>
          </>
        ) : (
          <>
          <button onClick={resetFunction}  className="btn btn-primary">
              Reset Password
          </button>

          </>
        )}
<br/><br/>
      
          <button onClick={addStaffFunction}  className="btn btn-primary">
          Add Staff
          </button>
          
        </center>
        </>
      )
    }

    if(data.role === 'manager'){
      
      return (
        
        <>

        <article className="card">
          <div className="card_content">
       <img alt=" "src={img} style={{height:"50px", width:"50px","margin-top":"0px", float:"right"}} />
            <h3 className="card_title">
              Hello {data.name}
            </h3>
            <span className="card_subtitle">Number: +{data.number}</span>
            <p className="card_description">
              Your username is "{data.username}" and you are assigned as "{data.role}". Honored to have you in our platform. 
            
            </p>
          </div>
        </article>
        <div className="mt-2" border="1" style={styles}>
            <center>
            <textarea cols="30"
              value={newTextMsg}
              onChange={(e) => setTextMsg(e.target.value)}
              >

              </textarea><br/>
              <button onClick={sendMessage} className="btn btn-primary mt-2">
                Send Message
              </button>
            </center><br/>
        </div>
        <div className="mt-2"  border="1" style={styles}>
           <input type="file" onChange={(e)=> setFileUpload({ selectedFile: e.target.files[0] })}/>
            <center>
              <button className="btn btn-primary mt-2" onClick={onFileUpload} >
                Upload!
              </button>
            </center>
        </div>
        </>
      )
    }

    if(data.role === 'worker'){
      return (
        <>

        <article className="card">
          <div className="card_content">
       <img alt=" "src={img} style={{height:"50px", width:"50px","margin-top":"0px", float:"right"}} />
            <h3 className="card_title">
              Hello {data.name}
            </h3>
            <span className="card_subtitle">Number: +{data.number}</span>
            <p className="card_description">
              Your username is "{data.username}" and you are assigned as "{data.role}". Honored to have you in our platform. 
            
            </p>

          </div>
        </article>
            <p className="mt-2" style={styles}>
            <center>
              <textarea cols="30"
              value={newTextMsg}
              onChange={(e) => setTextMsg(e.target.value)}
              >

              </textarea><br/>
              <button onClick={sendMessage} className="btn btn-primary mt-2">
                Send Message
              </button>
            </center>
            </p>
        </>
      )
    }
  
}
export default View;