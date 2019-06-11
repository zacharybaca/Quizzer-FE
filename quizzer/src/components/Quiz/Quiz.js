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
    
    nextQuestionHandler = () => {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
      console.log(this.state.currentQuestion)
    }

  render() {
    const {questions, options} = this.state;
    return (
      <div className="App">
            {questions}
              {options.map(option => (
              <p
                key={option.id}
                className="ui floaating message" 
                >
                {option}
              </p>
            ))}
            <button
              onClick={this.nextQuestionHandler}
            >Next</button>
            </div>
    )
  }
}
export default Quiz;



