import React, { /*useState*/ } from 'react';
import Header from './Header';
import SideBarNav from './SideBarNav';
import AddQuiz from './AddQuiz';


function QuizForm() {
    
    return (
        <div className="quizform">
            <Header />
            <SideBarNav />
            <AddQuiz />
            
        </div>
    )
}


export default QuizForm;