import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import history from './history';
import StripePage from "../src/components/StripePage/StripePage";
import Step2Page from "../src/components/Step2/Step2Page";
const AppwithRouter = withRouter(App)
=======

>>>>>>> be6b8d0ca0a9a8cf879e550e4d95f055949a5c86
ReactDOM.render(
  <Router history={history}>
    <AppwithRouter />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
