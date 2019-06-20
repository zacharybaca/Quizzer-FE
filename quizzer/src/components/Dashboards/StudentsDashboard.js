import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./studentDashboard.css";
import StudentNavigation from './Navigation/StudentNavigation.js';
import { Button } from 'reactstrap';

function StudentsDashboard(props) {
  const [quizzes, takeQuizzes] = useState([]);
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://labs13-quizzer.herokuapp.com/api/quiz/student/${localStorage.getItem(
          "id"
        )}/quizzes`
      );
      //setting database data to state with hooks
      console.log(result.data);
      takeQuizzes(result.data.quizzes);
    };
    fetchData();
  }, []);

  return (
    <Fragment> 
      <div>
        <StudentNavigation />
        <button className='button'>
          <Link  className='white' to="/addclass">Add Class</Link>
        </button>
        <div>
          {console.log(quizzes)}
          <h1 className='title'>Student Đashboard</h1>  
          <div className="assigned-quizzes">  
            <div className="header"> 
              Assigned Quizzes
            </div>
            <div className="added-boxes">
              {quizzes.length > 0 ? (
                quizzes.map(user => (
                    <div key={user.id} className="box">
                      <h6><strong>Quiz Name</strong></h6>
                      <p>Assigned By: {user.name}</p>
                      <p>10 Main Questions</p>
                      <p>10 Remedial Questions</p>
                      <Button color="purple"><Link to={`quiz/${user.id}`}><p>Take Quiz</p></Link></Button>
                    </div>  
                ))
              ) : (
                <p>No quizzes at this time, try again later...</p>
              )}
            </div>
          </div>
        </div>
      </div>  
    </Fragment>
  );
}

export default StudentsDashboard;