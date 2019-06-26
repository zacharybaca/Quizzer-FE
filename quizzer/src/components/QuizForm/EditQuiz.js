import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavigation";

import axios from "axios";
import "./EditQuiz.css";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    data: "",
    quizId: "",
    questionId: ""
  });
  const [quizInfo, setQuizInfo] = useState({
    quiz_name: '' ,
    description: '' 
  })
  // set the state for the Questions
  const [questionInfo, setQuestionInfo] = useState({
    id: '' ,
    category: '',
    type: '' ,
    Q_content: '',
    A: '' ,
    B: '',
    C: '' ,
    D: '',
    correct_answer: '' ,
    points: '',
    quiz_id: '' ,
  })

  const { quizId, data } = componentData;
  const {quiz_name, description} = quizInfo

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;

      const res = await axios(
        `${process.env.REACT_APP_BE_URL ||
          process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${id}`
      );
      //setting database data to state with hooks

      // useState
      setComponentData({
        ...componentData,
        data: res.data.quiz[0],
        quizId: res.data.quiz[0].quiz_id,
        questionId: res.data.quiz[0].id
      });
      setQuizInfo({
        ...quizInfo,
        quiz_name: res.data.quiz[0].quiz_name,
        description: res.data.quiz[0].description
      })
    };
    fetchData();
  }, []);

  const updateQuiz = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
  };

  const onChange = e => setQuizInfo({...quizInfo, [e.target.name]: e.target.value})

  // const updateQuiz = (quiz) => {
  //   console.log(quiz);
  //   axios
  //     .put(`${process.env.REACT_APP_BE_URL ||
  //       process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`, quiz)
  //       .then(res => {
  //         this.setState({
  //           quiz: [quiz, res.data]
  //         });
  //         // this.props.history.push('/quiz');
  //       });
  //   //     .catch(err => {
  //   //   console.log(err);
  //   // });


  const deleteQuiz = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
    props.history.push("/teachersDashboard");
  };

  const onSubmit = async e => {
    e.preventDefault();

    const quizData = {
      quiz_name,
      description
    }
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`, quizData
    );

    console.log(res)
  }


 

  return (
    <>
      {console.log('here',data)}
      <TeacherNavigation />
      <div className="main">
        <div className="choices">
          
          <form onSubmit={e => onSubmit(e)}>
            <input 
            name='quiz_name'
            onChange={e => onChange(e)}
            value={quiz_name}
            type='text'/>
             <input 
             name='description'
            value={description}
            onChange={e => onChange(e)}
            type='text'/>
            <button type='submit' className="button" >
              update quiz
            </button>
          </form>

          <div>
            
            <button className="button" onClick={deleteQuiz}>
              delete quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuiz;
