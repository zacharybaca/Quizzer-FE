import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";

import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    data: "",
    quizId: "",
    questionId: ""
  });

  const { quizId, data } = componentData;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;

      const res = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );
      //setting database data to state with hooks

      setComponentData({
        ...componentData,
        data: res.data.quiz[0],
        quizId: res.data.quiz[0].quiz_id,
        questionId: res.data.quiz[0].id
      });
    };
    fetchData();
  }, []);

  const updateQuiz = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quest/question/${quizId}`
    );
  };

  const deleteQuiz = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
    props.history.push("/teachersDashboard");
  };

  return (
    <>
      {console.log(data)}
      <TeacherNavigation />
      <div className="main">
        <div className="choices">
          <div>Please select one of the following choices</div>
          {data.length > 0
            ? data.map(question => (
                <div>
                  <p>{question.Q_content}</p>
                  <p>{question.A}</p>
                  <p>{question.B}</p>
                  <p>{question.C}</p>
                  <p>{question.D}</p>
                </div>
              ))
            : null}

          <div>
            <button className="button" onClick={updateQuiz}>
              update quiz
            </button>
            <button className="button" onClick={deleteQuiz}>
              delete quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;
