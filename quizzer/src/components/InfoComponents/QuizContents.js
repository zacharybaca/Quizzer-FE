import React, { useState } from "react";
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
            <p>assign quiz</p>
            <p>edit quiz</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuizContents;
