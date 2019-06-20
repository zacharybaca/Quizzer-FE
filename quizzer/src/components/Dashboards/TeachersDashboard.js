import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeacherNavigation from "./Navigation/TeacherNavgation.js";
import "./teacherDashboard.css";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [accessCode, setAccessCode] = useState(null);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL}/api/quiz/teachers/${localStorage.getItem(
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
      <TeacherNavigation />
      <button className='button'>
        <Link className='white' to="/quizzes">new quiz</Link>
      </button>
      <button class='button' onClick={access}>get access code</button>
      <h1>dash</h1>
      {accessCode ? <h1>access code: {accessCode}</h1> : null}


      {quizzes.length > 0 ? (
        quizzes.map(user => (
          <div key={user.id} className="box">
            <h3>{user.quiz_name}</h3>
            <p>{user.description}</p>
            <Link to={`edit/quiz/${user.quiz_id}`}>edit quiz</Link>
          </div>
        ))
      ) : (
        <p>no created quizzes</p>
      )}
    </div>
  );
}

export default TeacherDashboard;
