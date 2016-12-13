import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

const itemStyle = {
  marginTop: '1rem',
};

const actionsStyle = {
  //  textAlign: 'right'
};

export default class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      startDisabled: !this.props.hasDefaultSimulation,
      stopDisabled: true,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    this.setState({ expanded: true, stopDisabled: false });
  }

  stop() {
    this.setState({ expanded: false, startDisabled: false });
  }

  render() {
    return (
      <Card expanded={this.state.expanded} style={itemStyle}>
        <CardHeader
          title={this.props.title}
          subtitle={this.props.trackerId}
          actAsExpander={false}
          showExpandableButton={false}
          avatar="http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/tractor-icon.png"
        />
        <CardText expandable>
          <Subheader>7050 / 8552</Subheader>
          <LinearProgress mode="determinate" value={70} />
        </CardText>
        <CardActions style={actionsStyle}>
          <RaisedButton
            label="Start"
            primary
            onClick={this.start}
            disabled={this.state.startDisabled}
          />
          <RaisedButton
            label="Stop"
            primary={false}
            onClick={this.stop}
            disabled={this.state.stopDisabled}
          />
        </CardActions>
      </Card>
    );
  }
}

DashboardItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  trackerId: React.PropTypes.string.isRequired,
  hasDefaultSimulation: React.PropTypes.bool.isRequired,
};
