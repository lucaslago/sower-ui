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
    this.timer = setTimeout(this.updateProgressBar.bind(this), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchSimulationStatus() {
    const { trackerId, authToken } = this.props;
    return this.props.simulationService.status({ trackerId, authToken });
  }

  async updateProgressBar() {
    const response = await this.fetchSimulationStatus();
    if(response.data.data.status === 'active') {
      const { totalPositions, remainingPositions } = response.data.data;
      const completedPositions = totalPositions - remainingPositions;
      const completedPercentage = ( completedPositions * 100 ) / totalPositions;
      this.setState({
        completed: completedPercentage,
        totalPositions: response.data.data.totalPositions,
        remainingPositions: response.data.data.remainingPositions
      });
      this.timer = setTimeout(this.updateProgressBar.bind(this), 1000);
    }
    console.log(response);

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
  authToken: React.PropTypes.string.isRequired
};

export default DashboardItemProgressBar;
