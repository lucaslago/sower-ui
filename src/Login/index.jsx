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
  paddingLeft: '0px',
};

const loginFormStyle = {
  marginTop: '5rem',
};

const loginButtonStyle = {
  textAlign: 'center',
  marginTop: '2rem',
};

const paperStyle = {
  paddingTop: '0rem',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  paddingBottom: '3rem',
  marginTop: '2rem',
};

const notificationStyle = {
  textAlign: 'center',
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      spinner: false,
      loginError: false,
      emailDisabled: false,
      passwordDisabled: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleLoginErrorClose = this.handleLoginErrorClose.bind(this);
  }

  setEmail(event) {
    if (event.target.value === '') {
      this.setState({ email: event.target.value, emailError: true });
    } else {
      this.setState({ email: event.target.value, emailError: false });
    }
  }

  setPassword(event) {
    if (event.target.value === '') {
      this.setState({ password: event.target.value, passwordError: true });
    } else {
      this.setState({ password: event.target.value, passwordError: false });
    }
  }

  validateForm() {
    if (!this.state.email) {
      this.setState({ emailError: true });
    }
    if (!this.state.password) {
      this.setState({ passwordError: true });
    }
  }

  isValidForm() {
    return this.state.email && this.state.password;
  }

  handleLoginErrorClose() {
    this.setState({ loginError: false });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.validateForm();

    if (!this.isValidForm()) {
      return;
    }

    this.setState({
      spinner: true,
      emailDisabled: true,
      passwordDisabled: true,
    });

    this.props.route.authService.login(this.state.email, this.state.password)
      .then(() => {
        this.setState({ spinner: false });
        this.props.router.push('/dashboard');
      })
    .catch((err) => {
      console.log('error: ', err); //eslint-disable-line
      this.setState({
        spinner: false,
        loginError: true,
        email: '',
        password: '',
        emailDisabled: false,
        passwordDisabled: false,
      });
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12} smOffset={3} sm={6} mdOffset={4} md={4}>
          <Paper style={paperStyle} zDepth={2}>
            <form style={loginFormStyle} onSubmit={this.handleFormSubmit}>
              <Row>
                <Subheader style={subHeaderStyle}>Sign In</Subheader>
              </Row>
              <Row>
                <ValidatedTextField
                  label="E-mail"
                  type="email"
                  disabled={this.state.emailDisabled}
                  errorText={'E-mail is required'}
                  fieldValue={this.state.email}
                  handleChange={this.setEmail}
                  fullWidth={true}
                  showValidationError={this.state.emailError}
                />
              </Row>
              <Row>
                <ValidatedTextField
                  label="Password"
                  type="password"
                  disabled={this.state.passwordDisabled}
                  errorText={'Password is required'}
                  fieldValue={this.state.password}
                  handleChange={this.setPassword}
                  fullWidth={true}
                  showValidationError={this.state.passwordError}
                />
              </Row>
              <Row style={loginButtonStyle} >
                <AsyncButton makingRequest={this.state.spinner} label="login" type="submit" />
              </Row>
            </form>
          </Paper>
        </Col>
        <Snackbar
          style={notificationStyle}
          open={this.state.loginError}
          message="Incorrect email and/or password"
          autoHideDuration={4000}
          onRequestClose={this.handleLoginErrorClose}
        />
      </Row>
    );
  }
}

Login.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({
    authService: React.PropTypes.shape({
      login: React.PropTypes.func.isRequired,
    }),
  }),
};

export default withRouter(Login);
