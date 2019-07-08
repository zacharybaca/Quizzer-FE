import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ReactComponent as Logo } from "./dots-to-close.svg";
import "./quizCard.css";

class QuizCards extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      quizzes: this.props.quizzes,
      showContactInfo: false,
      modal: false,
      folderId: '',
      assign: false
    };

    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  async assignQuiz(e, quizId) {
    e.preventDefault();
    const { quizzes } = this.state;

    const quizData = {
      quiz_name: quizzes.quiz_name,
      description: quizzes.quiz_name,
      assigned: true
    };
    await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`,
      quizData
    );

    this.setState({ assign: !this.state.assign });
    this.setState({ showContactInfo: !this.state.showContactInfo });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async deleteQuiz(id) {
    await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
    );
  }

  async handleSubmit(e, quizId) {
    e.preventDefault();
    console.log(quizId, this.state.folderId);
    

    const ids = {
      quiz_id: quizId
    };

    await axios.post(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/addquiz/${Number(
        this.state.folderId
      )}`,
      ids
    );
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { quizzes, showContactInfo, modal, folderId } = this.state;
    const { folders } = this.props;
    
    return (
      <>
        <div
          key={quizzes.id}
          className={`box ${
            this.state.showContactInfo ? "no-hover-state" : null
          }`}
        >
          <div className="corner">
            <div
              onClick={() =>
                this.setState({
                  showContactInfo: !this.state.showContactInfo
                })
              }
            >
              <Logo className="menu-icon" />
            </div>
          </div>
          {showContactInfo ? (
            <div className="quiz-cards">
              {" "}
              <Link to={`edit/quiz/${quizzes.id}`}>
                {" "}
                <button className="dropdownbutton">edit quiz</button>
              </Link>
              <button className="dropdownbutton" onClick={this.toggle}>
                add to folder
              </button>
              <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader>Add to quiz folder</ModalHeader>
                <ModalBody>
                  <form onSubmit={e => this.handleSubmit(e, quizzes.id)}>
                    <select
                      value={folderId}
                      className="text-box"
                      name="folderId"
                      onChange={this.onChange}
                    >
                      <option>Choose Your Folder</option>
                      {folders.map(folder => (
                        <option value={folder.id}>{folder.folder_name}</option>
                      ))}
                    </select>

                    <button type="submit">Add</button>
                  </form>
                </ModalBody>
              </Modal>
              <button
                className="dropdownbutton"
                onClick={this.deleteQuiz.bind(this, quizzes.id)}
              >
                Delete Quiz
              </button>
              <button
                className="dropdownbutton"
                onClick={e => this.assignQuiz(e, quizzes.id)}
              >
                Assign Quiz
              </button>
            </div>
          ) : null}
          {!showContactInfo ? (
            <div className="card-content">
              <h6 className="given-name">{quizzes.quiz_name}</h6>

              <div className="card-description">
                <p>{quizzes.description}</p>
              </div>
              {quizzes.assigned || this.state.assign ? (
                <div className="card-assigned">Assigned</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default QuizCards;
