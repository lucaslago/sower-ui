import React from 'react';
import { Row } from 'react-bootstrap';
import DashboardItem from '../DashboardItem';

const DashboardItemContainer = ({ device, authToken, simulationService }) => (
  <Row>
    <DashboardItem
      title={device.relationships.equipment.data.description}
      trackerId={device.id}
      authToken={authToken}
      simulationService={simulationService}
      startDisabled={!device.relationships.equipment.data.default_simulation}
      stopDisabled
      simulationStatus={device.simulationStatus}
    />
  </Row>
  );

DashboardItemContainer.propTypes = {
  device: React.PropTypes.shape({
    relationships: React.PropTypes.shape({
      equipment: React.PropTypes.shape({
        data: React.PropTypes.shape({
          description: React.PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
  authToken: React.PropTypes.string.isRequired,
  simulationService: React.PropTypes.shape({
    start: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    status: React.PropTypes.func.isRequired,
  }),
};

export default DashboardItemContainer;
