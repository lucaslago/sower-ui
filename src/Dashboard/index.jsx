import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardItemContainer from '../DashboardItemContainer';

const dashboardStyle = {
  marginTop: '10rem',
};

const simulationStatusFetcher = simulationService => authToken => device => (
  simulationService.status({ trackerId: device.id, authToken })
);
const transformDevice = device => simulationStatus => Object.assign({ simulationStatus }, device);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
    };
  }

  componentWillMount() {
    const authToken = this.props.route.authService.getToken();
    const simulationStatus = simulationStatusFetcher(this.props.route.simulationService)(authToken);

    return this.props.route.devicesService.fetch(authToken)
      .then((response) => {
        const devices = response.data;
        const devicesPromise = devices.map(d => simulationStatus(d).then(status => (
          transformDevice(d)(status))),
        );
        Promise.all(devicesPromise).then((transformedDevices) => {
          this.setState({ devices: transformedDevices });
        });
      }).catch(err => console.error(err)); //eslint-disable-line
  }

  render() {
    return (
      <div style={dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            { this.state.devices.map(d => (
              <DashboardItemContainer
                key={d.id}
                device={d}
                authToken={this.props.route.authService.getToken()}
                simulationService={this.props.route.simulationService}
              />),
            )
            }
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
    }),
    devicesService: React.PropTypes.shape({
      fetch: React.PropTypes.func.isRequired,
    }),
  }),
};
