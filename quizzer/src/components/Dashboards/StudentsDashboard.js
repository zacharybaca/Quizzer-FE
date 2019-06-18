import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./studentDashboard.css";

function StudentsDashboard(props) {
  const [quizzes, takeQuizzes] = useState([]);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://labs13-quizzer.herokuapp.com/api/quiz/student/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      takeQuizzes(result.data.quizzes);
    };
    fetchData();
  }, []);

  return (
    <div>
      <button>
        <Link to="/addclass">Add Class</Link>
      </button>
      {console.log(quizzes)}
      <h1>Student DashBoard</h1>

      {quizzes.length > 0 ? (
        quizzes.map(user => (
          <div key={user.id} className="box">
            <p>quiz</p>
            <p>by: {user.name}</p>
            <Link to={`quiz/${user.id}`}>take quiz</Link>
          </div>
        ))
      ) : (
        <p>no quizzes to complete</p>
      )}
    </div>
  );
}

export default StudentsDashboard;
