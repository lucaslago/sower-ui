import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { Row, Col } from 'react-bootstrap';

const subHeaderStyle = {
  fontSize: '20px',
  textAlign: 'center',
  paddingLeft: '0px'
};

const loginFormStyle = {
  marginTop: '5rem'
};

const loginButtonStyle = {
  textAlign: 'center'
};

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.validateForm();
  }

  render() {
    return (
      <Row>
        <Col xsOffset={3} xs={6} smOffset={4} sm={4}>
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
              <RaisedButton label="login" type="submit" />
            </Row>
          </form>
        </Col>
      </Row>
    );
  }
}

