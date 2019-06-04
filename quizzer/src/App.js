import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
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

  const responseGoogle = async response => {
    const token = response.tokenId;
    const endpoint = "link";
    const res = await axios(endpoint, { Authorization: token });
    console.log("res", res);
  };

  return (
    <div className="App">
      <p>{name}</p>
      <GoogleLogin
        clientId="577740416033-5o653e0h7poma6p0qnhdmptir1gneqo6.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogout buttonText="Logout" />

      {users.map(user => (
        <li key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Account: {user.role}</p>
        </li>
      ))}
    </div>
  );
}

export default App;