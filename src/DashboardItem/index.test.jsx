import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  const props = {
    simulationService: {
      start: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      stop: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      create: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      status: jest.fn().mockReturnValue(Promise.resolve('fake status response')),
    },
    authToken: 'basic 123123',
    device: {
      id: '123',
      relationships: {
        equipment: {
          data: {
            description: 'a cool tractor simulation',
            default_simulation: true,
            id: 'anotherid',
            type: 'equipment',
            simulation_type: 'applicator',
          },
        },
      },
      simulationStatus: {
        status: 'inactive',
      },
    },
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MuiThemeProvider>
        <DashBoardItem {...props} />
      </MuiThemeProvider>,
    );
  });

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should expand <Card /> when start button is clicked', () => {
    expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
    wrapper.find('.start button').simulate('click');
    setTimeout(() => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);
    }, 0);
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
    setTimeout(() => {
      expect(stopButton.prop('disabled')).toEqual(false);
    }, 0);
  });
});
