import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const TeacherPage = styled.div`
  text-align: center;
`;

function Teacher() {
    const [name] = useState("Teachers");
    const [teachers, setTeachers] = useState([]);
  
    //takes place instead of componentDidMount
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          `${process.env.REACT_APP_BE_URL}/api/profile/teacher`
        );
        //setting database data to state with hooks
        setTeachers(result.data);
      };
      fetchData();
    }, []);
    
    return (
        <TeacherPage>
          <p>{name}</p>
    
          {teachers.map(user => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Account: {user.role}</p>
            </li>
          ))}
        </TeacherPage>
    );
}

export default Teacher;