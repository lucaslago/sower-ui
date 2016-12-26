import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardItem from '../DashboardItem';
import AsyncContainer from '../components/AsyncContainer'
import ServerError from '../components/ServerError';

const loadedStyle = {
  marginTop: '10rem',
};

const addSimulationStatus = (device, simulationStatus) => (
  Object.assign({ simulationStatus }, device));

const loadingStyle = {
  textAlign: 'center',
  marginTop: '30rem',
};

const errorStyle = loadingStyle;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      dashboardStyle: loadingStyle,
      errorMessage: "We're sorry, something went wrong in our servers",
    };

    this.fetchDevices = this.fetchDevices.bind(this);
    this.renderDashBoardItems = this.renderDashBoardItems.bind(this);
    this.renderServerError = this.renderServerError.bind(this);
  }

  fetchDevices() {
    return this.getDevices()
      .then(response => response.data.map(device => this.getSimulationStatus(device.id)
      .then(status => addSimulationStatus(device, status))))
      .then(devicesPromise => Promise.all(devicesPromise))
      .then((transformedDevices) => {
        this.setState({
          devices: transformedDevices,
          dashboardStyle: loadedStyle,
        });
      })
      .catch((err) => {
        this.setState({ dashboardStyle: errorStyle });
        throw err;
      });
  }

  getSimulationStatus(trackerId) {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.simulationService.status({ trackerId, authToken });
  }

  getDevices() {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.devicesService.fetch(authToken);
  }

  renderDashBoardItems() {
    return this.state.devices.map(device => (
      <Row key={device.id}>
        <DashboardItem
          device={device}
          authToken={this.props.route.authService.getToken()}
          simulationService={this.props.route.simulationService}
        />
      </Row>
      ));
  }

  renderServerError() {
    return (<ServerError message={this.state.errorMessage} />);
  }

  render() {
    return (
      <div style={this.state.dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            <AsyncContainer
              promise={this.fetchDevices}
              renderOnResolve={this.renderDashBoardItems}
              renderOnReject={this.renderServerError}
              spinnerSize={80}
              spinnerThickness={5}
            />
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
