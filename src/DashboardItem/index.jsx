import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

const itemStyle = {
  marginTop: '1rem',
};

export default class DashboardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded,
      startDisabled: this.props.startDisabled,
      stopDisabled: this.props.stopDisabled,
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    this.setState({
      expanded: true,
      stopDisabled: false,
      startDisabled: true,
    });
  }

  stop() {
    this.setState({
      expanded: false,
      startDisabled: false,
      stopDisabled: true,
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
          <Subheader>7050 / 8552</Subheader>
          <LinearProgress mode="determinate" value={70} />
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
};
