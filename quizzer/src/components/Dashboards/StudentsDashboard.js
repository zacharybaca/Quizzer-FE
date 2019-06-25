import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./studentDashboard.css";
import StudentNavigation from "./Navigation/StudentNavigation.js";
import { Button } from "reactstrap";

function StudentsDashboard(props) {
  const [quizzes, takeQuizzes] = useState([]);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env
            .REACT_APP_BE_LOCAL}/api/quiz/student/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      takeQuizzes(result.data.quizzes);
    };
    fetchData();
  }, [takeQuizzes]);

  return (
    <div>
      <StudentNavigation />
      <button className="button">
        <Link className="white" to="/addclass">
          add class
        </Link>
      </button>
      <div>
        {console.log(quizzes)}
        <h1 className="header1">Student Đashboard</h1>
        <div className="header2">Assigned Quizzes</div>
        <div className="assigned-quizzes">
          {quizzes.length > 0 ? (
            quizzes.map(user => (
              <div key={user.id} className="box">
                {console.log(user)}
                <h6 className="p">
                  <strong>{user.quiz_name}</strong>
                </h6>
                <p>Assigned By: {user.name}</p>
                <p>{user.description}</p>
                <p>10 Main Questions</p>
                <p>10 Remedial Questions</p>
                <Button color="purple">
                  <Link to={`quiz/${user.id}`}>
                    <p className="p">take quiz</p>
                  </Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="header3">No quizzes at this time, try again later...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsDashboard;
