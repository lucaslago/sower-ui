import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dashboard from './index';

describe('<Dashboard />', () => {
  const devices = {
    data: [
      {
        type: 'devices',
        id: 'ffcb5837-d34c-48cc-ac76-58fe52c367d4',
        relationships: {
          equipment: {
            data: {
              description: 'A beautiful machine',
              type: 'equipment',
              id: 'b5a48553-0d98-4cbd-b362-cc86e52f1b3e',
            },
          },
        },
      },
    ],
  };

  const authServiceFake = {
    login: jest.fn(),
    loggedIn: jest.fn(),
    getToken: jest.fn().mockReturnValue('basic 123123'),
    logout: jest.fn(),
  };
  const simulationServiceFake = {
    status: jest.fn().mockReturnValue(Promise.resolve({ status: 'active', totalPositions: 1000, remainingPositions: 500 })),
    stop: jest.fn(),
    create: jest.fn(),
    start: jest.fn(),
  };

  it('renders without crashing', () => {
    const devicesServiceFake = { fetch: jest.fn().mockReturnValueOnce(Promise.resolve(devices)) };
    const route = {
      authService: authServiceFake,
      devicesService: devicesServiceFake,
      simulationService: simulationServiceFake,
    };
    const wrapper = shallow(<Dashboard route={route} />);

    expect(wrapper.length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render ServerError in case of error while loading the devices', () => {
    const devicesServiceFake = {
      fetch: jest.fn().mockReturnValue(Promise.reject({ status: 500 })),
    };
    const route = {
      authService: authServiceFake,
      devicesService: devicesServiceFake,
      simulationService: simulationServiceFake,
    };

    const wrapper = mount(
      <MuiThemeProvider>
        <Dashboard route={route} />
      </MuiThemeProvider>,
    );

    const wait = new Promise((resolve) => {
      setTimeout(() => { resolve(true); }, 0);
    });

    return wait.then(() => {
      expect(wrapper.find('.server-error').length).toBe(1);
    });
  });
});
