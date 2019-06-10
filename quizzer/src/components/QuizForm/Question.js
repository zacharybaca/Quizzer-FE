import React, { useState } from 'react';

function Question ({ question, index }) {
    return (
        <div className="question">
            {question.text}
        </div>
    )
}



export default Question;