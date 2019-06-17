import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import User from "./components/user";
import Login from "./components/Login/Login";
import Choose from "./components/InfoComponents/Choose";
import Student from "./components/student";
import Teacher from "./components/teacher";
import StudentsDashboard from "./components/Dashboards/StudentsDashboard";
import TeachersDashboard from "./components/Dashboards/TeachersDashboard";
import { GoogleLogout } from "react-google-login";
import Protected from "./components/Protected/Protected";
import QuizForm from "./components/QuizForm/QuizForm";
import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "./components/Step2/Step2Page";

// import Quiz2 from "./components/Quiz/Quiz2";
import Quiz from "./components/Quiz/Quiz";
import QuizData from "./components/Quiz/QuizData";
import getQuiz from './components/Quiz/getQuiz'

const Homepage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 15px;
  height: 64px;
  width: 100%;
  background-color: #363648;
`;
function App(props) {
  const logout = () => {
    console.log("pressed");
    localStorage.removeItem("token");
    console.log(props);
  };
  return (
    <>
      <div className="App">
        <Route exact path="/login" component={Login} />
      </div>

      <div>
        {localStorage.getItem("token") ? (
          <Homepage>
            <h1 className="logo">Quiz Dig</h1>
            <button onClick={logout}>logout</button>
          </Homepage>
        ) : null}

        <Protected
          exact
          path="/studentsDashboard"
          component={StudentsDashboard}
        />
        <Protected
          exact
          path="/teachersDashboard"
          component={TeachersDashboard}
        />
        <Protected exact path="/choose" component={Choose} />
        <Protected exact path="/users" component={User} />
        <Protected exact path="/students" component={Student} />
        <Protected exact path="/teachers" component={Teacher} />
        <Protected exact path="/quizzes" component={QuizForm} />
        
        <Protected exact path="/quiz" component={Quiz} />
        
        <Protected exact path="/quizData" component={QuizData} />
     
      </div>

      {/* <Route exact path="/" component={Home}/> */}
      <Route exact path="/step1" component={StripePage} />
      <Route exact path="/step2" component={Step2Page} />
      <Route exact path="/getQuiz" component={getQuiz} />

    </>
  );
}

export default App;
