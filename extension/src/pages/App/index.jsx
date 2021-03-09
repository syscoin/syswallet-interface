import React from "react";
import { render } from "react-dom";
import App from "./app.jsx";
import { Provider } from "react-redux";
import store from "../../store/store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, window.document.querySelector("#app-container"));

if (module.hot) module.hot.accept();