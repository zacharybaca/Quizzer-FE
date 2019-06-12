import React from 'react';

function AddQuiz() {
    return (
        <div>
            <div className="quiz-name-section">
                <form>
                    <label for="quiz-name">Quiz Name</label>
                    <br />
                    <input className="text-box" type="text" name="quiz" id="quiz-name" />
                    <br />
                    <br />
                    <label className="add-quiz-label" for="quiz-description">Add Quiz Description</label>
                    <br />
                    <input className="add-quiz-text-box" type="text" name="quiz" id="quiz-description" />
                </form>
            </div>
        </div>
    )
}

export default AddQuiz;