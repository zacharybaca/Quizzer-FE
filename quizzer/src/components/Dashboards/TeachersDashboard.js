import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import QuizCards from "../Cards/QuizCards.js";
import "./teacherDashboard.css";
import Folders from "../InfoComponents/Folders";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [accessCode, setAccessCode] = useState(null);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [dropdownFile, setDropDownFile] = useState(false);
  const [modal, setModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [formData, setFormData] = useState({
    folderId: ""
  });
  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env
            .REACT_APP_BE_LOCAL}/api/quiz/teachers/${localStorage.getItem(
          "id"
        )}/quizzes`
      );

      const folder = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/folder/${localStorage.getItem(
          "id"
        )}`
      );
      //setting database data to state with hooks
      console.log(result);
      console.log(result.data);
      console.log(folder.data);
      setQuizzes(result.data);
      setFolders(folder.data.folders);
    };
    fetchData();
  }, []);

  const access = () => {
    setAccessCode(localStorage.getItem("access_code"));
  };

  return (
    <>
      <TeacherNavigation />
      <div className="dash">
        <Folders />

        <button className="button" onClick={access}>
          get access code
        </button>

        <h1 className="title">Teacher Đashboard</h1>
        {accessCode ? <h1>access code: {accessCode}</h1> : null}
        <div className="header">Recently Administered Quizzes</div>
        <div className="recently-administered-quizzes">
          {quizzes.length > 0 ? (
            quizzes.map(user => (
              <QuizCards
                folderId={formData.folderId}
                folders={folders}
                quizzes={user}
              />
            ))
          ) : (
            <p>no created quizzes</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
