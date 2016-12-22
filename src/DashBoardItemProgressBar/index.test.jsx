import DashboardItemProgressBar from './index';

describe('<DashboardItemProgressBar>', () => {
  const props = {
    trackerId: '123',
    authToken: 'Bearer 123123',
    simulationService: { status: jest.fn() },
    simulationStatus: { status: 'inactive' },
    simulationFinished: jest.fn(),
    updateInterval: 1000,
  };

  it('should render correctly', () => {
    const wrapper = shallow(<DashboardItemProgressBar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
