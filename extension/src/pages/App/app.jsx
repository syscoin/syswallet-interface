import React, { Component } from "react";
import { Switch, Router } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import { createBrowserHistory } from "history";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    sessionStorage.setItem("UserLogged", false);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <React.Fragment>
        <Router history={this.history}>
          <Switch>
            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={true}
              />
            ))}

            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default (App);