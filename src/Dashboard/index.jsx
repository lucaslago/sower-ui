import React, { Component } from 'react';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
  }

  componentWillMount() {
    const authToken = this.props.route.authService.getToken();
    return this.props.route.devicesService.fetch(authToken)
      .then(response => {
        this.setState({ devices: response.data })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
        <div className="Dashboard">
          <h1> Your devices: </h1>
          <ul>
            { this.state.devices.map(d => <li key={d.id}> {JSON.stringify(d)} </li> )}
          </ul>
        </div>
        );
  }
}
