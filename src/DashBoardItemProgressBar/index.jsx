import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';

const completedPercentage = (totalPositions, remainingPositions) => {
  const completedPositions = totalPositions - remainingPositions;
  return ( completedPositions * 100 ) / totalPositions;
};

const initialState = simulationStatus => {
  if(simulationStatus.status === 'active') {
    return {
      completed: completedPercentage(simulationStatus.totalPositions, simulationStatus.remainingPositions),
      totalPositions: simulationStatus.totalPositions,
      remainingPositions: simulationStatus.remainingPositions
    }
  }
  return { completed: 0, totalPositions: 0, remainingPositions: 0};
};

class DashboardItemProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = initialState(props.simulationStatus);
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setTimeout(this.updateProgressBar.bind(this), this.props.updateInterval);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async updateProgressBar() {
    const { trackerId, authToken } = this.props;
    try { 
      const response = await this.props.simulationService.status({ trackerId, authToken });
      if(response.data.data.status === 'active') {
        const { totalPositions, remainingPositions } = response.data.data;
        this.setState({
          completed: completedPercentage(totalPositions, remainingPositions),
          totalPositions: response.data.data.totalPositions,
          remainingPositions: response.data.data.remainingPositions
        });
        this.timer = setTimeout(this.updateProgressBar.bind(this), this.props.updateInterval);
      }
    } catch(error) {
      console.log(error);
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
  authToken: React.PropTypes.string.isRequired,
  simulationStatus: React.PropTypes.shape({
    status: React.PropTypes.string.isRequired,
    totalPositions: React.PropTypes.number,
    remainingPositions: React.PropTypes.number
  })
};

export default DashboardItemProgressBar;
