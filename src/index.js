import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// build out our functional component here.
function App() {
  // Declare a new state variable, which we'll call "name"
  const [name, setName] = useState("Quizzer App");

  return (
    <div>
      <p>{name}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
