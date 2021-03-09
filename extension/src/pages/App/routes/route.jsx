import React from "react";
import { Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

//AUTH related methods
const AppRoute = ({
  component: Component,
  isAuthProtected,
  ...rest
}) => (
  <Route {...rest}
    render={props => {
      const isLogged = (sessionStorage.getItem("UserLogged") === 'true');
      if (isAuthProtected && !isLogged) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Component {...props} />
      );
    }}
  />
);

export default AppRoute;