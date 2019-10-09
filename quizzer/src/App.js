import React from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import AccessCode from "./components/InfoComponents/accessCode";
import StudentsDashboard from "./components/Dashboards/StudentsDashboard";
import TeachersDashboard from "./components/Dashboards/TeachersDashboard";
import Protected from "./components/Protected/Protected";
import QuizForm from "./components/QuizForm/QuizForm";
import Questions from "./components/QuizForm/AddQuestion";
import EditQuiz from "./components/QuizForm/EditQuiz";
import AddQuestion from "./components/QuizForm/AddQuestion";

import StripePage from "./Stripe/StripePage/StripePage";
import Step2Page from "./Stripe/Step2/Step2Page";

import Quiz from "./components/Quiz/Quiz";
import getQuiz from "./components/Quiz/getQuiz";

function App(props) {
  //console.log(props)
  return (
    <>
      <div>
        <Route exact path="/" component={Login} />
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
      <Protected exact path="/createdquiz/:id" component={AddQuestion} />
      <Protected exact path="/quiz/:id" component={Quiz} />

      <Route exact path="/step1" component={Step2Page} />
      <Route exact path="/step2" component={StripePage} />
      <Route exact path="/getQuiz" component={getQuiz} />
    </>
  );
}

export default App;
