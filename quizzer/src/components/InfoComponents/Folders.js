import React, { useState, useEffect } from "react";
import Protected from "../Protected/Protected";
import QuizForm from "../QuizForm/QuizForm";
import axios from "axios";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import FolderContents from "./FolderContents.js";
import "./folders.css";

function Folders (props) {
  const [modal, setModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [folderHolder, setFolders] = useState({
    folders: [],
    quizzes: []
  });
  const [folderName, setFolderName] = useState({
    name: ""
  });
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: "",
    quiz_description: "",
    quiz_id: null,
    createQuestion: false
  });

  const { quiz_name, quiz_description, quiz_id } = quizInfo;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/folder/${localStorage.getItem(
          "id"
        )}`
      );
      //setting database data to state with hooks

      setFolders({
        folders: result.data.folders,
        quizzes: result.data.quizzes
      });
    };
    fetchData();
  }, [folderHolder]);

  const { folders, quizzes } = folderHolder;

  const onChange = e =>
    setQuizInfo({ ...quizInfo, [e.target.name]: e.target.value });


  const onChanges = event =>
    setFolderName({ ...folderName, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    const folder = {
      teacher_id: localStorage.getItem("id"),
      folder_name: folderName.name
    };

    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/folder/add`,
        folder
      )
      .then(res => {});
    setFolderName({
      name: ""
    });
   
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
    
    setRedirect(!redirect)
  };


  return (
    <div className="sidebar">
      {quiz_id !== null ? (
      redirect ? (
        <Redirect to={`/createdquiz/${quiz_id}`} />
      ) : null
      ) : null}
      <div>
        <ButtonDropdown
          direction="right"
          isOpen={dropdownOpen}
          toggle={() => {
            setDropDownOpen(!dropdownOpen);
          }}
        >
          <DropdownToggle caret>+ NEW</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setQuizModal(!quizModal)}>add quiz
            <Modal isOpen={quizModal} toggle={() => setQuizModal(!quizModal)}>
                <ModalHeader>Add Quiz</ModalHeader>
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
              <label className="add-quiz-label">Add Quiz Description</label>
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
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setModal(!modal);
              }}
            >
              New Folder
              <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader>Create a Folder</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <input
                      name="name"
                      className="folder-name"
                      placeholder="Enter folder name"
                      type="text"
                      value={folderName.name}
                      onChange={e => onChanges(e)}
                    />

                    <button className="create-folder" type="submit">
                      Create
                    </button>
                  </form>
                  <button
                    className="cancel-folder"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Cancel
                  </button>
                </ModalBody>
              </Modal>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div>
        <div>
          {folders.length > 0 ? (
            folders.map(folder => (
              <FolderContents folder={folder} quizzes={quizzes} />
            ))
          ) : (
            <div>no folders made</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Folders;
