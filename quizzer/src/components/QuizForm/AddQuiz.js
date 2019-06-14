import React, { useState } from 'react';
import axios from 'axios';

class AddQuiz extends React.Component {
    state = {
        quiz_name: '',
        quiz_description: ''
    }

    handleChange = event => {
        this.setState({ quiz_name: event.target.value });
        this.setState({ quiz_description: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        const quiz = {
            quiz_name: this.state.quiz_name,
            quiz_description: this.state.quiz_description
        };

        const teacher_id = localStorage.getItem("id");
        console.log(teacher_id);
        axios.post(`http://localhost:8000/api/quiz/quizzes`, {
            teacher_id
        },
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

        
      
render () {
    return (
        <div>
            <div className="quiz-name-section">
                <form onSubmit={this.handleSubmit}>
                    <label for="quiz-name">Quiz Name</label>
                    <br />
                    <input className="text-box" type="text" value={this.state.quiz_name} onChange={this.handleChange} />
                    <br />
                    <br />
                    <label className="add-quiz-label" for="quiz-description">Add Quiz Description</label>
                    <br />
                    <input className="add-quiz-text-box" type="text" value={this.state.quiz_description} onChange={this.handleChange} />
                    <br />
                    <button type="submit">Add Quiz</button>
                </form>
            </div>
        </div>
    )
}}


export default AddQuiz;