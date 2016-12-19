import DashboardItemProgressBar from './index';

describe('<DashboardItemProgressBar>', () => {
  const simulationService = { status: () => {} };
  it('should render correctly', () => {
    const wrapper = shallow(<DashboardItemProgressBar trackerId={"123"}
                                                      authToken={"Bearer 12312312"}
                                                      simulationService={simulationService}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
