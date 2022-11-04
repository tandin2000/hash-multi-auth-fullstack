import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RestService from "../API/RestApi";
import img from '../img/airplane.gif'
import img2 from '../img/hacker.gif'


import "./style.css"
function View() {
    let data = JSON.parse(localStorage.getItem('dataKey'));
    const [hiddenField, setHiddenField] = useState(false);
    const [newPassword, setNewPassword] = useState(""); 
    const [password, setPassword] = useState(""); 

    const [hiddenStatus, setHiddenStatus] = useState(false);
    const [errorValue, SetErrorValue] = useState("");


    const resetFunction = () => {
      setHiddenField(true);
    } 

    const addStaffFunction = () => {
      window.open("http://localhost:3000/sign-up","_self");
    }

   
    const resetCancelFunction = () => {
      setPassword("");
      setNewPassword("");
      setHiddenField(false);
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
          <img src={img2} style={{height:"100px", width:"100px","margin-top":"-15px"}} />
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
       <img src={img} style={{height:"50px", width:"50px","margin-top":"0px", float:"right"}} />
            <h3 className="card_title">
              Hello {data.name}
            </h3>
            <span className="card_subtitle">Number: +{data.number}</span>
            <p className="card_description">
              Your username is "{data.username}" and you are assigned as "{data.role}". Honored to have you in our platform. 
            
            </p>
          </div>
        </article>
        </>
      )
    }

    if(data.role === 'worker'){
      return (
        <>

        <article className="card">
          <div className="card_content">
       <img src={img} style={{height:"50px", width:"50px","margin-top":"0px", float:"right"}} />
            <h3 className="card_title">
              Hello {data.name}
            </h3>
            <span className="card_subtitle">Number: +{data.number}</span>
            <p className="card_description">
              Your username is "{data.username}" and you are assigned as "{data.role}". Honored to have you in our platform. 
            
            </p>
          </div>
        </article>
        </>
      )
    }
  
}
export default View;