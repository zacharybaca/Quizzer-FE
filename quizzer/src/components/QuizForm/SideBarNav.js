import React from 'react';

function SideBarNav() {
    return (
        <div className="sidebar-nav">
            <div>
                <button className="new-quiz"> + New </button>
            </div>
            <div className="quizzes-folder">
                <div className="label-text">Quizzes</div>
                <div className="label-text">Classes</div>
                <div className="label-text">History</div>
            </div>
        </div>
    )
}

export default SideBarNav;