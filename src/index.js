/* eslint-disable import/no-named-as-default,
                  import/no-named-as-default-member,
                  react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import AuthService from './services/auth';
import DevicesService from './services/devices';
import './index.css';

injectTapEventPlugin();

const authService = AuthService();
const devicesService = DevicesService();
const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRedirect to="dashboard" />
      <Route path="login" component={Login} authService={authService} />
      <Route
        path="dashboard"
        component={Dashboard}
        onEnter={requireAuth}
        authService={authService}
        devicesService={devicesService}
      />
    </Route>
  </Router>
  ,
  document.getElementById('root'),
);
