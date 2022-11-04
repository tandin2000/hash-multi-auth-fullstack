import React, { useState } from 'react'
import RestService from "../API/RestApi";
import img from '../img/fast-backward.gif'

function SignUp() {
    const [username, setUsername] = useState(""); 
    const [name, setName] = useState(""); 
    const [number, setNumber] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [role, setRole] = useState(""); 
    
    const [hiddenStatus, setHiddenStatus] = useState(false);
    const [errorValue, SetErrorValue] = useState("");
  console.log(role)
    const submitFunction = () => {

      if(username === ""){
        SetErrorValue("Username is required");
        setHiddenStatus(true);
      }else if( name === ""){

        SetErrorValue("Name is required");
        setHiddenStatus(true);
      }else if( number === ""){

        SetErrorValue("Number is required");
        setHiddenStatus(true);
      }else if( password === ""){

        SetErrorValue("Password is required");
        setHiddenStatus(true);
      }else if( role === ""){

        SetErrorValue("Role is required");
        setHiddenStatus(true);
      }else{
        const payload = {
          username: username,
          name: name,
          number: `94${number}`,
          password: password,
          role: role
        }

        console.log(payload)
        RestService.fetchSignIn(payload).then((response)=>{
          if(response.status === 201){
            SetErrorValue(response.data.error);
            setHiddenStatus(true);
          }

          if(response.status === 200){
            setHiddenStatus(false);
            alert("Registered successfully");
            window.open("http://localhost:3000/home","_self");
          }
        })
      }
    }
    const BackFunction = () => {
      window.open("http://localhost:3000/home","_self");
    }
    return (
      <>
        <h3 style={{"margin-top":"85px"}}>Sign Up</h3>
        <img src={img} style={{height:"50px", width:"50px","margin-top":"-65px", float:"right"}} />

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>username</label>
          <input type="text" className="form-control" placeholder="username" value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Mobile Number (+94)" 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" name="role">Select</option>
            <option value="manager" name="role">Manager</option>
            <option value="worker" name="role">Worker</option>
          </select>
        </div>

        <div className="d-grid">
          <button onClick={submitFunction}  className="btn btn-primary">
            Submit
          </button>
          <br/>
          {hiddenStatus ? (
            <p style={{color:"red"}}>{errorValue}</p>
          ) : ""}
          
          <button onClick={BackFunction}  className="btn btn-primary">
            Go Back
          </button>
        </div>
        
      </>
    )
  
}
export default SignUp;