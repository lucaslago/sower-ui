import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class ValidatedTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleChange(event.target.value);
    this.setState({ fieldValue: event.target.value });
  }

  render() {
    return (
      <TextField
        floatingLabelText={ this.props.label }
        type={ this.props.type }
        fullWidth={ true }
        disabled={ this.props.disabled }
        errorText={ this.props.showValidationError ? this.props.errorText : '' }
        value={ this.state.fieldValue }
        onChange={ this.handleChange }
        className="validated-text-field"
      />
    );
  }
}
