import React from 'react';
import { Row } from 'react-bootstrap';
import DashboardItem from '../DashboardItem';

const DashboardItemContainer = ({ device, authService, simulationService }) => {
  return (
    <Row>
      <DashboardItem
        title={device.relationships.equipment.data.description}
        trackerId={device.id}
        authService={authService}
        simulationService={simulationService}
        startDisabled={!device.relationships.equipment.data.default_simulation}
        stopDisabled
        simulationStatus={device.simulationStatus}
      />
    </Row>
  );
};

DashboardItemContainer.propTypes = {
  device: React.PropTypes.shape({
    relationships: React.PropTypes.shape({
      equipment: React.PropTypes.shape({
        data: React.PropTypes.shape({
          description: React.PropTypes.string.isRequired
        })
      })
    })
  }),
  authService: React.PropTypes.shape({
    login: React.PropTypes.func.isRequired,
    loggedIn: React.PropTypes.func.isRequired,
    getToken: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
  }),
  simulationService: React.PropTypes.shape({
    start: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    status: React.PropTypes.func.isRequired
  })
}

export default DashboardItemContainer;
