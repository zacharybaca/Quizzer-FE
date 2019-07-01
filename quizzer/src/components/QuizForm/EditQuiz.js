import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";
import EditQuestion from "./EditQuestion";
import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    data: "",
    quizId: props.match.params.id,
    questionId: ""
  });
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: "",
    description: ""
  });
  // set the state for the Questions

  const [questionInfo, setQuestionInfo] = useState([]);
  const [chosenQuestion, setChosenQuestion] = useState(1);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [Eachquestion, setQuestion] = useState({
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

  const { quizId, data, questionId } = componentData;
  const { quiz_name, description } = quizInfo;
  const {
    category,
    type,
    Q_content,
    A,
    B,
    C,
    D,
    correct_answer,
    points
  } = Eachquestion;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;

      const res = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );

      //setting database data to state with hooks

      // useState
      setComponentData({
        ...componentData,
        data: res.data.quiz[0],
        questionId: res.data.quiz[0].id
      });
      setQuizInfo({
        ...quizInfo,
        quiz_name: res.data.quiz[0].quiz_name,
        description: res.data.quiz[0].description
      });
      setQuestionInfo(res.data.quiz);
      setQuestion(
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
  }, []);

  const onChange = e =>
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });

  const handleChanges = (e, id, idx) => {
    const array = Eachquestion;

    array[idx][e.target.name] = e.target.value;

    setQuestion([...array]);
  };

  // onSubmit Quiz & Questions
  const onSubmit = async e => {
    e.preventDefault();

    const quizData = {
      quiz_name,
      description
    };
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`,
      quizData
    );

    props.history.push("/teachersDashboard");
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    Eachquestion.map(question => {
      if (question.id === id) {
        const res = axios.put(
          `${process.env.REACT_APP_BE_URL ||
            process.env.REACT_APP_BE_LOCAL}/api/quest/question/${id}`,
          question
        );

        console.log(res);
        props.history.push("/teachersDashboard");
      }
    });
  };

  const filterQuestions = idx => {
    setChosenQuestion(idx);
  };

  return (
    <>
      <TeacherNavigation />
      <div>
        {" "}
        <div className="top-edits">
          <form className="answers" onSubmit={e => onSubmit(e)}>
            <label className="label">Quiz Name</label>
            <br />
            <input
              name="quiz_name"
              onChange={e => onChange(e)}
              value={quiz_name}
              type="text"
              className="text-box"
            />
            <br />
            <br />
            <label className="label">Quiz Description</label>
            <br />
            <input
              name="description"
              value={description}
              onChange={e => onChange(e)}
              type="text"
              className="text-box"
            />
            <button type="submit" className="button">
              update quiz
            </button>
          </form>
        </div>
      </div>
      <div className="main">
        <div className="choices">
          <div className="edit-questions">
            <div>
              {" "}
              {Eachquestion.length > 0
                ? Eachquestion.map((question, index) =>
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
                              onChange={e =>
                                handleChanges(e, question.id, index)
                              }
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
                              onChange={e =>
                                handleChanges(e, question.id, index)
                              }
                              value={question.type}
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
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
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
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
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
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
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
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
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
                          <input
                            onChange={e => handleChanges(e, question.id, index)}
                            name="correct_answer"
                            className="text-box"
                            type="text"
                            value={question.correct_answer}
                          />
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
            <div className="questions-box">
              <div>
                <h6>Main Questions</h6>
                {Eachquestion.length > 0
                  ? Eachquestion.map((question, idx) =>
                      question.type === 1 ? (
                        <div>
                          <EditQuestion
                            chosen={chosenQuestion}
                            filterQuestions={filterQuestions}
                            Eachquestion={Eachquestion}
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
              <div>
                <h6>Remedial Questions</h6>
                {Eachquestion.length > 0
                  ? Eachquestion.map((question, idx) =>
                      question.type !== 1 ? (
                        <div className="question">
                          <EditQuestion
                            chosen={chosenQuestion}
                            filterQuestions={filterQuestions}
                            Eachquestion={Eachquestion}
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
    </>
  );
};

export default EditQuiz;
