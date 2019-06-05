import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";

import User from "./components/user";
import Student from "./components/student";
import Teacher from "./components/teacher";

const Homepage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
`;
function App() {
  const responseGoogle = response => {
    axios
      .post("http://localhost:8000/api/auth/login", response)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("error");
      });

    localStorage.setItem("token", response.Zi.access_token);
  };

  return (
    <Router>
      <div className="App">
        <GoogleLogin
          clientId="577740416033-5o653e0h7poma6p0qnhdmptir1gneqo6.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <GoogleLogout buttonText="Logout" />
      </div>
      <div>
        <Homepage>
          <Link to="/users">Users</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
        </Homepage>
        <Route path="/users" component={User} />
        <Route path="/students" component={Student} />
        <Route path="/teachers" component={Teacher} />
      </div>
    </Router>
  );
}

export default App;
