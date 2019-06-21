import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import logo from "./logopurple.svg";

function Login(props) {
  const [signedIn, setSignedIn] = useState();
  const responseGoogle = response => {
    console.log(response);
    localStorage.setItem("token", response.Zi.id_token);

    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/api/auth/teacher/login`,
        response,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("access_code", res.data.access_code);
        localStorage.setItem("id", res.data.id);
        setSignedIn(res.data.id);
        props.history.push("/teachersDashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const responseGoogle1 = response => {
    console.log(response);
    localStorage.setItem("token", response.Zi.id_token);
    console.log(process.env.REACT_APP_BE_URL);
    axios
      .post(
        `${process.env.REACT_APP_BE_URL}/api/auth/student/login`,
        response,
        {
          headers: { Authorization: localStorage.getItem("token") }
        }
      )
      .then(res => {
        console.log("hello", res.data);
        localStorage.setItem("id", res.data.id);
        props.history.push("/studentsDashboard");
        console.log("ran");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="background">
      <div className="box">
        <img className="img" src={logo} height="35" alt="Logo White" />

        <div>
          <h2 className="log-in">Login as Teacher</h2>
          <GoogleLogin
            clientId="577740416033-jql0lb7lggi3u373nc7hqu5i0hgu68ge.apps.googleusercontent.com"
            render={renderProps => (
              <button
                className="text state"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google margin" />
                Sign In With Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div>
          <h2 className="log-in">Login as Student</h2>
          <GoogleLogin
            clientId="577740416033-jql0lb7lggi3u373nc7hqu5i0hgu68ge.apps.googleusercontent.com"
            render={renderProps => (
              <button
                className="text state"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google margin" />
                Sign In With Google
              </button>
            )}
            onSuccess={responseGoogle1}
            onFailure={responseGoogle1}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
