import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './app/App';
import LoginForm from './login/LoginForm';
import Dashboard from './dashboard/Dashboard';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRedirect to="/login" />
      <Route path="login" component={ LoginForm } />
      <Route path="dashboard" component={ Dashboard } />
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
