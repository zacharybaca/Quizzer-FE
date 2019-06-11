import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";

import User from "./components/user";
import Login from "./components/Login/Login";
import Student from "./components/student";
import Quiz from './components/Quiz/Quiz'
import QuizData from './components/Quiz/QuizData'
import Teacher from "./components/teacher";
import QuizForm from './components/QuizForm/QuizForm';



import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "./components/Step2/Step2Page";

const Homepage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
`;
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
      </div>

      <div>
        <Homepage>
          <Link to="/users">Users</Link>
          <Link to="/students">Students</Link>
          <Link to="/teachers">Teachers</Link>
          <Link to="/quizzes">Quizzes</Link>
        </Homepage>
        <Route path="/users" component={User} />
        <Route path="/students" component={Student} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/teachers" component={Teacher} />
        <Route exact path="/quizzes" component={QuizForm} />
      </div>

      {/* <Route extact path="/" component={Home}/> */}
      <Route exact path="/step1" component={StripePage} />
      <Route exact path="/step2" component={Step2Page} />
    </Router>
  );
}

export default App;
