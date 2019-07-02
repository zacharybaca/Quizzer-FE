import React, { useState } from "react";
import PropTypes from "prop-types";
import "./EditQuiz.css";

const EditQuestion = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { question, index, Eachquestion } = props;

  const handleSubmit = (e, id) => {
    props.handleSubmit(e, id);
  };

  const filter = () => {
    setShowContactInfo(!showContactInfo);
    props.filterQuestions(index);
  };

  const handleChanges = (e, id, idx) => {
    props.handleChanges(e, id, idx);
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
