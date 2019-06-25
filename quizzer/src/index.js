import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "../src/components/Step2/Step2Page";

const Mobile = styled.div`
  @media(max-width: 500px) {
    .mobile {
      background: #6772e5;
    }
  };
  @media(min-width: 1000px) {
    .mobile {
      background: #008b8b;
    }
  };
`;

ReactDOM.render(
  <Router>
    <Mobile>
      <App />
    </Mobile>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
