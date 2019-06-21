// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";

// const QuizPage = styled.div`
//   text-align: center;
// `;

// function QuizData() {
//   const [name] = useState('Questions');
//   const [questions, setQuestions] = useState([]);

//   //takes place instead of componentDidMount
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         "https://labs13-quizzer.herokuapp.com/api/quest/question"
//       );
//       //setting database data to state with hooks
//       console.log("online");
//       setQuestions(result.data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <QuizPage>
//       <p>{name}</p>
//       {console.log("online")}
//       {questions.map(questions => (
//         <div key={questions.id}>
//           <p>Category: {questions.category}</p>
//           <p>Type: {questions.type}</p>
//           <p>Question: {questions.Q_content}</p> 
//           <p>A: {questions.A}</p>
//           <p>B: {questions.B}</p>
//           <p>C: {questions.C}</p> 
//           <p>D: {questions.D}</p>         
//           <p>Points: {questions.points}</p>
//           <br/>
//         </div>
//       ))}
//     </QuizPage>
//   );
// }

// export default QuizData;
