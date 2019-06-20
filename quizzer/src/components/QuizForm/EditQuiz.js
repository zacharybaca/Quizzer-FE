import React, { useState, useEffect } from "react";
import TeacherNavigation from "../Dashboards/Navigation/TeacherNavgation";
import axios from "axios";

const EditQuiz = props => {
  const [componentData, setComponentData] = useState({
    quizId: ""
  });

  const { quizId } = componentData;

  //takes place instead of componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;
      console.log(id);
      const res = await axios(
        `https://labs13-quizzer.herokuapp.com/api/quiz/quizzes/${id}`
      );
      //setting database data to state with hooks
      console.log("ran");
      console.log(res.data);
      setComponentData({ ...componentData, quizId: res.data.quiz[0].quiz_id });
    };
    fetchData();
  }, []);

  const deleteQuiz = async () => {
    const res = await axios.delete(
      `https://labs13-quizzer.herokuapp.com/api/quiz/quizzes/${quizId}`
    );
  };
  return (
    <>
      <TeacherNavigation />
      <div>hello</div>
      <button onClick={deleteQuiz}>delete quiz</button>
    </>
  );
};

export default EditQuiz;
