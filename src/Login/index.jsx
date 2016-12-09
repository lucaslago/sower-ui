import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { Row, Col } from 'react-bootstrap';
import AsyncButton from '../components/AsyncButton';
import ValidatedTextField from '../components/ValidatedTextField';

const subHeaderStyle = {
  fontSize: '20px',
  textAlign: 'center',
  paddingLeft: '0px'
};

const loginFormStyle = {
  marginTop: '5rem'
};

const loginButtonStyle = {
  textAlign: 'center',
  marginTop: '2rem'
};

const paperStyle = {
  paddingTop: '0rem',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  paddingBottom: '3rem',
  marginTop: '2rem'
};

const notificationStyle = {
  textAlign: 'center'
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      spinner: false,
      loginError: false
    };
  }

  setEmail = (email) => {
    this.setState({ email });
  }

  setPassword = (password) => {
    this.setState({ password });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value, passwordError: '' });
  }

  validateForm = () => {
    const emailError = 'E-mail field is required.';
    const passwordError = 'Password is required.';

    if(!this.state.email) {
      this.setState({ emailError });
    }
    if(!this.state.password) {
      this.setState({ passwordError });
    }
  }

  _isValidForm() {
    return this.state.email && this.state.password;
  }

  handleLoginErrorClose = () => {
    this.setState({ loginError: false });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.validateForm();

    if (!this._isValidForm()) {
      return;
    }

    this.setState({ spinner: true });

    this.props.route.authService.login(this.state.email, this.state.password)
      .then(response => {
        console.log('>>>', response);
        this.setState({ spinner: false });
        this.props.router.push('/dashboard');
      })
    .catch(err => {
      console.log('error: ',  err);
      this.setState({
        spinner: false,
        loginError: true,
        email: '',
        password: ''
      });
    });
  }

  render() {
    return (
        <Row>
          <Col xs={12} smOffset={3} sm={6} mdOffset={4} md={4}>
            <Paper style={ paperStyle } zDepth={2}>
              <form style={ loginFormStyle } onSubmit={ this.handleFormSubmit }>
                <Row>
                  <Subheader style={ subHeaderStyle }>Sign In</Subheader>
                </Row>
                <Row>
                  <ValidatedTextField
                    label="E-mail"
                    errorText={ "E-mail is required" }
                    setValue={ this.setEmail }
                  />
                </Row>
                <Row>
                  <ValidatedTextField
                    label="Password"
                    errorText={ "Password is required" }
                    setValue={ this.setPassword }
                  />
                </Row>
                <Row style={ loginButtonStyle } >
                  <AsyncButton makingRequest={ this.state.spinner } label="login" type="submit"/>
                </Row>
              </form>
            </Paper>
          </Col>
          <Snackbar
            style={ notificationStyle }
            open={ this.state.loginError }
            message="Incorrect email and/or password"
            autoHideDuration={ 4000 }
            onRequestClose={ this.handleLoginErrorClose }
          />
        </Row>
        );
  }
}

export default withRouter(Login);
