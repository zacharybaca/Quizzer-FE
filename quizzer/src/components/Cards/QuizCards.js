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
      folderId: ""
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
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`,
      quizData
    );
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async deleteQuiz(id) {
    const res = await axios.delete(
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

    const results = await axios.post(
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
        <div key={quizzes.id} className={`box ${this.state.showContactInfo ? 'no-hover-state': null}`}>
          <div className="corner">
            <i
              onClick={() =>
                this.setState({
                  showContactInfo: !this.state.showContactInfo
                })
              }
              className="fas fa-ellipsis-v three-dots"
             
            />
          </div>
          {showContactInfo ? (
            <div className='move'>
              {" "}
              <Link to={`edit/quiz/${quizzes.id}`}>
                {" "}
                <button className='dropdownbutton'>edit quiz</button>
              </Link>
              <button className='dropdownbutton' onClick={this.toggle}>
                add to folder
              </button>
              <Modal isOpen={modal} toggle={this.toggle}>
                <ModalHeader >Add to quiz folder</ModalHeader>
                <ModalBody>
                  <form onSubmit={e => this.handleSubmit(e, quizzes.id)}>
                    <select
                      value={folderId}
                      className="text-box"
                      name="folderId"
                      onChange={this.onChange}
                    >
                      {folders.map(folder => (
                        <option value={folder.id}>{folder.folder_name}</option>
                      ))}
                    </select>

                    <button type="submit">add</button>
                  </form>
                </ModalBody>
              </Modal>
              <button className='dropdownbutton' onClick={this.deleteQuiz.bind(this, quizzes.id)}>
                delete quiz
              </button>
              <button className='dropdownbutton' onClick={e => this.assignQuiz(e, quizzes.id)}>
                assign quiz
              </button>
            </div>
          ) : null}
          {!showContactInfo ? (
            <div className="card-content">
               <h6 className="p">
            {quizzes.quiz_name}
          </h6>
         
          <div className="card-description">
          <p>{quizzes.description}</p>
          </div>
          {quizzes.assigned ? <div className="card-assigned">assigned</div> : null}
            </div>
          ) : null}
         
        </div>
      </>
    );
  }
}

export default QuizCards;
