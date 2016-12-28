import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DashboardItemProgressBar from '../DashBoardItemProgressBar';
import Menu from '../components/Menu';
import CustomSimulationDialog from '../CustomSimulationDialog';
import { shouldDisableStartBtn, shouldDisableStopBtn, shouldExpandCard, shouldDisableCardMenu } from './utils';
import SIMULATION_STATUS from '../utils/simulation_status';

const itemStyle = {
  marginTop: '1rem',
};

const notificationStyle = {
  textAlign: 'center',
};

const actionsStyle = {
  paddingRight: '0px',
};

class DashboardItem extends Component {
  constructor(props) {
    super(props);
    const { device } = props;
    this.state = {
      device,
      startDisabled: shouldDisableStartBtn(device),
      stopDisabled: shouldDisableStopBtn(device.simulationStatus.status),
      expanded: shouldExpandCard(device.simulationStatus.status),
      notification: false,
      notificationMessage: '',
      dialogOpen: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.handleSimulationFinished = this.handleSimulationFinished.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogSave = this.handleDialogSave.bind(this);
  }

  setSimulationStatus(status) {
    const device = Object.assign({}, this.state.device, {
      simulationStatus: { status },
    });
    this.setState({ device });
  }

  setCustomSimulation(value) {
    const device = Object.assign({}, this.state.device, {
      custom_simulation: value,
    });
    this.setState({
      device,
    });
  }

  successStartNotification() {
    this.setState({
      notification: true,
      notificationMessage: 'Simulation started',
    });
  }

  successStopNotification() {
    this.setState({
      notification: true,
      notificationMessage: 'Simulation stopped',
    });
  }

  failureNotification() {
    this.setState({
      notification: true,
      notificationMessage: 'Error while trying to start/stop the simulation',
    });
  }

  toggleExpandCard() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  activateSimulation() {
    this.setSimulationStatus(SIMULATION_STATUS.ACTIVE);
  }

  deactivateSimulation() {
    this.setSimulationStatus(SIMULATION_STATUS.INACTIVE);
  }

  disableButtons() {
    this.setState({
      startDisabled: true,
      stopDisabled: true,
    });
  }

  activateButtons() {
    this.setState({
      startDisabled: shouldDisableStartBtn(this.state.device),
      stopDisabled: shouldDisableStopBtn(this.state.device.simulationStatus.status),
    });
  }

  start() {
    this.disableButtons();
    this.props.simulationService
      .start({
        trackerId: this.props.device.id,
        authToken: this.props.authToken,
      })
      .then(() => {
        this.successStartNotification();
        this.toggleExpandCard();
        this.activateSimulation();
        this.activateButtons();
      })
      .catch((error) => {
        console.error(error); //eslint-disable-line
        this.activateButtons();
        this.failureNotification();
      });
  }

  stop() {
    this.disableButtons();
    this.props.simulationService.stop({
      trackerId: this.props.device.id,
      authToken: this.props.authToken,
    }).then(() => {
      this.successStopNotification();
      this.toggleExpandCard();
      this.deactivateSimulation();
      this.activateButtons();
    }).catch((error) => {
      console.error(error); //eslint-disable-line
      this.failureNotification();
      this.activateButtons();
    });
  }

  handleNotification() {
    this.setState({ notification: false });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  simulationFinishedNotification() {
    this.setState({
      notification: true,
      notificationMessage: `${this.props.device.id} simulation has been finished.`,
    });
  }

  handleSimulationFinished() {
    this.deactivateSimulation();
    this.toggleExpandCard();
    this.simulationFinishedNotification();
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }


  handleDialogSave() {
    this.setCustomSimulation(true);
    this.activateButtons();
  }

  render() {
    return (
      <Card className="DashboardItem" expanded={this.state.expanded} style={itemStyle}>
        <CardHeader
          title={this.props.device.relationships.equipment.data.description}
          subtitle={this.props.device.id}
          actAsExpander={false}
          showExpandableButton={false}
          avatar="http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/tractor-icon.png"
        />
        <CardText expandable>
          <DashboardItemProgressBar
            trackerId={this.props.device.id}
            authToken={this.props.authToken}
            simulationStatus={this.state.device.simulationStatus}
            simulationService={this.props.simulationService}
            simulationFinished={this.handleSimulationFinished}
            updateInterval={5000}
          />
        </CardText>
        <CardActions style={actionsStyle}>
          <RaisedButton
            className="start"
            label="Start"
            primary
            onClick={this.start}
            disabled={this.state.startDisabled}
          />
          <RaisedButton
            className="stop"
            label="Stop"
            primary={false}
            onClick={this.stop}
            disabled={this.state.stopDisabled}
          />
          <Menu
            disabled={shouldDisableCardMenu(this.state.device.simulationStatus.status)}
            handleClick={this.openDialog}
            primaryText="Add Custom Simulation"
          />
          <CustomSimulationDialog
            trackerId={this.props.device.id}
            open={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
            handleSave={this.handleDialogSave}
            authToken={this.props.authToken}
            simulationService={this.props.simulationService}
          />
        </CardActions>
        <Snackbar
          style={notificationStyle}
          open={this.state.notification}
          message={this.state.notificationMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleNotification}
        />
      </Card>
    );
  }
}

DashboardItem.propTypes = {
  authToken: React.PropTypes.string.isRequired,
  simulationService: React.PropTypes.shape({
    start: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
  }),
  device: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    simulationStatus: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
      totalPositions: React.PropTypes.number,
      remainingPositions: React.PropTypes.number,
    }),
    relationships: React.PropTypes.shape({
      equipment: React.PropTypes.shape({
        data: React.PropTypes.shape({
          description: React.PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
};

export default DashboardItem;
