import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name] = useState("Quizzer App");
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
    <div className="App">
      <p>{name}</p>
      {users.map(user => (
        <li key={user.id}>
          <p>{user.name}</p>
        </li>
      ))}
    </div>
  );
}

export default App;
