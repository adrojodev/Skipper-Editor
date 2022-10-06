import React from "react";
import { login } from "../functions/firebase";
import "../styles/login.css";

const LogInComponent = () => {
  function loginHere(e) {
    login(e.target);
  }
  return (
    <div className="loginBackContainer">
      <div className="loginCardContainer">
        <h1 className="header big">Hello human 👋</h1>
        <h3 className="header small loginSubHeader">Plase login</h3>
        <div className="loginButton" id="signButton" onClick={loginHere}>
          <span className="icon"></span>
          <span className="buttonText">Sign in with google</span>
        </div>
      </div>
    </div>
  );
};

export default LogInComponent;
