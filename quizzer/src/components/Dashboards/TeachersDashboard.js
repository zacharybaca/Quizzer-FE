import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import QuizCards from "../Cards/QuizCards.js";
import "./teacherDashboard.css";
import Folders from "../InfoComponents/Folders";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [accessCode, setAccessCode] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [dropdownFile, setDropDownFile] = useState(false);
  const [modal, setModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderHolder, setFoldersHolder] = useState({
    folders: [],
    quizzes: []
  });
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
      setQuizzes(result.data);
      setFoldersHolder({
        folders: folder.data.folders,
        quizzes: folder.data.quizzes
      });
      setFolders(folder.data.folders);
    };
    fetchData();
  }, [quizzes]);

  const access = () => {
    setAccessCode(!accessCode);
  };

  return (
    <>
      <TeacherNavigation />
      <div className="dash">
        <Folders access={access} />

        
        {accessCode ? (
          <h1>access code: {localStorage.getItem("access_code")}</h1>
        ) : null}
        <div className="recent-header">Recently Made Quizzes</div>
        <div className="recently-made-quizzes">
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
        {folderHolder.folders.length > 0 ? (
            folderHolder.folders.map(folder => (
            <div>
                <div className="folder-name-header"><button>{folder.folder_name}</button></div>
              {  folderHolder.quizzes.map(quiz =>
                quiz.folder_name === folder.folder_name ? (
                  <QuizCards
                folderId={formData.folderId}
                folders={folders}
                quizzes={quiz}
              />
                ) : null
              )}
            </div>
             
            ))
          ) : (
            <div>no folders made</div>
          )}
      </div>
    </>
  );
}

export default TeacherDashboard;
