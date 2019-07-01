import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const QuizContents = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { quiz } = props;
  const onDeleteClick = async id => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/removequiz/${id}`
    );

    console.log(res);
  };

  const assignQuiz = async (e, quizId) => {
    e.preventDefault();

    const quizData = {
      quiz_name: quiz.quiz_name,
      description: quiz.description,
      assigned: true
    };
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quiz.id}`,
      quizData
    );
  };

  return (
    <div>
      <p onClick={() => setShowContactInfo(!showContactInfo)}>
        {quiz.quiz_name}
      </p>
      {showContactInfo ? (
        <div>
          <i
            className="fas fa-times"
            style={{
              cursor: "pointer",
              float: "right",
              color: "red"
            }}
            onClick={() => onDeleteClick(quiz.id)}
          />
          <p>remove from folder</p>
          <div>
            <Link to={`edit/quiz/${quiz.id}`}>
              <button>edit quiz</button>
            </Link>
            <button onClick={e => assignQuiz(e, quiz.id)}>assign quiz</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuizContents;
