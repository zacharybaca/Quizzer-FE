import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addQuiz.css";
import EditQuestion from "./EditQuestion.js";

function AddQuestion(props) {
  const [chosenQuestion, setChosenQuestion] = useState(null);
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

  const filterQuestions = idx => {
    setChosenQuestion(idx);
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
      <div>
        {questions.length > 0
          ? questions.map((question, index) =>
              chosenQuestion === index ? (
                <div className="question">
                  <form
                    key={question.id}
                    onSubmit={e => handleSubmit(e, question.id)}
                  >
                    <div className="top-info">
                      <label>Category</label>
                      <br />
                      <select
                        value={question.category}
                        className="text-box"
                        name="category"
                        onChange={e => handleChanges(e, question.id, index)}
                      >
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                      <br />
                      <br />
                      <label>Type of Question</label>

                      <br />
                      <select
                        onChange={e => handleChanges(e, question.id, index)}
                        value={question.type}
                        className="text-box"
                        name="type"
                      >
                        <option value={1}>Main</option>
                        <option value={2}>Follow-Up</option>
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
                      onChange={e => handleChanges(e, question.id, index)}
                      value={question.Q_content}
                    />
                    <br />
                    <br />

                    <div className="answers">
                      <div className="AB">
                        <label>A</label>
                        <br />
                        <input
                          onChange={e => handleChanges(e, question.id, index)}
                          name="A"
                          className="text-box"
                          type="text"
                          value={question.A}
                        />
                        <br />
                        <br />
                        <label>B</label>
                        <br />
                        <input
                          onChange={e => handleChanges(e, question.id, index)}
                          name="B"
                          className="text-box"
                          type="text"
                          value={question.B}
                        />
                      </div>
                      <br />
                      <br />

                      <div className="CD">
                        <label>C</label>
                        <br />
                        <input
                          onChange={e => handleChanges(e, question.id, index)}
                          name="C"
                          className="text-box"
                          type="text"
                          value={question.C}
                        />
                        <br />
                        <br />
                        <label>D</label>
                        <br />
                        <input
                          onChange={e => handleChanges(e, question.id, index)}
                          name="D"
                          className="text-box"
                          type="text"
                          value={question.D}
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                    <label>Correct Answer</label>
                    <br />
                    <select
                      value={question.correct_answer}
                      onChange={e => handleChanges(e, question.id, index)}
                      className="text-box"
                      name="correct_answer"
                    >
                      <option value={question.A}>A</option>
                      <option value={question.B}>B</option>
                      <option value={question.C}>C</option>
                      <option value={question.D}>D</option>
                    </select>

                    <br />
                    <br />
                    <label>Points</label>
                    <br />
                    <input
                      onChange={e => handleChanges(e, question.id, index)}
                      name="points"
                      className="text-box"
                      type="text"
                      value={question.points}
                    />
                    <br />
                    <button className="submit-button" type="submit">
                      update Question
                    </button>
                  </form>
                </div>
              ) : null
            )
          : null}
      </div>
      <div className="middle-container">
        <div className="edit-questions">
          <div>
            <div className="question">
              <form onSubmit={e => handleSubmit(e)}>
                <div className="category-type">
                  <div>
                    <label>Category</label>
                    <br />

                    <select
                      value={category}
                      className="selectors"
                      name="category"
                      onChange={e => onChange(e)}
                    >
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>
                  <div>
                    <label>Type</label>
                    <br />

                    <select
                      onChange={e => onChange(e)}
                      value={type}
                      className="selectors"
                      name="type"
                    >
                      <option value={1}>Standard</option>
                      <option value={2}>Remedial</option>
                    </select>
                  </div>
                </div>

                <div className="question-field">
                  <label className="question">Write a Question</label>
                  <br />
                  <input
                    name="Q_content"
                    className="question-text-box"
                    type="text"
                    onChange={e => onChange(e)}
                    value={Q_content}
                  />
                </div>

                <div className="answers">
                  <div className="AB">
                    <label>A</label>
                    <br />
                    <input
                      onChange={e => onChange(e)}
                      name="A"
                      className="text-box"
                      type="text"
                      value={A}
                    />
                    <br />
                    <br />
                    <label>B</label>
                    <br />
                    <input
                      onChange={e => onChange(e)}
                      name="B"
                      className="text-box"
                      type="text"
                      value={B}
                    />
                  </div>
                  <br />
                  <br />

                  <div className="CD">
                    <label>C</label>
                    <br />
                    <input
                      onChange={e => onChange(e)}
                      name="C"
                      className="text-box"
                      type="text"
                      value={C}
                    />
                    <br />
                    <br />
                    <label>D</label>
                    <br />
                    <input
                      onChange={e => onChange(e)}
                      name="D"
                      className="text-box"
                      type="text"
                      value={D}
                    />
                  </div>
                </div>
                <br />

                <div className="answer-points">
                  <div>
                    <label>Correct Answer</label>
                    <br />

                    <select
                      value={correct_answer}
                      onChange={e => onChange(e)}
                      className="selector"
                      name="correct_answer"
                    >
                      <option value={A}>A</option>
                      <option value={B}>B</option>
                      <option value={C}>C</option>
                      <option value={D}>D</option>
                    </select>
                  </div>
                  <div>
                    <label>Points</label>
                    <br />
                    <select
                      value={points}
                      onChange={e => onChange(e)}
                      className="selector"
                      name="points"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                </div>

                <br />
                <button className="submit-button" type="submit">
                  Add Question
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="question-navigation">
          <div className="question-nav-content">
            <div>
              <div className="bigger-text">Main Questions</div>

              {questions.length > 0
                ? questions.map((question, idx) =>
                    question.type === 1 ? (
                      <div>
                        <EditQuestion
                          chosen={chosenQuestion}
                          filterQuestions={filterQuestions}
                          Eachquestion={questions}
                          handleSubmit={handleSubmit}
                          handleChanges={handleChanges}
                          question={question}
                          index={idx}
                        />
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
          <div className="question-nav-content">
            <div>
              <div className="bigger-text">Follow-Up Questions</div>

              {questions.length > 0
                ? questions.map((question, idx) =>
                    question.type !== 1 ? (
                      <div className="question">
                        <EditQuestion
                          chosen={chosenQuestion}
                          filterQuestions={filterQuestions}
                          Eachquestion={questions}
                          handleSubmit={handleSubmit}
                          handleChanges={handleChanges}
                          question={question}
                          index={idx}
                        />
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
