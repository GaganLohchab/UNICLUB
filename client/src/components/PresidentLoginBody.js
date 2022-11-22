// import { Link } from "@nextui-org/react";
import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import "./Login.css";
import UserContext from "../UserContext";
import {loginPresident} from "../api";
import {useNavigate} from "react-router";


export const PresidentLoginBody = () => {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const formDetails = new FormData();
    formDetails.append('email', email);
    formDetails.append('password', password);
    loginPresident(formDetails).then((res) => {
      if(res.status === 200) {
        navigate('/')
      }
    }).catch(console.log);
  }

  if(user.isAuth) {
    if(user.type === 'admin') return <Navigate to='/adminpanel'/>;
    if(user.type === 'president') return <Navigate to={`/${user.club}`}/>;
  }

  return (
    <div className="Login__form">
      <h2>President Login</h2>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="form">
            <h1 className="h1__text">Log in</h1>
            <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
            <br/>
            <button className="Login__btn" onClick={handleSubmit}>Log In</button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hey, there!</h1>
              <p>To login as Admin, Click below.</p>
              <a href="/adminlogin">
                <button className="Login__btn"
                  // class="ghost"
                  type="submit"
                  id="president_login"
                >
                  Admin Login
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default LoginBody;