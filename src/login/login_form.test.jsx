import React from 'react';
import {  mount } from 'enzyme';
import LoginForm from './LoginForm';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<LoginForm />', () => {

  it('renders without crashing', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <LoginForm />
      </MuiThemeProvider>
    );
    expect(wrapper.length).toEqual(1);
  });

});


