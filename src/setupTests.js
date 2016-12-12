import injectTapEventPlugin from 'react-tap-event-plugin';
import { shallow, render, mount } from 'enzyme';
import React from 'react';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

injectTapEventPlugin();
