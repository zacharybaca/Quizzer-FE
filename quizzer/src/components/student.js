import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const StudentPage = styled.div`
  text-align: center;
`;

function Student() {
    const [name] = useState("Students");
    const [students, setStudents] = useState([]);
  
    //takes place instead of componentDidMount
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          "https://labs13-quizzer.herokuapp.com/api/profile/student"
        );
        //setting database data to state with hooks
        setStudents(result.data);
      };
      fetchData();
    }, []);

    return (
        <StudentPage>
          <p>{name}</p>
    
          {students.map(user => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Account: {user.role}</p>
            </li>
          ))}
        </StudentPage>
    );
}

export default Student;