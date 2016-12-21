import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ValidatedTextField from '../components/ValidatedTextField';

export default class CustomSimulationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalValue: '',
      intervalDisabled: false,
      intervalError: false,
      descriptionValue: '',
      descriptionDisabled: false,
      descriptionError: false,
    };

    this.setInterval = this.setInterval.bind(this);
    this.setDescription = this.setDescription.bind(this);
  }

  setInterval(event) {
    const error = event.target.value ? false : true;

    this.setState({
      intervalValue: event.target.value,
      intervalError: error,
    });
  }

  setDescription(event) {
    this.setState({ descriptionValue: event.target.value });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.handleClose}
      />,
    ];

    return(
      <div>
        <Dialog
          title="Create Custom Simulation"
          actions={actions}
          modal={true}
          open={this.props.open}
        >
          <form>
            <ValidatedTextField
              label="Interval (milliseconds)"
              type="number"
              fullWidth={false}
              fieldValue={this.state.intervalValue}
              disabled={this.state.intervalDisabled}
              errorText="Interval is required"
              showValidationError={this.state.intervalError}
              handleChange={this.setInterval}
            /><br/>
            <ValidatedTextField
              label="Description"
              type="text"
              fullWidth={false}
              fieldValue={this.state.descriptionValue}
              disabled={this.state.descriptionDisabled}
              showValidationError={this.state.descriptionError}
              handleChange={this.setDescription}
            /><br/>
            <TextField
              hintText="Array of positions [{...}, {...}, ...]"
              multiLine={true}
              rows={2}
              rowsMax={5}
              fullWidth={true}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}
