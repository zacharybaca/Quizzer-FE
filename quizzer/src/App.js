import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import AccessCode from "./components/InfoComponents/accessCode";
import StudentsDashboard from "./components/Dashboards/StudentsDashboard";
import TeachersDashboard from "./components/Dashboards/TeachersDashboard";
import Protected from "./components/Protected/Protected";
import QuizForm from "./components/QuizForm/QuizForm";
import Questions from "./components/QuizForm/AddQuestion";
import EditQuiz from "./components/QuizForm/EditQuiz";
import EditQuestion from "./components/QuizForm/EditQuestion";

import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "./components/Step2/Step2Page";

// import Quiz2 from "./components/Quiz/Quiz2";
import Quiz from "./components/Quiz/Quiz";
import QuizData from "./components/Quiz/QuizData";
import getQuiz from "./components/Quiz/getQuiz";

function App(props) {
  //console.log(props)
  return (
    <>
<<<<<<< HEAD
      <div className="App">
        <Route exact path="/" render = {props => <Login {...props} history={props.history} />} />
=======
      <div>
        <Route exact path="/" component={Login} />
>>>>>>> 0563322846c7452701d97f119cfd3e7b0d15c97e
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
      <Protected exact path="/quizzes" component={QuizForm} />
      <Protected exact path="/questions" component={Questions} />
      <Protected exact path="/edit/quiz/:id" component={EditQuiz} />

      <Protected exact path="/quiz/:id" component={Quiz} />

      <Protected exact path="/quizData" component={QuizData} />

      <Route exact path="/step1" component={Step2Page} />
      <Route exact path="/step2" component={StripePage} />
      <Route exact path="/getQuiz" component={getQuiz} />
    </>
  );
}

export default App;
