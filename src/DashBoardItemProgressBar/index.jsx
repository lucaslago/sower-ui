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
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  componentDidMount() {
    this.updateProgressBar();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateProgressBarState(simulationStatus) {
    this.setState({ ...simulationStatus, completed: calculatePercentage(simulationStatus) });
    this.timer = setTimeout(this.updateProgressBar, this.props.updateInterval);
  }

  async updateProgressBar() {
    const { trackerId, authToken } = this.props;
    try {
      const simulationStatus = await this.props.simulationService.status({ trackerId, authToken });
      if (simulationStatus.status === SIMULATION_STATUS.INACTIVE) {
        this.props.simulationFinished();
      } else {
        this.updateProgressBarState(simulationStatus);
      }
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
  simulationFinished: React.PropTypes.func.isRequired,
};

export default DashboardItemProgressBar;
