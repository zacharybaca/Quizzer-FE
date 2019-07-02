import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./folders.css";


const QuizContents = props => {
  const [modal, setModal] = useState(false);
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
      <p
        className='quiz-icon'
        onClick={() => {
          setModal(!modal);
        }}
      >
        {quiz.quiz_name}
      </p>
      <Modal isOpen={modal}>
        <ModalHeader>Quiz</ModalHeader>
        <ModalBody>
          <div>
            <div className='modal-quiz'>
              <button className="modal-box">remove from folder</button>

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
