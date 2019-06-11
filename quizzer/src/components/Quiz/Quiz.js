import React from 'react';
import {QuizData} from '../Quiz/QuizData';


class Quiz extends React.Component {
      state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        // correct_answer: [],
        // incorrect_answers: [],
      }
  
      loadQuiz = () => {
          const {currentQuestion} = this.state;
          this.setState(() => {
            return {
              questions: QuizData[currentQuestion].question,
              options: QuizData[currentQuestion].options,
              answers: QuizData[currentQuestion].answer
        }
      })
    }

    componentDidMount() {
      this.loadQuiz();
    }
    

  render() {
    return (
      <div className="App">
            {this.state.questions}
            </div>
    )
  }
}
export default Quiz;
