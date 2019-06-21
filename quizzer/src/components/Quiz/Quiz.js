import React from "react";
import axios from "axios";
import StudentNavigation from "../Dashboards/Navigation/StudentNavigation.js";
import "./quiz.css";
//Noted issue Q'a start at 0 not 1 an thus points are only counted from 1 not 0

class Quiz extends React.Component {
  state = {
    userAnswer: null,
    currentQuestion: 1,
    options: [],
    answers: "",
    quizEnd: false,
    score: 0,
    disabled: true,
    wrongAnswer: false,
    QuizData: [],
    standardQ: [],
    remedialQ: [],
    remedialSubject: [],
    remedialCounter: 0,
    questionCount: null
  };

  componentDidMount() {
    // this.loadQuiz();
    const { id } = this.props.match.params;
    const standard = [];
    const remedial = [];

    axios
      .get(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      )
      .then(res => {
        console.log(res);
        const options = [
          res.data.quiz[0].A,
          res.data.quiz[0].B,
          res.data.quiz[0].C,
          res.data.quiz[0].D
        ];

        res.data.quiz.forEach(question =>
          question.type === 1
            ? standard.push(question)
            : remedial.push(question)
        );
        const arr = remedial.filter(question => {
          return question.category === standard[0].category;
        });

        this.setState({
          options: options,
          questions: res.data.quiz[0].Q_content,
          answers: res.data.quiz[0].correct_answer,
          QuizData: res.data.quiz,
          standardQ: standard,
          remedialQ: remedial,
          questionCount: standard.length,
          remedialSubject: arr
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  nextQuestionHandler = () => {
    const {
      standardQ,
      questionCount,
      QuizData,
      currentQuestion,
      userAnswer,
      answers,
      score,
      remedialQ,
      remedialCounter,
      remedialSubject,
      wrongAnswer
    } = this.state;

    let arr = this.state.remedialSubject;
    let rCount = this.state.remedialCounter;
    let qCount = questionCount;
    let scoreTracker = score;
    let questionCounter = currentQuestion + 1;
    let nextQuestion = standardQ[questionCounter];
    let wrong = wrongAnswer;

    if (userAnswer === answers) {
      const currentSubject = standardQ[currentQuestion].category;
      console.log("question", nextQuestion);
      console.log("question we are on", questionCounter);
      console.log("how many questions counted", questionCount);
      const nextSubject = nextQuestion.category;
      console.log("if question is correct the subject will be", nextSubject);

      if (currentSubject !== nextSubject) {
        console.log("does these subjects match", currentSubject, nextSubject);
        rCount = 0;
        arr = remedialQ.filter(question => {
          return question.category === nextSubject;
        });
      }
      scoreTracker++;
    } else if (rCount < remedialSubject.length - 1) {
      rCount++;
      nextQuestion = remedialSubject[remedialCounter];
    } else {
      const currentSubject = standardQ[currentQuestion].category;
      const nextSubject = nextQuestion.category;

      if (currentSubject !== nextSubject) {
        arr = remedialQ.filter(question => {
          return question.category === nextSubject;
        });
      }
      rCount = 0;
    }

    const choices = [
      nextQuestion.A,
      nextQuestion.B,
      nextQuestion.C,
      nextQuestion.D
    ];

    this.setState({
      questions: nextQuestion.Q_content,
      options: choices,
      answers: nextQuestion.correct_answer,
      currentQuestion: questionCounter,
      score: scoreTracker,
      disabled: true,
      remedialSubject: arr,
      remedialCounter: rCount,
      questionCount: qCount
    });
  };

  //check answer
  checkAnswer = correct_answer => {
    this.setState({
      userAnswer: correct_answer,
      disabled: false
    });
  };

  finishHandler = () => {
    console.log(
      "finish quiz",
      this.state.currentQuestion,
      "=",
      this.state.questionCount
    );
    if (this.state.currentQuestion === this.state.questionCount - 1) {
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
      quizEnd,
      questionCount
    } = this.state;

    if (quizEnd) {
      return (
        <div>
          <StudentNavigation />
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
      <div>
        <StudentNavigation />
        <div className="align">
          <h2>{questions}</h2>
          <span> {`Questions ${currentQuestion} out of ${questionCount}`}</span>
        </div>

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

        {currentQuestion < questionCount - 1 && (
          <button
            className="new"
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next
          </button>
        )}
        {currentQuestion === questionCount - 1 && (
          <button className="new" onClick={this.finishHandler}>
            Finish
          </button>
        )}
      </div>
    );
  }
}
export default Quiz;
