import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class ValidatedTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      fieldValue: ''
    };
  }

  handleChange = (event) => {
    this.props.setValue(event.target.value);
    this.setState({ error: '', fieldValue: event.target.value });
  }

  validateField = (event) => {
    if(!event.target.value) {
      this.setState({ error :this.props.errorText });
    }
  }

  render() {
    return (
        <TextField
          floatingLabelText={ this.props.label }
          fullWidth={ true }
          errorText={ this.state.error }
          value={ this.state.fieldValue }
          onChange={ this.handleChange }
          onBlur={ this.validateField }
          className="validated-text-field"
        />
        );
  }
}
