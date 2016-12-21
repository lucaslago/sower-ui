import React, { Component } from 'react';
import SIMULATION_STATUS from '../utils/simulation_status';
import ProgressBarSubheader from './ProgressBarSubheader';

const calculatePercentage = (simulationStatus) => {
  if (simulationStatus.status === SIMULATION_STATUS.INACTIVE) return 0;
  const { totalPositions, remainingPositions } = simulationStatus;
  const completedPositions = totalPositions - remainingPositions;
  return (completedPositions * 100) / totalPositions;
};

class DashboardItemProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.simulationStatus,
      completed: calculatePercentage(props.simulationStatus),
    };
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
      this.setState({
        ...simulationStatus,
        completed: calculatePercentage(simulationStatus),
      });
      this.timer = setTimeout(this.updateProgressBar.bind(this), this.props.updateInterval);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  }

  render() {
    return (
      <div className="dashboard-item-progress-bar">
        <ProgressBarSubheader {...this.state} />
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
