import React from "react";
import axios from "axios";
import AddQuestion from "./AddQuestion";
import { Redirect } from "react-router-dom";
import Folders from '../InfoComponents/Folders'

class AddQuiz extends React.Component {
  state = {
    quiz_name: "",
    quiz_description: "",
    quiz_id: null,
    createQuestion: false
  };

  addQuizName = event => {
    this.setState({ quiz_name: event.target.value });
  };

  addQuizDescription = event => {
    this.setState({ quiz_description: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const quiz = {
      quiz_name: this.state.quiz_name,
      description: this.state.quiz_description,
      teacher_id: localStorage.getItem("id")
    };

    const teacher_id = localStorage.getItem("id");

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes`,
        {
          quiz
        }
      )
      .then(res => {
        this.setState({
          quiz_id: res.data.id
        });
      });
    this.setState({
      quiz_name: "",
      quiz_description: ""
    });
  };

  openQuestion() {
    this.setState({
      createQuestion: true
    });
  }

  render() {
    return (
      <>
      <Folders></Folders>
      <div className="quizform">
        {this.state.quiz_id === null ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label className='label'>Quiz Name</label>
              <br />
              <input
                className="text-box"
                type="text"
                value={this.state.quiz_name}
                onChange={this.addQuizName}
              />
              <br />
              <br />
              <label className="add-quiz-label">Add Quiz Description</label>
              <br />
              <input
                className="add-quiz-text-box"
                type="text"
                value={this.state.quiz_description}
                onChange={this.addQuizDescription}
              />
              <br />
              <button className="submit-button" type="submit">Add Quiz</button>
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
            {this.state.quiz_id !== null ? (
              <AddQuestion quizId={this.state.quiz_id} />
            ) : null}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default AddQuiz;
