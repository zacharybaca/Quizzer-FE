import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";
import EditQuestion from "./EditQuestion";
import Question from "./Question";
import Folders from "../InfoComponents/Folders";
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

  const [display, setDisplay] = useState(false);
  const [chosenQuestion, setChosenQuestion] = useState(0);
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

  const { quizId } = componentData;
  const { quiz_name, description } = quizInfo;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;

      const res = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );

      console.log(res.data);

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
      <Folders />

      <div className="main-container">
        <div className="info-nav-container">
          <div className="top-container">
            <div className="name-description">
              <form className="quiz-info" onSubmit={e => onSubmit(e)}>
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
                <label className="label">Quiz Description</label>
                <br />

                <input
                  name="description"
                  value={description}
                  onChange={e => onChange(e)}
                  type="text"
                  className="text-box"
                />

                <button type="submit" className="update-button">
                  UPDATE QUIZ
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="middle-container">
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
                          <div className="category-type">
                            <div>
                              <label>Category</label>
                              <br />

                              <select
                                value={question.category}
                                className="selectors"
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
                            </div>
                            <div>
                              <label>Type of Question</label>
                              <br />

                              <select
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
                                value={question.type}
                                className="selectors"
                                name="type"
                              >
                                <option value={1}>Main</option>
                                <option value={2}>Follow-Up</option>
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
                              onChange={e =>
                                handleChanges(e, question.id, index)
                              }
                              value={question.Q_content}
                            />
                          </div>

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

                          <div className="answer-points">
                            <div>
                              <label>Correct Answer</label>
                              <br />

                              <select
                                value={question.correct_answer}
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
                                className="selector"
                                name="correct_answer"
                              >
                                <option>choose correct answer</option>
                                <option value={question.A}>A</option>
                                <option value={question.B}>B</option>
                                <option value={question.C}>C</option>
                                <option value={question.D}>D</option>
                              </select>
                            </div>
                            <div>
                              <label>Points</label>
                              <br />
                              <select
                                value={question.points}
                                onChange={e =>
                                  handleChanges(e, question.id, index)
                                }
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
                          <button className="update-button" type="submit">
                            UPDATE QUESTION
                          </button>
                        </form>

                        <div className="add-question-button">
                          {display ? (
                            <Question quizId={props.match.params.id} />
                          ) : null}

                          {display ? null : (
                            <button
                              className="submit-button"
                              onClick={() => {
                                setDisplay(!display);
                              }}
                            >
                              ADD QUESTION
                            </button>
                          )}
                        </div>
                      </div>
                    ) : null
                  )
                : null}
            </div>
          </div>
          <div className="question-navigation">
            <div className="question-nav-content">
              <div>
                <div className="bigger-text">Main Questions</div>

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
            </div>
            <div className="question-nav-content">
              <div>
                <div className="bigger-text">Follow-Up Questions</div>

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
