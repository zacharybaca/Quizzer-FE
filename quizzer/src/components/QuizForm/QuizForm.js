import React, { useState } from 'react';
import Header from './Header';
import SideBarNav from './SideBarNav';
import AddQuiz from './AddQuiz';
import AddQuestion from './AddQuestion';


function QuizForm() {
    
    return (
        <div className="quizform">
            <Header />
            <SideBarNav />
            <AddQuiz />
            <AddQuestion />
        </div>
    )
}


export default QuizForm;