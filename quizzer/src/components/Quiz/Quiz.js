import React from "react";
import axios from "axios";

//Noted issue Q'a start at 0 not 1 an thus points are only counted from 1 not 0

class Quiz extends React.Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: [],
    answers: "",
    quizEnd: false,
    score: 0,
    disabled: true,
    QuizData: [
      {
        id: 1,
        category: `Math`,
        type: 1,
        Q_content: [`What is the square route of 256?`],
        A: "12",
        B: `16`,
        C: `14`,
        D: `15`,
        correct_answer: `16`,
        points: 2,
        options: [`12`, `14`, `15`, `16`],
        quiz_id: null
      }
    ]
  };

  //     loadQuiz = () => {
  //       const {currentQuestion} = this.state;
  //       this.setState(() => {
  //         return {
  //           questions: QuizData2[currentQuestion].Q_content,
  //           options: QuizData2[currentQuestion].options,
  //           answers: QuizData2[currentQuestion].correct_answer
  //     }
  //   })
  // }

  componentDidMount() {
    // this.loadQuiz();
    const { id } = this.props.match.params;
    axios
      // .get(`${process.env.REACT_APP_BE_URL}localhost:8000`)
      .get(`https://labs13-quizzer.herokuapp.com/api/quiz/quizzes/${id}`)
      .then(res => {
        console.log(res);
        const options = [
          res.data.quiz[0].A,
          res.data.quiz[0].B,
          res.data.quiz[0].C,
          res.data.quiz[0].D
        ];
        console.log(options);
        this.setState({
          options: options,
          questions: res.data.quiz[0].Q_content,
          answers: res.data.quiz[0].correct_answer,
          QuizData: res.data.quiz
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  nextQuestionHandler = () => {
    console.log("test");
    const {
      QuizData,
      currentQuestion,
      userAnswer,
      answers,
      score
    } = this.state;
    let scoreTracker = score;
    const questionCounter = currentQuestion + 1;
    const choices = [
      QuizData[questionCounter].A,
      QuizData[questionCounter].B,
      QuizData[questionCounter].C,
      QuizData[questionCounter].D
    ];
    console.log(choices, "choices");
    if (userAnswer === answers) {
      scoreTracker++;
    }
    this.setState({
      questions: QuizData[questionCounter].Q_content,
      options: choices,
      answers: QuizData[questionCounter].correct_answer,
      currentQuestion: questionCounter,
      score: scoreTracker,
      disabled: true
    });
    console.log(this.state.currentQuestion);

    // increment the score if answer is correct
  };

  // updates the component
  // componentDidUpdate(prevProps, prevState) {
  //   const {currentQuestion, QuizData} = this.state;
  //   if(this.state.currentQuestion !== prevState.currentQuestion) {
  //     this.setState(() => {
  //       return {
  //         disabled: true,
  //         questions: QuizData[currentQuestion].Q_content,
  //         options: QuizData[currentQuestion].options,
  //         answers: QuizData[currentQuestion].correct_answer
  //       }
  //     })
  //   }
  // }

  //check answer
  checkAnswer = correct_answer => {
    this.setState({
      userAnswer: correct_answer,
      disabled: false
    });
  };

  finishHandler = () => {
    if (this.state.currentQuestion === this.state.QuizData.length - 1) {
      this.setState({
        quizEnd: true
      });
    }
  };

  render() {
    const {
      QuizData,
      questions,
      options,
      currentQuestion,
      userAnswer,
      quizEnd
    } = this.state;

    if (quizEnd) {
      return (
        <div>
          <h2>Completed Quiz final score is {this.state.score} points</h2>
          <p>The Correct Answer's were: </p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.correct_answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="App">
        <h2>{questions}</h2>
        <span>
          {" "}
          {`Questions ${currentQuestion + 1} out of ${QuizData.length}`}
        </span>
        {options.map(option => (
          <p
            key={option.id}
            className={`ui floating message
                  ${userAnswer === option ? "selected" : null}
                  `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {currentQuestion < QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next
          </button>
        )}
        {currentQuestion === QuizData.length - 1 && (
          <button onClick={this.finishHandler}>Finish</button>
        )}
      </div>
    );
  }
}
export default Quiz;
