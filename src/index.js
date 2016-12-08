import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import AuthService from './services/auth';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const authService = AuthService();

const requireAuth = (nextState, replace) => {
  if(!authService.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};
ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRedirect to="dashboard" />
      <Route path="login" component={ Login } authService={ authService }/>
      <Route path="dashboard" component={ Dashboard } onEnter={ requireAuth }/>
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
