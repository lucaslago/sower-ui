import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DashboardItemProgressBar from '../DashBoardItemProgressBar';
import Menu from '../components/Menu';

const itemStyle = {
  marginTop: '1rem',
};

const notificationStyle = {
  textAlign: 'center',
};

const actionsStyle = {
  paddingRight: '0px',
};

const isActiveSimulation = (simulationStatus) => {
  switch (simulationStatus) {
    case 'active':
      return true;
    case 'inactive':
      return false;
    default:
      return false;
  }
};

class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDisabled: isActiveSimulation(this.props.device.simulationStatus.status),
      stopDisabled: !isActiveSimulation(this.props.device.simulationStatus.status),
      expanded: isActiveSimulation(this.props.device.simulationStatus.status),
      notification: false,
      notificationMessage: '',
      dialogOpen: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  start() {
    this.props.simulationService.start({
      trackerId: this.props.device.id,
      authToken: this.props.authToken,
    })
    .then(() => {
      this.setState({
        notification: true,
        notificationMessage: 'Simulation started',
      });
    })
    .catch(() => {
      this.setState({
        notification: true,
        notificationMessage: 'Error while trying to start the simulation',
      });
      return this.reset();
    });

    return this.expand();
  }

  stop() {
    this.props.simulationService.stop({
      trackerId: this.props.device.id,
      authToken: this.props.authToken,
    })
    .then(() => {
      this.setState({
        notification: true,
        notificationMessage: 'Simulation stopped',
      });
      this.reset();
    })
    .catch(() => {
      this.setState({
        notification: true,
        notificationMessage: 'Error while trying to stop the simulation',
      });
    });
  }

  handleNotification() {
    this.setState({ notification: false });
  }

  expand() {
    this.setState({
      expanded: true,
      stopDisabled: false,
      startDisabled: true,
    });
  }

  reset() {
    this.setState({
      expanded: false,
      startDisabled: this.props.startDisabled,
      stopDisabled: this.props.stopDisabled,
    });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
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
            simulationStatus={this.props.device.simulationStatus}
            simulationService={this.props.simulationService}
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
            handleClick={this.openDialog}
            primaryText="Add Custom Simulation"
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
  startDisabled: React.PropTypes.bool.isRequired,
  stopDisabled: React.PropTypes.bool.isRequired,
  authToken: React.PropTypes.string.isRequired,
  simulationService: React.PropTypes.shape({
    start: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
  }),
  simulationStatus: React.PropTypes.shape({
    status: React.PropTypes.string.isRequired,
    totalPositions: React.PropTypes.number,
    remainingPositions: React.PropTypes.number,
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
