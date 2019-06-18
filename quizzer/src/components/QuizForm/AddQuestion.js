import React from "react";
import axios from "axios";

class AddQuestion extends React.Component {
  state = {
    category: "",
    type: "",
    Q_content: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct_answer: "",
    points: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      points: this.state.points
    };

    const quiz_id = localStorage.getItem("id");

    console.log(quiz_id);
    axios
      .post(`https://labs13-quizzer.herokuapp.com/api/quest/question`, {
        quiz_id
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    this.setState({
      category: "",
      type: "",
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
    return (
      <div>
        <div className="add-question">
          <form onSubmit={this.handleSubmit}>
            <label>Category</label>
            <br />
            <input
              name="category"
              className="text-box"
              type="text"
              value={this.state.category}
              onChange={this.onChange}
            />
            <br />
            <br />
            <label>Type</label>
            <br />
            <input
              name="type"
              className="text-box"
              type="text"
              value={this.state.type}
              onChange={this.onChange}
            />
            <br />
            <br />
            <label>Question</label>
            <br />
            <input
              name="Q_content"
              className="text-box"
              type="text"
              value={this.state.Q_content}
              onChange={this.onChange}
            />
            <br />
            <br />
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
            <br />
            <br />
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
            <button type="submit">Add Question</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddQuestion;
