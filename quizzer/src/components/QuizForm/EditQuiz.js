import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";
import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    quizId: ""
  });

  const { quizId } = componentData;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;
      console.log(id);
      const res = await axios(
        `${process.env.REACT_APP_BE_URL || process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );
      //setting database data to state with hooks
      console.log("ran");
      console.log(res.data);
      setComponentData({ ...componentData, quizId: res.data.quiz[0].quiz_id });
    };
    fetchData();
  }, []);

  const updateQuiz = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL || process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
  };

  const deleteQuiz = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL || process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
  };

  return (
    <>
      <TeacherNavigation />
      <div className = "main">
        <div className = "choices">
          <div>Please select one of the following choices</div>
          <div>
            <button className='button' onClick={updateQuiz}>update quiz</button>
            <button className='button' onClick={deleteQuiz}>delete quiz</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;
