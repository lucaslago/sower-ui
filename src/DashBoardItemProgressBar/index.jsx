import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';
import SIMULATION_STATUS from '../utils/simulation_status';

const completedPercentage = (totalPositions, remainingPositions) => {
  const completedPositions = totalPositions - remainingPositions;
  return (completedPositions * 100) / totalPositions;
};

const initialState = (simulationStatus) => {
  if (simulationStatus.status === SIMULATION_STATUS.ACTIVE) {
    return {
      completed: completedPercentage(simulationStatus.totalPositions,
        simulationStatus.remainingPositions),
      totalPositions: simulationStatus.totalPositions,
      remainingPositions: simulationStatus.remainingPositions,
    };
  }
  return { completed: 0, totalPositions: 0, remainingPositions: 0 };
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
      const simulationStatus = await this.props.simulationService.status({ trackerId, authToken });
      if (simulationStatus.status === SIMULATION_STATUS.ACTIVE) {
        const { totalPositions, remainingPositions } = simulationStatus;
        this.setState({
          completed: completedPercentage(totalPositions, remainingPositions),
          totalPositions,
          remainingPositions,
        });
        this.timer = setTimeout(this.updateProgressBar.bind(this), this.props.updateInterval);
      }
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  }

  render() {
    const renderSubheader = () => (
      <Subheader>
        { this.state.totalPositions - this.state.remainingPositions }/{ this.state.totalPositions }
      </Subheader>
    );
    return (
      <div className="dashboard-item-progress-bar">
        {renderSubheader()}
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
    remainingPositions: React.PropTypes.number,
  }),
  updateInterval: React.PropTypes.number.isRequired,
};

export default DashboardItemProgressBar;
