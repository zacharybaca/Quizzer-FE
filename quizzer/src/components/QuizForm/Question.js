import React from "react";
import PropTypes from "prop-types";

const Question = props => {
  console.log(props.question);
  return (
    <div>
      <h1>{props.question}</h1>
    </div>
  );
};

export default Question;
