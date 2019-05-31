import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// build out our class here.
class App extends React.Component {
  constructor() {
    super();
    this.state = { 
    message: "Hello from Labs 13- Quizer App!!"
};  }
  render() {
  return <div>{this.state.message}</div>;
}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
