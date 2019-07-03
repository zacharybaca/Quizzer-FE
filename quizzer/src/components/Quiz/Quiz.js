import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import StudentNavigation from "../Dashboards/Navigation/StudentNavigation.js";
import "./quiz.css";

const Quiz = props => {
  const [options, setOptions] = useState([]);
  const [standardQuestions, setStandardQuestions] = useState([]);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [allQuestion, setAllQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [score, setScore] = useState(null);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionCount, setQuestionCount] = useState(null);
  const [followUpCount, setFollowUpCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [end, setEnd] = useState(false);
  const [returnDash, setReturn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;
      const standard = [];
      const remedial = [];

      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );
      //setting database data to state with hooks
      const options = [
        result.data.quiz[0].A,
        result.data.quiz[0].B,
        result.data.quiz[0].C,
        result.data.quiz[0].D
      ];
      setOptions(options);

      result.data.quiz.forEach(question =>
        question.type === 1 ? standard.push(question) : remedial.push(question)
      );
      setScore(result.data.quiz[0].points);
      setAnswer(result.data.quiz[0].correct_answer);
      setQuestions(result.data.quiz[0].Q_content);
      setFollowUpQuestions(remedial);
      setStandardQuestions(standard);
      setQuestionCount(standard.length);
      setAllQuestions(result.data.quiz);
    };
    fetchData();
  }, []);

  const nextQuestionHandler = () => {
    let questionCounter = currentQuestion + 1;
    let nextQuestion = standardQuestions[questionCounter];
    let rCount = followUpCount;

    console.log(userAnswer, answer);
    if (userAnswer === answer) {
      console.log(questionCounter);
      nextQuestion = standardQuestions[questionCounter];
      console.log(score);
      setPoints(points + score);
      if (rCount > 0) {
        nextQuestion = standardQuestions[questionCounter - rCount];
        console.log(questionCounter);
      }
      setIsFollowUp(false);
    } else if (rCount < followUpQuestions.length) {
      console.log(rCount, followUpQuestions.length);
      console.log(questionCounter);
      nextQuestion = followUpQuestions[rCount];
      setQuestionCount(questionCount + 1);
      rCount++;
      setFollowUpCount(rCount);
      setIsFollowUp(true);
      console.log(rCount);
    } else {
      nextQuestion = standardQuestions[questionCounter - rCount];
      console.log(questionCounter - rCount + 1);
      setIsFollowUp(false);
    }
    console.log(nextQuestion);

    const options = [
      nextQuestion.A,
      nextQuestion.B,
      nextQuestion.C,
      nextQuestion.D
    ];

    setFollowUpCount(rCount);
    setCurrentQuestion(questionCounter);
    setQuestions(nextQuestion.Q_content);
    setAnswer(nextQuestion.correct_answer);
    setOptions(options);
  };

  //check answer
  const checkAnswer = correct_answer => {
    setUserAnswer(correct_answer);
    setDisabled(false);
  };

  const finishHandler = () => {
    const { id } = props.match.params;
    const data = {
      completed: true,
      quiz_id: id,
      student_id: localStorage.getItem("id")
    };

    if (currentQuestion === questionCount - 1) {
      axios
        .post(
          `${process.env.REACT_APP_BE_URL ||
            process.env.REACT_APP_BE_LOCAL}/api/quiz/student/completedtest`,
          data
        )
        .then(res => console.log(res));

      setEnd(true);
    }
  };

  const returnToDash = () => {
    setReturn(true);
  };

  return (
    <div>
      {returnDash ? <Redirect to="/studentsDashboard" /> : null}
      <StudentNavigation />
      {end ? (
        <div className="align">
          <h2>Completed Quiz final score is {score} points</h2>
          <p>The Correct Answer's were: </p>
          <ul>
            {allQuestion.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.correct_answer}
              </li>
            ))}
          </ul>
          <button onClick={returnToDash}>return to dashboard</button>
        </div>
      ) : (
        <div className="align">
          {isFollowUp ? <div className="given-question">Follow-Up</div> : null}
          <div className="given-question">{questions}</div>
          <span>{`Question ${currentQuestion +
            1} out of ${questionCount}`}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message
                    ${userAnswer === option ? "selected" : null}
                    `}
              onClick={() => checkAnswer(option)}
            >
              {option}
              {console.log(points)}
            </p>
          ))}
          {currentQuestion < questionCount - 1 && (
            <button
              className="submit-answer"
              disabled={disabled}
              onClick={nextQuestionHandler}
            >
              Submit Answer
            </button>
          )}
          {currentQuestion === questionCount - 1 && (
            <button onClick={finishHandler} className="submit-answer">
              Submit Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
