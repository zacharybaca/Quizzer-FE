import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import QuizCards from "../Cards/QuizCards.js";
import { Modal, ModalBody } from "reactstrap";
import "./teacherDashboard.css";
import Folders from "../InfoComponents/Folders";

function TeacherDashboard(props) {
  const [quizzes, setQuizzes] = useState([]);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [accessCode, setAccessCode] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderHolder, setFoldersHolder] = useState({
    folders: [],
    quizzes: []
  });
  const [formData] = useState({
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

  const deleteFolder = async id => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/delete/${id}`
    );

    console.log(res);
  };

  const someHandler = () => {
    setDeleteIcon(!deleteIcon);
  };

  return (
    <>
      <TeacherNavigation access={access} />
      <div className="dash">
        <Folders access={access} />
        <Modal isOpen={accessCode} toggle={() => setAccessCode(!accessCode)}>
          <ModalBody>
            <h1>access code: {localStorage.getItem("access_code")}</h1>
          </ModalBody>
        </Modal>

        <div className="dashboard-header">Recently Made Quizzes</div>
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
              <div className="folder-name-header">
                <div>
                  <div className="dashboard-header">
                    Folder: {folder.folder_name}{" "}
                    <i
                      className="move fas fa-trash fa-xs"
                      id="some-div"
                      onMouseEnter={someHandler}
                      onMouseLeave={someHandler}
                      onClick={() => deleteFolder(folder.id)}
                    />
                  </div>
                </div>
              </div>
              <div className="recently-made-quizzes">
                {folderHolder.quizzes.map(quiz =>
                  quiz.folder_name === folder.folder_name ? (
                    <QuizCards
                      folderId={formData.folderId}
                      folders={folders}
                      quizzes={quiz}
                    />
                  ) : null
                )}
              </div>
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
