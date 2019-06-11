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
    const {questions, options} = this.state;
    return (
      <div className="App">
            {questions}
              {options.map(option => (
              <p
                key={option.id}
                // className={} 
                >
                {option}
              </p>
            ))}
            </div>
    )
  }
}
export default Quiz;



