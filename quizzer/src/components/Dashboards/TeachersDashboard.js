import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import "./teacherDashboard.css";
import { Button } from "reactstrap";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [accessCode, setAccessCode] = useState(null);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env
            .REACT_APP_BE_LOCAL}/api/quiz/teachers/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      setQuizzes(result.data);
    };
    fetchData();
  }, []);

  const access = () => {
    setAccessCode(localStorage.getItem("access_code"));
  };

  return (
    <div className="mobile">
      <TeacherNavigation />
      <button className="button">
        <Link className="white" to="/quizzes">
          new quiz
        </Link>
      </button>
      <button className="button" onClick={access}>
        get access code
      </button>

      <h1 className="header1">Teacher Đashboard</h1>
      {accessCode ? <h1>access code: {accessCode}</h1> : null}
      <div className="header2">Recently Administered Quizzes</div>
      <div className="recently-administered-quizzes">
        {quizzes.length > 0 ? (
          quizzes.map(user => (
            <div key={user.id} className="box">
              <h6 className="p">
                <strong>{user.quiz_name}</strong>
              </h6>
              <p>{user.description}</p>
              <Button color="purple">
                <Link to={`edit/quiz/${user.id}`}>
                  <p className="purple">edit quiz</p>
                </Link>
              </Button>
            </div>
          ))
        ) : (
          <p>no created quizzes</p>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
