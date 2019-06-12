import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
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
      setQuizzes(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {console.log(quizzes)}
      <h1>dash</h1>

      {quizzes.length < 0 ? (
        quizzes.map(user => (
          <li>
            <p>quiz</p>
          </li>
        ))
      ) : (
        <p>no created quizzes</p>
      )}
    </div>
  );
}

export default TeacherDashboard;
