import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./teacherDashboard.css";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [accessCode, setAccessCode] = useState(null);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://labs13-quizzer.herokuapp.com/api/quiz/teachers/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      setQuizzes(result.data.quizzes);
    };
    fetchData();
  }, []);

  const access = () => {
    setAccessCode(localStorage.getItem("access_code"));
  };

  return (
    <div>
      <button>
        {" "}
        <Link to="/quizzes">new quiz</Link>
      </button>
      <button onClick={access}>get access code</button>
      <h1>dash</h1>
      {accessCode ? <h1>access code: {accessCode}</h1> : null}

      {quizzes.length > 0 ? (
        quizzes.map(user => (
          <div key={user.id} className="box">
            <p>quiz</p>
          </div>
        ))
      ) : (
        <p>no created quizzes</p>
      )}
    </div>
  );
}

export default TeacherDashboard;
