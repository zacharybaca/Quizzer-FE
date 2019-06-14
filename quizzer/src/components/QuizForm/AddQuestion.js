import React from 'react';
import axios from 'axios';

class AddQuestion extends React.Component {
    state = {
        category: '',
        type: '',
        Q_content: '',
        A: '',
        B: '',
        C: '',
        D: '',
        correct_answer: '',
        points: ''
    }

    addCategory = event => {
        this.setState({ category: event.target.value });
    }

    addType = event => {
        this.setState({ type: event.target.value });
    }

    addQContent = event => {
        this.setState({ Q_content: event.target.value });
    }

    addOptionA = event => {
        this.setState({ A: event.target.value });
    }

    addOptionB = event => {
        this.setState({ B: event.target.value });
    }

    addOptionC = event => {
        this.setState({ C: event.target.value });
    }

    addOptionD = event => {
        this.setState({ D: event.target.value });
    }

    addCorrectAnswer = event => {
        this.setState({ correct_answer: event.target.value});
    }

    addPoint = event => {
        this.setState({ points: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const question = {
           category: this.state.category,
           type: this.state.type,
           Q_content: this.state.Q_content,
           A: this.state.A,
           B: this.state.B,
           C: this.state.C,
           D: this.state.D,
           correct_answer: this.state.correct_answer,
           points: this.state.points 
        };

        const teacher_id = localStorage.getItem("id");
        console.log(teacher_id);
        axios.post(`https://labs13-quizzer.herokuapp.com/api/quest/question`, {
            teacher_id
        },
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            this.setState({
                category: '',
                type: '',
                Q_content: '',
                A: '',
                B: '',
                C: '',
                D: '',
                correct_answer: '',
                points: ''
            })
    
}
render () {
    return (
        <div>
            <div className="add-question">
            <form onSubmit={this.handleSubmit}>
                <label for="category">Category</label>
                <br />
                <input className="text-box" type="text" value={this.state.category} onChange={this.addCategory} />
                <br />
                <br />
                <label for="type">Type</label>
                <br />
                <input className="text-box" type="text" value={this.state.type} onChange={this.addType} />
                <br />
                <br />
                <label for="Q_content">Question</label>
                <br />
                <input className="text-box" type="text" value={this.state.Q_content} onChange={this.addQContent} />
                <br />
                <br />
                <label for="A">A</label>
                <br />
                <input className="text-box" type="text" value={this.state.A} onChange={this.addOptionA} />
                <br />
                <br />
                <label for="B">B</label>
                <br />
                <input className="text-box" type="text" value={this.state.B} onChange={this.addOptionB} />
                <br />
                <br />
                <label for="C">C</label>
                <br />
                <input className="text-box" type ="text" value={this.state.C} onChange={this.addOptionC} />
                <br />
                <br />
                <label for="D">D</label>
                <br />
                <input className="text-box" type="text" value={this.state.D} onChange={this.addOptionD} />
                <br />
                <br />
                <label for="correct_answer">Correct Answer</label>
                <br />
                <input className="text-box" type="text" value={this.state.correct_answer} onChange={this.addCorrectAnswer} />
                <br />
                <br />
                <label for="points">Points</label>
                <br />
                <input className="text-box" type="text" value={this.state.points} onChange={this.addPoint} />
                <br />
                <button type="submit">Add Question</button>
            </form>
            </div>
        </div>
    )
}

}

export default AddQuestion;