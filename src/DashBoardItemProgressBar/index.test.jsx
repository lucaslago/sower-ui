import DashboardItemProgressBar from './index';

describe('<DashboardItemProgressBar>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DashboardItemProgressBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
