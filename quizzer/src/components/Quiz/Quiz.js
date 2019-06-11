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
    
    // updates the component
    componentDidUpdate(prevProps, prevState) {
      const {currentQuestion} = this.state;
      if(this.state.currentQuestion !== prevState.currentQuestion) {
        this.setState(() => {
          return {
            questions: QuizData[currentQuestion].question,
            options: QuizData[currentQuestion].options,
            answers: QuizData[currentQuestion].answer
          }
        })
      }
    }

  render() {
    const {questions, options, currentQuestion, userAnswer} = this.state;
    return (
      <div className="App">
            <h2>{questions}</h2>
            <span> {`Questions ${currentQuestion} out of ${QuizData.length - 1}`}</span>
              {options.map(option => (
              <p key={option.id}
                className={`ui floating message
                  ${userAnswer === option ? "selected" : null}
                  `}>
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



