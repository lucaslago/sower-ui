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
    getToken: jest.fn(),
    logout: jest.fn()
  };
  const simulationServiceFake = {
    status: jest.fn().mockReturnValue(Promise.resolve({status: 'active', totalPositions: 1000, remainingPositions: 500})),
    stop: jest.fn(),
    start: jest.fn()
  };
  const devicesServiceFake = { fetch: jest.fn().mockReturnValueOnce(Promise.resolve(devices)) };
  const route = {
    authService: authServiceFake,
    devicesService: devicesServiceFake,
    simulationService: simulationServiceFake
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<Dashboard route={route} />);
    expect(wrapper.length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
