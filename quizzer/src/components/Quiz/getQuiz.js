import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';


class getQuiz extends Component {
  componentDidMount() {
    axios
    .get('https://labs13-quizzer.herokuapp.com/api/quest/question')
    .then(response => console.log(response))
    .catch(err => console.log(err));
//     console.log("inside CDM");
//     fetch('https://labs13-quizzer.herokuapp.com/api/quest/question')
//     .then(res => res.json())
//     .then(dogs => console.log("fetch completed"))
//     .catch(err => console.log(err));
//   console.log("below fetch");
  }

  render() {
    return (
      <div className="App">
      <h1>Student Get Quizzes</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
    );
  }
}

export default getQuiz;