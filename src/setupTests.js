import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
