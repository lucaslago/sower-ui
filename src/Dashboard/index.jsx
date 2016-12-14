import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DashboardItem from '../DashboardItem';

const dashboardStyle = {
  marginTop: '10rem',
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
    };
  }

  componentWillMount() {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.devicesService.fetch(authToken)
      .then((response) => {
        this.setState({ devices: response.data });
      }).catch(err => console.error(err)); //eslint-disable-line
  }

  render() {
    const renderDashboardItem = device => (
      <Row key={device.id}>
        <DashboardItem
          title={device.relationships.equipment.data.description}
          trackerId={device.id}
          expanded={false}
          startDisabled={!device.relationships.equipment.data.default_simulation}
          stopDisabled
        />
      </Row>
      );

    return (
      <div style={dashboardStyle} className="Dashboard">
        <Row>
          <Col xs={12} smOffset={1} sm={10}>
            { this.state.devices.map(d => renderDashboardItem(d)) }
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
    devicesService: React.PropTypes.shape({
      fetch: React.PropTypes.func.isRequired,
    }),
  }),
};
