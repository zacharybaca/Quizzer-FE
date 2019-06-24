import React, { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./folders.css";

function Folders(props) {
  // const [reactstrap, setReactStrap] = useState({
  //   dropdownOpen: false,
  //   modal: false
  // });
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [folderHolder, setFolders] = useState({
    folderName: "",
    folders: []
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
      console.log(result.data);
      setFolders({ folders: result.data });
      console.log(folderHolder);
    };
    fetchData();
  }, [setFolders]);

  // const toggle = () => {
  //   setReactStrap({
  //     ...reactstrap,
  //     dropdownOpen: !dropdownOpen
  //   });
  // };
  //
  // const togglepopup = () => {
  //   setReactStrap({
  //     ...reactstrap,
  //     modal: !modal
  //   });
  // };

  const onChanges = event =>
    setFolders({ ...folderHolder, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();
    const { folderName } = folderHolder;

    const folder = {
      teacher_id: localStorage.getItem("id"),
      folder_name: folderName
    };
    console.log(folder);
    axios
      .post(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/folder/add`,
        folder
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    setModal(!modal);
  };

  const { folders } = folderHolder;

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
              <Modal isOpen={modal}>
                <ModalHeader>Add Folder</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <input
                      name="folderName"
                      placeholder="enter folder name"
                      type="text"
                      value={folderHolder.folderName}
                      onChange={e => onChanges(e)}
                    />

                    <button type="submit">Create</button>
                    <button
                      onClick={() => {
                        setModal(!modal);
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </ModalBody>
              </Modal>
            </DropdownItem>
            <DropdownItem>Get access code</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div>
        <div>
          {console.log(folders)}
          {folders.length > 0 ? (
            folders.map(folder => (
              <div key={folder.id}>
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faFolder} /> {folder.folder_name}
              </div>
            ))
          ) : (
            <div>hi</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Folders;
