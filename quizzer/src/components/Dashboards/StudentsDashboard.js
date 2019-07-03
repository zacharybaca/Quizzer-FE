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

    const res = await axios.post(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/profile/addstudent`,
      formData
    );
    console.log(res);
    setAccessCode(!accessCode)
    // await setFormData({ access_code: "" });
  };

  
  return (
    <div>
      
      <StudentNavigation />
      <button onClick={() => setAccessCode(!accessCode)} className="button">
      <Modal isOpen={accessCode} toggle={() => setAccessCode(!accessCode)}>
      <ModalHeader>Add a class</ModalHeader>
          <ModalBody>
          <form onSubmit={e => onSubmit(e)}>
        <input
          value={access_code}
          onChange={e => onChange(e)}
          type="text"
          placeholder="enter access code..."
          name="access_code"
        />
        <input type="submit" className="button" value="Submit" />
      </form>
          </ModalBody>
          </Modal>
          add class
      </button>
      </div>
    
      <div className="dash">
        <div className="dashboard-header">Assigned Quizzes</div>
        <div className="assigned-quizzes">
          {quizzes.length > 0 ? (
            quizzes.map(user =>
              user.assigned ? (
                <div key={user.id} className="box">
                  <h6 className="p">
                    <strong>{user.quiz_name}</strong>
                  </h6>
                  <p>Assigned By: {user.name}</p>
                  <p>{user.description}</p>
                  <Button color="purple">
                    <Link to={`quiz/${user.id}`}>
                      <p className="p">take quiz</p>
                    </Link>
                  </Button>
                </div>
              ) : null
            )
          ) : (
            <p className="Student-empty">
              You do not have any assigned quizzes at this time.
            </p>
          )}
        </div>

        <div className="dashboard-header">Completed Quizzes</div>

        <div className="completed-quizzes">
          {completedQuizzes.length > 0 ? (
            completedQuizzes.map(user => (
              <div key={user.id} className="box">
                <h6 className="p">
                  <strong>{user.quiz_name}</strong>
                </h6>
                <p>{user.description}</p>
              </div>
            ))
          ) : (
            <p className="student-empty">No quizzes completed</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentsDashboard;
