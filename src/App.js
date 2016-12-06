import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';
import LoginForm from './login/LoginForm';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div>
            <AppBar title="Sower"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <LoginForm />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
