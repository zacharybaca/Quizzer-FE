import React from 'react';
import QuizData from '../Quiz/QuizData';

//Noted issue Q'a start at 0 not 1 an thus points are only counted from 1 not 0

class Quiz extends React.Component {
      state = {
        userAnswer: null,
        currentQuestion: 0, 
        options: [],
        quizEnd: false,
        score: 0,
        disabled: true,
      }

      loadQuiz = () => {
          const {currentQuestion} = this.state;
          this.setState(() => {
            return {
              questions: QuizData[currentQuestion].Q_content,
              options: QuizData[currentQuestion].options,
              answers: QuizData[currentQuestion].correct_answer
        }
      })
    }

    componentDidMount() {
      this.loadQuiz();
    }
    
    nextQuestionHandler = () => {
      // console.log('test')
    const { userAnswer, answers, score } = this.state;
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
      console.log(this.state.currentQuestion)
      // increment the score if answer is correct
      if(userAnswer === answers){
        this.setState({
          score: score + 1
        })
      }
    }
    
    // updates the component
    componentDidUpdate(prevProps, prevState) {
      const {currentQuestion} = this.state;
      if(this.state.currentQuestion !== prevState.currentQuestion) {
        this.setState(() => {
          return {
            disabled: true,
            questions: QuizData[currentQuestion].Q_content,
            options: QuizData[currentQuestion].options,
            answers: QuizData[currentQuestion].correct_answer
          }
        })
      }
    }

    //check answer
    checkAnswer = correct_answer => {
      this.setState({
        userAnswer: correct_answer,
        disabled: false,
      })
    }

    finishHandler = () => {
      if(this.state.currentQuestion === QuizData.length - 1) {
        this.setState({
          quizEnd: true
        })
      }
    }

  render() {
    const {questions, options, currentQuestion, userAnswer, quizEnd} = this.state;
    
      if(quizEnd) {
        return (
          <div>
            <h2>Completed Quiz final score is {this.state.score} points</h2>
            <p>The Correct Answer's were: </p>
            <ul>
              {QuizData.map((item, index) => (
                  <li className="ui floating message options" key={index}
                  >{item.correct_answer} 
                  </li> 
              ))}
            </ul>
          </div>
        )
      }

    
    return (
      <div className="App">
            <h2>{questions}</h2>
            <span> {`Questions ${currentQuestion} out of ${QuizData.length - 1}`}</span>
              {options.map(option => (
              <p key={option.id}
                className={`ui floating message
                  ${userAnswer === option ? "selected" : null}
                  `}
                  onClick={() => this.checkAnswer(option)}
                  >
                {option}
              </p>
            ))}

            {currentQuestion < QuizData.length - 1 && 
            <button
            disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >Next</button>
            }
          {currentQuestion ===  QuizData.length - 1 &&
          <button
            onClick={this.finishHandler}
          >Finish</button>
          }
            </div>
    )
  }
}
export default Quiz;


