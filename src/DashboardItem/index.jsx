import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';

const itemStyle = {
  marginTop: '1rem'
}

const actionsStyle = {
  //  textAlign: 'right'
}

export default class DashboardItem extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    };
  }

  start() {
    this.setState({ expanded: true });
  }

  stop() {
    this.setState({ expanded: false });
  }

  render() {
    return(
        <Card expanded={ this.state.expanded } style={ itemStyle }>
          <CardHeader
            title={ this.props.title }
            subtitle={ this.props.subtitle }
            actAsExpander={ false }
            showExpandableButton={ false }
            avatar="http://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/tractor-icon.png"
          />
          <CardText expandable={ true }>
            <Subheader>7050 / 8552</Subheader>
            <LinearProgress mode="determinate" value={ 70 } />
          </CardText>
          <CardActions style={ actionsStyle }>
            <RaisedButton label='Start' primary={ true } onClick={ this.start.bind(this) }/>
            <RaisedButton label='Stop' primary={ false} onClick={ this.stop.bind(this) }/>
          </CardActions>
        </Card>
        );
  }
};
