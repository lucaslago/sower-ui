import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  const defaultProps = {
    authToken: 'basic 123123',
    simulationService: {
      start: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      stop: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      create: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
      status: jest.fn().mockReturnValue(Promise.resolve('fake status response')),
    },
  };
  let wrapper;
  let startButton;
  let stopButton;

  context('For devices with default_simulation data', () => {
    const defaultSimulationProps = Object.assign({}, defaultProps, {
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
    });

    beforeEach(() => {
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...defaultSimulationProps} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    it('renders correctly', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should expand <Card /> when start button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
      startButton.simulate('click');
      setTimeout(() => {
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);
      }, 0);
    });

    it('should disable the start button after it is clicked', () => {
      expect(startButton.prop('disabled')).toEqual(false);
      startButton.simulate('click');
      expect(startButton.prop('disabled')).toEqual(true);
    });

    it('should enable the stop button after clicking the start button', () => {
      expect(stopButton.prop('disabled')).toEqual(true);
      startButton.simulate('click');
      setTimeout(() => {
        expect(stopButton.prop('disabled')).toEqual(false);
      }, 0);
    });

    it('should enable the start button for simulations with custom simulation data', () => {
      expect(startButton.prop('disabled')).toEqual(false);
    });
  });


  context('For devices with custom_simulation data', () => {
    const customSimulationProps = Object.assign({}, defaultProps, {
      device: {
        custom_simulation: true,
        id: '3123',
        relationships: {
          equipment: {
            data: {
              description: 'A customized Apache Helicopter',
              default_simulation: false,
              id: 'deviceId',
              type: 'equipment',
              simulation_type: 'applicator',
            },
          },
        },
        simulationStatus: {
          status: 'inactive',
        },
      },
    });

    beforeEach(() => {
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...customSimulationProps} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    it('renders correctly', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
