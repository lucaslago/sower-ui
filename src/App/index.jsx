import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Grid } from 'react-bootstrap';
import baseTheme from '../styles/themes/baseTheme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={baseTheme}>
        <div>
          <AppBar title="Sower"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Grid>
            { this.props.children }
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
