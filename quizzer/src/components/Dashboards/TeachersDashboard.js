import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeacherNavigation from "./Navigation/TeacherNavigation.js";
import "./teacherDashboard.css";
import { Button } from "reactstrap";
import Folders from "../InfoComponents/Folders";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  Dropdown,
  ModalHeader,
  ModalBody
} from "reactstrap";

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

  const onChange = e => {
    console.log(formData.folderId);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.folderId);
  };

  const handleSubmit = async (e, quizId) => {
    e.preventDefault();
    console.log(quizId, Number(formData.folderId));

    const ids = {
      quiz_id: quizId
    };

    const results = await axios.post(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/addquiz/${Number(
        formData.folderId
      )}`,
      ids
    );

    console.log(results);
    console.log(results.data);
  };

  return (
    <div className="mobile">
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
              <div key={user.id} className="box">
                <h6 className="p">
                  <strong>{user.quiz_name}</strong>
                </h6>
                <p>{user.description}</p>
                <ButtonDropdown
                  direction="right"
                  isOpen={dropdownOpen}
                  toggle={() => {
                    setDropDownOpen(!dropdownOpen);
                  }}
                >
                  <DropdownToggle>
                    <i
                      className="fas fa-ellipsis-v"
                      style={{
                        cursor: "pointer",
                        float: "right",
                        color: "black",
                        marginRight: "1rem"
                      }}
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={`edit/quiz/${user.id}`}>edit quiz</Link>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setModal(!modal);
                      }}
                    >
                      <p>add quiz to folder</p>
                      <Modal isOpen={modal}>
                        <ModalHeader>Add quiz to folder</ModalHeader>
                        <ModalBody>
                          <form onSubmit={e => handleSubmit(e, user.id)}>
                            <select
                              value={formData.folderId}
                              onChange={onChange}
                              className="text-box"
                              name="folderId"
                            >
                              {console.log(folders, user.id)}

                              {folders.map(folder => (
                                <option value={folder.id}>
                                  {console.log(folder.id)}
                                  {folder.folder_name}
                                </option>
                              ))}
                            </select>

                            <button type="submit">add</button>
                          </form>
                          <button
                            onClick={() => {
                              setModal(!modal);
                            }}
                          >
                            Cancel
                          </button>
                        </ModalBody>
                      </Modal>
                    </DropdownItem>
                    <DropdownItem>
                      <p>delete quiz</p>
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
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
