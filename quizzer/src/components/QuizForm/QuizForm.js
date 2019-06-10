import React, { useState } from 'react';
import Header from './Header';
import SideBarNav from './SideBarNav';


function QuizForm() {
    const [questions, setQuestions] = useState([
        {
            text: 'What is the equivalent to pi?',
            answer: '3.14'
        },
        {
            text: 'What school are we attending?',
            answer: 'Lambda'
        }
    ]);
    return (
        <div className="quizform">
            <Header />
            <SideBarNav />
            
        </div>
    )
}


export default QuizForm;