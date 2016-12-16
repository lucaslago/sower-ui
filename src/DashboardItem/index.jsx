import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DashboardItemProgressBar from '../DashBoardItemProgressBar';

const itemStyle = {
  marginTop: '1rem',
};

const notificationStyle = {
  textAlign: 'center',
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
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
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
          <DashboardItemProgressBar />
        </CardText>
        <CardActions>
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
  }),
};
