import React, { Component } from 'react';

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
    return (
      <div className="Dashboard">
        <h1> Your devices: </h1>
        <ul>
          { this.state.devices.map(d => <li key={d.id}> {JSON.stringify(d)} </li>)}
        </ul>
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
