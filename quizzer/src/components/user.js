import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const UserPage = styled.div`
  text-align: center;
`;

function User() {
    const [name] = useState("Users");
    const [users, setUsers] = useState([]);
  
    //takes place instead of componentDidMount
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          "https://labs13-quizzer.herokuapp.com/api/users"
        );
        //setting database data to state with hooks
        setUsers(result.data);
      };
      fetchData();
    }, []);

    return (
        <UserPage>
          <p>{name}</p>
    
          {users.map(user => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Account: {user.role}</p>
            </li>
          ))}
        </UserPage>
    );
}

export default User;