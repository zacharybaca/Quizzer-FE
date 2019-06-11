import React from 'react';


class Quiz extends React.Component {
      state = {
        userAnswer: null,
        currentQuestion: 0,
        options: []
      }
  

  render() {
    return (
      <div className="App">
            Quiz
            </div>
    )
  }
}
export default MainQuiz;
