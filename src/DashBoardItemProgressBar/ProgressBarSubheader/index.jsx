import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';
import SIMULATION_STATUS from '../../utils/simulation_status';

const ProgressBarSubheader = ({ completed, status, totalPositions, remainingPositions }) => {
  if (status === SIMULATION_STATUS.ACTIVE) {
    return (
      <div>
        <Subheader>
          { (totalPositions - remainingPositions) } / { totalPositions } 
        </Subheader>
        <LinearProgress mode="determinate" value={completed} />
      </div>
    )
  }
  return (
    <Row>
      <Col md={2} mdOffset={5} >
        <CircularProgress />
      </Col>
    </Row>
  )
}

ProgressBarSubheader.propTypes = {
  completed: React.PropTypes.number.isRequired,
  status: React.PropTypes.string.isRequired,
  totalPositions: React.PropTypes.number,
  remainingPositions: React.PropTypes.number
};

export default ProgressBarSubheader;
