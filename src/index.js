import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './app/App';
import LoginForm from './login/LoginForm';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRedirect to="/login" />
      <Route path="login" component= { LoginForm } />
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
