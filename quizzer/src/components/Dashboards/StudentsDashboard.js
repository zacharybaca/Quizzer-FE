import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./studentDashboard.css";
import StudentNavigation from "./Navigation/StudentNavigation.js";
import { Button } from "reactstrap";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

function StudentsDashboard(props) {
  const [quizzes, takeQuizzes] = useState({ completed: false });
  const [accessCode, setAccessCode] = useState(false);
  const [error, setError] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    access_code: "",
    student_id: localStorage.getItem("id")
  });

  const { access_code } = formData;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env
            .REACT_APP_BE_LOCAL}/api/quiz/student/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      takeQuizzes(result.data.quizzes);
      setCompletedQuizzes(result.data.completedQuizzes);
    };
    fetchData();
  }, [takeQuizzes]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("success");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/profile/addstudent`,
        formData
      );
      console.log(res);

      setAccessCode(!accessCode);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    // await setFormData({ access_code: "" });
  };

  return (
    <>
      <div>
        <StudentNavigation />
        <div className="sidebar">
          <button
            onClick={() => setAccessCode(!accessCode)}
            className="add-class-button"
          >
            <Modal
              isOpen={accessCode}
              toggle={() => setAccessCode(!accessCode)}
            >
              <ModalHeader>Add a class</ModalHeader>
              <ModalBody>
                {error ? (
                  <div className="alert">
                    User is already assigned to that teacher.
                  </div>
                ) : null}
                <form onSubmit={e => onSubmit(e)}>
                  <input
                    value={access_code}
                    onChange={e => onChange(e)}
                    type="text"
                    placeholder="enter access code..."
                    name="access_code"
                  />
                  <button type="submit" className="submit-code" value="Submit">
                    Submit Code
                  </button>
                </form>
              </ModalBody>
            </Modal>
            Join a Class
          </button>
        </div>

        <div className="dash">
          <div className="dashboard-header">Assigned Quizzes</div>
          <div className="student-quiz-card">
            {quizzes.length > 0 ? (
              quizzes.map(user =>
                user.assigned ? (
                  completedQuizzes.length > 0 ? (
                    completedQuizzes.map(quiz =>
                      !quiz.completed || quiz.quiz_name !== user.quiz_name ? (
                        <div key={user.id} className="box">
                          {console.log(quiz.id, user.id)}
                          <div className="card-content">
                            <h6 className="given-name">
                              <strong>{user.quiz_name}</strong>
                            </h6>
                            <p className="assigned-by">
                              Assigned by: {user.name}
                            </p>
                            <p className="card-description">
                              {user.description}
                            </p>
                            <button className="take-quiz">
                              <Link to={`quiz/${user.id}`}>
                                <p className="quiz-link">Take Quiz</p>
                              </Link>
                            </button>
                          </div>
                        </div>
                      ) : null
                    )
                  ) : (
                    <div key={user.id} className="box">
                      <div className="card-content">
                        <h6 className="given-name">
                          <strong>{user.quiz_name}</strong>
                        </h6>
                        <p className="assigned-by">Assigned by: {user.name}</p>
                        <p className="card-description">{user.description}</p>
                        <button className="take-quiz">
                          <Link to={`quiz/${user.id}`}>
                            <p className="quiz-link">Take Quiz</p>
                          </Link>
                        </button>
                      </div>
                    </div>
                  )
                ) : null
              )
            ) : (
              <p className="Student-empty">
                You do not have any assigned quizzes at this time.
              </p>
            )}
          </div>

          <div className="dashboard-header">Completed Quizzes</div>
          <div className="student-quiz-card">
            {completedQuizzes.length > 0 ? (
              completedQuizzes.map(user => (
                <div key={user.id} className="box">
                  {console.log(user)}
                  <div className="card-content">
                    <h6 className="given-name">
                      <strong>{user.quiz_name}</strong>
                    </h6>
                    <p className="quiz-description">{user.description}</p>
                    <div className="card-completed">completed</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="student-complete-empty">
                You have not completed any quizzes.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentsDashboard;
