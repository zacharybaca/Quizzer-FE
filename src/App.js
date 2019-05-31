import React, { useState } from "react";
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

export default App;
