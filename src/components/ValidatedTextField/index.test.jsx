import React from 'react';
import { shallow } from 'enzyme';
import ValidatedTextField from './index';
import TextField from 'material-ui/TextField';

describe('<ValidatedTextField />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(
        <ValidatedTextField label="login" />
        );
    expect(wrapper.find('.validated-text-field').length).toEqual(1);
  });

  it('should not display error when focused', () => {
    const setValueFake = () => {};
    const wrapper = shallow(
        <ValidatedTextField
          label="login"
          errorText="Field required"
          setValue={ setValueFake }
        />
        );
    wrapper.find('.validated-text-field').simulate('click');
    expect(wrapper.find('.validated-text-field').text()).not.toContain('Field required');
  });
});
