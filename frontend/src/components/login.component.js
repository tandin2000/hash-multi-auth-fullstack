import React, { useState } from 'react'
import RestService from "../API/RestApi";
import img from '../img/fast-forward.gif'

function Login(props) {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [hiddenStatus, setHiddenStatus] = useState(false);
    const [errorValue, SetErrorValue] = useState("");



    const submitFunction = () => {
      if(username === ""){
        SetErrorValue("Username is required");
        setHiddenStatus(true);
      }else if(password === ""){
        SetErrorValue("Password is required");
        setHiddenStatus(true);
      }
      else{
        const sendPayload = {
          username: username,
          password: password
        }
        RestService.fetchSignUp(sendPayload).then((response)=>{
           if(response.status === 201){
              SetErrorValue(response.data.error);
              setHiddenStatus(true);
           }
  
           if(response.status === 200){
            setHiddenStatus(false);
            const data = {
                username:response.data.username,
                name:response.data.name,
                number:response.data.number,
                role:response.data.role,
            }
            const loginStatus = {
              status: false
            }
            localStorage.setItem('dataKey', JSON.stringify(data));
            localStorage.setItem('status', JSON.stringify(loginStatus));
            window.open("http://localhost:3000/home","_self")
           }
        })
      }
    };

    return (
      <>
        <img src={img} style={{height:"50px", width:"50px"}} />
        <h3 style={{"margin-top":"-35px"}}>Sign In</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="d-grid">
          <button onClick={submitFunction}  className="btn btn-primary">
            Submit
          </button>
          <br/>
          {hiddenStatus ? (
            <p style={{color:"red"}}>{errorValue}</p>
          ) : ""}
        </div>
      </>
    )
  
}

export default Login;