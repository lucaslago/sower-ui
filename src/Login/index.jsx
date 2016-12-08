import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-bootstrap';
import auth from '../services/auth';
import AsyncButton from '../components/AsyncButton';
const authService = auth();

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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      spinner: false
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value, emailError: '' });
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.validateForm();

    if (!this._isValidForm()) {
      console.log(this.state);
      console.log('>> invalid');
      return
    }

    this.setState({ spinner: true });

    authService.login(this.state.email, this.state.password)
      .then(response => {
        console.log('>>>', response);
        this.setState({ spinner: false });
      })
      .catch(err => {
        console.log('error: ',  err);
        this.setState({ spinner: false });
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
              <TextField
                floatingLabelText="E-mail"
                fullWidth={true}
                errorText={ this.state.emailError }
                value={ this.state.email }
                onChange={ this.handleEmailChange }
              />
            </Row>
            <Row>
              <TextField
                floatingLabelText="Password"
                type="password"
                fullWidth={true}
                errorText={ this.state.passwordError }
                value={ this.state.password }
                onChange={ this.handlePasswordChange }
              />
            </Row>
            <Row style={ loginButtonStyle } >
              <AsyncButton makingRequest={ this.state.spinner } label="login" type="submit"/>
            </Row>
          </form>
          </Paper>
        </Col>
      </Row>
    );
  }
}

