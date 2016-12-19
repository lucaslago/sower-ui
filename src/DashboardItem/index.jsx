import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DashboardItemProgressBar from '../DashBoardItemProgressBar';
import Menu from '../components/Menu';
import CustomSimulationDialog from '../CustomSimulationDialog';

const itemStyle = {
  marginTop: '1rem',
};

const notificationStyle = {
  textAlign: 'center',
};

const actionsStyle = {
  paddingRight: '0px',
};

export default class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
      startDisabled: this.props.startDisabled,
      stopDisabled: this.props.stopDisabled,
      notification: false,
      notificationMessage: '',
      dialogOpen: false,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  start() {
    this.props.simulationService.start({
      trackerId: this.props.trackerId,
      authToken: this.props.authService.getToken(),
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
      trackerId: this.props.trackerId,
      authToken: this.props.authService.getToken(),
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
      expanded: this.props.expanded,
      startDisabled: this.props.startDisabled,
      stopDisabled: this.props.stopDisabled,
    });
  }

  openDialog() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  render() {
    return (
      <Card className="DashboardItem" expanded={this.state.expanded} style={itemStyle}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.trackerId}
          actAsExpander={false}
          showExpandableButton={false}
          avatar="http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/tractor-icon.png"
        />
        <CardText expandable>
          <DashboardItemProgressBar trackerId={this.props.trackerId}
                                    authToken={this.props.authService.getToken()}
                                    simulationService={this.props.simulationService}/>
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
          <CustomSimulationDialog
            trackerId={this.props.trackerId}
            open={this.state.dialogOpen}
            handleClose={this.handleDialogClose}
            authToken={this.props.authService.getToken()}
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
  title: React.PropTypes.string.isRequired,
  trackerId: React.PropTypes.string.isRequired,
  expanded: React.PropTypes.bool.isRequired,
  startDisabled: React.PropTypes.bool.isRequired,
  stopDisabled: React.PropTypes.bool.isRequired,
  authService: React.PropTypes.shape({
    getToken: React.PropTypes.func.isRequired,
  }),
  simulationService: React.PropTypes.shape({
    start: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
  }),
};
