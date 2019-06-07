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

import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "./components/Step2/Step2Page";

const Homepage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
`;
function App() {
  const responseGoogle = response => {
    console.log(response.Zi.id_token);
    localStorage.setItem("token", response.Zi.id_token);
    axios
      .post("http://labs13-quizzer.herokuapp.com/api/auth/login", response, {
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
    <Router>
      <div className="App">
        <GoogleLogin
          clientId="577740416033-pdp5vg3nk3r0o0hvs3nl2ipae4ggr92i.apps.googleusercontent.com"
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

      {/* <Route extact path="/" component={Home}/> */}
      <Route exact path="/step1" component={StripePage} />
      <Route exact path="/step2" component={Step2Page} />
    </Router>
  );
}

export default App;
