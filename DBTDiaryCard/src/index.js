import React from "react";
import ReactDOM from "react-dom";
import App from './containers/home'
import { BrowserRouter } from 'react-router-dom'
import './i18n'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);