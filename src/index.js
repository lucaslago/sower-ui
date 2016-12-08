import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import AuthService from './services/auth';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const authService = AuthService();

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <Route path="login" component={ Login } authService={ authService }/>
      <Route path="dashboard" component={ Dashboard } />
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
