import React, { useState } from "react";
import PropTypes from "prop-types";

const EditQuestion = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const { question, index, Eachquestion } = props;

  const handleSubmit = (e, id) => {
    props.handleSubmit(e, id);
  };

  const handleChanges = (e, id, idx) => {
    props.handleChanges(e, id, idx);
  };
  return (
    <div>
      <h2>
        Question {index + 1}
        <i
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="fas fa-sort-down"
          style={{ cursor: "pointer" }}
        />
      </h2>
      {showContactInfo ? (
        <form key={question.id} onSubmit={e => handleSubmit(e, question.id)}>
          <div className="top-info">
            <label>Category</label>
            <br />
            <select
              value={question.category}
              className="text-box"
              name="category"
              onChange={e => handleChanges(e, question.id, index)}
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Spanish">Spanish</option>
            </select>
            <br />
            <br />
            <label>Type</label>

            <br />
            <select
              onChange={e => handleChanges(e, question.id, index)}
              value={question.type}
              className="text-box"
              name="type"
            >
              <option value={1}>Standard</option>
              <option value={2}>Remedial</option>
            </select>
          </div>

          <br />
          <br />
          <label className="question">
            Question{console.log("q_content", question.Q_content)}
          </label>
          <br />
          <input
            name="Q_content"
            className="question-text-box"
            type="text"
            onChange={e => handleChanges(e, question.id, index)}
            value={question.Q_content}
          />
          <br />
          <br />

          <div className="answers">
            <div className="AB">
              <label>A</label>
              <br />
              <input
                onChange={e => handleChanges(e, question.id, index)}
                name="A"
                className="text-box"
                type="text"
                value={question.A}
              />
              <br />
              <br />
              <label>B</label>
              <br />
              <input
                onChange={e => handleChanges(e, question.id, index)}
                name="B"
                className="text-box"
                type="text"
                value={question.B}
              />
            </div>
            <br />
            <br />

            <div className="CD">
              <label>C</label>
              <br />
              <input
                onChange={e => handleChanges(e, question.id, index)}
                name="C"
                className="text-box"
                type="text"
                value={question.C}
              />
              <br />
              <br />
              <label>D</label>
              <br />
              <input
                onChange={e => handleChanges(e, question.id, index)}
                name="D"
                className="text-box"
                type="text"
                value={question.D}
              />
            </div>
          </div>
          <br />
          <br />
          <label>Correct Answer</label>
          <br />
          <input
            onChange={e => handleChanges(e, question.id, index)}
            name="correct_answer"
            className="text-box"
            type="text"
            value={question.correct_answer}
          />
          <br />
          <br />
          <label>Points</label>
          <br />
          <input
            onChange={e => handleChanges(e, question.id, index)}
            name="points"
            className="text-box"
            type="text"
            value={question.points}
          />
          <br />
          <button className="submit-button" type="submit">
            update Question
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default EditQuestion;
