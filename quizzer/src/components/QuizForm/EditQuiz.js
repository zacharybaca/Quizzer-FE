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

  // declared variable
  const { quizId, data } = componentData;
  const {quiz_name, description} = quizInfo
  const {id, category,type, Q_content, A, B, C, D, correct_answer, points, quiz_id} = questionInfo


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
      // useState for Questions
      setQuestionInfo({
        ...questionInfo,
        id: res.data.quiz[0].id,
        category: res.data.quiz[0].category,
        type: res.data.quiz[0].type,
        Q_content: res.data.quiz[0].Q_content,
        A: res.data.quiz[0].A,
        B: res.data.quiz[0].B,
        C: res.data.quiz[0].C,
        D: res.data.quiz[0].D,
        correct_answer: res.data.quiz[0].correct_answer,
        points: res.data.quiz[0].points,
        points: res.data.quiz[0].points,
        quiz_id: res.data.quiz[0].quiz_id,
      })
    };
    fetchData();
  }, []);

  // update Quiz title & description
  const updateQuiz = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
  };

  const onChange = e => setQuizInfo({...quizInfo, [e.target.name]: e.target.value})

   // update Questions
   const updateQuestion = async () => {
    const res = await axios.put(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quest/question/${quizId}`
    );
  };
  // const onChange = e => setQuestionInfo({...questionInfo, [e.target.name]: e.target.value});


  const deleteQuiz = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/quiz/quizzes/${quizId}`
    );
    props.history.push("/teachersDashboard");
  };

      // onSubmit Quiz & Questions
  const onSubmit = async e => {
    e.preventDefault();

    const quizData = {
      quiz_name,
      description,
      id,
      category,
      type,
      Q_content,
      A,
      B,
      C,
      D,
      correct_answer,
      points,
      quiz_id,
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

          {/* onSubmit form for Questions */}
          <form onSubmit={e => onSubmit(e)}>
            <input 
            name='id'
            onChange={e => onChange(e)}
            value={id}
            type='text'/>
             {/* <input 
             name='category'
             onChange={e => onChange(e)}
            value={category}
            type='text'/> */}
          {/* <input 
            name='type'
            onChange={e => onChange(e)}
            value={type}
            type='text'/> */}

{/* <label>Category</label> */}
            <br />
            <select
              value={category}
              onChange={e => onChange(e)}
              // onChange={this.onChange}
              className="text-box"
              name="category"
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
              <option value="Spanish">Spanish</option>
            </select>
            <br />
            <br />
            <label>Type</label>
            <br />
            <select
              value={type}
              onChange={e => onChange(e)}
              // onChange={this.onChange}
              className="text-box"
              name="type"
            >
              <option value={1}>Standard</option>
              <option value={2}>Remedial</option>
            </select>

            <br />
            <br />


          <input 
             name='Q_content'
             onChange={e => onChange(e)}
            value={Q_content}
            type='text'/>
          <input 
            name='A'
            onChange={e => onChange(e)}
            value={A}
            type='text'/>
            <input 
             name='B'
            onChange={e => onChange(e)}
            value={B}
            type='text'/>
            <input 
            name='C'
            onChange={e => onChange(e)}
            value={id}
            type='text'/>
             <input 
             name='D'
            onChange={e => onChange(e)}
            value={D}
            type='text'/>
          <input 
            name='correct_answer'
            onChange={e => onChange(e)}
            value={correct_answer}
            type='text'/>
             <input 
             name='points'
            onChange={e => onChange(e)}
            value={points}
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
