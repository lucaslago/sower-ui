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
      positionsValue: '',
      positionsDisabled: false,
      positionsErrorText: '',
      submitDisabled: true,
    };

    this.setInterval = this.setInterval.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setPositions = this.setPositions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setInterval(event) {
    const value = event.target.value;
    this.setState({
      intervalValue: value,
      intervalError: value ? false : true,
      submitDisabled: !(value && this.state.positionsValue),
    });
  }

  setDescription(event) {
    this.setState({ descriptionValue: event.target.value });
  }

  setPositions(event) {
    const value = event.target.value;
    this.setState({
      positionsValue: value,
      positionsErrorText: value ? '' : 'Positions is required',
      submitDisabled: !(value  && this.state.intervalValue),
    });
  }

  isValidForm() {
    return !this.state.positionsValue || !this.state.intervalValue;
  }

  handleSubmit() {
    if (this.isValidForm) {
      return this.setState({
        intervalError: true,
        positionsErrorText: 'Positions is required',
      });
    }
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
        disabled={this.state.submitDisabled}
        onTouchTap={this.handleSubmit}
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
            disabled={this.state.positionsDisabled}
            value={this.state.positionsValue}
            errorText={this.state.positionsErrorText}
            type="hidden"
            onChange={this.setPositions}
          />
        </Dialog>
      </div>
    );
  }
}
