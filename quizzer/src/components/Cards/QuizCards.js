import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Dropdown, ModalHeader, ModalBody } from "reactstrap";
import "./quizCard.css";

class QuizCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: this.props.quizzes,
      showContactInfo: false,
      modal: false,
      folderId: this.props.folderId
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e, quizId) {
    e.preventDefault();
    console.log(quizId, Number(this.state.folderId));

    const ids = {
      quiz_id: quizId
    };

    const results = await axios.post(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/addquiz/${Number(
        this.state.folderId
      )}`,
      ids
    );

    console.log(results);
    console.log(results.data);
  }

  render() {
    const { quizzes, showContactInfo, modal, folderId } = this.state;
    const { folders } = this.props;
    return (
      <>
        <div key={quizzes.id} className="box">
          <div className="corner">
            <i
              onClick={() =>
                this.setState({
                  showContactInfo: !this.state.showContactInfo
                })
              }
              className="fas fa-ellipsis-v"
              style={{
                cursor: "pointer",
                float: "right",
                color: "black",
                marginRight: "1rem"
              }}
            />
          </div>
          {showContactInfo ? (
            <div>
              {" "}
              <Link to={`edit/quiz/${quizzes.id}`}>edit quiz</Link>
              <button color="danger" onClick={this.toggle}>
                add quiz to folder
              </button>
              <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader>Add quiz to folder</ModalHeader>
                <ModalBody>
                  <form onSubmit={this.handleSubmit.bind(this, quizzes.id)}>
                    <select
                      value={folderId}
                      className="text-box"
                      name="folderId"
                      onChange={this.onChange}
                    >
                      {folders.map(folder => (
                        <option value={folder.id}>
                          {console.log(folder.id)}
                          {folder.folder_name}
                        </option>
                      ))}
                    </select>

                    <button type="submit">add</button>
                  </form>
                </ModalBody>
              </Modal>
              <button>delete quiz</button>
            </div>
          ) : null}

          <h6 className="p">
            <strong>{quizzes.quiz_name}</strong>
          </h6>
          <p>{quizzes.description}</p>
        </div>
      </>
    );
  }
}

export default QuizCards;
