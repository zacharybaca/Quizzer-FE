import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
      takeQuizzes(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <button>
        <Link to="/quizzes">new quiz</Link>
        <Link to="/addclass">Add Class</Link>
      </button>
      {console.log(quizzes)}
      <h1>Student DashBoard</h1>

      {quizzes.length < 0 ? (
        quizzes.map(user => (
          <li>
            <p>quiz</p>
          </li>
        ))
      ) : (
        <p>no quizzes taken</p>
      )}
    </div>
  );
}

export default StudentsDashboard;
