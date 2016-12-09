import React from 'react';
import { shallow, render } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ValidatedTextField from './index';
import TextField from 'material-ui/TextField';

describe('<ValidatedTextField />', () => {
  const fieldSelector = '.validated-text-field';
  const handleChangeFake = () => {};

  it('renders without crashing', () => {
    const wrapper = shallow(
        <ValidatedTextField label="login" />
        );
    expect(wrapper.find(fieldSelector).length).toEqual(1);
  });

  it('should not display error when showValidationError is false', () => {
    const wrapper = shallow(
        <ValidatedTextField
          label="login"
          type="text"
          errorText="Field required"
          showValidationError={ false }
          handleChange = { handleChangeFake }
        />
        );
    expect(wrapper.find(fieldSelector).text()).not.toContain('Field required');
  });

  it('should display error when showValidationError is true', () => {
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
    expect(wrapper.find(fieldSelector).text()).toContain('Field required');
  });
});
