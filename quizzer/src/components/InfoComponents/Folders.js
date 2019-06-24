import React, { Component } from "react";
import axios from "axios";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./folders.css";

class Folders extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.togglepopup = this.togglepopup.bind(this);

    this.state = {
      dropdownOpen: false,
      modal: false,
      folderName: "",
      folders: []
    };
  }
  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/folder/${localStorage.getItem(
          "id"
        )}`
      )
      .then(response =>
        this.setState({
          folders: response.data
        })
      )
      .catch(err => console.log(err));
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  togglepopup() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.folderName);
    const folder = {
      teacher_id: localStorage.getItem("id"),
      folder_name: this.state.folderName
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
    this.setState({
      folderName: "",
      modal: false
    });
  };

  render() {
    const { folders } = this.state;
    return (
      <div className="sidebar">
        <div>
          <ButtonDropdown
            direction="right"
            isOpen={this.state.btnDropright}
            toggle={() => {
              this.setState({ btnDropright: !this.state.btnDropright });
            }}
          >
            <DropdownToggle caret>+ NEW</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="/quizzes">New Quiz</Link>
              </DropdownItem>
              <DropdownItem onClick={this.togglepopup}>New Folder</DropdownItem>
              <Modal isOpen={this.state.modal} togglepopup={this.togglepopup}>
                <ModalHeader togglepopup={this.togglepopup}>
                  Add Folder
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      name="folderName"
                      placeholder="enter folder name"
                      type="text"
                      value={this.state.folderName}
                      onChange={this.onChanges}
                    />

                    <button type="submit">Create</button>
                    <button onClick={this.togglepopup}>Cancel</button>
                  </form>
                </ModalBody>
              </Modal>
              <DropdownItem>Get access code</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div>
          <div>
            {console.log(folders)}
            {folders.length > 0 ? (
              folders.map(folder => (
                <div>
                  <FontAwesomeIcon icon={faAngleRight} />
                  <FontAwesomeIcon icon={faFolder}>
                    {folder.folder_name}
                  </FontAwesomeIcon>
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
}

export default Folders;
