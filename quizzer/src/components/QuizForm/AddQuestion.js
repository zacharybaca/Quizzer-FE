import React from "react";
import axios from "axios";
import "./addQuiz.css";
import { Redirect } from "react-router-dom";
import Question from "./Question.js";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "Math",
      type: 1,
      Q_content: "",
      A: "",
      B: "",
      C: "",
      D: "",
      correct_answer: "",
      points: "",
      quiz_id: this.props.quizId,
      questions: []
    };
  }

  componentDidMount() {
    const { quiz_id } = this.state;

    axios(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quiz_id}`
    ).then(res => this.setState({ questions: res.data }));
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  finish = () => {
    this.props.history.push("/teachersDashboard");
  };

  handleSubmit = event => {
    event.preventDefault();
    const question = {
      category: this.state.category,
      type: this.state.type,
      Q_content: this.state.Q_content,
      A: this.state.A,
      B: this.state.B,
      C: this.state.C,
      D: this.state.D,
      correct_answer: this.state.correct_answer,
      points: this.state.points,
      quiz_id: this.state.quiz_id
    };

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quest/question`,
        question
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    this.setState({
      category: "Math",
      type: 1,
      Q_content: "",
      A: "",
      B: "",
      C: "",
      D: "",
      correct_answer: "",
      points: ""
    });
  };
  render() {
    const { questions } = this.state;
    return (
      <div>
        {questions.length > 0
          ? questions.map(question => <Question question={question} />)
          : null}
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="top-info">
              <label>Category</label>
              <br />
              <select
                value={this.state.category}
                onChange={this.onChange}
                className="text-box"
                name="category"
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
                value={this.state.type}
                onChange={this.onChange}
                className="text-box"
                name="type"
              >
                <option value={1}>Standard</option>
                <option value={2}>Remedial</option>
              </select>
            </div>

            <br />
            <br />
            <label className="question">Question</label>
            <br />
            <input
              name="Q_content"
              className="question-text-box"
              type="text"
              value={this.state.Q_content}
              onChange={this.onChange}
            />
            <br />
            <br />

            <div className="answers">
              <div className="AB">
                <label>A</label>
                <br />
                <input
                  name="A"
                  className="text-box"
                  type="text"
                  value={this.state.A}
                  onChange={this.onChange}
                />
                <br />
                <br />
                <label>B</label>
                <br />
                <input
                  name="B"
                  className="text-box"
                  type="text"
                  value={this.state.B}
                  onChange={this.onChange}
                />
              </div>
              <br />
              <br />

              <div className="CD">
                <label>C</label>
                <br />
                <input
                  name="C"
                  className="text-box"
                  type="text"
                  value={this.state.C}
                  onChange={this.onChange}
                />
                <br />
                <br />
                <label>D</label>
                <br />
                <input
                  name="D"
                  className="text-box"
                  type="text"
                  value={this.state.D}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <br />
            <br />
            <label>Correct Answer</label>
            <br />
            <input
              name="correct_answer"
              className="text-box"
              type="text"
              value={this.state.correct_answer}
              onChange={this.onChange}
            />
            <br />
            <br />
            <label>Points</label>
            <br />
            <input
              name="points"
              className="text-box"
              type="text"
              value={this.state.points}
              onChange={this.onChange}
            />
            <br />
            <button className="submit-button" type="submit">
              Add Question
            </button>
          </form>
          <button onClick={this.finish}>Complete Quiz</button>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
