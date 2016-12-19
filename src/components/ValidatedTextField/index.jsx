import React from 'react';
import TextField from 'material-ui/TextField';

const ValidatedTextField = (props) => {
    return (
      <TextField
        floatingLabelText={ props.label }
        type={ props.type }
        fullWidth={ true }
        disabled={ props.disabled }
        errorText={ props.showValidationError ? props.errorText : '' }
        value={ props.fieldValue }
        onChange={ props.handleChange }
        className="validated-text-field"
      />
    );
};

export default ValidatedTextField;
