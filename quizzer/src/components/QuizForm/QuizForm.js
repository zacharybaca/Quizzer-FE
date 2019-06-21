import React from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";
import SideBarNav from "./SideBarNav";
import AddQuiz from "./AddQuiz";

function QuizForm() {
  return (
    <div>
      <TeacherNavigation />
      <AddQuiz />
    </div>
  );
}

export default QuizForm;
