import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import DashboardItem from '../DashboardItem';
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
      loadingItems: true,
      dashboardStyle: loadingStyle,
      error: false,
    };

    this.renderDashBoardItems = this.renderDashBoardItems.bind(this);
  }

  componentWillMount() {
    return this.getDevices()
      .then(response => response.data.map(device => this.getSimulationStatus(device.id)
      .then(status => addSimulationStatus(device, status))))
      .then(devicesPromise => Promise.all(devicesPromise))
      .then((transformedDevices) => {
        this.setState({
          devices: transformedDevices,
          loadingItems: false,
          dashboardStyle: loadedStyle,
        });
      })
      .catch(() => {
        this.setState({
          loadingItems: false,
          dashboardStyle: errorStyle,
          error: true,
        });
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

  render() {
    let asyncItems;

    if (this.state.loadingItems) {
      asyncItems = <CircularProgress className="loading" size={80} thickness={5} />;
    } else {
      asyncItems = this.state.error ? <ServerError /> : this.renderDashBoardItems();
    }

    return (
      <div style={this.state.dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            { asyncItems }
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
