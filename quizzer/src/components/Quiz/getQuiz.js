import React, { Component } from "react";
import axios from "axios";

class getQuiz extends Component {
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/api/quiz/quizzes`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Student Get Quizzes</h1>
        {/* <h2>Start editing to see some magic happen!</h2> */}
      </div>
    );
  }
}

export default getQuiz;
