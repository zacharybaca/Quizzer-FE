import React, { useState } from "react";
import axios from "axios";
import AddQuestion from "./AddQuestion";
import Folders from "../InfoComponents/Folders";

function AddQuiz(props) {
  const [display, setDisplay] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: "",
    quiz_description: "",
    quiz_id: null,
    createQuestion: false
  });

  const { quiz_name, quiz_description, quiz_id } = quizInfo;

  const onChange = e =>
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    const quiz = {
      quiz_name: quiz_name,
      description: quiz_description,
      teacher_id: localStorage.getItem("id")
    };

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes`,
        {
          quiz
        }
      )
      .then(res => {
        setQuizInfo({
          quiz_id: res.data.id
        });
      });
    setQuizInfo({
      quiz_name: "",
      quiz_description: ""
    });
  };

  return (
    <>
      <Folders />
      <div className="add-quizform">
        {quiz_id === null ? (
          <div>
            <form onSubmit={e => handleSubmit(e)}>
              <label className="label">Quiz Name</label>
              <br />
              <input
                name="quiz_name"
                className="text-box"
                type="text"
                value={quiz_name}
                onChange={e => onChange(e)}
              />
              <br />
              <br />
              <label className="add-quiz-label">Add Quiz Description</label>
              <br />
              <input
                name="quiz_description"
                className="add-quiz-text-box"
                type="text"
                value={quiz_description}
                onChange={e => onChange(e)}
              />
              <br />
              <button className="submit-button" type="submit">
                Add Quiz
              </button>
            </form>
            <br />
          </div>
        ) : (
          <></>
        )}
        <div>
          <br />
          <br />
          <div className="main-question-container">
            {display ? <AddQuestion quizId={quiz_id} /> : null}

            {quiz_id !== null ? (
              display ? null : (
                <button
                  onClick={() => {
                    setDisplay(!display);
                  }}
                >
                  Add Question
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddQuiz;
