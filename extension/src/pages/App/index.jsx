import React from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { Store } from 'webext-redux';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>
    , window.document.querySelector(".app-container"));
});

if (module.hot) module.hot.accept();