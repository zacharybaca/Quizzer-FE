import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import User from "./components/user";
import Login from "./components/Login/Login";
import AccessCode from "./components/InfoComponents/accessCode";
import Student from "./components/student";
import Teacher from "./components/teacher";
import StudentsDashboard from "./components/Dashboards/StudentsDashboard";
import TeachersDashboard from "./components/Dashboards/TeachersDashboard";
import Protected from "./components/Protected/Protected";
import QuizForm from "./components/QuizForm/QuizForm";
import EditQuiz from "./components/QuizForm/EditQuiz";
import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "./components/Step2/Step2Page";

// import Quiz2 from "./components/Quiz/Quiz2";
import Quiz from "./components/Quiz/Quiz";
import QuizData from "./components/Quiz/QuizData";
import getQuiz from "./components/Quiz/getQuiz";

<<<<<<< HEAD
=======
import logo from './logowhite.svg';



>>>>>>> d0dc745059e7f55ac492a03d58198bab1e1b0be4
function App(props) {
  return (
    <>
      <div className="App">
        <Route exact path="/login" component={Login} />
      </div>

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
      <Protected exact path="/addclass" component={AccessCode} />
      <Protected exact path="/users" component={User} />
      <Protected exact path="/students" component={Student} />
      <Protected exact path="/teachers" component={Teacher} />
      <Protected exact path="/quizzes" component={QuizForm} />
      <Protected exact path="/edit/quiz/:id" component={EditQuiz} />

      <Protected exact path="/quiz/:id" component={Quiz} />

      <Protected exact path="/quizData" component={QuizData} />

      {/* <Route exact path="/" component={Home}/> */}
      <Route exact path="/step1" component={StripePage} />
      <Route exact path="/step2" component={Step2Page} />
      <Route exact path="/getQuiz" component={getQuiz} />
    </>
  );
}

export default App;
