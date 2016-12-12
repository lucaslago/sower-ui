import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Grid } from 'react-bootstrap';
import baseTheme from '../styles/themes/baseTheme';

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={baseTheme}>
    <div>
      <AppBar
        title="Sower"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Grid>
        { children }
      </Grid>
    </div>
  </MuiThemeProvider>
  );

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
