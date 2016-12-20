import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  const props = {
    title: 'Tractor',
    expanded: false,
    startDisabled: false,
    stopDisabled: true,
    trackerId: '123',
    simulationService: {
      start: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      stop: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      status: jest.fn().mockReturnValue(Promise.resolve('fake status response')),
    },
    authService: {
      login: jest.fn(),
      loggedIn: jest.fn(),
      getToken: jest.fn().mockReturnValue('basic 123123'),
      logout: jest.fn()
    },
    simulationStatus: {
      status: 'inactive'
    }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MuiThemeProvider>
        <DashBoardItem
          title={props.title}
          expanded={props.expanded}
          startDisabled={props.startDisabled}
          stopDisabled={props.stopDisabled}
          trackerId={props.trackerId}
          simulationService={props.simulationService}
          authService={props.authService}
          simulationStatus={props.simulationStatus}
        />
      </MuiThemeProvider>,
    );
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should expand <Card /> when start button is clicked', () => {
    expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
    wrapper.find('.start button').simulate('click');
    expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);
  });

  it('should disable the start button after it is clicked', () => {
    const startButton = wrapper.find('.start button');
    expect(startButton.prop('disabled')).toEqual(false);
    startButton.simulate('click');
    expect(startButton.prop('disabled')).toEqual(true);
  });

  it('should enable the stop button after clicking the start button', () => {
    const startButton = wrapper.find('.start button');
    const stopButton = wrapper.find('.stop button');
    expect(stopButton.prop('disabled')).toEqual(true);
    startButton.simulate('click');
    expect(stopButton.prop('disabled')).toEqual(false);
  });
});
