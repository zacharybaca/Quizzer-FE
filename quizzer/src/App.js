import React, { useState } from "react";
import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "count"
  const [name, setName] = useState("Quizzer App");

  return (
    <div className="App">
      <p>{name}</p>
    </div>
  );
}

export default App;
