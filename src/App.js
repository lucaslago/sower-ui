import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LoginForm from './login/LoginForm';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <MuiThemeProvider>
          <div>
            <AppBar title="Sower"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <LoginForm />
          </div>
        </MuiThemeProvider>
      </Grid>
    );
  }
}

export default App;
