import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function SideBarNav() {
    return (
        <div className="sidebar-nav">
            <div>
                <button className="new-quiz"> + New </button>
            </div>
            <div className="quizzes-folder">
                <div className="label-text">
                 <FontAwesomeIcon icon={faAngleRight} />
                 <FontAwesomeIcon icon={faFolder} />   Quizzes
                </div>
                <div className="label-text">
                   <FontAwesomeIcon icon={faAngleRight} />
                   <FontAwesomeIcon icon={faUser} /> Classes
                </div>
                <div className="label-text">
                    <FontAwesomeIcon icon={faAngleRight} />
                    <FontAwesomeIcon icon={faTag} /> History
                </div>
            </div>
        </div>
    )
}

export default SideBarNav;