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

  return (
    <>
      <TeacherNavigation />
      <div className="main">
        <div className="choices">
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
          <h2>
            show questions
            <i
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="fas fa-sort-down"
              style={{ cursor: "pointer" }}
            />
          </h2>
          {showContactInfo
            ? Eachquestion.length > 0
              ? Eachquestion.map((question, idx) =>
                  showContactInfo ? (
                    <EditQuestion
                      Eachquestion={Eachquestion}
                      handleSubmit={handleSubmit}
                      handleChanges={handleChanges}
                      question={question}
                      index={idx}
                    />
                  ) : null
                )
              : null
            : null}
        </div>
      </div>
    </>
  );
};

export default EditQuiz;
