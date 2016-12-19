import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';

class DashboardItemProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      totalPositions: 0,
      remainingPositions: 0
    };
  }

  componentDidMount() {
    this.props.simulationService.status();
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if(completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div className="dashboard-item-progress-bar">
        <Subheader> { this.state.totalPositions - this.state.remainingPositions } / { this.state.totalPositions } </Subheader>
        <LinearProgress mode="determinate" value={this.state.completed} />
      </div>
    );
  }

}

DashboardItemProgressBar.propTypes = {
  simulationService: React.PropTypes.shape({
    status: React.PropTypes.func.isRequired,
  }),
  trackerId: React.PropTypes.string.isRequired,
  authorization: React.PropTypes.string.isRequired
};

export default DashboardItemProgressBar;
