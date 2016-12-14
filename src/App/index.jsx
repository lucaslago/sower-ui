import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Grid } from 'react-bootstrap';
import baseTheme from '../styles/themes/baseTheme';

const barStyle = {
  position: 'fixed'
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.route.authService.logout();
    this.props.router.push('login');
  }

  render() {
    let icon;
    if (this.props.route.authService.loggedIn()) {
      icon = <FlatButton label="sign out" onClick={this.signOut} />;
    }

    return (
      <MuiThemeProvider muiTheme={baseTheme}>
        <div>
          <AppBar
            title="Sower"
            iconElementRight={icon}
            style={barStyle}
          />
          <Grid>
            { this.props.children }
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  route: React.PropTypes.shape({
    authService: React.PropTypes.shape({
      logout: React.PropTypes.func.isRequired,
      loggedIn: React.PropTypes.func.isRequired,
    }),
  }),
};

export default withRouter(App);
