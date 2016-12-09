import React from 'react';
import { shallow, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ValidatedTextField from './index';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

describe('<ValidatedTextField />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(
        <ValidatedTextField label="login" />
        );
    expect(wrapper.find('.validated-text-field').length).toEqual(1);
  });

  it('should not display error when showValidationError is false', () => {
    const handleChangeFake = () => {};
    const wrapper = shallow(
        <ValidatedTextField
          label="login"
          type="text"
          errorText="Field required"
          showValidationError={ false }
          handleChange = { handleChangeFake }
        />
        );
    expect(wrapper.find('.validated-text-field').text()).not.toContain('Field required');
  });

  it('should display error when showValidationError is true', () => {
    const handleChangeFake = () => {};
    const wrapper = render(
      <MuiThemeProvider>
        <ValidatedTextField
          label="login"
          type="text"
          errorText="Field required"
          showValidationError={ true }
          handleChange = { handleChangeFake }
        />
      </MuiThemeProvider>
        );
    expect(wrapper.find('.validated-text-field').text()).toContain('Field required');
  });
});
