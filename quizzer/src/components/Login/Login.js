import React, { useState, setState } from "react";
import "./login.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

function Login() {
  const responseGoogle = response => {
    console.log(response);
    localStorage.setItem("token", response.Zi.id_token);
    axios
      .post("https://labs13-quizzer.herokuapp.com/api/auth/login", response, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="background">
      <div className="box">
        <h1 className="quizzer">Quizzer</h1>
        <h2 className="log-in">Login</h2>
        <GoogleLogin
          clientId="577740416033-jql0lb7lggi3u373nc7hqu5i0hgu68ge.apps.googleusercontent.com"
          buttonText="Sign In With Google"
          icon={true}
          render={renderProps => (
            <button
              className="text state"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign In With Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
