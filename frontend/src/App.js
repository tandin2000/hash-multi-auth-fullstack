import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import View from './components/view';
import img from './img/social-media.gif'
import img2 from './img/happy.gif'
import img3 from './img/cynical.gif'
import img4 from './img/IT19098838.gif'
import img5 from './img/IT19086408.gif'
function App() {

  function logOutFunction() {
    localStorage.clear();
    window.open("http://localhost:3000/sign-in","_self")
  }

  const [navHidden, setNavHidden] = useState(true);

  let data = JSON.parse(localStorage.getItem('status'));

  useEffect(() => {
    if(data !== undefined && data !== null) {
      setNavHidden(data.status)
    }
  },[])

  const hiddenState = () => {
    setNavHidden(false)
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              <img src={img} style={{height:"50px", width:"50px"}} />
              JustForYou-SLIIT
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {navHidden ? (
                  <>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li>
                  </>
                ) : (
                <li className="nav-item">
                  <Link className="nav-link" onClick={logOutFunction}>
                    Log out
                    <img src={img2} style={{height:"30px", width:"30px"}} />
                  </Link>
                </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
          <div className="auth-wrapper">
            <div className="auth-inner">
        <Routes>
                <Route exact path="/" element={<Login  hiddenState={hiddenState}/>} />
                <Route path="/sign-in" element={<Login  hiddenState={hiddenState}/>} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/home" element={<View />} />
        </Routes>
            </div>
          </div>

          <div className="footer">
                  <center>
                    <img src={img3} style={{height:"200px", width:"200px"}} /><br/>
                     [<b>Developer</b>] : [ Tandin Wangchen ] &amp;&amp; [<b>Developer</b>] : [ Nirmith Akash ]<br/>
                    <img src={img4} style={{height:"80px", width:"100%"}} /><br/>
                    <img src={img5} style={{height:"80px", width:"100%"}} /><br/>
                  </center>
          </div>
      </div>
    </Router>
  )
}
export default App