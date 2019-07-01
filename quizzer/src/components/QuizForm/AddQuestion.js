import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addQuiz.css";
import { Redirect } from "react-router-dom";
import ShowQuestions from "./ShowQuestions.js";

function AddQuestion(props) {
  const [questions, setQuestions] = useState({
    category: "Math",
    type: 1,
    Q_content: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct_answer: "",
    points: "",
    id: ""
  });
  const [questionInfo, setQuestionInfo] = useState({
    category: "Math",
    type: 1,
    Q_content: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct_answer: "",
    points: "",
    quiz_id: props.quizId
  });

  const {
    category,
    type,
    Q_content,
    A,
    B,
    C,
    D,
    correct_answer,
    points,
    quiz_id
  } = questionInfo;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { quiz_id } = questionInfo;

      const res = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quiz_id}`
      );

      setQuestions(
        res.data.quiz.map(question => ({
          category: question.category,
          type: question.type,
          Q_content: question.Q_content,
          A: question.A,
          B: question.B,
          C: question.C,
          D: question.D,
          correct_answer: question.correct_answer,
          points: question.points,
          id: question.id
        }))
      );
    };
    fetchData();
  }, [questions]);

  const handleChanges = (e, id, idx) => {
    const array = questions;
    console.log(id, idx);

    array[idx][e.target.name] = e.target.value;

    setQuestions([...array]);
    console.log(questions);
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();

    questions.map(question => {
      if (question.id === id) {
        const res = axios.put(
          `${process.env.REACT_APP_BE_URL ||
            process.env.REACT_APP_BE_LOCAL}/api/quest/question/${id}`,
          question
        );

        console.log(res);
      }
    });
  };

  const onChange = event => {
    setQuestionInfo({
      ...questionInfo,
      [event.target.name]: event.target.value
    });
  };

  const finish = () => {
    props.history.push("/teachersDashboard");
  };

  const handleSubmit = event => {
    event.preventDefault();
    const question = {
      category,
      type,
      Q_content,
      A,
      B,
      C,
      D,
      correct_answer,
      points,
      quiz_id
    };

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quest/question`,
        question
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    setQuestionInfo({
      category: "Math",
      type: 1,
      Q_content: "",
      A: "",
      B: "",
      C: "",
      D: "",
      correct_answer: "",
      points: "",
      quiz_id: props.quizId
    });
  };

  return (
    <div>
      {questions.length > 0
        ? questions.map((question, idx) => (
            <ShowQuestions
              Eachquestion={questions}
              question={question}
              index={idx}
              handleSubmit={onSubmit}
              handleChanges={handleChanges}
            />
          ))
        : null}
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="top-info">
            <label>Category</label>
            <br />
            <select
              value={category}
              onChange={e => onChange(e)}
              className="text-box"
              name="category"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Spanish">Spanish</option>
            </select>
            <br />
            <br />
            <label>Type</label>
            <br />
            <select
              value={type}
              onChange={e => onChange(e)}
              className="text-box"
              name="type"
            >
              <option value={1}>Standard</option>
              <option value={2}>Remedial</option>
            </select>
          </div>

          <br />
          <br />
          <label className="question">Question</label>
          <br />
          <input
            name="Q_content"
            className="question-text-box"
            type="text"
            value={Q_content}
            onChange={e => onChange(e)}
          />
          <br />
          <br />

          <div className="answers">
            <div className="AB">
              <label>A</label>
              <br />
              <input
                name="A"
                className="text-box"
                type="text"
                value={A}
                onChange={e => onChange(e)}
              />
              <br />
              <br />
              <label>B</label>
              <br />
              <input
                name="B"
                className="text-box"
                type="text"
                value={B}
                onChange={e => onChange(e)}
              />
            </div>
            <br />
            <br />

            <div className="CD">
              <label>C</label>
              <br />
              <input
                name="C"
                className="text-box"
                type="text"
                value={C}
                onChange={e => onChange(e)}
              />
              <br />
              <br />
              <label>D</label>
              <br />
              <input
                name="D"
                className="text-box"
                type="text"
                value={D}
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <br />
          <br />
          <label>Correct Answer</label>
          <br />
          <select
            value={correct_answer}
            onChange={e => onChange(e)}
            className="text-box"
            name="correct_answer"
          >
            <option value={A}>A</option>
            <option value={B}>B</option>
            <option value={C}>C</option>
            <option value={D}>D</option>
          </select>

          <br />
          <br />
          <label>Points</label>
          <br />
          <input
            name="points"
            className="text-box"
            type="text"
            value={points}
            onChange={e => onChange(e)}
          />
          <br />
          <button className="submit-button" type="submit">
            Add Question
          </button>
        </form>
        <button onClick={finish}>Complete Quiz</button>
      </div>
    </div>
  );
}

export default AddQuestion;
