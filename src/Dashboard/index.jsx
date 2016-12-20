import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardItemContainer from '../DashboardItemContainer';

const dashboardStyle = {
  marginTop: '10rem',
};

const simulationStatusFetcher = simulationService => authToken => device => {
  return simulationService.status({trackerId: device.id, authToken});
};

const transformDevice = device => statusResponse => Object.assign({ simulationStatus: statusResponse.data.data }, device);

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
    };
  }

  componentWillMount() {
    const authToken = this.props.route.authService.getToken();
    const fetchSimulationStatus = simulationStatusFetcher(this.props.route.simulationService)(authToken);

    return this.props.route.devicesService.fetch(authToken)
      .then((response) => {
        const devices = response.data;
        const devicesPromise = devices.map(d => {
          return fetchSimulationStatus(d).then(response => transformDevice(d)(response))
        });
        Promise.all(devicesPromise).then(transformedDevices => {
          this.setState({ devices: transformedDevices });
        })
      }).catch(err => console.error(err)); //eslint-disable-line
  }

  render() {
    return (
      <div style={dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            { this.state.devices.map(d => (
              <DashboardItemContainer key={d.id}
                device={d}
                authService={this.props.route.authService}
                simulationService={this.props.route.simulationService}/>)
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
      create: React.PropTypes.func.isRequired,
    }),
    devicesService: React.PropTypes.shape({
      fetch: React.PropTypes.func.isRequired,
    }),
  }),
};
