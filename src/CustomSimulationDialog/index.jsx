import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import ValidatedTextField from '../components/ValidatedTextField';

const notificationStyle = {
  textAlign: 'center',
};

const actionsStyleRight = {
  textAlign: 'right',
};

const actionsStyleCenter = {
  textAlign: 'center',
};

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
      notification: false,
      loading: false,
      actionsStyle: actionsStyleRight,
      notificationMessage: '',
    };

    this.resetState = this.resetState.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setPositions = this.setPositions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
  }


  setInterval(event) {
    const value = event.target.value;
    this.setState({
      intervalValue: value,
      intervalError: !value,
      submitDisabled: !(value && this.state.positionsValue && this.state.descriptionValue),
    });
  }

  setDescription(event) {
    const value = event.target.value;
    this.setState({
      descriptionValue: value,
      descriptionError: !value,
      submitDisabled: !(value && this.state.positionsValue && this.state.intervalValue),
    });
  }

  setPositions(event) {
    const value = event.target.value;

    if (value) {
      try {
        JSON.parse(value);
        this.setState({
          positionsValue: value,
          positionsErrorText: '',
          submitDisabled: !(this.state.intervalValue && this.state.descriptionValue),
        });
      } catch (e) {
        this.setState({
          positionsValue: value,
          positionsErrorText: 'Not a valid JSON',
          submitDisabled: true,
        });
      }
    } else {
      this.setState({
        positionsValue: value,
        positionsErrorText: 'Positions is required',
        submitDisabled: true,
      });
    }
  }

  handleSubmit() {
    const payload = {
      interval: parseInt(this.state.intervalValue, 10),
      description: this.state.descriptionValue,
      data: JSON.parse(this.state.positionsValue),
    };

    this.setState({
      loading: true,
      actionsStyle: actionsStyleCenter,
      intervalDisabled: true,
      descriptionDisabled: true,
      positionsDisabled: true,
    });

    this.props.simulationService
      .create({
        trackerId: this.props.trackerId,
        authToken: this.props.authToken,
        payload,
      })
      .then(() => {
        this.props.handleClose();
        this.props.handleSave();
        this.setState({
          notification: true,
          notificationMessage: 'Simulation saved',
        });
        this.resetState();
      })
      .catch(() => {
        this.setState({
          notification: true,
          notificationMessage: 'Error while trying to save Simulation',
        });
        this.resetState();
      });
  }

  handleNotification() {
    this.setState({ notification: false });
  }

  resetState() {
    this.setState({
      intervalValue: '',
      intervalDisabled: false,
      intervalError: false,
      descriptionValue: '',
      descriptionDisabled: false,
      descriptionError: false,
      positionsValue: '',
      positionsDisabled: false,
      positionsErrorText: '',
      loading: false,
      actionsStyle: actionsStyleRight,
      submitDisabled: true,
    });
  }

  render() {
    let actions;
    if (!this.state.loading) {
      actions = [
        <FlatButton
          label="Cancel"
          primary
          onTouchTap={this.props.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary
          disabled={this.state.submitDisabled}
          onTouchTap={this.handleSubmit}
        />,
      ];
    } else {
      actions = [<CircularProgress />];
    }

    return (
      <div>
        <Dialog
          title="Create Custom Simulation"
          actions={actions}
          modal
          open={this.props.open}
          actionsContainerStyle={this.state.actionsStyle}
          autoScrollBodyContent
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
          /><br />
          <ValidatedTextField
            label="Description"
            type="text"
            fullWidth={false}
            fieldValue={this.state.descriptionValue}
            errorText="Description is required"
            disabled={this.state.descriptionDisabled}
            showValidationError={this.state.descriptionError}
            handleChange={this.setDescription}
          /><br />
          <TextField
            hintText="Array of positions [{...}, {...}, ...]"
            multiLine
            rows={2}
            rowsMax={5}
            fullWidth
            disabled={this.state.positionsDisabled}
            value={this.state.positionsValue}
            errorText={this.state.positionsErrorText}
            type="hidden"
            onChange={this.setPositions}
          />
        </Dialog>
        <Snackbar
          style={notificationStyle}
          open={this.state.notification}
          message={this.state.notificationMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleNotification}
        />
      </div>
    );
  }
}

CustomSimulationDialog.propTypes = {
  open: React.PropTypes.bool.isRequired,
  trackerId: React.PropTypes.string.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  handleSave: React.PropTypes.func.isRequired,
  authToken: React.PropTypes.string.isRequired,
  simulationService: React.PropTypes.shape({
    create: React.PropTypes.func.isRequired,
  }),
};
