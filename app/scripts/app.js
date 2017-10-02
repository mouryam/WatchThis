import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from './components/app-main';
import 'whatwg-fetch';
require("babel-polyfill");
require('es6-promise').polyfill();

window.React = React;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
registerServiceWorker();
