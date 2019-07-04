import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import { Redirect } from "react-router-dom";
import QuizCards from "../Cards/QuizCards.js";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "./teacherDashboard.css";
import Folders from "../InfoComponents/Folders";

function TeacherDashboard(props) {
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: "",
    quiz_description: "",
    quiz_id: null,
    createQuestion: false
  });
  const [quizzes, setQuizzes] = useState([]);
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [accessCode, setAccessCode] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [folderHolder, setFoldersHolder] = useState({
    folders: [],
    quizzes: []
  });
  const [formData] = useState({
    folderId: ""
  });

  const { quiz_name, quiz_description, quiz_id } = quizInfo;

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

  const handleSubmits = event => {
    event.preventDefault();

    const quiz = {
      quiz_name: quiz_name,
      description: quiz_description,
      teacher_id: localStorage.getItem("id")
    };

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes`,
        {
          quiz
        }
      )
      .then(res => {
        setQuizInfo({
          quiz_id: res.data.id
        });
      });

    setRedirect(!redirect);
  };

  const onChange = e =>
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });

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
        {quiz_id !== null ? (
          redirect ? (
            <Redirect to={`/createdquiz/${quiz_id}`} />
          ) : null
        ) : null}
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
            <div className="empty">
              <Modal isOpen={quizModal} toggle={() => setQuizModal(!quizModal)}>
                <ModalHeader>Create Quiz</ModalHeader>
                <ModalBody>
                  <div>
                    <form onSubmit={e => handleSubmits(e)}>
                      <label className="label">Quiz Name</label>
                      <br />
                      <input
                        name="quiz_name"
                        className="text-box"
                        type="text"
                        value={quiz_name}
                        onChange={e => onChange(e)}
                      />
                      <br />
                      <br />
                      <label className="add-quiz-label">
                        Add Quiz Description
                      </label>
                      <br />
                      <input
                        name="quiz_description"
                        className="add-quiz-text-box"
                        type="text"
                        value={quiz_description}
                        onChange={e => onChange(e)}
                      />
                      <br />
                      <button className="submit-button" type="submit">
                        Add Quiz
                      </button>
                    </form>
                    <br />
                  </div>
                </ModalBody>
              </Modal>
              <p className="empty-title">You have not made any quizzes</p>
              <p className="empty-subtitle">
                Click the button to create your first quiz.
              </p>
              <div className="empty-action">
                <button onClick={() => setQuizModal(!quizModal)}>
                  Create a Quiz
                </button>
              </div>
            </div>
          )}
        </div>
        {folderHolder.folders.length > 0
          ? folderHolder.folders.map(folder => (
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
          : null}
      </div>
    </>
  );
}

export default TeacherDashboard;
