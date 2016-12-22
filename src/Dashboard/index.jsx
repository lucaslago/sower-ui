import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardItem from '../DashboardItem';

const dashboardStyle = {
  marginTop: '10rem',
};

const addSimulationStatus = (device, simulationStatus) => (
  Object.assign({ simulationStatus }, device));

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
    };
  }

  componentWillMount() {
    return this.getDevices()
      .then(response => response.data.map(device => this.getSimulationStatus(device.id)
        .then(status => addSimulationStatus(device, status))))
      .then(devicesPromise => Promise.all(devicesPromise))
      .then((transformedDevices) => {
        this.setState({ devices: transformedDevices });
      }).catch(err => console.error(err)); //eslint-disable-line
  }

  getSimulationStatus(trackerId) {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.simulationService.status({ trackerId, authToken });
  }

  getDevices() {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.devicesService.fetch(authToken);
  }

  renderDashboardItem(device) {
    return (
      <Row key={device.id}>
        <DashboardItem
          device={device}
          authToken={this.props.route.authService.getToken()}
          simulationService={this.props.route.simulationService}
        />
      </Row>
    );
  }

  render() {
    return (
      <div style={dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            { this.state.devices.map(d => this.renderDashboardItem(d))}
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  route: React.PropTypes.shape({
    authService: React.PropTypes.shape({
      getToken: React.PropTypes.func.isRequired,
    }),
    simulationService: React.PropTypes.shape({
      start: React.PropTypes.func.isRequired,
      stop: React.PropTypes.func.isRequired,
      status: React.PropTypes.func.isRequired,
      create: React.PropTypes.func.isRequired,
    }),
    devicesService: React.PropTypes.shape({
      fetch: React.PropTypes.func.isRequired,
    }),
  }),
};
