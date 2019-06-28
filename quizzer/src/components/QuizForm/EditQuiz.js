import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";

import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    data: "",
    quizId: "",
    questionId: ""
  });
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: "",
    description: ""
  });
  // set the state for the Questions

  const [questionInfo, setQuestionInfo] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);
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
      console.log(res.data);

      // useState
      setComponentData({
        ...componentData,
        data: res.data.quiz[0],
        quizId: res.data.quiz[0].quiz_id,
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
    console.log("id given to handleChanges", id);
    console.log("data", Eachquestion);

    const array = Eachquestion;

    array[idx][e.target.name] = e.target.value;

    setQuestion([...array]);

    console.log("changed data", Eachquestion);
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

    console.log(res);
    props.history.push("/teachersDashboard");
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log("question id", id);
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
          <form onSubmit={e => onSubmit(e)}>
            <input
              name="quiz_name"
              onChange={e => onChange(e)}
              value={quiz_name}
              type="text"
            />
            <input
              name="description"
              value={description}
              onChange={e => onChange(e)}
              type="text"
            />
            <button type="submit" className="button">
              update quiz
            </button>
          </form>
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
                    <form
                      key={question.id}
                      onSubmit={e => handleSubmit(e, question.id)}
                    >
                      <label>
                        Category {console.log("data in form", question)}
                      </label>
                      <br />
                      <select
                        value={Eachquestion[idx].category}
                        className="text-box"
                        name="category"
                        onChange={e => handleChanges(e, question.id, idx)}
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
                        onChange={e => handleChanges(e, question.id, idx)}
                        value={question.type}
                        className="text-box"
                        name="type"
                      >
                        <option value={1}>Standard</option>
                        <option value={2}>Remedial</option>
                      </select>

                      <br />
                      <br />
                      <label>
                        Question{console.log("q_content", question.Q_content)}
                      </label>
                      <br />
                      <input
                        name="Q_content"
                        className="text-box"
                        type="text"
                        onChange={e => handleChanges(e, question.id, idx)}
                        value={Eachquestion[idx].Q_content}
                      />
                      <br />
                      <br />
                      <label>A</label>
                      <br />
                      <input
                        onChange={e => handleChanges(e, question.id, idx)}
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
                        onChange={e => handleChanges(e, question.id, idx)}
                        name="B"
                        className="text-box"
                        type="text"
                        value={question.B}
                      />
                      <br />
                      <br />
                      <label>C</label>
                      <br />
                      <input
                        onChange={e => handleChanges(e, question.id, idx)}
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
                        onChange={e => handleChanges(e, question.id, idx)}
                        name="D"
                        className="text-box"
                        type="text"
                        value={question.D}
                      />
                      <br />
                      <br />
                      <label>Correct Answer</label>
                      <br />
                      <input
                        onChange={e => handleChanges(e, question.id, idx)}
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
                        onChange={e => handleChanges(e, question.id, idx)}
                        name="points"
                        className="text-box"
                        type="text"
                        value={question.points}
                      />
                      <br />
                      <button type="submit">update Question</button>
                    </form>
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
