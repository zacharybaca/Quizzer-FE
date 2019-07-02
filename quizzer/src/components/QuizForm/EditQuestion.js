import React, { useState } from "react";
import "./EditQuiz.css";

const EditQuestion = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { index } = props;

  const filter = () => {
    setShowContactInfo(!showContactInfo);
    props.filterQuestions(index);
  };

  return (
    <div>
      <h2
        onClick={filter}
        className={`${props.chosen === index ? "clicked" : null}`}
      >
        Question {index + 1}
      </h2>
      {showContactInfo ? null : null}
    </div>
  );
};

export default EditQuestion;
