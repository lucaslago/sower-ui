import DashboardItemProgressBar from './index';

describe('<DashboardItemProgressBar>', () => {
  const simulationService = { status: () => {} };
  it('should render correctly', () => {
    const wrapper = shallow(<DashboardItemProgressBar simulationService={simulationService}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
