import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashBoardItem from './index';

describe('<DashBoardItem />', () => {
  let props;
  let wrapper;
  let startButton;
  let stopButton;
  let authToken;
  let trackerId;
  let useDefault;

  beforeEach(() => {
    props = {
      authToken: 'basic 123123',
      simulationService: {
        start: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
        stop: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
        create: jest.fn().mockReturnValue(Promise.resolve({ message: 'ok' })),
        status: jest.fn().mockReturnValue(Promise.resolve('fake status response')),
      },
      device: {
        custom_simulation: false,
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
    authToken = props.authToken;
    trackerId = props.device.id;
    useDefault = false;
  });

  context('device simulationStatus is active', () => {
    beforeEach(() => {
      props.device.simulationStatus.status = 'active';
      props.device.simulationStatus.totalPositions = 1000;
      props.device.simulationStatus.remainingPositions = 500;
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...props} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    it('renders with expected initial state', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should contract the <Card /> and enable start button after stop button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);

      stopButton.simulate('click');

      return wait().then(() => {
        expect(props.simulationService.stop).toBeCalledWith({ authToken, trackerId });
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
        expect(startButton.prop('disabled')).toEqual(false);
        expect(stopButton.prop('disabled')).toEqual(true);
      });
    });
  });

  context('device simulationStatus is inactive and has custom_simulation', () => {
    beforeEach(() => {
      props.device.simulationStatus.status = 'inactive';
      props.device.custom_simulation = true;
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...props} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    xit('renders with expected initial state', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should expand <Card /> and enable stop button after start button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);

      startButton.simulate('click');

      return wait().then(() => {
        expect(props.simulationService.start).toBeCalledWith({ authToken, trackerId, useDefault });
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);
        expect(startButton.prop('disabled')).toEqual(true);
        expect(stopButton.prop('disabled')).toEqual(false);
      });
    });
  });

  context('device simulationStatus is inactive and has default_simulation', () => {
    beforeEach(() => {
      props.device.simulationStatus.status = 'inactive';
      props.device.relationships.equipment.data.default_simulation = true;
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...props} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    it('renders with expected initial state', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should expand <Card /> and enable stop button after start button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);

      startButton.simulate('click');

      return wait().then(() => {
        expect(props.simulationService.start).toBeCalledWith({ authToken, trackerId, useDefault });
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(1);
        expect(startButton.prop('disabled')).toEqual(true);
        expect(stopButton.prop('disabled')).toEqual(false);
      });
    });
  });

  context('device simulationStatus is inactive and has neither custom_simulation nor default_simulation', () => {
    beforeEach(() => {
      props.device.simulationStatus.status = 'inactive';
      props.device.relationships.equipment.data.default_simulation = false;
      props.device.custom_simulation = false;
      wrapper = mount(
        <MuiThemeProvider>
          <DashBoardItem {...props} />
        </MuiThemeProvider>,
      );
      startButton = wrapper.find('.start button');
      stopButton = wrapper.find('.stop button');
    });

    it('renders with expected initial state', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should neither expand <Card /> nor change buttons disabled value when start button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);

      startButton.simulate('click');

      return wait().then(() => {
        expect(props.simulationService.start.mock.calls.length).toEqual(0);
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
        expect(startButton.prop('disabled')).toEqual(true);
        expect(stopButton.prop('disabled')).toEqual(true);
      });
    });

    it('should neither contract <Card /> nor change buttons disabled value when stop button is clicked', () => {
      expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);

      stopButton.simulate('click');

      return wait().then(() => {
        expect(props.simulationService.stop.mock.calls.length).toEqual(0);
        expect(wrapper.find('.dashboard-item-progress-bar').length).toEqual(0);
        expect(startButton.prop('disabled')).toEqual(true);
        expect(stopButton.prop('disabled')).toEqual(true);
      });
    });
  });
});

