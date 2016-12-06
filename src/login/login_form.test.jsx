import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(
        <LoginForm />
    );
    expect(wrapper.length).toEqual(1);
  });

});
