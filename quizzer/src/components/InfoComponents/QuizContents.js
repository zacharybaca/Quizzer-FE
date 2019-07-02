import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./folders.css";

const QuizContents = props => {
  const [modal, setModal] = useState(false);
  const { quiz } = props;

  const assignQuiz = async (e, quizId) => {
    e.preventDefault();

    const quizData = {
      quiz_name: quiz.quiz_name,
      description: quiz.description,
      assigned: true
    };
    await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quiz.id}`,
      quizData
    );
  };

  const removeQuiz = async (e, id) => {
    e.preventDefault();
    await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/removequiz/${id}`
    );
  };

  return (
    <div>
      <p
        className="quiz-icon"
        onClick={() => {
          setModal(!modal);
        }}
      >
        {quiz.quiz_name}
      </p>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Quiz</ModalHeader>
        <ModalBody>
          <div>
            <div className="modal-quiz">
              <button
                onClick={e => removeQuiz(e, quiz.id)}
                className="modal-box"
              >
                remove from folder
              </button>

              <Link to={`edit/quiz/${quiz.id}`}>
                <button className="modal-box">edit quiz</button>
              </Link>
              <button
                className="modal-box"
                onClick={e => assignQuiz(e, quiz.id)}
              >
                assign quiz
              </button>
            </div>
            <button
              className="modal-box"
              onClick={() => {
                setModal(!modal);
              }}
            >
              cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QuizContents;
