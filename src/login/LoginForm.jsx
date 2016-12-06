import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Container, Row, Col} from 'react-grid-system';
import './login-form.css';

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
      <Container>
        <Row>
          <Col xs={1} sm={4} />
          <Col xs={10} sm={4}>
            <form className="login-form" onSubmit={ this.handleFormSubmit }>
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
              <Row>
                <div className="login-button">
                  <RaisedButton label="login" type="submit" />
                </div>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}
