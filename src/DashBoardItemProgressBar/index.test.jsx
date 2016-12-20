import DashboardItemProgressBar from './index';

describe('<DashboardItemProgressBar>', () => {
  const simulationService = { status: () => {} };
  const simulationStatus = { status: 'inactive' };
  it('should render correctly', () => {
    const wrapper = shallow(<DashboardItemProgressBar
      trackerId={'123'}
      authToken={'Bearer 12312312'}
      simulationService={simulationService}
      simulationStatus={simulationStatus}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
