import React, { Component } from "react";
import AppRoute from "./routes/route";
import Storage from '../../helpers/Storage';
import { Switch, Router } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from "./routes/";
import { createBrowserHistory } from "history";
import { userIsLogged, setFirstTimeAccount, logout } from "../../store/application";
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createBrowserHistory();

    this.checkAccount();
  }

  async checkAccount() {
    const account = await Storage.getItem('vault');

    if (!account) {
      this.props.setFirstTimeAccount();
      this.props.push("/create-account");

      return;
    }

    const lastLoginAt = await Storage.getItem('LastLoginAt');

    const isGreaterThanOneHour = !lastLoginAt || (Date.now() - lastLoginAt) > (60 * 1000); // 1min 

    if (isGreaterThanOneHour) {
      this.props.logout();

      // if an hour (or 1min) has passed, redirect to login
      this.history.push("/login");
    } else {
      this.props.userIsLogged(true);
      this.history.push("/dashboard");
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    userIsLogged: (data) => dispatch(userIsLogged(data)),
    setFirstTimeAccount: () => dispatch(setFirstTimeAccount()),
    logout: () => dispatch(logout())
  }
};

export default connect(null, mapDispatchToProps)(App);