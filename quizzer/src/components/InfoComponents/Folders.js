import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";
import FolderContents from "./FolderContents.js";
import "./folders.css";

function Folders(props) {
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [dropdownFile, setDropDownFile] = useState(false);
  const [folderHolder, setFolders] = useState({
    folders: [],
    quizzes: []
  });
  const [folderName, setFolderName] = useState({
    name: ""
  });

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
    setModal(!modal);
  };

  return (
    <div className="sidebar">
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
            <DropdownItem>
              <Link to="/quizzes">New Quiz</Link>
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

                    <button className="create-folder" type="submit">Create</button>
                  </form>
                  <button className="cancel-folder"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Cancel
                  </button>
                </ModalBody>
              </Modal>
            </DropdownItem>
            <DropdownItem onClick={props.access}>Get access code</DropdownItem>
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
