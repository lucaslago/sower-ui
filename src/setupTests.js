/* eslint-disable import/no-extraneous-dependencies */
import injectTapEventPlugin from 'react-tap-event-plugin';
import { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

injectTapEventPlugin();
