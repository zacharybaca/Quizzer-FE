import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const QuizPage = styled.div`
  text-align: center;
`;

function QuizData2() {
  const [name] = useState('Questions');
  const [questions, setQuestions] = useState([]);

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://labs13-quizzer.herokuapp.com/api/quest/question"
      );
      //setting database data to state with hooks
      console.log("online");
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  return (
    <QuizPage>
      <p>{name}</p>
      {console.log("online")}
      {questions.map(questions => (
        <div key={questions.id}>
          <p>Category: {questions.category}</p>
          <p>Type: {questions.type}</p>
          <p>Question: {questions.Q_content}</p> 
          <p>A: {questions.A}</p>
          <p>B: {questions.B}</p>
          <p>C: {questions.C}</p> 
          <p>D: {questions.D}</p>         
          <p>Points: {questions.points}</p>
          <br/>
        </div>
      ))}
    </QuizPage>
  );
}

export default QuizData2;

// const QuizData2 = [
// // Quiz Q's
//   {
//     "id": 1,
//     "category": `Math`,
//     "type": 1,
//     "Q_content": [`What is the square route of 256?`],
//     "options": [
//         `A: 12`,
//         `B: 16`, 
//         `C: 14`, 
//         `D: 15`
//     ],
//     "correct_answer": `B`,
//     "points": 2
//   },

//   {
//     id: 2,
//     category: "Science",
//     type: 1,
//     Q_content: ["What is the chemical formula for water?"],
//     "options": [
//         `A: H3O`,
//         `B: HO2`,
//         `C: H2O2`,
//         `D: H2O`
//     ],   
//     correct_answer: `D`,
//     points: 2
//   },

//   {
//     "id": 3,
//     "category": `English`,
//     "type": 1,
//     "Q_content": [`Which of these is a correlative conjunction function?`],
//     "options": [ 
//         `A: "Although"`,
//         `B: "Since"`,
//         `C: "Neither/nor"`,
//         `D: "After"`
//     ],
//     "correct_answer": `C`,
//     "points": 2
//   },
// // Remedial Q's
//   {
//     "id": 1,
//     "category": `Math`,
//     "type": 2,
//     "Q_content": [`In ∆XYZ, ∠X = 55° and ∠Y = 75°. Find ∠Z?`],
//     "options": [
//         `A: "∠Z = 50°"`,
//         `B: "∠Z = 150°"`,
//         `C: "∠Z = 25°"`,
//         `D: "∠Z = 75°"`
//     ],
//     "correct_answer": `A`
//   },

//   {
//     "id": 2,
//     "category": `Science`,
//     "type": 2,
//     "Q_content": [`Which of the following is used in pencils?`],
//     "options": [
//         `A: "Charcoal"`,
//         `B: "Graphite"`,
//         `C: "Phosphorous"`,
//         `D: "Lead"`
//     ],
//     "correct_answer": `B`
//   },

//   {
//     "id": 3,
//     "category": `English`,
//     "type": 2,
//     "Q_content": [`Analogies: Odometer is to mileage as compass is to?`],
//     "options": [
//         `A: "Needle"`,
//         `B: "Speed"`,
//         `C: "Direction"`,
//         `D: "Hiking"`
//     ],
//     "correct_answer": "C"
//   }

// ];

// export default QuizData2;