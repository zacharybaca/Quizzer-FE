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
  const [score, setScore] = useState([0]);
  const [points, setPoints] = useState(0);
  const [totalPointsTest, setTotalPointsTest] = useState(0);
  const [answer, setAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionCount, setQuestionCount] = useState(null);
  const [followUpCount, setFollowUpCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [end, setEnd] = useState(false);
  const [returnDash, setReturn] = useState(false);
  const [letter, setLetter] = useState("");

  const [newTotalScore, setnewTotalScore] = useState(0);

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

      let ntotalScore = 0;
      result.data.quiz.forEach(question => {
        question.type === 1 ? standard.push(question) : remedial.push(question);
        if (question.type == 1) {
          ntotalScore += question.points;
        }
      });

      setnewTotalScore(ntotalScore);

      setScore(result.data.quiz[0].points);
      setTotalScore(ntotalScore);
      setAnswer(result.data.quiz[0].correct_answer);
      setQuestions(result.data.quiz[0].Q_content);
      setFollowUpQuestions(remedial);
      setStandardQuestions(standard);
      setQuestionCount(result.data.quiz.length);
      setAllQuestions(result.data.quiz);
    };
    fetchData();
  }, []);

  const nextQuestionHandler = async () => {
    let questionCounter = currentQuestion + 1;
    let nextQuestion = standardQuestions[questionCounter];
    let rCount = followUpCount;
    let totalPoints = points;
    console.log("totalPoints", totalPoints);
    setTotalPointsTest(totalPoints);
    let totalScoreInAll = 0;
    const { id } = props.match.params;

    // setTotalScore(questionCounter);

    if (userAnswer === answer) {
      nextQuestion = standardQuestions[questionCounter];
      totalPoints += score;

      if (rCount > 0) {
        nextQuestion = standardQuestions[questionCounter - rCount];
      }

      setIsFollowUp(false);
    } else if (rCount < followUpQuestions.length) {
      nextQuestion = followUpQuestions[rCount];
      setQuestionCount(questionCount);
      rCount++;
      setFollowUpCount(rCount);
      setIsFollowUp(true);
    } else {
      nextQuestion = standardQuestions[questionCounter - rCount];
      console.log(questionCounter - rCount + 1);
      setIsFollowUp(false);
    }
    console.log("score at end of func", score);

    if (typeof nextQuestion !== "undefined") {
      const options = [
        nextQuestion.A,
        nextQuestion.B,
        nextQuestion.C,
        nextQuestion.D
      ];

      setScore(nextQuestion.points);
      setAnswer(nextQuestion.correct_answer);
      setQuestions(nextQuestion.Q_content);
      setOptions(options);
    }

    setFollowUpCount(rCount);
    setCurrentQuestion(questionCounter);
    setPoints(totalPoints);

    totalScoreInAll += score;

    if (typeof nextQuestion === "undefined") {
      finishHandler();
      return;
    }
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

    //if (currentQuestion === questionCount - 1) {
    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/student/completedtest`,
        data
      )
      .then(res => console.log(res));
    letterGrade();
    setEnd(true);
    //}
  };

  const returnToDash = () => {
    setReturn(true);
  };

  const countTotalScore = () => {
    let combinedScore = totalScore;
    console.log("totalScore", totalScore);
    // setTotalScore(combinedScore);
  };

  const letterGrade = () => {
    setScore(newTotalScore);

    if (score <= 100 && score >= 98) setLetter("A+");
    else if (score <= 97 && score >= 93) setLetter("A");
    else if (score <= 92 && score >= 90) setLetter("A-");
    else if (score <= 89 && score >= 88) setLetter("B+");
    else if (score <= 87 && score >= 83) setLetter("B");
    else if (score <= 82 && score >= 80) setLetter("B-");
    else if (score <= 79 && score >= 78) setLetter("C+");
    else if (score <= 77 && score >= 73) setLetter("C");
    else if (score <= 72 && score >= 70) setLetter("C-");
    else if (score <= 69 && score >= 68) setLetter("D+");
    else if (score <= 67 && score >= 63) setLetter("D");
    else if (score <= 62 && score >= 60) setLetter("D-");
    else if (score <= 59 && score >= 0) setLetter("F");
    else setLetter("INVALID SCORE");
  };

  // function myFunction() {
  //   const reducer = (accumulator, currentValue) => accumulator + currentValue;
  //   return score.reduce(reducer);
  // }

  // falert(ntotalScore);

  return (
    <div>
      {returnDash ? <Redirect to="/studentsDashboard" /> : null}
      <StudentNavigation />
      {end ? (
        <div className="align">
          <h2 id="quiz-title-score">
            Completed Quiz final score is {points} points out of {score} points
            possible.
          </h2>
          <h3 id="quiz-letter-score">Your letter grade is : {letter}</h3>
          <p>The Correct Answer's were: </p>
          <ul>
            {allQuestion.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.correct_answer}
              </li>
            ))}
          </ul>
          <button onClick={returnToDash}>Finish</button>
        </div>
      ) : (
        <div className="align">
          {isFollowUp ? <div className="given-question">Follow-Up</div> : null}
          <div className="given-question">{questions}</div>
          <span>{`Question ${currentQuestion +
            1} out of ${questionCount}`}</span>
          <span>{`Worth ${score} ${score > 1 ? "points" : "point"}`}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message
                    ${userAnswer === option ? "selected" : null}
                    `}
              onClick={() => checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < questionCount && (
            <button onClick={nextQuestionHandler}>Submit Answer</button>
          )}
          {currentQuestion === questionCount - 1 && (
            <button onClick={finishHandler} className="submit-answer">
              Finish Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
